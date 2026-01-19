import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp, Percent, Calendar, Briefcase, ChevronDown, ChevronUp, Sparkles, ArrowRight, Shield, Star, Clock, BadgeCheck } from 'lucide-react';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { AnimatedSection, AnimatedContainer, AnimatedItem } from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import appSettings from '@/settings/app-settings.json';

import emiratesNBD from '@/assets/banks/emirates-nbd-uae.png';
import dubaiIslamicBank from '@/assets/banks/dubai-islamic-bank.png';
import adcb from '@/assets/banks/adcb.png';
import fab from '@/assets/banks/fab.png';
import adib from '@/assets/banks/adib.png';

const bankLogos: Record<string, string> = {
  'Emirates NBD': emiratesNBD,
  'Dubai Islamic Bank': dubaiIslamicBank,
  'ADCB': adcb,
  'FAB': fab,
  'ADIB': adib,
};

// Sample loan offers for display
const loanOffers = [
  {
    id: 1,
    bank: 'Emirates NBD',
    rate: 6.49,
    maxAmount: 500000,
    maxTenure: 48,
    minSalary: 8000,
    processingFee: '1%',
    features: ['No salary transfer', 'Quick approval', 'Flexible tenure'],
    badge: 'Best Rate'
  },
  {
    id: 2,
    bank: 'FAB',
    rate: 6.99,
    maxAmount: 400000,
    maxTenure: 48,
    minSalary: 5000,
    processingFee: '1.05%',
    features: ['Low salary requirement', '24hr approval', 'Insurance included'],
    badge: 'Popular'
  },
  {
    id: 3,
    bank: 'ADCB',
    rate: 7.25,
    maxAmount: 350000,
    maxTenure: 60,
    minSalary: 7000,
    processingFee: '1%',
    features: ['Longest tenure', 'Balance transfer', 'Top-up facility'],
    badge: 'Long Tenure'
  },
  {
    id: 4,
    bank: 'Dubai Islamic Bank',
    rate: 7.49,
    maxAmount: 300000,
    maxTenure: 48,
    minSalary: 6000,
    processingFee: '1.25%',
    features: ['Sharia compliant', 'No early settlement fee', 'Halal financing'],
    badge: 'Islamic'
  },
  {
    id: 5,
    bank: 'ADIB',
    rate: 7.75,
    maxAmount: 250000,
    maxTenure: 48,
    minSalary: 5000,
    processingFee: '1%',
    features: ['Sharia compliant', 'Easy documentation', 'Fast processing'],
    badge: 'Islamic'
  }
];

