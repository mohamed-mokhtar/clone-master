import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { checkRateLimit, recordSubmission } from '@/utils/rateLimit';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, Wallet, Home, Car, ArrowLeft, ArrowRight, 
  ChevronLeft, Check, Upload, X, Loader2, Sparkles,
  Phone, User, Briefcase, FileText, Tag, CheckCircle2
} from 'lucide-react';
import { z } from 'zod';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const TOTAL_STEPS = 7;

type ProductType = 'credit_card' | 'personal_loan' | 'home_finance' | 'auto_loan';
type FinanceType = 'conventional' | 'islamic';

interface FormData {
  productType: ProductType | '';
  financeType: FinanceType;
  mobile: string;
  whatsappRegistered: string;
  fullName: string;
  email: string;
  nationality: string;
  residencyStatus: string;
  dateOfBirth: string;
  employmentType: string;
  monthlySalary: string;
  employerName: string;
  lengthOfService: string;
  salaryTransferBank: string;
  productPreferences: Record<string, any>;
  promoCode: string;
  eidFront: File | null;
  eidBack: File | null;
  termsAccepted: boolean;
}

const initialFormData: FormData = {
  productType: '',
  financeType: 'conventional',
  mobile: '',
  whatsappRegistered: '',
  fullName: '',
  email: '',
  nationality: '',
  residencyStatus: '',
  dateOfBirth: '',
  employmentType: '',
  monthlySalary: '',
  employerName: '',
  lengthOfService: '',
  salaryTransferBank: '',
  productPreferences: {},
  promoCode: '',
  eidFront: null,
  eidBack: null,
  termsAccepted: false,
};

const nationalities = [
  'UAE', 'India', 'Pakistan', 'Philippines', 'Egypt', 'Jordan', 'Lebanon', 
  'Syria', 'Iraq', 'Saudi Arabia', 'Bangladesh', 'Sri Lanka', 'Nepal',
  'UK', 'USA', 'Canada', 'Australia', 'South Africa', 'Other'
];

const uaeBanks = [
  'Emirates NBD', 'ADCB', 'FAB', 'Dubai Islamic Bank', 'ADIB', 
  'Mashreq', 'RAKBANK', 'CBD', 'NBF', 'UAB', 'Other', 'None'
];

const creditCardBenefits = {
  entertainment: ['Cinema', 'Dining', 'Theme Parks'],
  lifestyle: ['Shopping', 'Spa & Wellness', 'Fitness'],
  financial: ['Cashback', 'Air Miles', 'Rewards Points'],
  extras: ['Airport Lounge', 'Travel Insurance', 'Free Supplementary Cards'],
};

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

