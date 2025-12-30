import { useState, useEffect, useCallback } from 'react';
import { ProcessingHistoryItem } from '@/types/excel';

const STORAGE_KEY = 'excel-mcp-history';

export function useProcessingHistory() {
  const [history, setHistory] = useState<ProcessingHistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed.map((item: ProcessingHistoryItem) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        })));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const saveHistory = useCallback((items: ProcessingHistoryItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setHistory(items);
  }, []);

  const addToHistory = useCallback((item: Omit<ProcessingHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: ProcessingHistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    const updated = [newItem, ...history].slice(0, 50); // Keep last 50 items
    saveHistory(updated);
    return newItem;
  }, [history, saveHistory]);

  const removeFromHistory = useCallback((id: string) => {
    const updated = history.filter(item => item.id !== id);
    saveHistory(updated);
  }, [history, saveHistory]);

  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
