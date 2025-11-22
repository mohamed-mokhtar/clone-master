import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export const BlogSection = () => {
  const { t } = useLanguage();
  
  const blogPosts = [
    {
      titleKey: "blog.articles.creditScore.title",
      excerptKey: "blog.articles.creditScore.excerpt",
      date: "2024-12-03",
      readTime: "5 min read",
      category: "Personal Finance",
      gradient: "from-blue-500 to-purple-600",
      link: "/articles/credit-score"
    },
    {
      titleKey: "blog.articles.firstHome.title",
      excerptKey: "blog.articles.firstHome.excerpt",
      date: "2024-12-03", 
      readTime: "7 min read",
      category: "Loan Management",
      gradient: "from-purple-500 to-pink-600",
      link: "/articles/first-home-loan"
    },
    {
      titleKey: "blog.articles.investment.title",
      excerptKey: "blog.articles.investment.excerpt",
      date: "2024-11-27",
      readTime: "6 min read", 
      category: "Credit Cards",
      gradient: "from-teal-500 to-blue-600",
      link: "/articles/investment-tips"
    }
  ];
  return (
    <section id="blog" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('blog.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link key={index} to={post.link}>
                <Card
                  className="overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 group cursor-pointer"
                >
                {/* Featured Image */}
                <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                      {t(post.titleKey)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(post.excerptKey)}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 p-0 h-auto font-semibold"
                  >
                    {t('blog.readMore')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </Card>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link to="/#blog">
              <Button 
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                View All Articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};