export default function PersonalLoanList() {
  const { t, isRTL } = useLanguage();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [salary, setSalary] = useState(10000);
  const [tenure, setTenure] = useState(36);
  const [employmentType, setEmploymentType] = useState('salaried');
  const [interestRate, setInterestRate] = useState(8);

  const banks = ['FAB', 'ADIB', 'ADCB', 'Emirates NBD', 'Dubai Islamic Bank'];
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [islamicFinance, setIslamicFinance] = useState(false);
  const [salaryTransfer, setSalaryTransfer] = useState('any');

  // Live EMI calculation
  const calculationResult = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - loanAmount;
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    };
  }, [loanAmount, tenure, interestRate]);

  // Filter loan offers based on criteria
  const filteredOffers = useMemo(() => {
    return loanOffers.filter(offer => {
      if (selectedBanks.length > 0 && !selectedBanks.includes(offer.bank)) return false;
      if (islamicFinance && !offer.features.some(f => f.toLowerCase().includes('sharia') || f.toLowerCase().includes('halal'))) return false;
      if (offer.minSalary > salary) return false;
      if (offer.maxAmount < loanAmount) return false;
      return true;
    });
  }, [selectedBanks, islamicFinance, salary, loanAmount]);

  // Calculate EMI for each offer
  const getOfferEMI = (rate: number) => {
    const monthlyRate = rate / 100 / 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Inline Calculator */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 md:py-16 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection direction="up" className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Find Your Perfect Loan</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              {t('loanList.hero.title')}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare the best personal loan offers from UAE's top banks and find the perfect match for your needs
            </p>
          </AnimatedSection>
          
          {/* Inline Calculator Card */}
          <AnimatedSection direction="scale" delay={0.2}>
            <Card className="max-w-5xl mx-auto p-6 md:p-8 bg-card/95 backdrop-blur-xl border border-border/50 shadow-elegant rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Controls */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-primary to-primary-glow rounded-xl shadow-soft">
                      <Calculator className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-foreground">
                        {t('loanList.calculator.title')}
                      </h2>
                      <p className="text-sm text-muted-foreground">Adjust values to see your EMI</p>
                    </div>
                  </div>

                  {/* Loan Amount */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        {t('loanList.calculator.loanAmount')}
                      </Label>
                      <span className="text-lg font-bold text-primary">AED {loanAmount.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      max={500000}
                      min={10000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>AED 10K</span>
                      <span>AED 500K</span>
                    </div>
                  </div>

                  {/* Monthly Salary */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Briefcase className="w-4 h-4 text-primary" />
                        {t('loanList.calculator.monthlySalary')}
                      </Label>
                      <span className="text-lg font-bold text-primary">AED {salary.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[salary]}
                      onValueChange={(value) => setSalary(value[0])}
                      max={50000}
                      min={3000}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>AED 3K</span>
                      <span>AED 50K</span>
                    </div>
                  </div>

                  {/* Tenure */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Calendar className="w-4 h-4 text-primary" />
                        {t('loanList.calculator.tenure')}
                      </Label>
                      <span className="text-lg font-bold text-primary">{tenure} {t('loanList.calculator.months')}</span>
                    </div>
                    <Slider
                      value={[tenure]}
                      onValueChange={(value) => setTenure(value[0])}
                      max={60}
                      min={12}
                      step={6}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>12 months</span>
                      <span>60 months</span>
                    </div>
                  </div>

                  {/* Advanced Options Toggle */}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-muted-foreground hover:text-foreground"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    Advanced Options
                    {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>

                  {showAdvanced && (
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {/* Employment Type */}
                      <div className="space-y-2">
                        <Label>{t('loanList.calculator.employmentType')}</Label>
                        <Select value={employmentType} onValueChange={setEmploymentType}>
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="salaried">{t('loanList.calculator.salaried')}</SelectItem>
                            <SelectItem value="business">{t('loanList.calculator.business')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Interest Rate */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="flex items-center gap-2">
                            <Percent className="w-4 h-4 text-primary" />
                            Interest Rate
                          </Label>
                          <span className="text-lg font-bold text-primary">{interestRate}%</span>
                        </div>
                        <Slider
                          value={[interestRate]}
                          onValueChange={(value) => setInterestRate(value[0])}
                          max={15}
                          min={3}
                          step={0.5}
                          className="w-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Live Results */}
                <div className="flex items-center">
                  <motion.div 
                    className="w-full bg-gradient-to-br from-primary via-primary to-primary-dark rounded-2xl p-6 md:p-8 text-center shadow-float relative overflow-hidden"
                    animate={{ boxShadow: ['0 0 30px rgba(var(--primary), 0.2)', '0 0 50px rgba(var(--primary), 0.3)', '0 0 30px rgba(var(--primary), 0.2)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Calculator className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <p className="text-primary-foreground/80 text-sm mb-2">Monthly EMI</p>
                      <motion.p 
                        className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6"
                        key={calculationResult.emi}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        AED {calculationResult.emi.toLocaleString()}
                      </motion.p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                        <div>
                          <p className="text-primary-foreground/70 text-xs mb-1">Total Interest</p>
                          <p className="text-lg font-bold text-primary-foreground">
                            AED {calculationResult.totalInterest.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-primary-foreground/70 text-xs mb-1">Total Amount</p>
                          <p className="text-lg font-bold text-primary-foreground">
                            AED {calculationResult.totalAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 text-primary-foreground/80 text-xs mt-4">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>Live calculation</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <AnimatedSection direction="left">
              <Card className="p-6 bg-card border border-border/50 shadow-soft sticky top-24 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">{t('loanList.filters.title')}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary hover:text-primary/80 text-xs"
                    onClick={() => {
                      setSelectedBanks([]);
                      setIslamicFinance(false);
                      setSalaryTransfer('any');
                    }}
                  >
                    {t('loanList.filters.reset')}
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-3 text-sm">{t('loanList.filters.banks')}</h4>
                    <div className="space-y-2.5">
                      {banks.map((bank) => (
                        <div key={bank} className="flex items-center gap-2">
                          <Checkbox 
                            id={bank}
                            checked={selectedBanks.includes(bank)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBanks([...selectedBanks, bank]);
                              } else {
                                setSelectedBanks(selectedBanks.filter(b => b !== bank));
                              }
                            }}
                            className="border-border"
                          />
                          <Label htmlFor={bank} className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors">{bank}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Checkbox 
                        id="islamic"
                        checked={islamicFinance}
                        onCheckedChange={(checked) => setIslamicFinance(checked === true)}
                        className="border-border"
                      />
                      <Label htmlFor="islamic" className="cursor-pointer text-sm">{t('loanList.filters.islamicFinance')}</Label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-3 text-sm">{t('loanList.filters.salaryTransfer')}</h4>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="salary-transfer"
                          checked={salaryTransfer === 'required'}
                          onCheckedChange={(checked) => setSalaryTransfer(checked ? 'required' : 'any')}
                          className="border-border"
                        />
                        <Label htmlFor="salary-transfer" className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors">{t('loanList.filters.salaryTransferRequired')}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="no-salary-transfer"
                          checked={salaryTransfer === 'not-required'}
                          onCheckedChange={(checked) => setSalaryTransfer(checked ? 'not-required' : 'any')}
                          className="border-border"
                        />
                        <Label htmlFor="no-salary-transfer" className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors">{t('loanList.filters.noSalaryTransfer')}</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          {/* Loan Offers */}
          <div className="lg:col-span-3">
            <AnimatedSection direction="up" className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-display font-bold text-foreground">
                  {filteredOffers.length} Loan {filteredOffers.length === 1 ? 'Offer' : 'Offers'} Found
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>All offers verified</span>
                </div>
              </div>
            </AnimatedSection>

            {filteredOffers.length > 0 ? (
              <AnimatedContainer className="space-y-4" staggerDelay={0.1}>
                {filteredOffers.map((offer, index) => (
                  <AnimatedItem key={offer.id}>
                    <motion.div
                      whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Card className="p-6 bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 rounded-xl overflow-hidden relative group">
                        {/* Badge */}
                        {index === 0 && (
                          <div className="absolute top-0 right-0 bg-gradient-to-r from-secondary to-accent text-white text-xs font-semibold px-4 py-1 rounded-bl-xl">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {offer.badge}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Bank Logo & Info */}
                          <div className="flex items-center gap-4 md:w-1/4">
                            <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                              {bankLogos[offer.bank] ? (
                                <img 
                                  src={bankLogos[offer.bank]} 
                                  alt={`${offer.bank} logo`}
                                  className="max-w-full max-h-full object-contain"
                                />
                              ) : (
                                <span className="text-xs font-semibold text-primary text-center">{offer.bank}</span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{offer.bank}</h3>
                              <p className="text-xs text-muted-foreground">Personal Loan</p>
                            </div>
                          </div>

                          {/* Loan Details */}
                          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                              <p className="text-xl font-bold text-primary">{offer.rate}%</p>
                              <p className="text-[10px] text-muted-foreground">per annum</p>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Monthly EMI</p>
                              <p className="text-xl font-bold text-foreground">AED {getOfferEMI(offer.rate).toLocaleString()}</p>
                              <p className="text-[10px] text-muted-foreground">estimated</p>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Max Amount</p>
                              <p className="text-lg font-bold text-foreground">AED {(offer.maxAmount / 1000)}K</p>
                              <p className="text-[10px] text-muted-foreground">limit</p>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Processing</p>
                              <p className="text-lg font-bold text-foreground">{offer.processingFee}</p>
                              <p className="text-[10px] text-muted-foreground">of amount</p>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mt-4 pt-4 border-t border-border/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="flex flex-wrap gap-2">
                            {offer.features.map((feature, i) => (
                              <span key={i} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                                <BadgeCheck className="w-3 h-3 text-primary" />
                                {feature}
                              </span>
                            ))}
                          </div>
                          <Button 
                            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300 text-primary-foreground gap-2"
                            onClick={() => {
                              const phone = appSettings.contact.whatsapp.replace(/\s+/g, '');
                              window.open(`https://wa.me/${phone}?text=Hi, I'm interested in the ${offer.bank} Personal Loan with ${offer.rate}% rate`, '_blank');
                            }}
                          >
                            Apply Now
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  </AnimatedItem>
                ))}
              </AnimatedContainer>
            ) : (
              <AnimatedSection direction="scale">
                <Card className="p-12 bg-card border border-border/50 text-center rounded-xl">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Calculator className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {t('loanList.noResults.title')}
                    </h2>
                    <p className="text-muted-foreground">
                      {t('loanList.noResults.description')}
                    </p>
                    <p className="text-muted-foreground">
                      {t('loanList.noResults.assistance')}
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow"
                      onClick={() => {
                        const phone = appSettings.contact.whatsapp.replace(/\s+/g, '');
                        window.open(`https://wa.me/${phone}`, '_blank');
                      }}
                    >
                      {t('loanList.noResults.consultExpert')}
                    </Button>
                  </div>
                </Card>
              </AnimatedSection>
            )}
          </div>
        </div>

        {/* Bank Partners Section */}
        <AnimatedSection direction="up" delay={0.2} className="mt-16">
          <section className="relative py-12 bg-gradient-to-br from-primary via-primary to-primary-dark rounded-2xl overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-[60px]"></div>
            </div>
            
            <div className="relative z-10 text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-primary-foreground mb-2">
                {t('loanList.providers.title')}
              </h2>
              <p className="text-primary-foreground/70 text-sm">Trusted by thousands of customers across UAE</p>
            </div>
            
            <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap px-4 relative z-10">
              {['Emirates NBD', 'Dubai Islamic Bank', 'ADCB', 'FAB', 'ADIB'].map((bank, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[100px] text-center hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/10"
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 p-2 shadow-soft">
                    {bankLogos[bank] ? (
                      <img 
                        src={bankLogos[bank]} 
                        alt={`${bank} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-primary">{bank}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>

      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}
