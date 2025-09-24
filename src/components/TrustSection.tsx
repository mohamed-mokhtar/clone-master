import { Card } from '@/components/ui/card';
import { Award, Shield, Users, TrendingUp } from 'lucide-react';

const trustFeatures = [
  {
    icon: Award,
    title: "Banking Excellence Recognized",
    subtitle: "Measures",
    description: "Awarded by the UAE's top banks, our trophy shelf tells the story of excellence, trust, and unmatched service."
  },
  {
    icon: Users,
    title: "Network of 300+ Lenders", 
    subtitle: "Reductions",
    description: "Our network of over 300 lenders will be matched with you, and up to five of them will contact you to compete for your business."
  },
  {
    icon: Shield,
    title: "Provide Assistance",
    subtitle: "Assistance", 
    description: "With our free credit monitoring, insightful budgeting advice, and tailored recommendations, we offer continuous support."
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

export const TrustSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Trust Features */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why do our clients trust us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't settle for anything. Choose the right one.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-8 text-center bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="mx-auto p-4 bg-gradient-primary rounded-3xl w-fit group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-primary uppercase tracking-wider">
                        {feature.subtitle}
                      </p>
                      <h3 className="text-xl font-bold text-foreground">
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