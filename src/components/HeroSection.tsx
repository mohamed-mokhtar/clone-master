import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, Car, Home, ArrowRight, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-fintech.jpg';

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
      description: t('hero.services.creditCards.description'),
      gradient: 'from-primary to-primary-glow'
    },
    {
      icon: DollarSign, 
      title: t('hero.services.personalLoans.title'),
      description: t('hero.services.personalLoans.description'),
      gradient: 'from-secondary to-accent'
    },
    {
      icon: Car,
      title: t('hero.services.autoLoans.title'), 
      description: t('hero.services.autoLoans.description'),
      gradient: 'from-accent to-secondary'
    },
    {
      icon: Home,
      title: t('hero.services.mortgages.title'),
      description: t('hero.services.mortgages.description'),
      gradient: 'from-primary-glow to-primary'
    }
  ];

  const stats = [
    { value: 'AED 10B+', label: 'Loans Disbursed', icon: TrendingUp },
    { value: '100K+', label: 'Happy Customers', icon: Shield },
    { value: '15+', label: 'Partner Banks', icon: Zap },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-background">
      {/* Hero Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70 dark:from-background dark:via-background/90 dark:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
      </div>

      {/* Animated Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-soft"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-secondary/30 rounded-full blur-[80px] animate-float"></div>
        <div className="absolute top-1/2 right-1/6 w-32 h-32 bg-accent/25 rounded-full blur-[60px] animate-float-slow"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>

        {/* Animated lines */}
        <svg className="absolute right-0 top-0 h-full w-1/2 opacity-10 dark:opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50" stroke="url(#lineGradient)" strokeWidth="0.2" fill="none" className="animate-pulse-soft">
            <animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0,50 Q25,30 50,50 T100,50;M0,50 Q25,70 50,50 T100,50;M0,50 Q25,30 50,50 T100,50" />
          </path>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-4xl">
          {/* Content */}
          <article className="space-y-8 lg:space-y-10">
            <header className="space-y-6 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm font-semibold text-primary border border-primary/20" role="text" aria-label="Trusted badge">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>UAE's Trusted Financial Partner</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-[1.05] tracking-tight">
                <span className="block">{t('hero.title')}</span>
                <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundSize: '200% 200%' }}>
                  Smarter Way
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </header>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
              <Link to="/personal-loan-list">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-dark hover:to-primary text-primary-foreground hover:shadow-glow transition-all duration-500 w-full sm:w-auto text-base font-semibold px-8 py-6 group rounded-xl"
                >
                  {t('hero.getStarted')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Button 
                onClick={() => scrollToSection('calculators')}
                variant="outline" 
                size="lg" 
                className="border-2 border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary text-foreground font-semibold px-8 py-6 rounded-xl transition-all duration-300"
              >
                {t('hero.learnMore')}
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 md:gap-10 pt-4 animate-fade-in-up delay-300">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Service Cards Grid */}
            <nav aria-label="Financial Services" className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 pt-6 animate-fade-in-up delay-400">
              {financialServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    onClick={() => scrollToSection(index === 1 ? 'calculators' : 'services')}
                    className="p-4 md:p-5 bg-card/80 dark:bg-card/60 backdrop-blur-md border border-border/50 hover:border-primary/30 shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer group hover:-translate-y-1 rounded-xl"
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${service.title}`}
                    onKeyDown={(e) => e.key === 'Enter' && scrollToSection(index === 1 ? 'calculators' : 'services')}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 bg-gradient-to-br ${service.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </nav>
          </article>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
};
