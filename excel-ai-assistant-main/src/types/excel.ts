export interface ExcelFile {
  file: File;
  name: string;
  size: number;
  preview?: string[][];
  columns?: string[];
}

export interface ChartRecommendation {
  type: string;
  columns: string;
  icon: string;
  description: string;
}

export interface ProcessingHistoryItem {
  id: string;
  fileName: string;
  action: 'dashboard' | 'clean' | 'report';
  prompt: string;
  timestamp: Date;
  downloadPath: string;
  status: 'completed' | 'failed';
}

export interface UploadResponse {
  success: boolean;
  message: string;
  file_id: string;
  filename: string;
  result: string;
  file_path: string;
  download_path: string;
}

export interface RecommendationResponse {
  recommendations: ChartRecommendation[];
  columns: string[];
}

export type ActionType = 'dashboard' | 'clean' | 'report' | null;
