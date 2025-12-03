import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle2, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import appSettings from '@/settings/app-settings.json';
import { useState } from 'react';

export default function ContactUs() {
  const { t } = useLanguage();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleWhatsApp = () => {
    const phoneNumber = appSettings.contact.whatsapp.replace(/\s/g, '');
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a backend
    setSuccessDialogOpen(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* WhatsApp Card */}
              <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{t('contact.whatsapp')}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Quick response on WhatsApp
                    </p>
                    <Button 
                      onClick={handleWhatsApp}
                      className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white hover:shadow-glow transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </Button>
                    <p className="text-sm text-center text-muted-foreground mt-2">
                      {appSettings.contact.whatsapp}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Phone Card */}
              <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{t('contact.phone')}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Call us for immediate assistance
                    </p>
                    <a 
                      href={`tel:${appSettings.contact.phone}`}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      {appSettings.contact.phone}
                    </a>
                  </div>
                </div>
              </Card>

              {/* Email Card */}
              <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{t('contact.email')}</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Send us a detailed message
                    </p>
                    <a 
                      href={`mailto:${appSettings.contact.email}`}
                      className="text-primary hover:text-primary/80 font-medium break-all transition-colors"
                    >
                      {appSettings.contact.email}
                    </a>
                  </div>
                </div>
              </Card>

              {/* Location Card */}
              <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{t('contact.location')}</h3>
                    <p className="text-muted-foreground text-sm">
                      {appSettings.contact.address}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Business Hours Card */}
              <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{t('contact.businessHours')}</h3>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <p>Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Friday: Closed</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-gradient-card border-0 shadow-card">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="transition-all duration-300 focus:shadow-soft"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="transition-all duration-300 focus:shadow-soft"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567"
                        required
                        className="transition-all duration-300 focus:shadow-soft"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                        className="transition-all duration-300 focus:shadow-soft"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                      className="transition-all duration-300 focus:shadow-soft resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit"
                      className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
                    >
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handleWhatsApp}
                      className="flex-1 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Instead
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    * Required fields. We'll respond within 24 hours.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
          <div className="bg-gradient-primary p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display text-primary-foreground mb-2">
                Message Sent Successfully!
              </DialogTitle>
              <DialogDescription className="text-primary-foreground/80">
                Thank you for reaching out to us.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-center text-muted-foreground">
              Our team will review your message and get back to you within 24 hours. 
              For urgent matters, please contact us via WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setSuccessDialogOpen(false)}
              >
                Close
              </Button>
              <Button 
                className="flex-1 bg-gradient-primary hover:shadow-glow"
                onClick={() => {
                  setSuccessDialogOpen(false);
                  handleWhatsApp();
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
