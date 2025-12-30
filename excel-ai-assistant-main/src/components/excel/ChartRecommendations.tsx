import { Loader2, Wand2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChartRecommendation } from '@/types/excel';
import { cn } from '@/lib/utils';

interface ChartRecommendationsProps {
  recommendations: ChartRecommendation[];
  selectedCharts: ChartRecommendation[];
  onToggleChart: (chart: ChartRecommendation) => void;
  onGetRecommendations: () => void;
  isLoading: boolean;
}

const chartIcons: Record<string, string> = {
  'Line Chart': '📈',
  'Bar Chart': '📊',
  'Pie Chart': '🥧',
  'Scatter Plot': '⚫',
  'Area Chart': '📉',
  'Column Chart': '📊',
  'Combo Chart': '📊',
  'Funnel Chart': '🔽',
  'Histogram': '📊',
  'Bubble Chart': '🫧',
};

export function ChartRecommendations({
  recommendations,
  selectedCharts,
  onToggleChart,
  onGetRecommendations,
  isLoading,
}: ChartRecommendationsProps) {
  const isSelected = (chart: ChartRecommendation) =>
    selectedCharts.some(c => c.type === chart.type && c.columns === chart.columns);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">AI-Recommended Charts</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onGetRecommendations}
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Get Recommendations
            </>
          )}
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-12">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Analyzing your data structure...</p>
        </div>
      )}

      {!isLoading && recommendations.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.map((chart, idx) => {
            const selected = isSelected(chart);
            return (
              <button
                key={idx}
                onClick={() => onToggleChart(chart)}
                className={cn(
                  "relative p-4 rounded-xl border-2 text-center transition-all duration-300",
                  "hover:shadow-card hover:-translate-y-0.5",
                  selected
                    ? "border-primary bg-accent"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                {selected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <div className="text-3xl mb-2">{chartIcons[chart.type] || chart.icon || '📊'}</div>
                <h4 className="font-semibold text-sm text-foreground mb-1">{chart.type}</h4>
                <p className="text-xs text-muted-foreground">{chart.columns}</p>
              </button>
            );
          })}
        </div>
      )}

      {!isLoading && recommendations.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Click "Get Recommendations" to analyze your data</p>
        </div>
      )}
    </div>
  );
}
