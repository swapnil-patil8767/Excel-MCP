// API Configuration - Update this URL to your cloud server
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

export const API_ENDPOINTS = {
  upload: `${API_BASE_URL}/upload`,
  download: (filename: string) => `${API_BASE_URL}/download/${filename}`,
  cleanup: (filename: string) => `${API_BASE_URL}/cleanup/${filename}`,
  recommendations: `${API_BASE_URL}/recommendations`,
  preview: `${API_BASE_URL}/preview`,
} as const;
