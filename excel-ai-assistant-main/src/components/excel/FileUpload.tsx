import { useCallback } from 'react';
import { Upload, File, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExcelFile } from '@/types/excel';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  file: ExcelFile | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
  isLoadingPreview: boolean;
}

export function FileUpload({ file, onFileSelect, onClear, isLoadingPreview }: FileUploadProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  }, [onFileSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  if (file) {
    return (
      <div className="animate-fade-in">
        <div className="bg-accent border-2 border-primary/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <File className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)}
                  {file.columns && ` • ${file.columns.length} columns detected`}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClear}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {isLoadingPreview && (
          <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading preview...</span>
          </div>
        )}

        {file.preview && file.preview.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Data Preview</h3>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    {file.preview[0]?.map((cell, i) => (
                      <th key={i} className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {file.preview.slice(1, 6).map((row, rowIndex) => (
                    <tr key={rowIndex} className={cn(rowIndex % 2 === 0 ? "bg-card" : "bg-muted/30")}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-2 text-muted-foreground whitespace-nowrap">
                          {cell || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {file.preview.length > 6 && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Showing first 5 rows of {file.preview.length - 1} total rows
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="block cursor-pointer"
    >
      <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-xl p-16 text-center transition-all duration-300 hover:bg-accent/50">
        <div className="w-16 h-16 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <p className="text-lg font-semibold text-foreground mb-2">
          Drop your Excel file here
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          Supports .xlsx and .xls files up to 20MB
        </p>
      </div>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleInputChange}
        className="hidden"
      />
    </label>
  );
}
