import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function InvestmentTipsArticle() {
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
                Credit Cards
              </span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>27/11/2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>6 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {t('blog.articles.investment.title')}
            </h1>

            <div className="h-96 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl" />
          </div>

          {/* Article Content */}
          <Card className="p-8 md:p-12 space-y-8 bg-gradient-card border-0 shadow-card">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('blog.articles.investment.excerpt')}
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Understanding Credit Card Rewards
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Credit cards offer various rewards programs that can help you save money and earn benefits on everyday purchases. 
                Understanding how to maximize these rewards is key to getting the most value from your cards.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Types of Credit Card Rewards
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">1. Cashback Cards</h3>
                  <p className="text-muted-foreground">Earn a percentage (typically 1-5%) back on purchases. Best for consistent spending in specific categories.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">2. Points-Based Rewards</h3>
                  <p className="text-muted-foreground">Accumulate points that can be redeemed for travel, merchandise, or statement credits.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">3. Miles Programs</h3>
                  <p className="text-muted-foreground">Earn airline miles for every dirham spent. Ideal for frequent travelers.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">4. Lifestyle Rewards</h3>
                  <p className="text-muted-foreground">Special perks like airport lounge access, dining privileges, and hotel benefits.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Maximizing Your Credit Card Benefits
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Use the right card for each purchase:</strong> Match spending categories to cards with highest rewards rates</li>
                <li><strong>Pay in full each month:</strong> Interest charges quickly negate any rewards earned</li>
                <li><strong>Take advantage of sign-up bonuses:</strong> Can be worth hundreds or thousands of points</li>
                <li><strong>Monitor promotional offers:</strong> Banks often run limited-time bonus categories</li>
                <li><strong>Combine with merchant offers:</strong> Stack credit card rewards with store loyalty programs</li>
                <li><strong>Don't overspend for rewards:</strong> Only makes sense if you would make the purchase anyway</li>
              </ol>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Smart Credit Card Strategies
              </h2>
              <div className="space-y-4">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Category Strategy</h3>
                  <p className="text-muted-foreground">
                    Use different cards for different spending categories. For example, one card for dining (4% cashback), 
                    another for fuel (3% cashback), and a third for all other purchases (1.5% cashback).
                  </p>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Annual Fee Optimization</h3>
                  <p className="text-muted-foreground">
                    Calculate whether the rewards you'll earn justify any annual fees. Premium cards with higher fees often 
                    provide superior benefits if you use them actively.
                  </p>
                </div>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Points Redemption Timing</h3>
                  <p className="text-muted-foreground">
                    Wait for special redemption offers when points are worth more. Some cards offer 20-30% bonus value 
                    during promotional periods.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Common Mistakes to Avoid
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Carrying a balance to earn rewards (interest negates benefits)</li>
                <li>Applying for too many cards at once (hurts credit score)</li>
                <li>Ignoring expiration dates on points and miles</li>
                <li>Not reading the terms and conditions of reward programs</li>
                <li>Overspending to reach minimum spending requirements</li>
                <li>Using cards with foreign transaction fees when traveling</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                Best Practices for UAE Credit Card Users
              </h2>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  <strong>1. Leverage Zero-Cost EMI:</strong> Many UAE banks offer interest-free installment plans for large purchases. 
                  This can help manage cash flow without losing reward benefits.
                </p>
                <p className="text-muted-foreground">
                  <strong>2. Utilize Airport Lounge Access:</strong> If your card offers lounge access, use it. The value can 
                  easily exceed the annual fee for frequent travelers.
                </p>
                <p className="text-muted-foreground">
                  <strong>3. Coordinate with Utility Payments:</strong> Set up automatic bill payments through your rewards card 
                  to earn points on regular expenses.
                </p>
                <p className="text-muted-foreground">
                  <strong>4. Watch for Regional Partnerships:</strong> UAE banks often partner with local retailers, hotels, 
                  and airlines for enhanced rewards.
                </p>
              </div>

              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
                <p className="text-foreground font-semibold mb-2">Pro Tip:</p>
                <p className="text-muted-foreground">
                  Create a spreadsheet to track all your credit cards, their reward rates, annual fees, and expiration dates 
                  for points. This helps you strategically plan purchases and maximize value throughout the year.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                When to Consider Premium Cards
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Premium credit cards with higher annual fees (AED 1,500 - 5,000+) can be worthwhile if you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Spend more than AED 20,000 monthly on the card</li>
                <li>Travel frequently and value lounge access and concierge services</li>
                <li>Can take advantage of complimentary hotel nights and upgrades</li>
                <li>Want comprehensive travel insurance coverage</li>
                <li>Use the included lifestyle benefits (golf, spa, dining)</li>
              </ul>
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
              <Link to="/articles/first-home-loan">
                <Card className="p-6 hover:shadow-elegant transition-all duration-300 cursor-pointer bg-gradient-card border-0">
                  <div className="space-y-3">
                    <span className="text-xs text-primary font-medium">Loan Management</span>
                    <h3 className="text-xl font-bold text-foreground">{t('blog.articles.firstHome.title')}</h3>
                    <p className="text-sm text-muted-foreground">{t('blog.articles.firstHome.excerpt')}</p>
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