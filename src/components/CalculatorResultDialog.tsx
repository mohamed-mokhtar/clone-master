import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, TrendingUp, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface CalculatorResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  results: ResultItem[];
  status?: {
    type: 'success' | 'warning' | 'error';
    message: string;
  };
}

export const CalculatorResultDialog = ({ 
  open, 
  onOpenChange, 
  title, 
  results,
  status
}: CalculatorResultDialogProps) => {
  const { t } = useLanguage();
  
  const getStatusColor = () => {
    if (!status) return '';
    switch (status.type) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-amber-600 bg-amber-50';
      case 'error': return 'text-red-600 bg-red-50';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-primary p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-primary-foreground">
              {title}
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80">
              Your calculation results are ready
            </DialogDescription>
          </DialogHeader>
        </div>
        
        {/* Results */}
        <div className="p-6 space-y-4">
          {status && (
            <div className={`rounded-xl p-4 flex items-center gap-3 ${getStatusColor()}`}>
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">{status.message}</span>
            </div>
          )}
          
          <div className="space-y-3">
            {results.map((result, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                  result.highlight 
                    ? 'bg-primary/10 border-2 border-primary/20' 
                    : 'bg-muted/50'
                }`}
              >
                <span className="text-muted-foreground font-medium">{result.label}</span>
                <span className={`font-bold ${result.highlight ? 'text-primary text-xl' : 'text-foreground text-lg'}`}>
                  {result.value}
                </span>
              </div>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Calculate Again
            </Button>
            <Link to="/contact" className="flex-1">
              <Button className="w-full bg-gradient-primary hover:shadow-glow group">
                Get Expert Advice
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
