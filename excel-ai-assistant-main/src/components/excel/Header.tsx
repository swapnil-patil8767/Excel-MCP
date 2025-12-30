import { FileSpreadsheet, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onHistoryClick: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Header({ onHistoryClick, showBackButton, onBack }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
              ← Back
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg excel-gradient flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">Xl.ai</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Dashboard Generator</p>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onHistoryClick}
          className="gap-2"
        >
          <History className="w-4 h-4" />
          History
        </Button>
      </div>
    </header>
  );
}
