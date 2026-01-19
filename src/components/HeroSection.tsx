import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, Car, Home, ArrowRight, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Hero3DMockup } from '@/components/Hero3DMockup';
import { motion } from 'framer-motion';
import { LetterReveal, GradientLetterReveal } from '@/components/LetterReveal';
import heroLight from '@/assets/hero-light.jpg';
import heroDark from '@/assets/hero-dark.jpg';

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
      {/* Theme-aware Hero Background */}
      <div className="absolute inset-0">
        {/* Light mode image */}
        <img 
          src={heroLight} 
          alt="" 
          className="w-full h-full object-cover dark:hidden"
          loading="eager"
          fetchPriority="high"
        />
        {/* Dark mode image */}
        <img 
          src={heroDark} 
          alt="" 
          className="w-full h-full object-cover hidden dark:block"
          loading="eager"
          fetchPriority="high"
        />
        {/* Light Mode Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50 dark:hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 dark:hidden"></div>
        {/* Dark Mode Gradient Overlays */}
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-r from-background via-background/85 to-transparent"></div>
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-t from-background via-transparent to-background/40"></div>
      </div>

      {/* Animated Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 dark:bg-primary/20 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-secondary/20 dark:bg-secondary/30 rounded-full blur-[80px]"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/6 w-32 h-32 bg-accent/15 dark:bg-accent/25 rounded-full blur-[60px]"
          animate={{ x: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.article 
            className="space-y-8 lg:space-y-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <header className="space-y-6">
              {/* Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm font-semibold text-primary border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>UAE's Trusted Financial Partner</span>
              </motion.div>
              
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display text-foreground leading-[1.1] tracking-tight"
              >
                <span className="block">
                  <LetterReveal text={t('hero.title')} delay={0.3} staggerDelay={0.025} />
                </span>
                <span className="block mt-2">
                  <GradientLetterReveal 
                    text="Smarter Way" 
                    delay={0.8} 
                    staggerDelay={0.05}
                    gradientColors="from-primary via-secondary to-accent"
                  />
                </span>
              </h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {t('hero.subtitle')}
              </motion.p>
            </header>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
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
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              className="flex flex-wrap gap-6 md:gap-10 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={index} 
                    className="flex items-center gap-3 group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Service Cards Grid */}
            <motion.nav 
              aria-label="Financial Services" 
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {financialServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card
                      onClick={() => scrollToSection(index === 1 ? 'calculators' : 'services')}
                      className="p-4 md:p-5 bg-card/80 dark:bg-card/60 backdrop-blur-md border border-border/50 hover:border-primary/30 shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer group rounded-xl"
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
                  </motion.div>
                );
              })}
            </motion.nav>
          </motion.article>

          {/* 3D Mockup */}
          <div className="hidden lg:flex justify-center items-center">
            <Hero3DMockup />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
};
