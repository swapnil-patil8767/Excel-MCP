import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChartRecommendations } from './ChartRecommendations';
import { ChartRecommendation } from '@/types/excel';
import { Rocket, Lightbulb, Wand2 } from 'lucide-react';

interface DashboardConfigProps {
  recommendations: ChartRecommendation[];
  onGetRecommendations: () => void;
  isLoadingRecommendations: boolean;
  onGenerate: (prompt: string) => void;
}

export function DashboardConfig({
  recommendations,
  onGetRecommendations,
  isLoadingRecommendations,
  onGenerate,
}: DashboardConfigProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedCharts, setSelectedCharts] = useState<ChartRecommendation[]>([]);

  const handleToggleChart = (chart: ChartRecommendation) => {
    setSelectedCharts(prev => {
      const exists = prev.some(c => c.type === chart.type && c.columns === chart.columns);
      if (exists) {
        return prev.filter(c => !(c.type === chart.type && c.columns === chart.columns));
      }
      return [...prev, chart];
    });
  };

  const handleGenerate = () => {
    let finalPrompt = prompt.trim();
    
    if (!finalPrompt && selectedCharts.length > 0) {
      finalPrompt = 'Create dashboard with: ' + selectedCharts.map(c => `${c.type} for ${c.columns}`).join(', ');
    }
    
    if (finalPrompt) {
      onGenerate(finalPrompt);
    }
  };

  const canGenerate = prompt.trim() || selectedCharts.length > 0;

  return (
    <div className="space-y-8">
      {/* Custom Prompt Section */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-6 border border-primary/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground">
              Custom Requirements
            </label>
            <p className="text-xs text-muted-foreground">Describe your ideal dashboard</p>
          </div>
        </div>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Create dashboard with Sales by Year - line chart, Top 5 Sub-Categories - bar chart, Region distribution - pie chart"
          rows={4}
          className="resize-none bg-card/50"
        />
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Lightbulb className="w-3 h-3" />
          <span>Tip: Be specific about chart types and data columns for best results</span>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground font-medium px-4 py-2 bg-muted rounded-full">OR use AI suggestions</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Chart Recommendations */}
      <ChartRecommendations
        recommendations={recommendations}
        selectedCharts={selectedCharts}
        onToggleChart={handleToggleChart}
        onGetRecommendations={onGetRecommendations}
        isLoading={isLoadingRecommendations}
      />

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={!canGenerate}
        className="w-full gap-2 h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        size="lg"
      >
        <Rocket className="w-5 h-5" />
        Generate Dashboard
        {canGenerate && <span className="ml-2 text-primary-foreground/70">→</span>}
      </Button>
    </div>
  );
}
