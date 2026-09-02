import React, { useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { THEME_PALETTES, type ThemeMode } from '../../types/theme';
import { useLanguage } from '../../context/LanguageContext';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { X, RotateCcw, Plus, Minus, Sun, Moon, Coffee, Eye, Palette, Check } from 'lucide-react';

export interface SettingsDrawerProps {
  className?: string;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ className = '' }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  let mode: ThemeMode = 'light';
  let setMode: (mode: ThemeMode) => void = () => {};
  let palette = 'default';
  let setPalette: (pal: any) => void = () => {};
  let fontSizeOffset = 0;
  let setFontSizeOffset: (offset: number) => void = () => {};
  let resetFontSize = () => {};
  let isLowContrast = false;
  let setIsLowContrast: (low: boolean) => void = () => {};
  let isDrawerOpen = false;
  let setIsDrawerOpen: (open: boolean) => void = () => {};

  try {
    const themeCtx = useTheme();
    mode = themeCtx.mode;
    setMode = themeCtx.setMode;
    palette = themeCtx.palette;
    setPalette = themeCtx.setPalette;
    fontSizeOffset = themeCtx.fontSizeOffset;
    setFontSizeOffset = themeCtx.setFontSizeOffset;
    resetFontSize = themeCtx.resetFontSize;
    isLowContrast = themeCtx.isLowContrast;
    setIsLowContrast = themeCtx.setIsLowContrast;
    isDrawerOpen = themeCtx.isDrawerOpen;
    setIsDrawerOpen = themeCtx.setIsDrawerOpen;
  } catch {
    // Fallback if rendered outside ThemeProvider
  }

  // Focus trap and Escape listener
  useFocusTrap(panelRef, isDrawerOpen, () => setIsDrawerOpen(false));

  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Try to use Language context if available
  let currentLanguage: 'de' | 'en' = 'de';
  let toggleLang: (() => void) | undefined;
  try {
    const langContext = useLanguage();
    currentLanguage = langContext.language;
    toggleLang = langContext.toggleLanguage;
  } catch {
    // Graceful fallback if rendered outside LanguageProvider
  }

  if (!isDrawerOpen) return null;

  const currentFontSize = Math.min(32, Math.max(8, 14 + fontSizeOffset));

  return (
    <div className={`fixed inset-0 z-[100] ${className}`}>
      {/* Backdrop */}
      <div
        data-testid="settings-drawer-backdrop"
        onClick={() => setIsDrawerOpen(false)}
        className="hyp-drawer-backdrop"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={panelRef}
        id="settings-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-drawer-title"
        data-testid="settings-drawer-panel"
        tabIndex={-1}
        className="hyp-drawer-panel p-6 sm:p-8 flex flex-col justify-between max-w-lg w-full"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-300 dark:border-gray-700">
            <div>
              <span className="text-xs uppercase tracking-widest font-black text-[var(--accent1)] block mb-1">
                Hyper Link Engine
              </span>
              <h2
                id="settings-drawer-title"
                className="text-2xl font-black uppercase tracking-tight text-[var(--bgInverse)] dark:text-[var(--bg1)]"
              >
                {currentLanguage === 'de' ? 'Design & System' : 'Settings & Themes'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              aria-label={currentLanguage === 'de' ? 'Einstellungen schließen' : 'Close settings drawer'}
              className="touch-target p-2 rounded text-[var(--bgInverse)] dark:text-[var(--bg1)] hover:bg-[var(--bg2)] dark:hover:bg-[var(--darkBg2)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent1)]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-6 space-y-8">
            {/* 1. Visual Mode Switcher (Tri-Mode) */}
            <section aria-labelledby="heading-theme-mode">
              <div className="flex items-center justify-between mb-3">
                <h3 id="heading-theme-mode" className="text-sm font-bold uppercase tracking-wider text-[var(--bgInverse)] dark:text-[var(--bg1)]">
                  {currentLanguage === 'de' ? 'Farbmodus (Tri-Mode)' : 'Color Mode (Tri-Mode)'}
                </h3>
                <span className="text-xs font-mono text-gray-700 dark:text-gray-300 uppercase">{mode}</span>
              </div>
              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="heading-theme-mode">
                {(['light', 'sepia', 'dark'] as ThemeMode[]).map((m) => {
                  const isActive = mode === m;
                  const labels: Record<ThemeMode, { de: string; en: string; icon: React.ReactNode }> = {
                    light: { de: 'Hell', en: 'Light', icon: <Sun className="w-4 h-4 mb-1" /> },
                    sepia: { de: 'Sepia', en: 'Sepia', icon: <Coffee className="w-4 h-4 mb-1" /> },
                    dark: { de: 'Dunkel', en: 'Dark', icon: <Moon className="w-4 h-4 mb-1" /> },
                  };
                  return (
                    <button
                      key={m}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setMode(m)}
                      className={`touch-target flex flex-col items-center justify-center p-3 text-xs font-bold uppercase rounded border transition-all ${
                        isActive
                          ? 'border-[var(--accent1)] bg-[var(--accent1)] text-white shadow-sm'
                          : 'border-gray-300 dark:border-gray-700 bg-[var(--bg2)] dark:bg-[var(--darkBg2)] text-[var(--bgInverse)] dark:text-[var(--bg1)] hover:border-[var(--accent2)]'
                      }`}
                    >
                      {labels[m].icon}
                      <span>{labels[m][currentLanguage]}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 2. Theme Palettes (6 Curated Palettes) */}
            <section aria-labelledby="heading-theme-palettes">
              <div className="flex items-center justify-between mb-3">
                <h3 id="heading-theme-palettes" className="text-sm font-bold uppercase tracking-wider text-[var(--bgInverse)] dark:text-[var(--bg1)] flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[var(--accent1)]" />
                  <span>{currentLanguage === 'de' ? 'Farbpaletten (6 Themes)' : 'Color Palettes (6 Themes)'}</span>
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-labelledby="heading-theme-palettes">
                {THEME_PALETTES.map((p) => {
                  const isActive = palette === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setPalette(p.id)}
                      className={`touch-target flex flex-col items-start p-3 text-left rounded border transition-all ${
                        isActive
                          ? 'border-[var(--accent1)] ring-2 ring-[var(--accent1)] bg-[var(--bg2)] dark:bg-[var(--darkBg2)]'
                          : 'border-gray-300 dark:border-gray-700 bg-[var(--bg2)] dark:bg-[var(--darkBg2)] hover:border-[var(--accent2)]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-xs font-black uppercase text-[var(--bgInverse)] dark:text-[var(--bg1)] truncate">
                          {p.name.split(' ')[0]}
                        </span>
                        {isActive && <Check className="w-4 h-4 text-[var(--accent1)] shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1.5 w-full">
                        <span
                          className="w-4 h-4 rounded-full border border-black/20"
                          style={{ backgroundColor: p.primary }}
                          title={`Primary: ${p.primary}`}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-black/20"
                          style={{ backgroundColor: p.secondary }}
                          title={`Secondary: ${p.secondary}`}
                        />
                        <span className="text-[10px] text-gray-700 dark:text-gray-300 font-mono ml-auto">
                          {p.contrastRatio}:1
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 3. Real-Time Font Size Scaler */}
            <section aria-labelledby="heading-font-scaler">
              <div className="flex items-center justify-between mb-3">
                <h3 id="heading-font-scaler" className="text-sm font-bold uppercase tracking-wider text-[var(--bgInverse)] dark:text-[var(--bg1)]">
                  {currentLanguage === 'de' ? 'Schriftgröße & Skalierung' : 'Font Size Scaler'}
                </h3>
                <span className="text-xs font-mono font-bold text-[var(--accent1)]">
                  {currentFontSize}px ({fontSizeOffset >= 0 ? `+${fontSizeOffset}` : fontSizeOffset}px)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFontSizeOffset(fontSizeOffset - 1)}
                  disabled={fontSizeOffset <= -4}
                  aria-label={currentLanguage === 'de' ? 'Schrift verkleinern' : 'Decrease font size'}
                  className="touch-target flex-1 flex items-center justify-center p-3 rounded border border-gray-300 dark:border-gray-700 bg-[var(--bg2)] dark:bg-[var(--darkBg2)] text-[var(--bgInverse)] dark:text-[var(--bg1)] hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Minus className="w-4 h-4 mr-1" />
                  <span className="text-xs font-bold uppercase">-1px</span>
                </button>

                <button
                  type="button"
                  onClick={resetFontSize}
                  aria-label={currentLanguage === 'de' ? 'Schriftgröße zurücksetzen' : 'Reset font size'}
                  className="touch-target px-4 py-3 rounded border border-gray-300 dark:border-gray-700 bg-[var(--bg2)] dark:bg-[var(--darkBg2)] text-[var(--bgInverse)] dark:text-[var(--bg1)] hover:bg-gray-200 dark:hover:bg-gray-800 transition-all flex items-center gap-1"
                  title="Reset (14px)"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Reset</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFontSizeOffset(fontSizeOffset + 1)}
                  disabled={fontSizeOffset >= 12}
                  aria-label={currentLanguage === 'de' ? 'Schrift vergrößern' : 'Increase font size'}
                  className="touch-target flex-1 flex items-center justify-center p-3 rounded border border-gray-300 dark:border-gray-700 bg-[var(--bg2)] dark:bg-[var(--darkBg2)] text-[var(--bgInverse)] dark:text-[var(--bg1)] hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span className="text-xs font-bold uppercase">+1px</span>
                </button>
              </div>
            </section>

            {/* 4. Contrast & Accessibility Controls */}
            <section aria-labelledby="heading-accessibility">
              <h3 id="heading-accessibility" className="text-sm font-bold uppercase tracking-wider text-[var(--bgInverse)] dark:text-[var(--bg1)] mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-[var(--accent2)]" />
                <span>{currentLanguage === 'de' ? 'Barrierefreiheit & Kontrast' : 'Accessibility & Contrast'}</span>
              </h3>
              <div className="flex items-center justify-between p-3 rounded border border-gray-300 dark:border-gray-700 bg-[var(--bg2)] dark:bg-[var(--darkBg2)]">
                <div>
                  <span className="text-xs font-bold uppercase block text-[var(--bgInverse)] dark:text-[var(--bg1)]">
                    {currentLanguage === 'de' ? 'Reduzierter Kontrast' : 'Low-Contrast Mode'}
                  </span>
                  <span className="text-[11px] text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Sanftere Graustufen-Dämpfung' : 'Muted grayscale tone dampening'}
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isLowContrast}
                  aria-label={currentLanguage === 'de' ? 'Reduzierten Kontrast umschalten' : 'Toggle low-contrast mode'}
                  onClick={() => setIsLowContrast(!isLowContrast)}
                  className="touch-target inline-flex items-center justify-center p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent1)]"
                >
                  <span
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isLowContrast ? 'bg-[var(--accent1)]' : 'bg-gray-400 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isLowContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </span>
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Footer info & Language Switch */}
        <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700 flex items-center justify-between">
          <div className="text-[11px] text-gray-700 dark:text-gray-300 font-mono">
            WCAG 2.1 AA / AAA • React 19
          </div>
          {toggleLang && (
            <button
              type="button"
              onClick={toggleLang}
              aria-label={currentLanguage === 'de' ? 'Auf Englisch umschalten' : 'Switch to German'}
              className="touch-target px-3 py-1.5 rounded text-xs font-black uppercase border border-[var(--accent1)] bg-[var(--bg2)] text-[var(--accent1)] hover:bg-[var(--accent1)] hover:text-white transition-all"
            >
              {currentLanguage === 'de' ? 'DE → EN' : 'EN → DE'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
