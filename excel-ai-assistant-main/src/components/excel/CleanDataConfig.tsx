import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CleanDataConfigProps {
  onClean: (options: string[]) => void;
}

const cleaningOptions = [
  {
    id: "drop_duplicates",
    label: "Remove Duplicate Rows",
    description: "Deletes duplicate records from dataset",
    defaultChecked: true,
    icon: "🔁"
  },
  {
    id: "remove_empty_rows",
    label: "Remove Empty Rows",
    description: "Deletes rows containing completely empty values",
    defaultChecked: true,
    icon: "🧹"
  },
  {
    id: "drop_nulls",
    label: "Remove Null Value Rows",
    description: "Deletes rows containing any null values",
    defaultChecked: false,
    icon: "🚫"
  },
  {
    id: "fill_nulls",
    label: "Fill Missing Values",
    description: "Fill null values using mean, median, mode, or custom value",
    defaultChecked: false,
    icon: "🧩"
  },
  {
    id: "trim_whitespace",
    label: "Trim Whitespace",
    description: "Remove leading and trailing spaces",
    defaultChecked: true,
    icon: "✂️"
  },
  {
    id: "standardize_case",
    label: "Standardize Text Case",
    description: "Convert text to lowercase, uppercase or title case",
    defaultChecked: false,
    icon: "Aa"
  },
  {
    id: "remove_special_characters",
    label: "Remove Special Characters",
    description: "Clean symbols and unwanted characters",
    defaultChecked: false,
    icon: "🚫"
  },
  {
    id: "standardize_text_values",
    label: "Standardize Text Values",
    description: "Normalize inconsistent categorical text values",
    defaultChecked: false,
    icon: "🧾"
  },
  {
    id: "detect_outliers",
    label: "Detect Outliers",
    description: "Identify outlier values in numeric columns",
    defaultChecked: false,
    icon: "📊"
  },
  {
    id: "handle_outliers",
    label: "Handle Outliers",
    description: "Remove, cap, or replace outliers",
    defaultChecked: false,
    icon: "🛑"
  },
  {
    id: "standardize_date_format",
    label: "Standardize Date Format",
    description: "Convert dates into a consistent format",
    defaultChecked: false,
    icon: "📅"
  },
  {
    id: "parse_dates",
    label: "Extract Date Components",
    description: "Extract day, month, year from date column",
    defaultChecked: false,
    icon: "🗂️"
  },
  {
    id: "validate_range",
    label: "Validate Numeric Ranges",
    description: "Ensure numeric values fall within valid limits",
    defaultChecked: false,
    icon: "📐"
  },
  {
    id: "validate_format",
    label: "Validate Data Format",
    description: "Validate email, phone, or custom regex format",
    defaultChecked: false,
    icon: "✔️"
  },
  {
    id: "drop_columns",
    label: "Drop Unwanted Columns",
    description: "Remove unnecessary columns",
    defaultChecked: false,
    icon: "🗑️"
  },
  {
    id: "rename_columns",
    label: "Rename Columns",
    description: "Rename messy or unclear column names",
    defaultChecked: false,
    icon: "✏️"
  },
  {
    id: "reorder_columns",
    label: "Reorder Columns",
    description: "Sort or reposition columns in dataset",
    defaultChecked: false,
    icon: "📑"
  },
  {
    id: "filter_rows_by_condition",
    label: "Filter Rows by Condition",
    description: "Keep or remove rows based on condition",
    defaultChecked: false,
    icon: "🔍"
  },
  {
    id: "normalize_numeric",
    label: "Normalize Numeric Data",
    description: "Scale numeric columns using Min-Max or Z-Score",
    defaultChecked: false,
    icon: "📏"
  },
  {
    id: "round_numeric",
    label: "Round Numeric Values",
    description: "Round numeric fields to fixed decimal precision",
    defaultChecked: false,
    icon: "🎯"
  },
  {
    id: "standardize_phone_numbers",
    label: "Standardize Phone Numbers",
    description: "Convert into digits / national / international format",
    defaultChecked: false,
    icon: "📞"
  },
  {
    id: "standardize_emails",
    label: "Standardize & Validate Emails",
    description: "Clean, validate and optionally remove invalid emails",
    defaultChecked: false,
    icon: "📧"
  },
  {
    id: "fill_forward_backward",
    label: "Forward / Backward Fill",
    description: "Fill missing values using forward or backward fill",
    defaultChecked: false,
    icon: "⬇️"
  },
  {
    id: "interpolate_missing",
    label: "Interpolate Missing Values",
    description: "Fill numeric gaps using linear or polynomial interpolation",
    defaultChecked: false,
    icon: "📈"
  },
  {
    id: "split_column",
    label: "Split Column",
    description: "Split text column into multiple columns",
    defaultChecked: false,
    icon: "🔀"
  },
  {
    id: "merge_columns",
    label: "Merge Columns",
    description: "Combine multiple columns into one",
    defaultChecked: false,
    icon: "🧷"
  },
];

export function CleanDataConfig({ onClean }: CleanDataConfigProps) {
  const [selected, setSelected] = useState<string[]>(
    cleaningOptions.filter(o => o.defaultChecked).map(o => o.id)
  );

  const [customPrompt, setCustomPrompt] = useState<string>("");

  const handleToggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleClean = () => {
    const selectedLabels = cleaningOptions
      .filter(o => selected.includes(o.id))
      .map(o => o.label.toLowerCase());

    let parts: string[] = [];

    if (customPrompt.trim()) {
      parts.push(customPrompt.trim());
    }

    if (selectedLabels.length > 0) {
      parts.push(selectedLabels.join(', '));
    }

    const prompt = `Clean excel data: ${parts.join(' | ')}`;

    onClean([prompt]);
  };

  return (
    <div className="space-y-6">

      {/* --- New Top Section --- */}
      <div className="p-4 rounded-xl border bg-muted/30">
        <h3 className="text-sm font-semibold mb-2">Specify Custom Cleaning Instructions (Optional)</h3>
        <p className="text-xs text-muted-foreground mb-2">
          You can type your own cleaning requirements, select options below, or use both.
        </p>

        <Textarea
          placeholder="Example: Remove rows with null salary, convert all date columns to YYYY-MM-DD, normalize numeric columns..."
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          className="resize-none"
        />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/5 rounded-xl border border-green-500/20">
        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
          <Info className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Select Cleaning Operations
          </h3>
          <p className="text-xs text-muted-foreground">
            Choose which data cleaning operations to apply
          </p>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {selected.length} selected
        </div>
      </div>

      {/* Options */}
      <div className="grid md:grid-cols-2 gap-3">
        {cleaningOptions.map(option => {
          const isSelected = selected.includes(option.id);
          return (
            <label
              key={option.id}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300",
                "hover:shadow-md hover:-translate-y-0.5",
                isSelected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
              )}
            >
              <div className="pt-0.5">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleToggle(option.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{option.icon}</span>
                  <span className="font-medium text-foreground">{option.label}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      {/* Button */}
      <Button
        onClick={handleClean}
        disabled={selected.length === 0 && !customPrompt.trim()}
        className="w-full gap-2 h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        size="lg"
      >
        <Sparkles className="w-5 h-5" />
        Clean Data
        {(selected.length > 0 || customPrompt.trim()) && (
          <span className="ml-2 bg-primary-foreground/20 px-2 py-0.5 rounded-full text-sm">
            {selected.length} operations + custom
          </span>
        )}
      </Button>
    </div>
  );
}
