import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const bankLogos = [
  { name: "Emirates NBD", color: "#00B04F" },
  { name: "Dubai Islamic Bank", color: "#0066CC" }, 
  { name: "ADCB", color: "#E31E24" },
  { name: "FAB", color: "#FF6B35" },
  { name: "HSBC", color: "#DB0011" },
  { name: "Standard Chartered", color: "#0F6B41" }
];

export const BankingPartners = () => {
  const { t } = useLanguage();
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('partners.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('partners.subtitle')}
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {bankLogos.map((bank, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-center h-16">
                  <div 
                    className="w-full h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm text-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: bank.color }}
                  >
                    {bank.name}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Partner Benefits */}
          <div className="bg-gradient-accent rounded-3xl p-8 md:p-12">
            <div className="text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Exclusive Banking Partnerships
              </h3>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                As an authorized partner of UAE's top banks, we provide you access to exclusive rates, 
                faster approvals, and premium banking services.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">10+</div>
                  <div className="text-white/80">Partner Banks</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">300+</div>
                  <div className="text-white/80">Financial Products</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-white/80">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};