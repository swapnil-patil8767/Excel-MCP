import { LayoutDashboard, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { ActionType } from '@/types/excel';
import { cn } from '@/lib/utils';

interface ActionSelectorProps {
  selectedAction: ActionType;
  onSelect: (action: ActionType) => void;
}

const actions = [
  {
    id: 'dashboard' as const,
    title: 'Create Dashboard',
    description: 'Build interactive charts and visualizations from your data',
    icon: LayoutDashboard,
    color: 'from-blue-500/20 to-blue-600/10',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
  },
  {
    id: 'clean' as const,
    title: 'Clean Data',
    description: 'Remove duplicates, fix formats, and organize your data',
    icon: Sparkles,
    color: 'from-green-500/20 to-green-600/10',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-600',
  },
  {
    id: 'report' as const,
    title: 'Generate Report',
    description: 'Create comprehensive Excel reports with summaries',
    icon: FileText,
    color: 'from-purple-500/20 to-purple-600/10',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-600',
  },
];

export function ActionSelector({ selectedAction, onSelect }: ActionSelectorProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {actions.map((action) => {
        const Icon = action.icon;
        const isSelected = selectedAction === action.id;

        return (
          <button
            key={action.id}
            onClick={() => onSelect(action.id)}
            className={cn(
              "group relative p-6 rounded-2xl border-2 text-left transition-all duration-300",
              "hover:shadow-lg hover:-translate-y-2",
              isSelected
                ? "border-primary bg-gradient-to-br from-primary/10 to-accent shadow-lg"
                : "border-border bg-card hover:border-primary/30"
            )}
          >
            {/* Background gradient on hover */}
            <div className={cn(
              "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300",
              action.color,
              "group-hover:opacity-100"
            )} />

            <div className="relative z-10">
              <div className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-all duration-300",
                isSelected 
                  ? "bg-primary text-primary-foreground shadow-lg scale-110" 
                  : cn(action.iconBg, action.iconColor, "group-hover:scale-110")
              )}>
                <Icon className="w-8 h-8" />
              </div>
              
              <h3 className="font-bold text-xl text-foreground mb-2 flex items-center gap-2">
                {action.title}
                <ArrowRight className={cn(
                  "w-4 h-4 transition-all duration-300 opacity-0 -translate-x-2",
                  "group-hover:opacity-100 group-hover:translate-x-0",
                  isSelected && "opacity-100 translate-x-0"
                )} />
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {action.description}
              </p>

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
