import { formatDistanceToNow } from 'date-fns';
import { Download, Trash2, LayoutDashboard, Sparkles, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProcessingHistoryItem } from '@/types/excel';
import { API_ENDPOINTS } from '@/config/api';
import { cn } from '@/lib/utils';

interface ProcessingHistoryProps {
  history: ProcessingHistoryItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onClose: () => void;
}

const actionIcons = {
  dashboard: LayoutDashboard,
  clean: Sparkles,
  report: FileText,
};

const actionLabels = {
  dashboard: 'Dashboard',
  clean: 'Data Cleaning',
  report: 'Report',
};

export function ProcessingHistory({ history, onRemove, onClear, onClose }: ProcessingHistoryProps) {
  const handleDownload = (downloadPath: string) => {
    const filename = downloadPath.split('/').pop() || '';
    window.open(API_ENDPOINTS.download(filename), '_blank');
  };

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-soft max-w-2xl w-full max-h-[80vh] overflow-hidden animate-scale-in">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Processing History</h2>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClear} className="text-destructive">
                Clear All
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {history.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <p>No processing history yet</p>
              <p className="text-sm mt-1">Your processed files will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {history.map((item) => {
                const Icon = actionIcons[item.action];
                return (
                  <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                        item.status === 'completed' ? "bg-accent text-primary" : "bg-destructive/10 text-destructive"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-foreground truncate">
                              {item.fileName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {actionLabels[item.action]} • {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {item.status === 'completed' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDownload(item.downloadPath)}
                                className="h-8 w-8"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onRemove(item.id)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {item.prompt && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {item.prompt}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
