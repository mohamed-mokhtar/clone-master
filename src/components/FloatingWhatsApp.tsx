import { MessageCircle } from 'lucide-react';
import appSettings from '@/settings/app-settings.json';

export const FloatingWhatsApp = () => {
  const handleWhatsApp = () => {
    const phone = appSettings.contact.whatsapp.replace(/\s+/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 animate-fade-in"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <span className="w-2 h-2 bg-white rounded-full"></span>
      </span>
    </button>
  );
};
