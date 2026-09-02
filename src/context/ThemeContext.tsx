import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { ThemeMode, ThemePaletteId, ThemeContextValue } from '../types/theme';

export const THEME_MODE_KEY = 'mu_theme_mode';
export const THEME_PALETTE_KEY = 'mu_theme_palette';
export const THEME_FONT_OFFSET_KEY = 'mu_font_offset';
export const THEME_LOW_CONTRAST_KEY = 'mu_low_contrast';

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const VALID_MODES: ThemeMode[] = ['light', 'sepia', 'dark'];
const VALID_PALETTES: ThemePaletteId[] = ['default', 'cyberpunk', 'emerald', 'newsprint', 'pastel', 'amber'];

const PALETTE_CLASS_MAP: Record<ThemePaletteId, string> = {
  default: 'defaultPalette',
  cyberpunk: 'cyberPunk',
  emerald: 'leafyGreen',
  newsprint: 'newsPrint',
  pastel: 'pastelGoth',
  amber: 'glitterGold',
};

const ALL_PALETTE_CLASSES = Object.values(PALETTE_CLASS_MAP);

function getInitialMode(fallback?: ThemeMode): ThemeMode {
  if (fallback && VALID_MODES.includes(fallback)) return fallback;
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem(THEME_MODE_KEY);
    if (stored && (stored === 'light' || stored === 'sepia' || stored === 'dark')) {
      return stored;
    }
  } catch {
    // Storage access error fallback
  }
  return 'light';
}

function getInitialPalette(fallback?: ThemePaletteId): ThemePaletteId {
  if (fallback && VALID_PALETTES.includes(fallback)) return fallback;
  if (typeof window === 'undefined') return 'default';
  try {
    const stored = window.localStorage.getItem(THEME_PALETTE_KEY);
    if (stored && VALID_PALETTES.includes(stored as ThemePaletteId)) {
      return stored as ThemePaletteId;
    }
  } catch {
    // Storage access error fallback
  }
  return 'default';
}

function getInitialFontOffset(fallback?: number): number {
  if (typeof fallback === 'number' && fallback >= -4 && fallback <= 12) return fallback;
  if (typeof window === 'undefined') return 0;
  try {
    const stored = window.localStorage.getItem(THEME_FONT_OFFSET_KEY);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= -4 && parsed <= 12) {
        return parsed;
      }
    }
  } catch {
    // Storage access error fallback
  }
  return 0;
}

function getInitialLowContrast(fallback?: boolean): boolean {
  if (typeof fallback === 'boolean') return fallback;
  if (typeof window === 'undefined') return false;
  try {
    const stored = window.localStorage.getItem(THEME_LOW_CONTRAST_KEY);
    if (stored === 'true') return true;
    if (stored === 'false') return false;
  } catch {
    // Storage access error fallback
  }
  return false;
}

export interface ThemeProviderProps {
  children?: React.ReactNode;
  initialMode?: ThemeMode;
  initialPalette?: ThemePaletteId;
  initialFontSizeOffset?: number;
  initialLowContrast?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode,
  initialPalette,
  initialFontSizeOffset,
  initialLowContrast,
}) => {
  const [mode, setModeState] = useState<ThemeMode>(() => getInitialMode(initialMode));
  const [palette, setPaletteState] = useState<ThemePaletteId>(() => getInitialPalette(initialPalette));
  const [fontSizeOffset, setFontSizeOffsetState] = useState<number>(() => getInitialFontOffset(initialFontSizeOffset));
  const [isLowContrast, setIsLowContrastState] = useState<boolean>(() => getInitialLowContrast(initialLowContrast));
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Setters with validation & local storage sync
  const setMode = useCallback((nextMode: ThemeMode) => {
    const safeMode: ThemeMode = VALID_MODES.includes(nextMode) ? nextMode : 'light';
    setModeState(safeMode);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(THEME_MODE_KEY, safeMode);
      } catch {
        // Storage error handling
      }
    }
  }, []);

  const setPalette = useCallback((nextPalette: ThemePaletteId) => {
    const safePalette: ThemePaletteId = VALID_PALETTES.includes(nextPalette) ? nextPalette : 'default';
    setPaletteState(safePalette);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(THEME_PALETTE_KEY, safePalette);
      } catch {
        // Storage error handling
      }
    }
  }, []);

  const setFontSizeOffset = useCallback((nextOffset: number) => {
    const clampedOffset = Math.min(12, Math.max(-4, Number.isFinite(nextOffset) ? Math.round(nextOffset) : 0));
    setFontSizeOffsetState(clampedOffset);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(THEME_FONT_OFFSET_KEY, clampedOffset.toString());
      } catch {
        // Storage error handling
      }
    }
  }, []);

  const resetFontSize = useCallback(() => {
    setFontSizeOffset(0);
  }, [setFontSizeOffset]);

  const setIsLowContrast = useCallback((low: boolean) => {
    const safeLow = Boolean(low);
    setIsLowContrastState(safeLow);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(THEME_LOW_CONTRAST_KEY, safeLow.toString());
      } catch {
        // Storage error handling
      }
    }
  }, []);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  // Synchronize CSS variables, data attributes, and classes on the DOM
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    // 1. Mode classes and attributes
    root.setAttribute('data-theme-mode', mode);
    root.classList.remove('sepiamode', 'darkmode');
    body?.classList.remove('sepiamode', 'darkmode');

    if (mode === 'sepia') {
      root.classList.add('sepiamode');
      body?.classList.add('sepiamode');
    } else if (mode === 'dark') {
      root.classList.add('darkmode');
      body?.classList.add('darkmode');
    }

    // 2. Palette classes and attributes
    root.setAttribute('data-theme-palette', palette);
    ALL_PALETTE_CLASSES.forEach((cls) => {
      root.classList.remove(cls);
      body?.classList.remove(cls);
    });

    const activePaletteClass = PALETTE_CLASS_MAP[palette] || 'defaultPalette';
    root.classList.add(activePaletteClass);
    body?.classList.add(activePaletteClass);

    // 3. Low contrast mode
    root.setAttribute('data-contrast', isLowContrast ? 'low' : 'normal');
    if (isLowContrast) {
      root.classList.add('contrastmode');
      body?.classList.add('contrastmode');
    } else {
      root.classList.remove('contrastmode');
      body?.classList.remove('contrastmode');
    }

    // 4. Font Size & Line Height scaling
    // Base font: 14px, Base line-height: 22px
    // Clamped strictly to [8px, 32px] and [17px, 41px]
    const calculatedSize = Math.min(32, Math.max(8, 14 + fontSizeOffset));
    const calculatedLineHeight = Math.min(41, Math.max(17, 22 + fontSizeOffset));

    root.style.setProperty('--fontSize', `${calculatedSize}px`);
    root.style.setProperty('--lineHeight', `${calculatedLineHeight}px`);
    root.style.setProperty('--fontScaleOffset', `${fontSizeOffset}px`);
  }, [mode, palette, fontSizeOffset, isLowContrast]);

  const value: ThemeContextValue = useMemo(
    () => ({
      mode,
      setMode,
      palette,
      setPalette,
      fontSizeOffset,
      setFontSizeOffset,
      resetFontSize,
      isLowContrast,
      setIsLowContrast,
      isDrawerOpen,
      setIsDrawerOpen,
      toggleDrawer,
    }),
    [
      mode,
      setMode,
      palette,
      setPalette,
      fontSizeOffset,
      setFontSizeOffset,
      resetFontSize,
      isLowContrast,
      setIsLowContrast,
      isDrawerOpen,
      setIsDrawerOpen,
      toggleDrawer,
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
