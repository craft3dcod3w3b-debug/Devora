import type { ComponentType, LazyExoticComponent } from 'react';

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  keywords: string[];
  featured: boolean;
  popular: boolean;
  component: LazyExoticComponent<ComponentType>;
  seoTitle: string;
  seoDescription: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
