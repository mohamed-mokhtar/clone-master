import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Home, Car, PiggyBank, CreditCard, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import calculatorIcon from '@/assets/calculator-icon.png';

export const CalculatorsSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [salary, setSalary] = useState(5000);
  const [employmentType, setEmploymentType] = useState('salaried');

  // Dialog states
  const [carLoanOpen, setCarLoanOpen] = useState(false);
  const [dbrOpen, setDbrOpen] = useState(false);
  const [homeLoanOpen, setHomeLoanOpen] = useState(false);
  const [emiOpen, setEmiOpen] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);

  // Car Loan states
  const [carPrice, setCarPrice] = useState(100000);
  const [carDownPayment, setCarDownPayment] = useState(20000);
  const [carInterestRate, setCarInterestRate] = useState(3.5);
  const [carTenure, setCarTenure] = useState(5);

  // DBR states
  const [monthlyIncome, setMonthlyIncome] = useState(15000);
  const [existingLoans, setExistingLoans] = useState(3000);
  const [creditCardPayments, setCreditCardPayments] = useState(1000);
  const [otherDebts, setOtherDebts] = useState(500);

  // Home Loan states
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [homeDownPayment, setHomeDownPayment] = useState(250000);
  const [homeInterestRate, setHomeInterestRate] = useState(3.0);
  const [homeTenure, setHomeTenure] = useState(25);

  // EMI states
  const [emiLoanAmount, setEmiLoanAmount] = useState(50000);
  const [emiInterestRate, setEmiInterestRate] = useState(4.5);
  const [emiTenure, setEmiTenure] = useState(36);

  // Interest Calculator states
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(5);
  const [timePeriod, setTimePeriod] = useState(5);
  const [compoundFrequency, setCompoundFrequency] = useState('yearly');

  const calculators = [
    {
      icon: Calculator,
      title: t('calculators.eligibility.title'),
      description: t('calculators.eligibility.description'),
      onClick: () => document.getElementById('featured-calculator')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      icon: Car,
      title: t('calculators.carLoan.title'), 
      description: t('calculators.carLoan.description'),
      onClick: () => setCarLoanOpen(true)
    },
    {
      icon: DollarSign,
      title: t('calculators.dbr.title'),
      description: t('calculators.dbr.description'),
      onClick: () => setDbrOpen(true)
    },
    {
      icon: Home,
      title: t('calculators.homeLoan.title'),
      description: t('calculators.homeLoan.description'),
      onClick: () => setHomeLoanOpen(true)
    },
    {
      icon: CreditCard,
      title: t('calculators.emi.title'),
      description: t('calculators.emi.description'),
      onClick: () => setEmiOpen(true)
    },
    {
      icon: PiggyBank,
      title: t('calculators.interest.title'), 
      description: t('calculators.interest.description'),
      onClick: () => setInterestOpen(true)
    }
  ];

  // Calculation functions
  const calculateCarLoan = () => {
    const loanAmount = carPrice - carDownPayment;
    const monthlyRate = carInterestRate / 100 / 12;
    const numPayments = carTenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalAmount = emi * numPayments;
    const totalInterest = totalAmount - loanAmount;

    toast({
      title: t('calculators.carLoanCalc.title'),
      description: (
        <div className="space-y-2 text-sm">
          <p><strong>{t('calculators.carLoanCalc.monthlyEMI')}:</strong> AED {emi.toFixed(2)}</p>
          <p><strong>{t('calculators.carLoanCalc.totalInterest')}:</strong> AED {totalInterest.toFixed(2)}</p>
          <p><strong>{t('calculators.carLoanCalc.totalAmount')}:</strong> AED {totalAmount.toFixed(2)}</p>
        </div>
      ),
      duration: 7000,
    });
  };

  const calculateDBR = () => {
    const totalDebts = existingLoans + creditCardPayments + otherDebts;
    const dbrRatio = (totalDebts / monthlyIncome) * 100;
    let status = '';
    if (dbrRatio <= 40) status = t('calculators.dbrCalc.healthy');
    else if (dbrRatio <= 55) status = t('calculators.dbrCalc.moderate');
    else status = t('calculators.dbrCalc.high');

    toast({
      title: t('calculators.dbrCalc.title'),
      description: (
        <div className="space-y-2 text-sm">
          <p><strong>{t('calculators.dbrCalc.dbrRatio')}:</strong> {dbrRatio.toFixed(2)}%</p>
          <p><strong>{t('calculators.dbrCalc.status')}:</strong> {status}</p>
        </div>
      ),
      duration: 7000,
    });
  };

  const calculateHomeLoan = () => {
    const loanAmount = propertyValue - homeDownPayment;
    const monthlyRate = homeInterestRate / 100 / 12;
    const numPayments = homeTenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalAmount = emi * numPayments;
    const totalInterest = totalAmount - loanAmount;

    toast({
      title: t('calculators.homeLoanCalc.title'),
      description: (
        <div className="space-y-2 text-sm">
          <p><strong>{t('calculators.homeLoanCalc.loanAmount')}:</strong> AED {loanAmount.toLocaleString()}</p>
          <p><strong>{t('calculators.homeLoanCalc.monthlyEMI')}:</strong> AED {emi.toFixed(2)}</p>
          <p><strong>{t('calculators.homeLoanCalc.totalInterest')}:</strong> AED {totalInterest.toFixed(2)}</p>
          <p><strong>{t('calculators.homeLoanCalc.totalAmount')}:</strong> AED {totalAmount.toFixed(2)}</p>
        </div>
      ),
      duration: 7000,
    });
  };

  const calculateEMI = () => {
    const monthlyRate = emiInterestRate / 100 / 12;
    const emi = (emiLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, emiTenure)) / (Math.pow(1 + monthlyRate, emiTenure) - 1);
    const totalAmount = emi * emiTenure;
    const totalInterest = totalAmount - emiLoanAmount;

    toast({
      title: t('calculators.emiCalc.title'),
      description: (
        <div className="space-y-2 text-sm">
          <p><strong>{t('calculators.emiCalc.monthlyEMI')}:</strong> AED {emi.toFixed(2)}</p>
          <p><strong>{t('calculators.emiCalc.totalInterest')}:</strong> AED {totalInterest.toFixed(2)}</p>
          <p><strong>{t('calculators.emiCalc.totalAmount')}:</strong> AED {totalAmount.toFixed(2)}</p>
        </div>
      ),
      duration: 7000,
    });
  };

  const calculateInterest = () => {
    const simpleInterest = (principal * interestRate * timePeriod) / 100;
    
    let n = 1;
    if (compoundFrequency === 'monthly') n = 12;
    else if (compoundFrequency === 'quarterly') n = 4;
    else if (compoundFrequency === 'halfYearly') n = 2;
    
    const compoundInterest = principal * Math.pow((1 + interestRate / (100 * n)), n * timePeriod) - principal;

    toast({
      title: t('calculators.interestCalc.title'),
      description: (
        <div className="space-y-2 text-sm">
          <p><strong>{t('calculators.interestCalc.simpleInterest')}:</strong> AED {simpleInterest.toFixed(2)}</p>
          <p><strong>{t('calculators.interestCalc.compoundInterest')}:</strong> AED {compoundInterest.toFixed(2)}</p>
          <p><strong>{t('calculators.interestCalc.totalAmount')}:</strong> AED {(principal + compoundInterest).toFixed(2)}</p>
        </div>
      ),
      duration: 7000,
    });
  };

  const calculateEligibility = () => {
    const eligibleAmount = salary * 60;
    toast({
      title: t('calculators.featured.title'),
      description: `Your estimated loan eligibility: AED ${eligibleAmount.toLocaleString()}`,
      duration: 5000,
    });
  };
  return (
    <section id="calculators" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14 md:mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <img src={calculatorIcon} alt="Calculator" className="w-10 h-10 md:w-12 md:h-12" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
            {t('calculators.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('calculators.subtitle')}
          </p>
        </div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-16">
          {calculators.map((calc, index) => {
            const Icon = calc.icon;
            return (
              <Card
                key={index}
                onClick={calc.onClick}
                className="p-6 md:p-7 bg-card border-0 shadow-card hover:shadow-elegant transition-all duration-500 group cursor-pointer hover:-translate-y-2"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="space-y-5">
                  <div className="p-3.5 bg-gradient-primary rounded-2xl w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-soft">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {calc.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {calc.description}
                    </p>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      calc.onClick();
                    }}
                    variant="outline" 
                    size="sm"
                    className="w-full border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold"
                  >
                    {t('calculators.tryNow')}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Featured Calculator */}
        <Card id="featured-calculator" className="p-8 md:p-10 lg:p-12 bg-card border-0 shadow-elegant overflow-hidden relative">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {t('calculators.featured.title')}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {t('calculators.featured.description')}
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant={employmentType === 'salaried' ? "default" : "outline"}
                    className={employmentType === 'salaried' ? "bg-gradient-primary hover:shadow-glow" : "border-primary/30 hover:bg-primary hover:text-primary-foreground"}
                    onClick={() => setEmploymentType('salaried')}
                  >
                    {t('calculators.featured.salaried')}
                  </Button>
                  <Button 
                    variant={employmentType === 'business' ? "default" : "outline"}
                    className={employmentType === 'business' ? "bg-gradient-primary hover:shadow-glow" : "border-primary/30 hover:bg-primary hover:text-primary-foreground"}
                    onClick={() => setEmploymentType('business')}
                  >
                    {t('calculators.featured.business')}
                  </Button>
                </div>
                
                <div className="bg-primary/5 rounded-2xl p-5 md:p-6 border border-primary/10">
                  <p className="text-sm text-muted-foreground mb-3 font-medium">{t('calculators.featured.monthlySalary')}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl md:text-3xl font-bold text-primary font-display">AED {salary.toLocaleString()}</span>
                    <div className="flex-1">
                      <input 
                        type="range" 
                        min="5000" 
                        max="100000" 
                        step="1000"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">100K</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-500 hover:scale-[1.02] font-semibold text-base"
                  onClick={calculateEligibility}
                >
                  {t('calculators.featured.checkEligibility')}
                </Button>
                
                <p className="text-xs text-muted-foreground flex items-start space-x-2">
                  <span className="text-orange-500">⚠️</span>
                  <span>{t('calculators.featured.disclaimer')}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-primary rounded-full opacity-10 animate-pulse-soft"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={calculatorIcon}
                    alt="Financial Calculator"
                    className="w-28 h-28 md:w-36 md:h-36 drop-shadow-2xl animate-float-slow"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-accent rounded-2xl opacity-60 animate-float rotate-12"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-primary rounded-xl opacity-50 animate-bounce-soft -rotate-12"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Car Loan Calculator Dialog */}
        <Dialog open={carLoanOpen} onOpenChange={setCarLoanOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t('calculators.carLoanCalc.title')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>{t('calculators.carLoanCalc.carPrice')}</Label>
                <Input 
                  type="number" 
                  value={carPrice} 
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="w-full"
                />
                <Slider 
                  value={[carPrice]} 
                  onValueChange={(v) => setCarPrice(v[0])}
                  min={50000} 
                  max={500000} 
                  step={10000}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.carLoanCalc.downPayment')}</Label>
                <Input 
                  type="number" 
                  value={carDownPayment} 
                  onChange={(e) => setCarDownPayment(Number(e.target.value))}
                />
                <Slider 
                  value={[carDownPayment]} 
                  onValueChange={(v) => setCarDownPayment(v[0])}
                  min={0} 
                  max={carPrice * 0.5} 
                  step={5000}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.carLoanCalc.interestRate')}</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  value={carInterestRate} 
                  onChange={(e) => setCarInterestRate(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.carLoanCalc.tenure')}</Label>
                <Input 
                  type="number" 
                  value={carTenure} 
                  onChange={(e) => setCarTenure(Number(e.target.value))}
                />
                <Slider 
                  value={[carTenure]} 
                  onValueChange={(v) => setCarTenure(v[0])}
                  min={1} 
                  max={7} 
                  step={1}
                />
              </div>
              <Button onClick={calculateCarLoan} className="w-full bg-gradient-primary">
                {t('calculators.carLoanCalc.calculate')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* DBR Calculator Dialog */}
        <Dialog open={dbrOpen} onOpenChange={setDbrOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t('calculators.dbrCalc.title')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>{t('calculators.dbrCalc.monthlyIncome')}</Label>
                <Input 
                  type="number" 
                  value={monthlyIncome} 
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.dbrCalc.existingLoans')}</Label>
                <Input 
                  type="number" 
                  value={existingLoans} 
                  onChange={(e) => setExistingLoans(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.dbrCalc.creditCards')}</Label>
                <Input 
                  type="number" 
                  value={creditCardPayments} 
                  onChange={(e) => setCreditCardPayments(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.dbrCalc.otherDebts')}</Label>
                <Input 
                  type="number" 
                  value={otherDebts} 
                  onChange={(e) => setOtherDebts(Number(e.target.value))}
                />
              </div>
              <Button onClick={calculateDBR} className="w-full bg-gradient-primary">
                {t('calculators.dbrCalc.calculate')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Home Loan Calculator Dialog */}
        <Dialog open={homeLoanOpen} onOpenChange={setHomeLoanOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t('calculators.homeLoanCalc.title')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>{t('calculators.homeLoanCalc.propertyValue')}</Label>
                <Input 
                  type="number" 
                  value={propertyValue} 
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                />
                <Slider 
                  value={[propertyValue]} 
                  onValueChange={(v) => setPropertyValue(v[0])}
                  min={300000} 
                  max={5000000} 
                  step={50000}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.homeLoanCalc.downPayment')}</Label>
                <Input 
                  type="number" 
                  value={homeDownPayment} 
                  onChange={(e) => setHomeDownPayment(Number(e.target.value))}
                />
                <Slider 
                  value={[homeDownPayment]} 
                  onValueChange={(v) => setHomeDownPayment(v[0])}
                  min={0} 
                  max={propertyValue * 0.5} 
                  step={10000}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.homeLoanCalc.interestRate')}</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  value={homeInterestRate} 
                  onChange={(e) => setHomeInterestRate(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.homeLoanCalc.tenure')}</Label>
                <Input 
                  type="number" 
                  value={homeTenure} 
                  onChange={(e) => setHomeTenure(Number(e.target.value))}
                />
                <Slider 
                  value={[homeTenure]} 
                  onValueChange={(v) => setHomeTenure(v[0])}
                  min={5} 
                  max={30} 
                  step={1}
                />
              </div>
              <Button onClick={calculateHomeLoan} className="w-full bg-gradient-primary">
                {t('calculators.homeLoanCalc.calculate')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* EMI Calculator Dialog */}
        <Dialog open={emiOpen} onOpenChange={setEmiOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t('calculators.emiCalc.title')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>{t('calculators.emiCalc.loanAmount')}</Label>
                <Input 
                  type="number" 
                  value={emiLoanAmount} 
                  onChange={(e) => setEmiLoanAmount(Number(e.target.value))}
                />
                <Slider 
                  value={[emiLoanAmount]} 
                  onValueChange={(v) => setEmiLoanAmount(v[0])}
                  min={10000} 
                  max={500000} 
                  step={5000}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.emiCalc.interestRate')}</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  value={emiInterestRate} 
                  onChange={(e) => setEmiInterestRate(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.emiCalc.tenure')}</Label>
                <Input 
                  type="number" 
                  value={emiTenure} 
                  onChange={(e) => setEmiTenure(Number(e.target.value))}
                />
                <Slider 
                  value={[emiTenure]} 
                  onValueChange={(v) => setEmiTenure(v[0])}
                  min={6} 
                  max={84} 
                  step={6}
                />
              </div>
              <Button onClick={calculateEMI} className="w-full bg-gradient-primary">
                {t('calculators.emiCalc.calculate')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Interest Calculator Dialog */}
        <Dialog open={interestOpen} onOpenChange={setInterestOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t('calculators.interestCalc.title')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>{t('calculators.interestCalc.principal')}</Label>
                <Input 
                  type="number" 
                  value={principal} 
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                />
                <Slider 
                  value={[principal]} 
                  onValueChange={(v) => setPrincipal(v[0])}
                  min={10000} 
                  max={1000000} 
                  step={10000}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.interestCalc.rate')}</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.interestCalc.time')}</Label>
                <Input 
                  type="number" 
                  value={timePeriod} 
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                />
                <Slider 
                  value={[timePeriod]} 
                  onValueChange={(v) => setTimePeriod(v[0])}
                  min={1} 
                  max={30} 
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('calculators.interestCalc.compoundFrequency')}</Label>
                <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yearly">{t('calculators.interestCalc.yearly')}</SelectItem>
                    <SelectItem value="halfYearly">{t('calculators.interestCalc.halfYearly')}</SelectItem>
                    <SelectItem value="quarterly">{t('calculators.interestCalc.quarterly')}</SelectItem>
                    <SelectItem value="monthly">{t('calculators.interestCalc.monthly')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={calculateInterest} className="w-full bg-gradient-primary">
                {t('calculators.interestCalc.calculate')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};