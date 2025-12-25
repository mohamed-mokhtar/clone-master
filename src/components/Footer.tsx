import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
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
    <footer className="bg-gradient-accent text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Company Info */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-display font-bold">{t('footer.company.title')}</h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-xs">
                {t('footer.company.description')}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm group">
                <MapPin className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">Dubai, United Arab Emirates</span>
              </div>
              <a href={`tel:${appSettings.contact.phone}`} className="flex items-center space-x-3 text-sm group hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">{appSettings.contact.phone}</span>
              </a>
              <a href={`mailto:${appSettings.contact.email}`} className="flex items-center space-x-3 text-sm group hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                <span className="text-white/80 group-hover:text-white transition-colors">{appSettings.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">{t('footer.services.title')}</h4>
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
                    className="text-white/70 hover:text-white transition-colors duration-300 text-left flex items-center group"
                  >
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculators */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">{t('footer.calculators.title')}</h4>
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
                    className="text-white/70 hover:text-white transition-colors duration-300 text-left flex items-center group"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">{t('footer.support.title')}</h4>
            <div className="space-y-5">
              <Button 
                onClick={handleWhatsApp}
                size="default"
                className="w-full bg-green-500 hover:bg-green-400 transition-all duration-300 hover:shadow-lg font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('footer.support.whatsapp')}
              </Button>
              
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/contact" className="text-white/70 hover:text-white transition-colors duration-300 flex items-center group">
                    Contact Us
                    <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-white/70 hover:text-white transition-colors text-left">
                    {t('footer.support.about')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-white/70 hover:text-white transition-colors text-left">
                    {t('footer.support.privacy')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-white/70 hover:text-white transition-colors text-left">
                    {t('footer.support.terms')}
                  </button>
                </li>
              </ul>

              {/* Social Links */}
              <div className="flex space-x-3 pt-2">
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
                    className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 mt-14 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Fingate. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-white/60">{t('footer.legal.dfsa')}</span>
              <span className="text-white/60">{t('footer.legal.regulated')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
