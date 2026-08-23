import { useState, useEffect, useCallback } from 'react';
import type { ThemeMode } from '../types/tool';
import { getItem, setItem } from '../utils/storage';

const THEME_KEY = 'theme';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(resolved: 'light' | 'dark') {
  const root = document.documentElement;
  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return getItem<ThemeMode>(THEME_KEY, 'system');
  });

  const resolvedTheme = theme === 'system' ? getSystemTheme() : theme;

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    setItem(THEME_KEY, newTheme);
  }, []);

  const cycleTheme = useCallback(() => {
    const next: Record<ThemeMode, ThemeMode> = {
      light: 'dark',
      dark: 'system',
      system: 'light',
    };
    setTheme(next[theme]);
  }, [theme, setTheme]);

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme(getSystemTheme());
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return { theme, setTheme, resolvedTheme, cycleTheme };
}
