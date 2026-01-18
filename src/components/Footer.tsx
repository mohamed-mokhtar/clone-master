import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import appSettings from '@/settings/app-settings.json';
import footerBg from '@/assets/footer-fintech.jpg';

export const Footer = () => {
  const { t } = useLanguage();

  const handleWhatsApp = () => {
    const phone = appSettings.contact.whatsapp.replace(/\s+/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={footerBg} 
          alt="" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/95 to-foreground dark:from-background/90 dark:via-background/95 dark:to-background"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Top CTA Section */}
        <div className="mb-16 md:mb-20">
          <div className="bg-gradient-to-r from-primary via-primary-glow to-primary p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-glow">
            {/* Decorative elements inside CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-[60px]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Start Your Journey Today</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-2">
                  Ready to Find Your Perfect Financial Solution?
                </h3>
                <p className="text-white/80 max-w-xl">
                  Compare rates from 15+ UAE banks and get personalized recommendations in minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/personal-loan-list">
                  <Button 
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Compare Now
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button 
                  onClick={handleWhatsApp}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold px-8 rounded-xl transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat With Us
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Company Info */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white dark:text-foreground">{t('footer.company.title')}</h3>
              <p className="text-white/70 dark:text-muted-foreground text-sm leading-relaxed max-w-xs">
                {t('footer.company.description')}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm group">
                <div className="p-2 bg-white/10 dark:bg-muted rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-4 h-4 text-white/80 dark:text-foreground" />
                </div>
                <span className="text-white/70 dark:text-muted-foreground group-hover:text-white dark:group-hover:text-foreground transition-colors">Dubai, United Arab Emirates</span>
              </div>
              <a href={`tel:${appSettings.contact.phone}`} className="flex items-center gap-3 text-sm group">
                <div className="p-2 bg-white/10 dark:bg-muted rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-white/80 dark:text-foreground" />
                </div>
                <span className="text-white/70 dark:text-muted-foreground group-hover:text-white dark:group-hover:text-foreground transition-colors">{appSettings.contact.phone}</span>
              </a>
              <a href={`mailto:${appSettings.contact.email}`} className="flex items-center gap-3 text-sm group">
                <div className="p-2 bg-white/10 dark:bg-muted rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-white/80 dark:text-foreground" />
                </div>
                <span className="text-white/70 dark:text-muted-foreground group-hover:text-white dark:group-hover:text-foreground transition-colors">{appSettings.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white dark:text-foreground">{t('footer.services.title')}</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: t('footer.services.creditCards'), section: 'services' },
                { label: t('footer.services.personalLoans'), section: 'services' },
                { label: t('footer.services.autoLoans'), section: 'services' },
                { label: t('footer.services.mortgages'), section: 'services' },
                { label: t('footer.services.accounts'), section: 'services' },
                { label: t('footer.services.business'), section: 'services' },
              ].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(item.section)} 
                    className="text-white/60 dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors duration-300 text-left flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors"></span>
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculators */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white dark:text-foreground">{t('footer.calculators.title')}</h4>
            <ul className="space-y-3 text-sm">
              {[
                t('footer.calculators.eligibility'),
                t('footer.calculators.emi'),
                t('footer.calculators.carLoan'),
                t('footer.calculators.homeLoan'),
                t('footer.calculators.dbr'),
                t('footer.calculators.interest'),
              ].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection('calculators')} 
                    className="text-white/60 dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors duration-300 text-left flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 mr-2 group-hover:bg-secondary transition-colors"></span>
                    {item}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white dark:text-foreground">{t('footer.support.title')}</h4>
            <div className="space-y-5">
              <Button 
                onClick={handleWhatsApp}
                size="default"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500 transition-all duration-300 hover:shadow-lg font-semibold rounded-xl"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('footer.support.whatsapp')}
              </Button>
              
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/contact" className="text-white/60 dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors duration-300 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mr-2 group-hover:bg-accent transition-colors"></span>
                    Contact Us
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-white/60 dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors text-left flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mr-2 group-hover:bg-accent transition-colors"></span>
                    {t('footer.support.about')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-white/60 dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors text-left flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mr-2 group-hover:bg-accent transition-colors"></span>
                    {t('footer.support.privacy')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-white/60 dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors text-left flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mr-2 group-hover:bg-accent transition-colors"></span>
                    {t('footer.support.terms')}
                  </button>
                </li>
              </ul>

              {/* Social Links */}
              <div className="flex gap-2 pt-2">
                {[
                  { icon: Facebook, href: appSettings.social.facebook },
                  { icon: Twitter, href: appSettings.social.twitter },
                  { icon: Instagram, href: appSettings.social.instagram },
                  { icon: Linkedin, href: appSettings.social.linkedin },
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 bg-white/10 dark:bg-muted rounded-xl hover:bg-primary/30 dark:hover:bg-primary/20 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  >
                    <social.icon className="w-4 h-4 text-white dark:text-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 dark:border-border mt-14 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <p className="text-white/50 dark:text-muted-foreground text-sm">
                © {new Date().getFullYear()} Fingate. All rights reserved.
              </p>
            </div>
            <p className="text-white/50 dark:text-muted-foreground text-sm text-center md:text-right">
              {t('footer.legal.selfManaged')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
