/**
 * Theme Palettes and Visual Tokens Catalog
 * Maximilian Unverricht Digital Résumé & Portfolio
 */

import type { ThemePalette, ThemeMode } from '../types/theme';

export const THEME_MODES: Array<{ id: ThemeMode; label: string; description: string }> = [
  { id: 'light', label: 'Light', description: 'Clean daylight theme (#FFFFFF canvas)' },
  { id: 'sepia', label: 'Sepia', description: 'Warm editorial paper tone (#DEDBD5 canvas)' },
  { id: 'dark', label: 'Dark', description: 'Deep low-glare dark mode (#0F172A canvas)' }
];

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'default',
    name: 'Default Slate / Navy',
    category: 'Corporate High-Trust',
    primary: '#0F172A',
    secondary: '#475569',
    accent: '#0284C7',
    bgBase: '#FFFFFF',
    bgSurface: '#F8FAFC',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    border: '#E2E8F0',
    contrastRatio: 17.5
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    category: 'High-Contrast Futuristic',
    primary: '#00F0FF',
    secondary: '#FF003C',
    accent: '#FFE600',
    bgBase: '#0A0E17',
    bgSurface: '#121826',
    textPrimary: '#F0F6FC',
    textSecondary: '#94A3B8',
    border: '#1E293B',
    contrastRatio: 16.2
  },
  {
    id: 'emerald',
    name: 'Terminal Emerald',
    category: 'Monochrome CRT Terminal',
    primary: '#10B981',
    secondary: '#059669',
    accent: '#34D399',
    bgBase: '#06140E',
    bgSurface: '#0B2017',
    textPrimary: '#ECFDF5',
    textSecondary: '#6EE7B7',
    border: '#064E3B',
    contrastRatio: 15.8
  },
  {
    id: 'newsprint',
    name: 'Monochrome Newsprint',
    category: 'Editorial Minimalist',
    primary: '#18181B',
    secondary: '#3F3F46',
    accent: '#52525B',
    bgBase: '#FAFAFA',
    bgSurface: '#F4F4F5',
    textPrimary: '#09090B',
    textSecondary: '#52525B',
    border: '#E4E4E7',
    contrastRatio: 19.1
  },
  {
    id: 'pastel',
    name: 'Pastel Goth',
    category: 'Muted Contemporary',
    primary: '#A855F7',
    secondary: '#EC4899',
    accent: '#C084FC',
    bgBase: '#18141F',
    bgSurface: '#241E2F',
    textPrimary: '#FAF5FF',
    textSecondary: '#E9D5FF',
    border: '#3B2D4A',
    contrastRatio: 14.6
  },
  {
    id: 'amber',
    name: 'Retro Amber',
    category: 'Vintage Phosphor Terminal',
    primary: '#F59E0B',
    secondary: '#D97706',
    accent: '#FBBF24',
    bgBase: '#161108',
    bgSurface: '#251C0C',
    textPrimary: '#FEF3C7',
    textSecondary: '#FDE68A',
    border: '#453112',
    contrastRatio: 15.2
  }
];

export const DEFAULT_PALETTE = THEME_PALETTES[0];
