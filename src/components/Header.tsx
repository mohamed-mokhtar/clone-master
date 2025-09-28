import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="w-full bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('app.name')}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-foreground hover:text-primary transition-colors">
            {t('header.services')}
          </a>
          <a href="#calculators" className="text-foreground hover:text-primary transition-colors">
            {t('header.calculators')}
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            {t('header.aboutUs')}
          </a>
          <a href="#blog" className="text-foreground hover:text-primary transition-colors">
            {t('header.blog')}
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          
          <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            <MessageCircle className="w-4 h-4" />
            <span>{t('header.whatsapp')}</span>
          </Button>
          
          <Button variant="default" size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            {t('header.signup')}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-card/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              {t('header.services')}
            </a>
            <a href="#calculators" className="text-foreground hover:text-primary transition-colors">
              {t('header.calculators')}
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              {t('header.aboutUs')}
            </a>
            <a href="#blog" className="text-foreground hover:text-primary transition-colors">
              {t('header.blog')}
            </a>
            <Button variant="outline" size="sm" className="w-fit flex items-center space-x-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{t('header.whatsappSupport')}</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};