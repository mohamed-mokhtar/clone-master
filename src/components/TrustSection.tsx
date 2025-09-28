import { Card } from '@/components/ui/card';
import { Award, Shield, Users, TrendingUp } from 'lucide-react';
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
    {
      icon: Users,
      number: "100k+",
      label: "Happy Customers"
    },
    {
      icon: Award,
      number: "300k+", 
      label: "Credit Cards Issued"
    },
    {
      icon: TrendingUp,
      number: "10 Billion",
      label: "Loan Disbursed"
    },
    {
      icon: Shield,
      number: "10+",
      label: "Partner Banks"
    }
  ];
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Trust Features */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('trust.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('trust.subtitle')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="mx-auto p-3 bg-gradient-primary rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-foreground">
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
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Expert Picks
              </h3>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Banking gurus at your service—we match you with the best banks and products tailored to your profile.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="space-y-3">
                  <div className="p-3 bg-white/20 rounded-2xl w-fit mx-auto">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-primary-foreground">Expert Picks</h4>
                  <p className="text-sm text-primary-foreground/80">
                    Banking gurus match you with the best products
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-white/20 rounded-2xl w-fit mx-auto">
                    <Shield className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-primary-foreground">Simplify & Support</h4>
                  <p className="text-sm text-primary-foreground/80">
                    We guide you from paperwork to approval
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-white/20 rounded-2xl w-fit mx-auto">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-primary-foreground">Trusted Partner</h4>
                  <p className="text-sm text-primary-foreground/80">
                    Largest authorized partner for top UAE banks
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="mx-auto p-3 bg-gradient-primary rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-primary">
                        {stat.number}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
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