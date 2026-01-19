import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import appSettings from '@/settings/app-settings.json';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Calculate scroll progress for the first 100px
      const progress = Math.min(scrollY / 100, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
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

  const navItems = [
    { label: t('header.services'), action: () => scrollToSection('services') },
    { label: t('header.calculators'), action: () => scrollToSection('calculators') },
    { label: t('header.personalLoan'), to: '/personal-loan-list' },
    { label: t('header.aboutUs'), action: () => scrollToSection('about') },
    { label: t('header.blog'), action: () => scrollToSection('blog') },
    { label: t('contact.title'), to: '/contact' },
  ];

  return (
    <>
      {/* Spacer to prevent content jump */}
      <div className="h-20 md:h-24" />
      
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Floating container with dynamic sizing */}
        <div 
          className="mx-auto transition-all duration-500 ease-out"
          style={{
            maxWidth: isScrolled ? 'calc(100% - 2rem)' : '100%',
            padding: isScrolled ? '0.5rem' : '0',
            marginTop: isScrolled ? '0.5rem' : '0',
          }}
        >
          <div 
            className={`transition-all duration-500 ease-out ${
              isScrolled 
                ? 'mx-auto max-w-6xl rounded-2xl border border-border/40 shadow-elegant' 
                : ''
            }`}
            style={{
              background: isScrolled 
                ? `linear-gradient(135deg, 
                    hsl(var(--card) / ${0.7 + scrollProgress * 0.25}), 
                    hsl(var(--card) / ${0.6 + scrollProgress * 0.3}))`
                : 'transparent',
              backdropFilter: isScrolled ? `blur(${12 + scrollProgress * 8}px)` : 'none',
              WebkitBackdropFilter: isScrolled ? `blur(${12 + scrollProgress * 8}px)` : 'none',
            }}
          >
            {/* Inner glow effect when scrolled */}
            {isScrolled && (
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>
            )}

            <div className="container mx-auto px-4 md:px-6 h-16 md:h-18 flex items-center justify-between relative">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group relative z-10">
                <motion.div 
                  className="text-2xl md:text-3xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {t('app.name')}
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center gap-0.5">
                {navItems.map((item, index) => (
                  item.to ? (
                    <Link 
                      key={index}
                      to={item.to} 
                      className="relative px-3 py-2 text-foreground/70 hover:text-foreground text-sm font-medium transition-all duration-300 rounded-lg group whitespace-nowrap"
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.div 
                        className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                    </Link>
                  ) : (
                    <button 
                      key={index}
                      onClick={item.action} 
                      className="relative px-3 py-2 text-foreground/70 hover:text-foreground text-sm font-medium transition-all duration-300 rounded-lg group whitespace-nowrap"
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.div 
                        className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                    </button>
                  )
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 md:gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={handleWhatsApp}
                    variant="outline" 
                    size="sm" 
                    className="hidden md:flex items-center gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-xl"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden lg:inline">{t('header.whatsapp')}</span>
                  </Button>
                </motion.div>
                
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold rounded-xl"
                    >
                      {t('contact.title')}
                    </Button>
                  </motion.div>
                </Link>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="xl:hidden hover:bg-primary/10 rounded-xl"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="xl:hidden absolute top-full left-0 right-0 mt-2 mx-4"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <nav className="p-4 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-elegant flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  item.to ? (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link 
                        to={item.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all text-lg font-medium py-3 px-4 rounded-xl"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button 
                        onClick={item.action}
                        className="w-full text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all text-left text-lg font-medium py-3 px-4 rounded-xl"
                      >
                        {item.label}
                      </button>
                    </motion.div>
                  )
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2"
                >
                  <Button 
                    onClick={handleWhatsApp}
                    variant="outline" 
                    size="lg" 
                    className="w-full flex items-center justify-center gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{t('header.whatsappSupport')}</span>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
