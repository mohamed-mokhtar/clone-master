import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Edit3, Calculator } from 'lucide-react';

export default function PersonalLoanList() {
  const { t, isRTL } = useLanguage();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [salary, setSalary] = useState(10000);
  const [tenure, setTenure] = useState(36);
  const [employmentType, setEmploymentType] = useState('salaried');

  const banks = ['FAB', 'HSBC', 'ADCB', 'RAKBANK', 'Sharjah Islamic Bank'];
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [islamicFinance, setIslamicFinance] = useState(false);
  const [salaryTransfer, setSalaryTransfer] = useState('any');

  const calculateEMI = () => {
    const monthlyRate = 0.08 / 12; // 8% annual rate
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const handleCalculate = () => {
    const emi = calculateEMI();
    alert(`${t('loanList.calculator.result')}\n${t('loanList.calculator.emi')}: AED ${emi.toLocaleString()}\n${t('loanList.calculator.totalAmount')}: AED ${(emi * tenure).toLocaleString()}`);
    setIsEditOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('loanList.hero.title')}
          </h1>
          
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white/10 border-white/20 text-foreground hover:bg-white/20">
                <Edit3 className="w-4 h-4 mr-2" />
                {t('loanList.hero.edit')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>{t('loanList.calculator.title')}</span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>{t('loanList.calculator.loanAmount')}</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>AED 10K</span>
                      <span className="font-semibold text-primary">AED {(loanAmount/1000).toFixed(0)}K</span>
                      <span>AED 500K</span>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                      max={500000}
                      min={10000}
                      step={5000}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('loanList.calculator.monthlySalary')}</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>AED 3K</span>
                      <span className="font-semibold text-primary">AED {(salary/1000).toFixed(0)}K</span>
                      <span>AED 50K</span>
                    </div>
                    <Slider
                      value={[salary]}
                      onValueChange={(value) => setSalary(value[0])}
                      max={50000}
                      min={3000}
                      step={500}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('loanList.calculator.tenure')}</Label>
                  <Select value={tenure.toString()} onValueChange={(value) => setTenure(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 {t('loanList.calculator.months')}</SelectItem>
                      <SelectItem value="24">24 {t('loanList.calculator.months')}</SelectItem>
                      <SelectItem value="36">36 {t('loanList.calculator.months')}</SelectItem>
                      <SelectItem value="48">48 {t('loanList.calculator.months')}</SelectItem>
                      <SelectItem value="60">60 {t('loanList.calculator.months')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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

                <Button onClick={handleCalculate} className="w-full bg-gradient-primary hover:shadow-glow">
                  {t('loanList.calculator.calculate')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">{t('loanList.filters.title')}</h3>
                <Button variant="ghost" size="sm" className="text-primary">
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
                        <Label htmlFor={bank} className="text-sm">{bank}</Label>
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
                    <Label htmlFor="islamic">{t('loanList.filters.islamicFinance')}</Label>
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
                      <Label htmlFor="salary-transfer" className="text-sm">{t('loanList.filters.salaryTransferRequired')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="no-salary-transfer"
                        checked={salaryTransfer === 'not-required'}
                        onCheckedChange={(checked) => setSalaryTransfer(checked ? 'not-required' : 'any')}
                      />
                      <Label htmlFor="no-salary-transfer" className="text-sm">{t('loanList.filters.noSalaryTransfer')}</Label>
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
              <div key={index} className="bg-white/10 rounded-lg p-4 min-w-[120px] text-center">
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