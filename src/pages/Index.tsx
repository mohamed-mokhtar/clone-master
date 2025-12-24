import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CalculatorsSection } from '@/components/CalculatorsSection';
import { TrustSection } from '@/components/TrustSection';
import { BankingPartners } from '@/components/BankingPartners';
import { BlogSection } from '@/components/BlogSection';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { SEOHead } from '@/components/SEOHead';
import { StructuredData } from '@/components/StructuredData';

const homepageFAQs = [
  {
    question: 'What is the best personal loan rate in UAE?',
    answer: 'The best personal loan rates in UAE range from 3.99% to 7.99% depending on the bank and your salary. Top banks like Emirates NBD, ADCB, and FAB offer competitive rates. Use Fingate to compare all options instantly.'
  },
  {
    question: 'How can I compare credit cards in UAE?',
    answer: 'Fingate allows you to compare credit cards from all major UAE banks including Emirates NBD, ADCB, FAB, HSBC, and Standard Chartered. Compare rewards, cashback, annual fees, and benefits side by side.'
  },
  {
    question: 'What documents do I need for a loan in UAE?',
    answer: 'Typically you need: Emirates ID, passport copy, salary certificate, bank statements (3-6 months), and proof of residence. Requirements vary by bank and loan type.'
  },
  {
    question: 'How long does loan approval take in UAE?',
    answer: 'Most UAE banks offer instant pre-approval. Final approval typically takes 1-3 business days. Some banks offer same-day disbursement for eligible customers.'
  },
  {
    question: 'Can expats get personal loans in UAE?',
    answer: 'Yes, expats can get personal loans in UAE. Most banks require a minimum salary of AED 5,000-10,000 and at least 6 months of employment in UAE.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        canonicalUrl="https://fingate.ae/"
      />
      <StructuredData type="Organization" />
      <StructuredData type="WebSite" />
      <StructuredData type="FinancialService" />
      <StructuredData type="FAQPage" data={homepageFAQs} />
      
      <Header />
      <main role="main" itemScope itemType="https://schema.org/WebPage">
        <HeroSection />
        <section id="services" aria-label="Our Services">
          <TrustSection />
          <BankingPartners />
        </section>
        <CalculatorsSection />
        <BlogSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
