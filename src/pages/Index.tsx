import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FinBuddySection } from '@/components/FinBuddySection';
import { CalculatorsSection } from '@/components/CalculatorsSection';
import { TrustSection } from '@/components/TrustSection';
import { BankingPartners } from '@/components/BankingPartners';
import { BlogSection } from '@/components/BlogSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FinBuddySection />
        <CalculatorsSection />
        <TrustSection />
        <BankingPartners />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
