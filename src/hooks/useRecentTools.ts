import { useState, useCallback } from 'react';
import { getItem, setItem } from '../utils/storage';

const RECENT_KEY = 'recent_tools';
const MAX_RECENT = 12;

export interface RecentToolEntry {
  toolId: string;
  timestamp: number;
}

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState<RecentToolEntry[]>(() => {
    return getItem<RecentToolEntry[]>(RECENT_KEY, []);
  });

  const addRecentTool = useCallback((toolId: string) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((entry) => entry.toolId !== toolId);
      const next = [{ toolId, timestamp: Date.now() }, ...filtered].slice(0, MAX_RECENT);
      setItem(RECENT_KEY, next);
      return next;
    });
  }, []);

  const clearRecentTools = useCallback(() => {
    setRecentTools([]);
    setItem(RECENT_KEY, []);
  }, []);

  return { recentTools, addRecentTool, clearRecentTools };
}
