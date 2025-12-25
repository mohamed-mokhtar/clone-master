import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

import emiratesNBD from '@/assets/banks/emirates-nbd-uae.png';
import dubaiIslamicBank from '@/assets/banks/dubai-islamic-bank.png';
import fab from '@/assets/banks/fab.png';
import hsbc from '@/assets/banks/hsbc.png';
import adib from '@/assets/banks/adib.png';
import adcb from '@/assets/banks/adcb.png';

const bankLogos = [
  { name: "Emirates NBD", logo: emiratesNBD },
  { name: "Dubai Islamic Bank", logo: dubaiIslamicBank }, 
  { name: "FAB", logo: fab },
  { name: "HSBC", logo: hsbc },
  { name: "Abu Dhabi Islamic Bank", logo: adib },
  { name: "ADCB", logo: adcb }
];

export const BankingPartners = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="space-y-12 md:space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
              {t('partners.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t('partners.subtitle')}
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {bankLogos.map((bank, index) => (
              <Card
                key={index}
                className="p-5 md:p-6 bg-card border border-border/50 shadow-soft hover:shadow-elegant transition-all duration-500 group cursor-pointer hover:-translate-y-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-center h-14 md:h-16">
                  <img 
                    src={bank.logo} 
                    alt={`${bank.name} logo`}
                    className="max-h-10 md:max-h-12 max-w-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 filter grayscale group-hover:grayscale-0"
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Partner Benefits */}
          <div className="bg-gradient-accent rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-[80px]"></div>

            <div className="relative z-10 text-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white">
                  Exclusive Banking Partnerships
                </h3>
                <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                  As an authorized partner of UAE's top banks, we provide you access to exclusive rates, 
                  faster approvals, and premium banking services.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-6 md:gap-8 mt-10">
                {[
                  { number: "10+", label: "Partner Banks" },
                  { number: "300+", label: "Financial Products" },
                  { number: "24/7", label: "Customer Support" }
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className="space-y-2 p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-display">
                      {stat.number}
                    </div>
                    <div className="text-white/80 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
