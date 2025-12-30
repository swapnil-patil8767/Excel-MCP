import { useEffect, useState } from 'react';
import { CheckCircle, Download, RotateCcw, Trophy, Sparkles, Star, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { API_ENDPOINTS } from '@/config/api';

interface SuccessScreenProps {
  downloadPath: string;
  onReset: () => void;
}

export function SuccessScreen({ downloadPath, onReset }: SuccessScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    const filename = downloadPath.split('/').pop() || '';
    window.open(API_ENDPOINTS.download(filename), '_blank');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <Star className={`w-4 h-4 ${['text-primary', 'text-yellow-400', 'text-green-400', 'text-blue-400'][i % 4]} opacity-60`} />
            </div>
          ))}
        </div>
      )}

      <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl max-w-lg w-full text-center border border-border relative z-10 animate-scale-in">
        {/* Trophy Badge */}
        <div className="relative inline-block mb-6">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          
          {/* Main circle */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
            <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Floating icons */}
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4 text-yellow-900" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-green-400 flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.3s' }}>
            <CheckCircle className="w-3 h-3 text-green-900" />
          </div>
        </div>

        {/* Success Message */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <PartyPopper className="w-6 h-6 text-primary" />
          <h3 className="text-3xl font-bold text-foreground">
            Amazing Work!
          </h3>
          <PartyPopper className="w-6 h-6 text-primary scale-x-[-1]" />
        </div>
        
        <p className="text-lg text-muted-foreground mb-2">
          Your Excel file has been processed successfully
        </p>

        {/* Achievement Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/30 px-4 py-2 rounded-full mb-8">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium text-foreground">Achievement Unlocked: Data Master</span>
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-muted/50 rounded-xl p-3">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
          <div className="bg-muted/50 rounded-xl p-3">
            <div className="text-2xl font-bold text-primary">AI</div>
            <div className="text-xs text-muted-foreground">Powered</div>
          </div>
          <div className="bg-muted/50 rounded-xl p-3">
            <div className="text-2xl font-bold text-primary">Pro</div>
            <div className="text-xs text-muted-foreground">Quality</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleDownload} 
            className="w-full gap-2 shadow-lg hover:shadow-xl transition-all duration-300" 
            size="lg"
          >
            <Download className="w-5 h-5" />
            Download Your File
          </Button>
          
          <Button 
            onClick={onReset} 
            variant="outline" 
            className="w-full gap-2 hover:bg-accent transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            Process Another File
          </Button>
        </div>

        {/* Come back message */}
        <p className="text-sm text-muted-foreground mt-6">
          Come back anytime to process more files. We'll be here! 👋
        </p>
      </div>
    </div>
  );
}
