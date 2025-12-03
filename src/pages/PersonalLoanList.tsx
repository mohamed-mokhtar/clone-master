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
import { Calculator, TrendingUp, Percent, Calendar, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

export default function PersonalLoanList() {
  const { t, isRTL } = useLanguage();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [salary, setSalary] = useState(10000);
  const [tenure, setTenure] = useState(36);
  const [employmentType, setEmploymentType] = useState('salaried');
  const [interestRate, setInterestRate] = useState(8);

  const banks = ['FAB', 'HSBC', 'ADCB', 'RAKBANK', 'Sharjah Islamic Bank'];
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Inline Calculator */}
      <section className="bg-gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-8 text-center">
            {t('loanList.hero.title')}
          </h1>
          
          {/* Inline Calculator Card */}
          <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-card/95 backdrop-blur-sm border-0 shadow-elegant">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Controls */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-primary rounded-xl">
                    <Calculator className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-foreground">
                    {t('loanList.calculator.title')}
                  </h2>
                </div>

                {/* Loan Amount */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
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
                    <Label className="flex items-center gap-2">
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
                    <Label className="flex items-center gap-2">
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
                  <div className="space-y-4 animate-fade-in">
                    {/* Employment Type */}
                    <div className="space-y-2">
                      <Label>{t('loanList.calculator.employmentType')}</Label>
                      <Select value={employmentType} onValueChange={setEmploymentType}>
                        <SelectTrigger>
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
                  </div>
                )}
              </div>

              {/* Live Results */}
              <div className="flex items-center">
                <div className="w-full bg-gradient-primary rounded-2xl p-6 md:p-8 text-center shadow-float">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <p className="text-primary-foreground/80 text-sm mb-2">Monthly EMI</p>
                  <p className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6 animate-pulse-soft">
                    AED {calculationResult.emi.toLocaleString()}
                  </p>
                  
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
                  
                  <div className="flex items-center justify-center gap-2 text-primary-foreground/70 text-xs mt-4">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>Live calculation</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <Card className="p-6 bg-gradient-card border-0 shadow-card sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">{t('loanList.filters.title')}</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:text-primary/80"
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
                  <h4 className="font-medium text-foreground mb-3">{t('loanList.filters.banks')}</h4>
                  <div className="space-y-2">
                    {banks.map((bank) => (
                      <div key={bank} className="flex items-center space-x-2">
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
                        />
                        <Label htmlFor={bank} className="text-sm cursor-pointer">{bank}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox 
                      id="islamic"
                      checked={islamicFinance}
                      onCheckedChange={(checked) => setIslamicFinance(checked === true)}
                    />
                    <Label htmlFor="islamic" className="cursor-pointer">{t('loanList.filters.islamicFinance')}</Label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-3">{t('loanList.filters.salaryTransfer')}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="salary-transfer"
                        checked={salaryTransfer === 'required'}
                        onCheckedChange={(checked) => setSalaryTransfer(checked ? 'required' : 'any')}
                      />
                      <Label htmlFor="salary-transfer" className="text-sm cursor-pointer">{t('loanList.filters.salaryTransferRequired')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="no-salary-transfer"
                        checked={salaryTransfer === 'not-required'}
                        onCheckedChange={(checked) => setSalaryTransfer(checked ? 'not-required' : 'any')}
                      />
                      <Label htmlFor="no-salary-transfer" className="text-sm cursor-pointer">{t('loanList.filters.noSalaryTransfer')}</Label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Card className="p-8 bg-gradient-card border-0 shadow-card text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Calculator className="w-12 h-12 text-primary" />
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
                <Button className="bg-gradient-primary hover:shadow-glow">
                  {t('loanList.noResults.consultExpert')}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Loan Providers Section */}
        <section className="py-12 bg-gradient-primary rounded-2xl mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              {t('loanList.providers.title')}
            </h2>
          </div>
          <div className="flex justify-center items-center space-x-8 overflow-x-auto px-4">
            {['Emirates NBD', 'Dubai Islamic Bank', 'ADCB', 'FAB', 'HSBC'].map((bank, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 min-w-[120px] text-center hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs font-semibold text-primary">{bank}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
