import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
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
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-white/60" />
                <span className="text-white/80">+971 4 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-white/60" />
                <span className="text-white/80">info@finmart.ae</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">{t('footer.services.title')}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.services.creditCards')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.services.personalLoans')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.services.autoLoans')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.services.mortgages')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.services.accounts')}</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">{t('footer.services.business')}</a></li>
            </ul>
          </div>

          {/* Calculators */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Calculators</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Eligibility Calculator</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">EMI Calculator</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Car Loan Calculator</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Home Loan Calculator</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">DBR Calculator</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Interest Calculator</a></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Support</h4>
            <div className="space-y-4">
              <Button 
                size="sm"
                className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('footer.support.whatsapp')}
              </Button>
              
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a></li>
              </ul>

              <div className="flex space-x-3 pt-3">
                <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
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
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                DFSA Regulated
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Central Bank of UAE
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};