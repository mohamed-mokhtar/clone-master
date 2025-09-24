import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Home, Car, PiggyBank, CreditCard, DollarSign } from 'lucide-react';
import calculatorIcon from '@/assets/calculator-icon.png';

const calculators = [
  {
    icon: Calculator,
    title: "Eligibility Calculator",
    description: "Check your loan eligibility instantly"
  },
  {
    icon: Car,
    title: "Car Loan Calculator", 
    description: "Calculate your car loan EMI"
  },
  {
    icon: DollarSign,
    title: "DBR Calculator",
    description: "Debt-to-income ratio calculator"
  },
  {
    icon: Home,
    title: "Home Loan Calculator",
    description: "Plan your dream home purchase"
  },
  {
    icon: CreditCard,
    title: "EMI Calculator",
    description: "Calculate monthly installments"
  },
  {
    icon: PiggyBank,
    title: "Interest Calculator", 
    description: "Compare interest rates"
  }
];

export const CalculatorsSection = () => {
  return (
    <section id="calculators" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={calculatorIcon} alt="Calculator" className="w-12 h-12" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Financial Calculators
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use our advanced calculators to make informed financial decisions
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
                    Try Now
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
                  Eligibility Calculator
                </h3>
                <p className="text-muted-foreground">
                  Get an instant assessment of your loan eligibility based on your profile
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button 
                    variant="default" 
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    Salaried
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-primary/20 hover:bg-primary hover:text-primary-foreground"
                  >
                    Business
                  </Button>
                </div>
                
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                  <p className="text-sm text-muted-foreground mb-2">Monthly Salary in AED</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-primary">AED 5K</span>
                    <div className="flex-1 h-2 bg-muted rounded-full">
                      <div className="h-2 bg-gradient-primary rounded-full w-1/4"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">100K</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  Check Eligibility
                </Button>
                
                <p className="text-xs text-muted-foreground flex items-start space-x-2">
                  <span className="text-orange-500">⚠️</span>
                  <span>This calculator is only viable and subject to Finmart's financial assessment.</span>
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