import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FinBuddySection } from '@/components/FinBuddySection';
import { CalculatorsSection } from '@/components/CalculatorsSection';
import { TrustSection } from '@/components/TrustSection';
import { BankingPartners } from '@/components/BankingPartners';
import { BlogSection } from '@/components/BlogSection';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <section id="services">
          <TrustSection />
          <BankingPartners />
        </section>
        <FinBuddySection />
        <CalculatorsSection />
        <BlogSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
