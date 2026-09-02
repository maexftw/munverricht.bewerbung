/**
 * Theme & Design System Types
 * Interface Contract per PROJECT.md
 */

export type ThemeMode = 'light' | 'sepia' | 'dark';
export type ThemePaletteId = 'default' | 'cyberpunk' | 'emerald' | 'newsprint' | 'pastel' | 'amber';

export interface ThemePalette {
  id: ThemePaletteId;
  name: string;
  category: string;
  primary: string;
  secondary: string;
  accent: string;
  bgBase: string;
  bgSurface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  contrastRatio: number;
}

export interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  palette: ThemePaletteId;
  setPalette: (palette: ThemePaletteId) => void;
  fontSizeOffset: number; // -4 to +12
  setFontSizeOffset: (offset: number) => void;
  resetFontSize: () => void;
  isLowContrast: boolean;
  setIsLowContrast: (low: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
}

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'default',
    name: 'Default Slate & Crimson',
    category: 'Basic',
    primary: '#C73854',
    secondary: '#A6BF80',
    accent: '#C73854',
    bgBase: '#E3E3E3',
    bgSurface: '#D3D3D3',
    textPrimary: '#333333',
    textSecondary: '#444444',
    border: '#444444',
    contrastRatio: 9.84,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    category: 'Special',
    primary: '#8696B3',
    secondary: '#65BD42',
    accent: '#65BD42',
    bgBase: '#E3E3E3',
    bgSurface: '#2E2E2E',
    textPrimary: '#333333',
    textSecondary: '#8696B3',
    border: '#8696B3',
    contrastRatio: 5.76,
  },
  {
    id: 'emerald',
    name: 'Terminal Emerald',
    category: 'Basic',
    primary: '#59804D',
    secondary: '#A6BF80',
    accent: '#59804D',
    bgBase: '#E3E3E3',
    bgSurface: '#D3D3D3',
    textPrimary: '#333333',
    textSecondary: '#59804D',
    border: '#59804D',
    contrastRatio: 9.84,
  },
  {
    id: 'newsprint',
    name: 'Monochrome & Newsprint',
    category: 'Monochrome',
    primary: '#333333',
    secondary: '#B0B0B0',
    accent: '#333333',
    bgBase: '#E3E3E3',
    bgSurface: '#D3D3D3',
    textPrimary: '#333333',
    textSecondary: '#666666',
    border: '#333333',
    contrastRatio: 9.84,
  },
  {
    id: 'pastel',
    name: 'Pastel Goth',
    category: 'Monochrome',
    primary: '#333333',
    secondary: '#E06594',
    accent: '#E06594',
    bgBase: '#E3E3E3',
    bgSurface: '#2E2E2E',
    textPrimary: '#333333',
    textSecondary: '#E06594',
    border: '#E06594',
    contrastRatio: 4.52,
  },
  {
    id: 'amber',
    name: 'Retro Amber & Gold',
    category: 'Basic',
    primary: '#BD881E',
    secondary: '#D9B86C',
    accent: '#BD881E',
    bgBase: '#E3E3E3',
    bgSurface: '#D3D3D3',
    textPrimary: '#333333',
    textSecondary: '#BD881E',
    border: '#BD881E',
    contrastRatio: 6.12,
  },
];

export const THEME_PALETTES_MAP: Record<ThemePaletteId, ThemePalette> = {
  default: THEME_PALETTES[0]!,
  cyberpunk: THEME_PALETTES[1]!,
  emerald: THEME_PALETTES[2]!,
  newsprint: THEME_PALETTES[3]!,
  pastel: THEME_PALETTES[4]!,
  amber: THEME_PALETTES[5]!,
};
