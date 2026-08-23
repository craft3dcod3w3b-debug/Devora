import { useState, useCallback } from 'react';
import { getItem, setItem } from '../utils/storage';

const FAVORITES_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    return getItem<string[]>(FAVORITES_KEY, []);
  });

  const isFavorite = useCallback(
    (toolId: string) => favorites.includes(toolId),
    [favorites]
  );

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId];
      setItem(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    setItem(FAVORITES_KEY, []);
  }, []);

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}
