import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, Car, Home, ArrowRight, Sparkles } from 'lucide-react';
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
    <section className="min-h-[90vh] bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-accent rounded-full opacity-20 blur-[100px] animate-pulse-soft"></div>
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-primary rounded-full opacity-15 blur-[80px] animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[60px] animate-float"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-6 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-foreground/90">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
                <span>UAE's Trusted Financial Partner</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-[1.1] tracking-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
              <Link to="/personal-loan-list">
                <Button 
                  size="lg" 
                  className="bg-foreground text-background hover:bg-foreground/90 hover:shadow-float transition-all duration-500 w-full sm:w-auto text-base font-semibold px-8 group"
                >
                  {t('hero.getStarted')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Button 
                onClick={() => scrollToSection('calculators')}
                variant="outline" 
                size="lg" 
                className="border-foreground/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-foreground font-semibold px-8"
              >
                {t('hero.learnMore')}
              </Button>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl animate-fade-in-up delay-300">
              {financialServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    onClick={() => scrollToSection(index === 1 ? 'calculators' : 'services')}
                    className="p-4 md:p-5 bg-white/90 backdrop-blur-sm border-0 shadow-card hover:shadow-elegant transition-all duration-500 cursor-pointer group hover:-translate-y-1"
                    style={{ animationDelay: `${(index + 3) * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 md:p-2.5 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-soft">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-300">
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
          <div className="relative animate-fade-in-right delay-200">
            {/* Main Image Container */}
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-float">
              <img
                src={heroImage}
                alt="Professional woman with laptop - Financial services"
                className="w-full h-auto object-cover aspect-[4/5] md:aspect-[3/4]"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-primary rounded-3xl opacity-80 animate-float shadow-glow rotate-12"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-accent rounded-2xl opacity-70 animate-float-slow shadow-elegant -rotate-6"></div>
            
            {/* Stats Card */}
            <div className="absolute bottom-8 -left-4 md:left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-elegant animate-bounce-soft z-20">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Loans Disbursed</p>
                  <p className="text-xl font-bold text-foreground">AED 10B+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
