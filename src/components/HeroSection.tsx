import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, Car, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-woman.jpg';

export const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const financialServices = [
    {
      icon: CreditCard,
      title: t('hero.services.creditCards.title'),
      description: t('hero.services.creditCards.description')
    },
    {
      icon: DollarSign, 
      title: t('hero.services.personalLoans.title'),
      description: t('hero.services.personalLoans.description')
    },
    {
      icon: Car,
      title: t('hero.services.autoLoans.title'), 
      description: t('hero.services.autoLoans.description')
    },
    {
      icon: Home,
      title: t('hero.services.mortgages.title'),
      description: t('hero.services.mortgages.description')
    }
  ];
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
                {t('hero.title')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/personal-loan-list">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 w-full sm:w-auto">
                  {t('hero.getStarted')}
                </Button>
              </Link>
              <Button 
                onClick={() => scrollToSection('calculators')}
                variant="outline" 
                size="lg" 
                className="border-primary/20 hover:bg-primary hover:text-primary-foreground"
              >
                {t('hero.learnMore')}
              </Button>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {financialServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    onClick={() => scrollToSection(index === 1 ? 'calculators' : 'services')}
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