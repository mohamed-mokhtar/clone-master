import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CreditScoreArticle() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Link to="/#blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('blog.backToArticles')}
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                Personal Finance
              </span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>03/12/2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {t('blog.articles.creditScore.title')}
            </h1>

            <div className="h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl" />
          </div>

          {/* Article Content */}
          <Card className="p-8 md:p-12 space-y-8 bg-gradient-card border-0 shadow-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('blog.articles.creditScore.excerpt')}
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                What is a Credit Score?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A credit score is a numerical representation of your creditworthiness, typically ranging from 300 to 850. 
                It's calculated based on your credit history, including payment patterns, credit utilization, length of credit history, 
                types of credit accounts, and recent credit inquiries.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Why Your Credit Score Matters
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your credit score plays a crucial role in financial decisions. A higher score can help you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Qualify for lower interest rates on loans and credit cards</li>
                <li>Get approved for higher credit limits</li>
                <li>Secure better terms on mortgages and auto loans</li>
                <li>Access premium financial products and services</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Key Factors Affecting Your Score
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">1. Payment History (35%)</h3>
                  <p className="text-muted-foreground">The most important factor. Always pay bills on time to maintain a strong score.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2. Credit Utilization (30%)</h3>
                  <p className="text-muted-foreground">Keep your credit card balances below 30% of your available credit limit.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3. Credit History Length (15%)</h3>
                  <p className="text-muted-foreground">Longer credit history generally improves your score. Keep old accounts open.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4. Credit Mix (10%)</h3>
                  <p className="text-muted-foreground">Having different types of credit (cards, loans, mortgages) can benefit your score.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">5. New Credit (10%)</h3>
                  <p className="text-muted-foreground">Avoid opening too many accounts in a short period to minimize hard inquiries.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Tips to Improve Your Credit Score
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                <li>Set up automatic payments to never miss a due date</li>
                <li>Keep credit card balances low and pay them off monthly</li>
                <li>Check your credit report regularly for errors</li>
                <li>Don't close old credit card accounts</li>
                <li>Limit new credit applications</li>
                <li>Diversify your credit mix responsibly</li>
              </ol>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
                <p className="text-foreground font-semibold mb-2">Pro Tip:</p>
                <p className="text-muted-foreground">
                  Monitor your credit score regularly using free credit monitoring services. This helps you track improvements 
                  and catch potential issues early.
                </p>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex justify-center pt-8 border-t">
              <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share Article
              </Button>
            </div>
          </Card>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/articles/first-home-loan">
                <Card className="p-6 hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-card border-0">
                  <div className="space-y-3">
                    <span className="text-xs text-primary font-medium">Loan Management</span>
                    <h3 className="text-xl font-bold text-foreground">{t('blog.articles.firstHome.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('blog.articles.firstHome.excerpt')}</p>
                  </div>
                </Card>
              </Link>
              <Link to="/articles/investment-tips">
                <Card className="p-6 hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-card border-0">
                  <div className="space-y-3">
                    <span className="text-xs text-primary font-medium">Credit Cards</span>
                    <h3 className="text-xl font-bold text-foreground">{t('blog.articles.investment.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('blog.articles.investment.excerpt')}</p>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}