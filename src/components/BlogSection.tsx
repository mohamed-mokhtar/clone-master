import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
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
      gradient: "from-emerald-500 to-teal-600",
      icon: "💳",
      link: "/articles/credit-score"
    },
    {
      titleKey: "blog.articles.firstHome.title",
      excerptKey: "blog.articles.firstHome.excerpt",
      date: "2024-12-03", 
      readTime: "7 min read",
      category: "Loan Management",
      gradient: "from-teal-500 to-cyan-600",
      icon: "🏠",
      link: "/articles/first-home-loan"
    },
    {
      titleKey: "blog.articles.investment.title",
      excerptKey: "blog.articles.investment.excerpt",
      date: "2024-11-27",
      readTime: "6 min read", 
      category: "Investment",
      gradient: "from-cyan-500 to-blue-600",
      icon: "📈",
      link: "/articles/investment-tips"
    }
  ];

  return (
    <section id="blog" className="py-20 md:py-28 bg-muted/40 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="space-y-12 md:space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Financial Insights</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
              {t('blog.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <Link key={index} to={post.link} className="group">
                <Card
                  className="overflow-hidden bg-card border-0 shadow-card hover:shadow-elegant transition-all duration-500 group-hover:-translate-y-2 h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Featured Image */}
                  <div className={`h-48 md:h-56 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/25 backdrop-blur-md text-white text-xs px-4 py-1.5 rounded-full font-semibold tracking-wide">
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <span className="text-4xl">{post.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7 space-y-4 flex flex-col flex-grow">
                    {/* Meta Info */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title & Excerpt */}
                    <div className="space-y-3 flex-grow">
                      <h3 className="text-xl md:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                        {t(post.titleKey)}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                        {t(post.excerptKey)}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <div className="pt-2">
                      <span className="inline-flex items-center text-primary font-semibold group-hover:text-primary-dark transition-colors duration-300">
                        {t('blog.readMore')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </div>
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
                className="bg-gradient-primary hover:shadow-glow transition-all duration-500 hover:scale-105 font-semibold px-8 group"
              >
                View All Articles
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
