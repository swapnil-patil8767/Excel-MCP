import { useEffect, useState } from 'react';
import { FileSpreadsheet, Sparkles, BarChart3, Table2, Upload, CheckCircle2 } from 'lucide-react';

interface ProcessingScreenProps {
  status?: string;
}

const processingSteps = [
  { icon: Upload, text: 'Uploading your file...', subtext: 'Securely transferring data' },
  { icon: Table2, text: 'Reading Excel data...', subtext: 'Parsing rows and columns' },
  { icon: Sparkles, text: 'AI analyzing your data...', subtext: 'Understanding data patterns' },
  { icon: FileSpreadsheet, text: 'Cleaning and formatting...', subtext: 'Optimizing data structure' },
  { icon: BarChart3, text: 'Creating visualizations...', subtext: 'Building charts and graphs' },
  { icon: CheckCircle2, text: 'Finalizing your file...', subtext: 'Preparing for download' },
];

export function ProcessingScreen({ status = 'Processing your file...' }: ProcessingScreenProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 5;
      });
    }, 400);

    // Step rotation
    const stepTimer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentStepIndex(prev => (prev + 1) % processingSteps.length);
        setIsFlipping(false);
      }, 300);
    }, 3000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, []);

  const currentStep = processingSteps[currentStepIndex];
  const CurrentIcon = currentStep.icon;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl max-w-lg w-full border border-border">
        {/* Animated Boxes */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-2xl border-4 border-primary/20 animate-spin" style={{ animationDuration: '8s' }} />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-2 rounded-xl border-2 border-primary/40 animate-pulse" />
          
          {/* Inner animated box */}
          <div className="absolute inset-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center overflow-hidden">
            {/* Floating squares */}
            <div className="absolute w-6 h-6 bg-primary/30 rounded animate-bounce" style={{ top: '10%', left: '10%', animationDelay: '0s' }} />
            <div className="absolute w-4 h-4 bg-primary/40 rounded animate-bounce" style={{ top: '60%', right: '15%', animationDelay: '0.5s' }} />
            <div className="absolute w-5 h-5 bg-primary/25 rounded animate-bounce" style={{ bottom: '15%', left: '20%', animationDelay: '1s' }} />
            
            {/* Center icon with flip animation */}
            <div 
              className={`transition-all duration-300 ${isFlipping ? 'scale-0 rotate-180' : 'scale-100 rotate-0'}`}
            >
              <CurrentIcon className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-lg" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-lg" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg" />
        </div>

        {/* Status Text with Flip Animation */}
        <div className="text-center mb-8 min-h-[80px]">
          <div 
            className={`transition-all duration-300 ${isFlipping ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}
          >
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {currentStep.text}
            </h3>
            <p className="text-muted-foreground">
              {currentStep.subtext}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Processing</span>
            <span className="text-primary font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {processingSteps.map((step, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentStepIndex 
                  ? 'bg-primary w-6' 
                  : idx < currentStepIndex 
                    ? 'bg-primary/60' 
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Fun fact or tip */}
        <div className="bg-muted/50 rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">Did you know?</span> Excel MCP uses advanced AI to understand your data patterns and create the perfect visualizations.
          </p>
        </div>
      </div>
    </div>
  );
}
