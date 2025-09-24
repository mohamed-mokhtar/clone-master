import { Card } from '@/components/ui/card';
import { CreditCard, DollarSign, Car, Home, Building } from 'lucide-react';
import heroImage from '@/assets/hero-woman.jpg';

const financialServices = [
  {
    icon: CreditCard,
    title: "Credit Cards",
    description: "Find the perfect credit card for your lifestyle"
  },
  {
    icon: DollarSign, 
    title: "Personal Loan",
    description: "Quick approval for personal financial needs"
  },
  {
    icon: Car,
    title: "Auto Loan", 
    description: "Competitive rates for your dream car"
  },
  {
    icon: Home,
    title: "Mortgages",
    description: "Home financing made simple"
  },
  {
    icon: Building,
    title: "Current & Savings account",
    description: "Banking solutions for everyday needs"
  }
];

export const HeroSection = () => {
  return (
    <section className="min-h-[80vh] bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-accent rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-primary rounded-full opacity-15 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Plethora of Financial Aids,
                <span className="bg-gradient-primary bg-clip-text text-transparent block">
                  All Tailor made
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Your trusted partner for all banking needs in the UAE. Get personalized financial solutions from top banks.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {financialServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="p-4 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Professional woman with laptop - Financial services"
                className="w-full h-auto rounded-3xl shadow-elegant"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-primary rounded-2xl opacity-80 animate-bounce delay-1000"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-accent rounded-xl opacity-70 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};