const Apply = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [financeFilter, setFinanceFilter] = useState<'all' | 'conventional' | 'islamic'>('all');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  }, []);

  const productIcons: Record<ProductType, React.ReactNode> = {
    credit_card: <CreditCard className="w-8 h-8" />,
    personal_loan: <Wallet className="w-8 h-8" />,
    home_finance: <Home className="w-8 h-8" />,
    auto_loan: <Car className="w-8 h-8" />,
  };

  const productLabels: Record<ProductType, string> = {
    credit_card: t('apply.products.creditCard'),
    personal_loan: t('apply.products.personalLoan'),
    home_finance: t('apply.products.homeFinance'),
    auto_loan: t('apply.products.autoLoan'),
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.productType) newErrors.productType = t('apply.errors.required');
        break;
      case 2:
        if (!formData.mobile || formData.mobile.length < 9) newErrors.mobile = t('apply.errors.invalidPhone');
        if (!formData.whatsappRegistered) newErrors.whatsappRegistered = t('apply.errors.required');
        break;
      case 3:
        if (!formData.fullName.trim()) newErrors.fullName = t('apply.errors.required');
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('apply.errors.invalidEmail');
        if (!formData.nationality) newErrors.nationality = t('apply.errors.required');
        if (!formData.residencyStatus) newErrors.residencyStatus = t('apply.errors.required');
        break;
      case 4:
        if (!formData.employmentType) newErrors.employmentType = t('apply.errors.required');
        if (!formData.monthlySalary || Number(formData.monthlySalary) <= 0) newErrors.monthlySalary = t('apply.errors.invalidSalary');
        break;
      case 5:
        if (formData.productType === 'credit_card') {
          const selected = formData.productPreferences.benefits || [];
          if (selected.length < 3) newErrors.benefits = t('apply.errors.selectBenefits');
        }
        break;
      case 7:
        if (!formData.termsAccepted) newErrors.terms = t('apply.errors.acceptTerms');
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setDirection(1);
    setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    if (!checkRateLimit('application', 60)) {
      toast.error('Please wait before submitting another application. Try again later.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      let eidFrontUrl = null;
      let eidBackUrl = null;

      // Upload EID files if provided
      if (formData.eidFront) {
        const frontExt = formData.eidFront.name.split('.').pop();
        const frontPath = `${Date.now()}-front.${frontExt}`;
        const { error: frontError } = await supabase.storage
          .from('application-documents')
          .upload(frontPath, formData.eidFront);
        if (!frontError) eidFrontUrl = frontPath;
      }

      if (formData.eidBack) {
        const backExt = formData.eidBack.name.split('.').pop();
        const backPath = `${Date.now()}-back.${backExt}`;
        const { error: backError } = await supabase.storage
          .from('application-documents')
          .upload(backPath, formData.eidBack);
        if (!backError) eidBackUrl = backPath;
      }

      const { error } = await supabase.from('applications').insert({
        product_type: formData.productType,
        finance_type: formData.financeType,
        full_name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        whatsapp_registered: formData.whatsappRegistered,
        nationality: formData.nationality,
        residency_status: formData.residencyStatus,
        date_of_birth: formData.dateOfBirth || null,
        employment_type: formData.employmentType,
        monthly_salary: Number(formData.monthlySalary),
        employer_name: formData.employerName || null,
        length_of_service: formData.lengthOfService || null,
        salary_transfer_bank: formData.salaryTransferBank || null,
        product_preferences: formData.productPreferences || null,
        promo_code: formData.promoCode || null,
        eid_front_url: eidFrontUrl,
        eid_back_url: eidBackUrl,
      });

      if (error) throw error;
      recordSubmission('application');
      setIsSuccess(true);
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ submit: t('apply.errors.submitFailed') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercent = (step / TOTAL_STEPS) * 100;

  const stepIcons = [
    <CreditCard className="w-4 h-4" />,
    <Phone className="w-4 h-4" />,
    <User className="w-4 h-4" />,
    <Briefcase className="w-4 h-4" />,
    <Sparkles className="w-4 h-4" />,
    <Tag className="w-4 h-4" />,
    <FileText className="w-4 h-4" />,
  ];

  // ======= STEP RENDERS =======

  const renderStep1 = () => {
    const products: ProductType[] = ['credit_card', 'personal_loan', 'home_finance', 'auto_loan'];

    return (
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('apply.step1.title')}
          </h1>
          <p className="text-muted-foreground text-lg">{t('apply.step1.subtitle')}</p>
        </div>

        {/* Finance type tabs */}
        <div className="flex justify-center gap-2">
          {(['all', 'conventional', 'islamic'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setFinanceFilter(type);
                if (type !== 'all') updateField('financeType', type as FinanceType);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                financeFilter === type
                  ? 'bg-primary text-primary-foreground shadow-elegant'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {t(`apply.financeTypes.${type}`)}
            </button>
          ))}
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <motion.button
              key={product}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                updateField('productType', product);
                if (financeFilter !== 'all') updateField('financeType', financeFilter as FinanceType);
                setTimeout(() => { setDirection(1); setStep(2); }, 200);
              }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-4 text-center ${
                formData.productType === product
                  ? 'border-primary bg-primary/10 shadow-elegant'
                  : 'border-border bg-card hover:border-primary/40 hover:shadow-card'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                formData.productType === product
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {productIcons[product]}
              </div>
              <span className="font-semibold text-foreground text-sm">
                {productLabels[product]}
              </span>
            </motion.button>
          ))}
        </div>

        {errors.productType && (
          <p className="text-destructive text-center text-sm">{errors.productType}</p>
        )}
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="space-y-8 max-w-md mx-auto">
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {t('apply.step2.title').replace('{product}', productLabels[formData.productType as ProductType] || '')}
        </h2>
        <p className="text-muted-foreground">{t('apply.step2.subtitle')}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>{t('apply.step2.mobile')}</Label>
          <div className="flex gap-2 mt-1.5">
            <div className="flex items-center px-3 bg-muted rounded-xl text-sm font-medium text-muted-foreground shrink-0">
              +971
            </div>
            <Input
              type="tel"
              placeholder="5X XXX XXXX"
              value={formData.mobile}
              onChange={(e) => updateField('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="rounded-xl"
            />
          </div>
          {errors.mobile && <p className="text-destructive text-sm mt-1">{errors.mobile}</p>}
        </div>

        <div className="space-y-3">
          <Label>{t('apply.step2.whatsapp')}</Label>
          <RadioGroup
            value={formData.whatsappRegistered}
            onValueChange={(v) => updateField('whatsappRegistered', v)}
            className="flex flex-col gap-2"
          >
            {['yes', 'no', 'no_whatsapp'].map((opt) => (
              <div key={opt} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors cursor-pointer">
                <RadioGroupItem value={opt} id={`wa-${opt}`} />
                <Label htmlFor={`wa-${opt}`} className="cursor-pointer flex-1">
                  {t(`apply.step2.whatsappOptions.${opt}`)}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.whatsappRegistered && <p className="text-destructive text-sm mt-1">{errors.whatsappRegistered}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t('apply.step3.title')}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label>{t('apply.step3.fullName')}</Label>
          <Input value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} className="mt-1.5 rounded-xl" />
          {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <Label>{t('apply.step3.email')}</Label>
          <Input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} className="mt-1.5 rounded-xl" />
          {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <Label>{t('apply.step3.nationality')}</Label>
          <Select value={formData.nationality} onValueChange={(v) => updateField('nationality', v)}>
            <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder={t('apply.step3.selectNationality')} /></SelectTrigger>
            <SelectContent>
              {nationalities.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.nationality && <p className="text-destructive text-sm mt-1">{errors.nationality}</p>}
        </div>
        <div className="space-y-3">
          <Label>{t('apply.step3.residency')}</Label>
          <RadioGroup value={formData.residencyStatus} onValueChange={(v) => updateField('residencyStatus', v)} className="flex gap-3">
            {['resident', 'non_resident'].map((r) => (
              <div key={r} className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors cursor-pointer flex-1">
                <RadioGroupItem value={r} id={`res-${r}`} />
                <Label htmlFor={`res-${r}`} className="cursor-pointer">{t(`apply.step3.${r}`)}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.residencyStatus && <p className="text-destructive text-sm mt-1">{errors.residencyStatus}</p>}
        </div>
        <div>
          <Label>{t('apply.step3.dob')}</Label>
          <Input type="date" value={formData.dateOfBirth} onChange={(e) => updateField('dateOfBirth', e.target.value)} className="mt-1.5 rounded-xl" />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t('apply.step4.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <Label>{t('apply.step4.employmentType')}</Label>
          <RadioGroup value={formData.employmentType} onValueChange={(v) => updateField('employmentType', v)} className="flex flex-col gap-2">
            {['salaried', 'self_employed', 'business_owner'].map((e) => (
              <div key={e} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors cursor-pointer">
                <RadioGroupItem value={e} id={`emp-${e}`} />
                <Label htmlFor={`emp-${e}`} className="cursor-pointer flex-1">{t(`apply.step4.${e}`)}</Label>
              </div>
            ))}
          </RadioGroup>
          {errors.employmentType && <p className="text-destructive text-sm mt-1">{errors.employmentType}</p>}
        </div>
        <div>
          <Label>{t('apply.step4.salary')}</Label>
          <div className="flex gap-2 mt-1.5">
            <div className="flex items-center px-3 bg-muted rounded-xl text-sm font-medium text-muted-foreground shrink-0">AED</div>
            <Input
              type="number"
              value={formData.monthlySalary}
              onChange={(e) => updateField('monthlySalary', e.target.value)}
              placeholder="0"
              className="rounded-xl"
            />
          </div>
          {errors.monthlySalary && <p className="text-destructive text-sm mt-1">{errors.monthlySalary}</p>}
        </div>
        <div>
          <Label>{t('apply.step4.employer')}</Label>
          <Input value={formData.employerName} onChange={(e) => updateField('employerName', e.target.value)} className="mt-1.5 rounded-xl" />
        </div>
        <div>
          <Label>{t('apply.step4.serviceLength')}</Label>
          <Select value={formData.lengthOfService} onValueChange={(v) => updateField('lengthOfService', v)}>
            <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder={t('apply.step4.selectLength')} /></SelectTrigger>
            <SelectContent>
              {['< 6 months', '6-12 months', '1-2 years', '2-5 years', '5+ years'].map((l) => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>{t('apply.step4.salaryBank')}</Label>
          <Select value={formData.salaryTransferBank} onValueChange={(v) => updateField('salaryTransferBank', v)}>
            <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder={t('apply.step4.selectBank')} /></SelectTrigger>
            <SelectContent>
              {uaeBanks.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => {
    if (formData.productType === 'credit_card') {
      const selected: string[] = formData.productPreferences.benefits || [];
      const toggleBenefit = (b: string) => {
        const newBenefits = selected.includes(b)
          ? selected.filter((x) => x !== b)
          : [...selected, b];
        updateField('productPreferences', { ...formData.productPreferences, benefits: newBenefits });
      };

      return (
        <div className="space-y-6 max-w-lg mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t('apply.step5.creditCard.title')}</h2>
            <p className="text-muted-foreground">{t('apply.step5.creditCard.subtitle')}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Check className="w-4 h-4" /> {selected.length}/3 {t('apply.step5.creditCard.selected')}
            </div>
          </div>

          {Object.entries(creditCardBenefits).map(([category, benefits]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {t(`apply.step5.creditCard.categories.${category}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {benefits.map((b) => (
                  <button
                    key={b}
                    onClick={() => toggleBenefit(b)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selected.includes(b)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {errors.benefits && <p className="text-destructive text-center text-sm">{errors.benefits}</p>}
        </div>
      );
    }

    // Personal Loan / Home Finance / Auto Loan preferences
    return (
      <div className="space-y-6 max-w-lg mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t('apply.step5.general.title')}</h2>
        </div>

        <div className="space-y-4">
          {formData.productType === 'personal_loan' && (
            <>
              <div>
                <Label>{t('apply.step5.personalLoan.amount')}</Label>
                <div className="flex gap-2 mt-1.5">
                  <div className="flex items-center px-3 bg-muted rounded-xl text-sm font-medium text-muted-foreground shrink-0">AED</div>
                  <Input
                    type="number"
                    value={formData.productPreferences.desiredAmount || ''}
                    onChange={(e) => updateField('productPreferences', { ...formData.productPreferences, desiredAmount: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <Label>{t('apply.step5.personalLoan.tenure')}</Label>
                <Select
                  value={formData.productPreferences.tenure || ''}
                  onValueChange={(v) => updateField('productPreferences', { ...formData.productPreferences, tenure: v })}
                >
                  <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['12', '24', '36', '48'].map((m) => (
                      <SelectItem key={m} value={m}>{m} {t('apply.step5.months')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          {formData.productType === 'home_finance' && (
            <>
              <div>
                <Label>{t('apply.step5.homeFinance.propertyValue')}</Label>
                <div className="flex gap-2 mt-1.5">
                  <div className="flex items-center px-3 bg-muted rounded-xl text-sm font-medium text-muted-foreground shrink-0">AED</div>
                  <Input type="number" value={formData.productPreferences.propertyValue || ''} onChange={(e) => updateField('productPreferences', { ...formData.productPreferences, propertyValue: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div>
                <Label>{t('apply.step5.homeFinance.downPayment')}</Label>
                <div className="flex gap-2 mt-1.5">
                  <div className="flex items-center px-3 bg-muted rounded-xl text-sm font-medium text-muted-foreground shrink-0">AED</div>
                  <Input type="number" value={formData.productPreferences.downPayment || ''} onChange={(e) => updateField('productPreferences', { ...formData.productPreferences, downPayment: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-3">
                <Label>{t('apply.step5.homeFinance.propertyType')}</Label>
                <RadioGroup value={formData.productPreferences.propertyType || ''} onValueChange={(v) => updateField('productPreferences', { ...formData.productPreferences, propertyType: v })} className="flex gap-3">
                  {['ready', 'off_plan'].map((pt) => (
                    <div key={pt} className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors cursor-pointer flex-1">
                      <RadioGroupItem value={pt} id={`pt-${pt}`} />
                      <Label htmlFor={`pt-${pt}`} className="cursor-pointer">{t(`apply.step5.homeFinance.${pt}`)}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}
          {formData.productType === 'auto_loan' && (
            <>
              <div>
                <Label>{t('apply.step5.autoLoan.vehiclePrice')}</Label>
                <div className="flex gap-2 mt-1.5">
                  <div className="flex items-center px-3 bg-muted rounded-xl text-sm font-medium text-muted-foreground shrink-0">AED</div>
                  <Input type="number" value={formData.productPreferences.vehiclePrice || ''} onChange={(e) => updateField('productPreferences', { ...formData.productPreferences, vehiclePrice: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div>
                <Label>{t('apply.step5.autoLoan.downPayment')}</Label>
                <div className="flex gap-2 mt-1.5">
                  <div className="flex items-center px-3 bg-muted rounded-xl text-sm font-medium text-muted-foreground shrink-0">AED</div>
                  <Input type="number" value={formData.productPreferences.downPayment || ''} onChange={(e) => updateField('productPreferences', { ...formData.productPreferences, downPayment: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-3">
                <Label>{t('apply.step5.autoLoan.condition')}</Label>
                <RadioGroup value={formData.productPreferences.vehicleCondition || ''} onValueChange={(v) => updateField('productPreferences', { ...formData.productPreferences, vehicleCondition: v })} className="flex gap-3">
                  {['new', 'used'].map((c) => (
                    <div key={c} className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors cursor-pointer flex-1">
                      <RadioGroupItem value={c} id={`vc-${c}`} />
                      <Label htmlFor={`vc-${c}`} className="cursor-pointer">{t(`apply.step5.autoLoan.${c}`)}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderStep6 = () => (
    <div className="space-y-8 max-w-md mx-auto text-center">
      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t('apply.step6.title')}</h2>
        <p className="text-muted-foreground">{t('apply.step6.subtitle')}</p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder={t('apply.step6.placeholder')}
          value={formData.promoCode}
          onChange={(e) => updateField('promoCode', e.target.value)}
          className="text-center rounded-xl text-lg"
        />
        <p className="text-sm text-muted-foreground italic">{t('apply.step6.hint')}</p>
        <Button variant="ghost" onClick={goNext} className="text-primary">
          {t('apply.step6.skip')}
        </Button>
      </div>
    </div>
  );

  const renderStep7 = () => (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t('apply.step7.title')}</h2>
        <p className="text-muted-foreground">{t('apply.step7.subtitle')}</p>
      </div>

      {/* EID Upload */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">{t('apply.step7.eidTitle')}</h3>
        {['eidFront', 'eidBack'].map((side) => {
          const file = formData[side as 'eidFront' | 'eidBack'];
          return (
            <div key={side} className="space-y-1.5">
              <Label>{t(`apply.step7.${side}`)}</Label>
              <div className="relative border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/40 transition-colors">
                {file ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground truncate">{file.name}</span>
                    <button onClick={() => updateField(side as 'eidFront' | 'eidBack', null)} className="text-muted-foreground hover:text-destructive">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{t('apply.step7.uploadHint')}</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) updateField(side as 'eidFront' | 'eidBack', f);
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Summary */}
      <div className="bg-muted/50 rounded-2xl p-5 space-y-3">
        <h3 className="font-semibold text-foreground">{t('apply.step7.reviewTitle')}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">{t('apply.step7.product')}</span>
          <span className="font-medium text-foreground">{productLabels[formData.productType as ProductType]}</span>
          <span className="text-muted-foreground">{t('apply.step7.finance')}</span>
          <span className="font-medium text-foreground">{t(`apply.financeTypes.${formData.financeType}`)}</span>
          <span className="text-muted-foreground">{t('apply.step3.fullName')}</span>
          <span className="font-medium text-foreground">{formData.fullName}</span>
          <span className="text-muted-foreground">{t('apply.step3.email')}</span>
          <span className="font-medium text-foreground">{formData.email}</span>
          <span className="text-muted-foreground">{t('apply.step2.mobile')}</span>
          <span className="font-medium text-foreground">+971 {formData.mobile}</span>
          <span className="text-muted-foreground">{t('apply.step4.salary')}</span>
          <span className="font-medium text-foreground">AED {Number(formData.monthlySalary).toLocaleString()}</span>
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={formData.termsAccepted}
          onCheckedChange={(checked) => updateField('termsAccepted', checked as boolean)}
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
          {t('apply.step7.termsText')}
        </Label>
      </div>
      {errors.terms && <p className="text-destructive text-sm">{errors.terms}</p>}
      {errors.submit && <p className="text-destructive text-sm text-center">{errors.submit}</p>}
    </div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="text-center space-y-6 py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto"
      >
        <CheckCircle2 className="w-12 h-12 text-primary" />
      </motion.div>
      <h2 className="text-3xl font-bold text-foreground">{t('apply.success.title')}</h2>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">{t('apply.success.message')}</p>
      <Link to="/">
        <Button className="bg-gradient-primary rounded-xl mt-4">{t('apply.success.backHome')}</Button>
      </Link>
    </motion.div>
  );

  const stepRenderers = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5, renderStep6, renderStep7];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        {renderSuccess()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{t('apply.exit')}</span>
          </Link>

          {step > 1 && formData.productType && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {productIcons[formData.productType as ProductType]}
              </div>
              <span className="text-sm font-semibold text-foreground hidden sm:inline">
                {productLabels[formData.productType as ProductType]}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                i + 1 < step
                  ? 'bg-primary text-primary-foreground'
                  : i + 1 === step
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {i + 1 < step ? <Check className="w-4 h-4" /> : stepIcons[i]}
              </div>
              {i < TOTAL_STEPS - 1 && (
                <div className={`w-6 md:w-10 h-0.5 mx-0.5 transition-colors duration-300 ${
                  i + 1 < step ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 md:py-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {stepRenderers[step - 1]()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      {step > 1 && (
        <div className="sticky bottom-0 bg-card/90 backdrop-blur-xl border-t border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
            <Button variant="outline" onClick={goBack} className="rounded-xl gap-2">
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              {t('common.previous')}
            </Button>

            {step < TOTAL_STEPS ? (
              <Button onClick={goNext} className="bg-gradient-primary rounded-xl gap-2 flex-1 max-w-xs">
                {t('common.next')}
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-primary rounded-xl gap-2 flex-1 max-w-xs"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> {t('common.loading')}</>
                ) : (
                  <><Check className="w-4 h-4" /> {t('common.submit')}</>
                )}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Decorative background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      </div>
    </div>
  );
};

export default Apply;
