import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Home, Car, PiggyBank, CreditCard, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import calculatorIcon from '@/assets/calculator-icon.png';

export const CalculatorsSection = () => {
  const { t } = useLanguage();
  const [salary, setSalary] = useState(5000);
  const [employmentType, setEmploymentType] = useState('salaried');

  const calculators = [
    {
      icon: Calculator,
      title: t('calculators.eligibility.title'),
      description: t('calculators.eligibility.description')
    },
    {
      icon: Car,
      title: t('calculators.carLoan.title'), 
      description: t('calculators.carLoan.description')
    },
    {
      icon: DollarSign,
      title: t('calculators.dbr.title'),
      description: t('calculators.dbr.description')
    },
    {
      icon: Home,
      title: t('calculators.homeLoan.title'),
      description: t('calculators.homeLoan.description')
    },
    {
      icon: CreditCard,
      title: t('calculators.emi.title'),
      description: t('calculators.emi.description')
    },
    {
      icon: PiggyBank,
      title: t('calculators.interest.title'), 
      description: t('calculators.interest.description')
    }
  ];

  const calculateEligibility = () => {
    // Simple eligibility calculation
    const eligibleAmount = salary * 60; // 60x salary as rough estimate
    alert(`Your estimated loan eligibility: AED ${eligibleAmount.toLocaleString()}`);
  };
  return (
    <section id="calculators" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={calculatorIcon} alt="Calculator" className="w-12 h-12" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('calculators.title')}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('calculators.subtitle')}
          </p>
        </div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {calculators.map((calc, index) => {
            const Icon = calc.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-gradient-primary rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {calc.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {calc.description}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {t('calculators.tryNow')}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Featured Calculator */}
        <Card className="p-8 bg-gradient-card border-0 shadow-elegant">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">
                  {t('calculators.featured.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('calculators.featured.description')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button 
                    variant={employmentType === 'salaried' ? "default" : "outline"}
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    onClick={() => setEmploymentType('salaried')}
                  >
                    {t('calculators.featured.salaried')}
                  </Button>
                  <Button 
                    variant={employmentType === 'business' ? "default" : "outline"}
                    className="border-primary/20 hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setEmploymentType('business')}
                  >
                    {t('calculators.featured.business')}
                  </Button>
                </div>
                
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                  <p className="text-sm text-muted-foreground mb-2">{t('calculators.featured.monthlySalary')}</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-primary">AED {salary.toLocaleString()}</span>
                    <div className="flex-1">
                      <input 
                        type="range" 
                        min="5000" 
                        max="100000" 
                        step="1000"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">100K</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
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
                <div className="w-80 h-80 bg-gradient-primary rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={calculatorIcon}
                    alt="Financial Calculator"
                    className="w-32 h-32 drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};