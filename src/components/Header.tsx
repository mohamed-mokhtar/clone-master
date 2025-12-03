import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import appSettings from '@/settings/app-settings.json';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Check if we're on the home page
    if (window.location.pathname !== '/') {
      // Navigate to home page with hash
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleWhatsApp = () => {
    const phone = appSettings.contact.whatsapp.replace(/\s+/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <header 
      className={`w-full sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-card/90 backdrop-blur-xl shadow-soft border-b border-border/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-18 md:h-20 flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="text-2xl md:text-3xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105">
            {t('app.name')}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {[
            { label: t('header.services'), action: () => scrollToSection('services') },
            { label: t('header.calculators'), action: () => scrollToSection('calculators') },
            { label: t('header.personalLoan'), to: '/personal-loan-list' },
            { label: t('header.aboutUs'), action: () => scrollToSection('about') },
            { label: t('header.blog'), action: () => scrollToSection('blog') },
            { label: t('contact.title'), to: '/contact' },
          ].map((item, index) => (
            item.to ? (
              <Link 
                key={index}
                to={item.to} 
                className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {item.label}
              </Link>
            ) : (
              <button 
                key={index}
                onClick={item.action} 
                className="text-foreground/80 hover:text-primary font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {item.label}
              </button>
            )
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          
          <Button 
            onClick={handleWhatsApp}
            variant="outline" 
            size="sm" 
            className="hidden md:flex items-center space-x-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-glow"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden lg:inline">{t('header.whatsapp')}</span>
          </Button>
          
          <Link to="/contact">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105 font-semibold"
            >
              {t('contact.title')}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden hover:bg-primary/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-bounce-in ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-6 bg-card/95 backdrop-blur-xl border-t border-border/50 flex flex-col space-y-4">
          {[
            { label: t('header.services'), action: () => scrollToSection('services') },
            { label: t('header.calculators'), action: () => scrollToSection('calculators') },
            { label: t('header.personalLoan'), to: '/personal-loan-list' },
            { label: t('header.aboutUs'), action: () => scrollToSection('about') },
            { label: t('header.blog'), action: () => scrollToSection('blog') },
            { label: t('contact.title'), to: '/contact' },
          ].map((item, index) => (
            item.to ? (
              <Link 
                key={index}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground/80 hover:text-primary transition-colors text-lg font-medium py-2 border-b border-border/30"
              >
                {item.label}
              </Link>
            ) : (
              <button 
                key={index}
                onClick={item.action}
                className="text-foreground/80 hover:text-primary transition-colors text-left text-lg font-medium py-2 border-b border-border/30"
              >
                {item.label}
              </button>
            )
          ))}
          <Button 
            onClick={handleWhatsApp}
            variant="outline" 
            size="lg" 
            className="w-full flex items-center justify-center space-x-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground mt-4"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t('header.whatsappSupport')}</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};
