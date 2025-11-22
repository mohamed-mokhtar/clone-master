import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function FirstHomeLoanArticle() {
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
                Loan Management
              </span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>03/12/2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>7 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {t('blog.articles.firstHome.title')}
            </h1>

            <div className="h-96 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl" />
          </div>

          {/* Article Content */}
          <Card className="p-8 md:p-12 space-y-8 bg-gradient-card border-0 shadow-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('blog.articles.firstHome.excerpt')}
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Understanding Home Loans
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A home loan, or mortgage, is a substantial financial commitment that allows you to purchase property without paying 
                the full amount upfront. Understanding the basics will help you make an informed decision and secure the best deal.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Types of Home Loans in UAE
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">1. Fixed Rate Mortgage</h3>
                  <p className="text-muted-foreground">Interest rate remains constant throughout the loan tenure, providing stability in monthly payments.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2. Variable Rate Mortgage</h3>
                  <p className="text-muted-foreground">Interest rate fluctuates based on market conditions, potentially offering lower initial rates.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3. Islamic Home Finance</h3>
                  <p className="text-muted-foreground">Sharia-compliant financing options that follow Islamic banking principles without traditional interest.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Pre-Approval Process
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                <li>Check your credit score and financial health</li>
                <li>Gather necessary documents (salary certificates, bank statements, ID copies)</li>
                <li>Submit pre-approval application to multiple lenders</li>
                <li>Compare offers and interest rates</li>
                <li>Choose the best lender for your needs</li>
              </ol>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Key Factors to Consider
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Down Payment:</strong> Typically 20-25% for UAE nationals, 15-20% for expats</li>
                <li><strong>Interest Rate:</strong> Compare fixed vs variable rates based on your financial goals</li>
                <li><strong>Loan Tenure:</strong> Usually 15-25 years; longer tenure means lower EMI but higher total interest</li>
                <li><strong>Processing Fees:</strong> Can range from 0.5% to 2% of the loan amount</li>
                <li><strong>Early Settlement Charges:</strong> Some banks charge penalties for early loan closure</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Required Documents
              </h2>
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">For Salaried Individuals:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Valid passport and visa copies</li>
                  <li>Emirates ID</li>
                  <li>Salary certificate</li>
                  <li>Last 6 months' bank statements</li>
                  <li>Property documents</li>
                </ul>
                <h3 className="font-semibold text-foreground mb-3 mt-4">For Self-Employed:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Trade license</li>
                  <li>Business financial statements (2-3 years)</li>
                  <li>Bank statements (12 months)</li>
                  <li>Memorandum of Association</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Tips for First-Time Buyers
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                <li>Start saving for down payment early</li>
                <li>Improve your credit score before applying</li>
                <li>Get pre-approved to understand your budget</li>
                <li>Factor in additional costs (registration, insurance, maintenance)</li>
                <li>Don't overextend - keep monthly payments under 40% of income</li>
                <li>Consider future financial commitments and life changes</li>
                <li>Work with a mortgage broker for better deals</li>
              </ol>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
                <p className="text-foreground font-semibold mb-2">Expert Advice:</p>
                <p className="text-muted-foreground">
                  Take time to research and compare offers from multiple banks. A difference of even 0.25% in interest rate 
                  can save you thousands of dirhams over the loan tenure. Consider using our home loan calculator to estimate 
                  your monthly payments and total interest.
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
              <Link to="/articles/credit-score">
                <Card className="p-6 hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-card border-0">
                  <div className="space-y-3">
                    <span className="text-xs text-primary font-medium">Personal Finance</span>
                    <h3 className="text-xl font-bold text-foreground">{t('blog.articles.creditScore.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('blog.articles.creditScore.excerpt')}</p>
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