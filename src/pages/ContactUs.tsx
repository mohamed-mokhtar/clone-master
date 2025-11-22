import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import appSettings from '@/settings/app-settings.json';
import { useState } from 'react';

export default function ContactUs() {
  const { t } = useLanguage();
  const { toast } = useToast();
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
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
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
              <Card className="p-6 bg-gradient-card border-0 shadow-card">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Quick response on WhatsApp
                    </p>
                    <Button 
                      onClick={handleWhatsApp}
                      className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
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
              <Card className="p-6 bg-gradient-card border-0 shadow-card">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Call us for immediate assistance
                    </p>
                    <a 
                      href={`tel:${appSettings.contact.phone}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {appSettings.contact.phone}
                    </a>
                  </div>
                </div>
              </Card>

              {/* Email Card */}
              <Card className="p-6 bg-gradient-card border-0 shadow-card">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      Send us a detailed message
                    </p>
                    <a 
                      href={`mailto:${appSettings.contact.email}`}
                      className="text-primary hover:underline font-medium break-all"
                    >
                      {appSettings.contact.email}
                    </a>
                  </div>
                </div>
              </Card>

              {/* Location Card */}
              <Card className="p-6 bg-gradient-card border-0 shadow-card">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">Location</h3>
                    <p className="text-muted-foreground text-sm">
                      {appSettings.contact.address}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Business Hours Card */}
              <Card className="p-6 bg-gradient-card border-0 shadow-card">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
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
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
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
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit"
                      className="flex-1 bg-gradient-primary hover:shadow-glow"
                    >
                      Send Message
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handleWhatsApp}
                      className="flex-1"
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

      <Footer />
    </div>
  );
}