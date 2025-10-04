import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import appSettings from '@/settings/app-settings.json';

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
    <footer className="bg-gradient-accent text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">{t('footer.company.title')}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('footer.company.description')}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-white/60" />
                <span className="text-white/80">Dubai, United Arab Emirates</span>
              </div>
              <a href={`tel:${appSettings.contact.phone}`} className="flex items-center space-x-3 text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-white/60" />
                <span className="text-white/80">{appSettings.contact.phone}</span>
              </a>
              <a href={`mailto:${appSettings.contact.email}`} className="flex items-center space-x-3 text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-white/60" />
                <span className="text-white/80">{appSettings.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">{t('footer.services.title')}</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => scrollToSection('services')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.services.creditCards')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.services.personalLoans')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.services.autoLoans')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.services.mortgages')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.services.accounts')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.services.business')}</button></li>
            </ul>
          </div>

          {/* Calculators */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">{t('footer.calculators.title')}</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => scrollToSection('calculators')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.calculators.eligibility')}</button></li>
              <li><button onClick={() => scrollToSection('calculators')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.calculators.emi')}</button></li>
              <li><button onClick={() => scrollToSection('calculators')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.calculators.carLoan')}</button></li>
              <li><button onClick={() => scrollToSection('calculators')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.calculators.homeLoan')}</button></li>
              <li><button onClick={() => scrollToSection('calculators')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.calculators.dbr')}</button></li>
              <li><button onClick={() => scrollToSection('calculators')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.calculators.interest')}</button></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">{t('footer.support.title')}</h4>
            <div className="space-y-4">
              <Button 
                onClick={handleWhatsApp}
                size="sm"
                className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('footer.support.whatsapp')}
              </Button>
              
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => scrollToSection('finbuddy')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.support.helpCenter')}</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.support.privacy')}</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.support.terms')}</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-white transition-colors text-left">{t('footer.support.about')}</button></li>
              </ul>

              <div className="flex space-x-3 pt-3">
                <a href={appSettings.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={appSettings.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={appSettings.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href={appSettings.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/60 text-sm">
                {t('footer.legal.copyright')}
              </p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-white/60">
                {t('footer.legal.dfsa')}
              </span>
              <span className="text-white/60">
                {t('footer.legal.regulated')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};