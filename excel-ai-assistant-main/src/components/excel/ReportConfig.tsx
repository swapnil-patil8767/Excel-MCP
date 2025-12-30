import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Lightbulb, BookOpen, PieChart, Table } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportConfigProps {
  onGenerate: (prompt: string) => void;
}

const reportTemplates = [
  {
    id: 'summary',
    icon: BookOpen,
    title: 'Summary Report',
    description: 'Overview with key metrics',
    prompt: 'Create a summary report with key statistics and an executive overview',
  },
  {
    id: 'pivot',
    icon: Table,
    title: 'Pivot Analysis',
    description: 'Detailed pivot tables',
    prompt: 'Create a report with pivot tables analyzing the data by major categories',
  },
  {
    id: 'visual',
    icon: PieChart,
    title: 'Visual Report',
    description: 'Charts and graphs',
    prompt: 'Create a visual report with charts showing trends and distributions',
  },
];

export function ReportConfig({ onGenerate }: ReportConfigProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateClick = (template: typeof reportTemplates[0]) => {
    setSelectedTemplate(template.id);
    setPrompt(template.prompt);
  };

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt.trim());
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Templates */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          Quick Templates
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {reportTemplates.map((template) => {
            const Icon = template.icon;
            const isSelected = selectedTemplate === template.id;
            return (
              <button
                key={template.id}
                onClick={() => handleTemplateClick(template)}
                className={cn(
                  "p-4 rounded-xl border-2 text-center transition-all duration-300",
                  "hover:shadow-md hover:-translate-y-1",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-medium text-sm text-foreground">{template.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Prompt */}
      <div className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-2xl p-6 border border-purple-500/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground">
              Report Requirements
            </label>
            <p className="text-xs text-muted-foreground">Customize or write your own requirements</p>
          </div>
        </div>
        <Textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            setSelectedTemplate(null);
          }}
          placeholder="Example: Create a summary report with sales statistics, pivot tables by region and category, and key performance metrics"
          rows={5}
          className="resize-none bg-card/50"
        />
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Lightbulb className="w-3 h-3" />
          Describe metrics, groupings, and summaries you want in your report.
        </p>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={!prompt.trim()}
        className="w-full gap-2 h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        size="lg"
      >
        <FileText className="w-5 h-5" />
        Generate Report
        {prompt.trim() && <span className="ml-2 text-primary-foreground/70">→</span>}
      </Button>
    </div>
  );
}
