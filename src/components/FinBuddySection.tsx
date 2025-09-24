import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot, Sparkles } from 'lucide-react';
import finbuddyAvatar from '@/assets/finbuddy-avatar.png';

export const FinBuddySection = () => {
  return (
    <section className="py-16 bg-gradient-accent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-white/10 backdrop-blur-sm border-0 shadow-glow">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6 text-center md:text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start space-x-3">
                    <div className="p-2 bg-white/20 rounded-full">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      Say hello to FinBuddy
                    </h2>
                    <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                  </div>
                  
                  <p className="text-lg text-white/90 leading-relaxed">
                    your AI sidekick from Finmart. Quick, automated banking support—just a WhatsApp chat away!
                  </p>
                </div>

                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white shadow-glow border-0 transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with FinBuddy
                </Button>

                <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-white/80">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Available 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                    <span>Instant Responses</span>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="relative z-10 w-48 h-48 rounded-full overflow-hidden bg-gradient-primary p-1">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <img
                        src={finbuddyAvatar}
                        alt="FinBuddy AI Assistant"
                        className="w-40 h-40 object-cover rounded-full"
                      />
                    </div>
                  </div>
                  {/* Floating Chat Bubbles */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-lg animate-bounce delay-300">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-2 shadow-lg animate-pulse delay-700">
                    <span className="text-xs font-semibold text-primary">Hello!</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};