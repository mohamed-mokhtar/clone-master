import { Card } from '@/components/ui/card';
import { Award, Shield, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const TrustSection = () => {
  const { t } = useLanguage();
  
  const trustFeatures = [
    {
      icon: Award,
      title: t('trust.features.expert.title'),
      description: t('trust.features.expert.description')
    },
    {
      icon: Shield,
      title: t('trust.features.secure.title'), 
      description: t('trust.features.secure.description')
    },
    {
      icon: Users,
      title: t('trust.features.support.title'),
      description: t('trust.features.support.description')
    },
    {
      icon: TrendingUp,
      title: t('trust.features.rates.title'),
      description: t('trust.features.rates.description')
    }
  ];

  const statistics = [
    { icon: Users, number: "100k+", label: "Happy Customers" },
    { icon: Award, number: "300k+", label: "Credit Cards Issued" },
    { icon: TrendingUp, number: "10 Billion", label: "Loan Disbursed" },
    { icon: Shield, number: "10+", label: "Partner Banks" }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-muted/40 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="space-y-16 md:space-y-24">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground animate-fade-in">
              {t('trust.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in delay-100">
              {t('trust.subtitle')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 md:p-8 text-center bg-card border-0 shadow-card hover:shadow-elegant transition-all duration-500 group hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-5">
                    <div className="mx-auto p-4 bg-gradient-primary rounded-2xl w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-soft">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg md:text-xl font-bold text-foreground font-display">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Expert Picks Section */}
          <div className="bg-gradient-primary rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 text-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">
                  Expert Picks
                </h3>
                <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                  Banking gurus at your service—we match you with the best banks and products tailored to your profile.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {[
                  { icon: Award, title: "Expert Picks", desc: "Banking gurus match you with the best products" },
                  { icon: Shield, title: "Simplify & Support", desc: "We guide you from paperwork to approval" },
                  { icon: Users, title: "Trusted Partner", desc: "Largest authorized partner for top UAE banks" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="space-y-4 group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="p-4 bg-white/15 backdrop-blur-sm rounded-2xl w-fit mx-auto group-hover:scale-110 group-hover:bg-white/25 transition-all duration-500">
                      <item.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold text-lg text-primary-foreground">{item.title}</h4>
                    <p className="text-sm text-primary-foreground/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-6 md:p-8 text-center bg-card border-0 shadow-card hover:shadow-elegant transition-all duration-500 group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="mx-auto p-3 bg-primary/10 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary font-display">
                        {stat.number}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
