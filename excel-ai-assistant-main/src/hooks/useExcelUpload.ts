import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/config/api';
import { ExcelFile, UploadResponse, RecommendationResponse } from '@/types/excel';
import { useToast } from '@/hooks/use-toast';

export function useExcelUpload() {
  const [file, setFile] = useState<ExcelFile | null>(null);
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async ({ file, prompt }: { file: File; prompt: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('prompt', prompt);

      const response = await fetch(API_ENDPOINTS.upload, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Upload failed');
      }

      return response.json() as Promise<UploadResponse>;
    },
    onError: (error: Error) => {
      toast({
        title: 'Processing Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const previewMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(API_ENDPOINTS.preview, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Preview failed');
      }

      return response.json() as Promise<{ preview: string[][]; columns: string[] }>;
    },
  });

  const recommendationsMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(API_ENDPOINTS.recommendations, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      return response.json() as Promise<RecommendationResponse>;
    },
  });

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    if (!selectedFile.name.match(/\.(xlsx|xls)$/i)) {
      toast({
        title: 'Invalid File',
        description: 'Please select an Excel file (.xlsx or .xls)',
        variant: 'destructive',
      });
      return;
    }

    const excelFile: ExcelFile = {
      file: selectedFile,
      name: selectedFile.name,
      size: selectedFile.size,
    };

    setFile(excelFile);

    // Fetch preview
    try {
      const previewData = await previewMutation.mutateAsync(selectedFile);
      setFile(prev => prev ? { ...prev, preview: previewData.preview, columns: previewData.columns } : null);
    } catch {
      // Preview failed, but we can still continue
    }
  }, [previewMutation, toast]);

  const clearFile = useCallback(() => {
    setFile(null);
  }, []);

  return {
    file,
    setFile,
    handleFileSelect,
    clearFile,
    uploadMutation,
    previewMutation,
    recommendationsMutation,
    isUploading: uploadMutation.isPending,
    isLoadingPreview: previewMutation.isPending,
  };
}
