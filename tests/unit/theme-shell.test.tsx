/**
 * Unit Test Suite: Milestone 1 — Theme Engine, Hooks & Shell Components
 * Tests ThemeContext, useTheme hook, AppLayout, SideDock, DiagonalSlant, SettingsDrawer
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, THEME_MODE_KEY, THEME_PALETTE_KEY, THEME_FONT_OFFSET_KEY, THEME_LOW_CONTRAST_KEY } from '../../src/context/ThemeContext';
import { useTheme } from '../../src/hooks/useTheme';
import { LanguageProvider } from '../../src/context/LanguageContext';
import { AppLayout } from '../../src/components/layout/AppLayout';
import { SideDock } from '../../src/components/layout/SideDock';
import { DiagonalSlant } from '../../src/components/layout/DiagonalSlant';
import { THEME_PALETTES, THEME_PALETTES_MAP } from '../../src/types/theme';

// Test Consumer for ThemeContext hook
function ThemeTestConsumer() {
  const {
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
  } = useTheme();

  return (
    <div>
      <span data-testid="theme-mode">{mode}</span>
      <span data-testid="theme-palette">{palette}</span>
      <span data-testid="font-offset">{fontSizeOffset}</span>
      <span data-testid="low-contrast">{isLowContrast ? 'true' : 'false'}</span>
      <span data-testid="drawer-open">{isDrawerOpen ? 'true' : 'false'}</span>

      <button data-testid="btn-mode-light" onClick={() => setMode('light')}>Light</button>
      <button data-testid="btn-mode-sepia" onClick={() => setMode('sepia')}>Sepia</button>
      <button data-testid="btn-mode-dark" onClick={() => setMode('dark')}>Dark</button>
      <button data-testid="btn-mode-invalid" onClick={() => (setMode as any)('invalid_mode')}>Invalid Mode</button>

      <button data-testid="btn-pal-cyberpunk" onClick={() => setPalette('cyberpunk')}>Cyberpunk</button>
      <button data-testid="btn-pal-emerald" onClick={() => setPalette('emerald')}>Emerald</button>
      <button data-testid="btn-pal-newsprint" onClick={() => setPalette('newsprint')}>Newsprint</button>
      <button data-testid="btn-pal-pastel" onClick={() => setPalette('pastel')}>Pastel</button>
      <button data-testid="btn-pal-amber" onClick={() => setPalette('amber')}>Amber</button>
      <button data-testid="btn-pal-default" onClick={() => setPalette('default')}>Default</button>
      <button data-testid="btn-pal-invalid" onClick={() => (setPalette as any)('invalid_pal')}>Invalid Palette</button>

      <button data-testid="btn-font-inc" onClick={() => setFontSizeOffset(fontSizeOffset + 1)}>Font +1</button>
      <button data-testid="btn-font-dec" onClick={() => setFontSizeOffset(fontSizeOffset - 1)}>Font -1</button>
      <button data-testid="btn-font-large" onClick={() => setFontSizeOffset(20)}>Font 20</button>
      <button data-testid="btn-font-submin" onClick={() => setFontSizeOffset(-10)}>Font -10</button>
      <button data-testid="btn-font-reset" onClick={resetFontSize}>Reset Font</button>

      <button data-testid="btn-toggle-contrast" onClick={() => setIsLowContrast(!isLowContrast)}>Toggle Contrast</button>
      <button data-testid="btn-toggle-drawer" onClick={toggleDrawer}>Toggle Drawer</button>
      <button data-testid="btn-open-drawer" onClick={() => setIsDrawerOpen(true)}>Open Drawer</button>
      <button data-testid="btn-close-drawer" onClick={() => setIsDrawerOpen(false)}>Close Drawer</button>
    </div>
  );
}

describe('Milestone 1: Theme Engine & Hook Unit Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme-mode');
    document.documentElement.removeAttribute('data-theme-palette');
    document.documentElement.removeAttribute('data-contrast');
    document.documentElement.classList.remove('sepiamode', 'darkmode', 'contrastmode');
    document.body.classList.remove('sepiamode', 'darkmode', 'contrastmode');
  });

  describe('1. ThemeContext State & Persistence Engine', () => {
    it('TC-TH01: Initializes with clean default values (light mode, default palette, offset 0, normal contrast)', () => {
      render(
        <ThemeProvider>
          <ThemeTestConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-mode').textContent).toBe('light');
      expect(screen.getByTestId('theme-palette').textContent).toBe('default');
      expect(screen.getByTestId('font-offset').textContent).toBe('0');
      expect(screen.getByTestId('low-contrast').textContent).toBe('false');
      expect(screen.getByTestId('drawer-open').textContent).toBe('false');

      expect(document.documentElement.getAttribute('data-theme-mode')).toBe('light');
      expect(document.documentElement.getAttribute('data-theme-palette')).toBe('default');
      expect(document.documentElement.getAttribute('data-contrast')).toBe('normal');
      expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('14px');
      expect(document.documentElement.style.getPropertyValue('--lineHeight')).toBe('22px');
    });

    it('TC-TH02: Switches Tri-Mode among light, sepia, and dark with DOM class sync and localStorage', () => {
      render(
        <ThemeProvider>
          <ThemeTestConsumer />
        </ThemeProvider>
      );

      // Switch to sepia
      fireEvent.click(screen.getByTestId('btn-mode-sepia'));
      expect(screen.getByTestId('theme-mode').textContent).toBe('sepia');
      expect(window.localStorage.getItem(THEME_MODE_KEY)).toBe('sepia');
      expect(document.documentElement.classList.contains('sepiamode')).toBe(true);
      expect(document.documentElement.getAttribute('data-theme-mode')).toBe('sepia');

      // Switch to dark
      fireEvent.click(screen.getByTestId('btn-mode-dark'));
      expect(screen.getByTestId('theme-mode').textContent).toBe('dark');
      expect(window.localStorage.getItem(THEME_MODE_KEY)).toBe('dark');
      expect(document.documentElement.classList.contains('darkmode')).toBe(true);
      expect(document.documentElement.classList.contains('sepiamode')).toBe(false);
      expect(document.documentElement.getAttribute('data-theme-mode')).toBe('dark');

      // Switch back to light
      fireEvent.click(screen.getByTestId('btn-mode-light'));
      expect(screen.getByTestId('theme-mode').textContent).toBe('light');
      expect(window.localStorage.getItem(THEME_MODE_KEY)).toBe('light');
      expect(document.documentElement.classList.contains('darkmode')).toBe(false);
      expect(document.documentElement.classList.contains('sepiamode')).toBe(false);
      expect(document.documentElement.getAttribute('data-theme-mode')).toBe('light');
    });

    it('TC-TH03: Gracefully handles invalid theme mode by falling back to light', () => {
      render(
        <ThemeProvider>
          <ThemeTestConsumer />
        </ThemeProvider>
      );

      fireEvent.click(screen.getByTestId('btn-mode-invalid'));
      expect(screen.getByTestId('theme-mode').textContent).toBe('light');
      expect(document.documentElement.getAttribute('data-theme-mode')).toBe('light');
    });

    it('TC-TH04: Switches among all 6 curated palettes and updates DOM classes & localStorage', () => {
      render(
        <ThemeProvider>
          <ThemeTestConsumer />
        </ThemeProvider>
      );

      const palettes = [
        { btn: 'btn-pal-cyberpunk', id: 'cyberpunk', cls: 'cyberPunk' },
        { btn: 'btn-pal-emerald', id: 'emerald', cls: 'leafyGreen' },
        { btn: 'btn-pal-newsprint', id: 'newsprint', cls: 'newsPrint' },
        { btn: 'btn-pal-pastel', id: 'pastel', cls: 'pastelGoth' },
        { btn: 'btn-pal-amber', id: 'amber', cls: 'glitterGold' },
        { btn: 'btn-pal-default', id: 'default', cls: 'defaultPalette' },
      ];

      for (const p of palettes) {
        fireEvent.click(screen.getByTestId(p.btn));
        expect(screen.getByTestId('theme-palette').textContent).toBe(p.id);
        expect(window.localStorage.getItem(THEME_PALETTE_KEY)).toBe(p.id);
        expect(document.documentElement.getAttribute('data-theme-palette')).toBe(p.id);
        expect(document.documentElement.classList.contains(p.cls)).toBe(true);
      }
    });

    it('TC-TH05: Clamps font size offset strictly between -4 and +12 and calculates CSS variables', () => {
      render(
        <ThemeProvider>
          <ThemeTestConsumer />
        </ThemeProvider>
      );

      // Increment by 1
      fireEvent.click(screen.getByTestId('btn-font-inc'));
      expect(screen.getByTestId('font-offset').textContent).toBe('1');
      expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('15px');
      expect(document.documentElement.style.getPropertyValue('--lineHeight')).toBe('23px');

      // Attempt over-max (20) -> clamped to 12
      fireEvent.click(screen.getByTestId('btn-font-large'));
      expect(screen.getByTestId('font-offset').textContent).toBe('12');
      expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('26px');
      expect(document.documentElement.style.getPropertyValue('--lineHeight')).toBe('34px');

      // Attempt under-min (-10) -> clamped to -4
      fireEvent.click(screen.getByTestId('btn-font-submin'));
      expect(screen.getByTestId('font-offset').textContent).toBe('-4');
      expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('10px');
      expect(document.documentElement.style.getPropertyValue('--lineHeight')).toBe('18px');

      // Reset
      fireEvent.click(screen.getByTestId('btn-font-reset'));
      expect(screen.getByTestId('font-offset').textContent).toBe('0');
      expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('14px');
      expect(document.documentElement.style.getPropertyValue('--lineHeight')).toBe('22px');
    });

    it('TC-TH06: Toggles low contrast mode and updates DOM contrastmode class & data attribute', () => {
      render(
        <ThemeProvider>
          <ThemeTestConsumer />
        </ThemeProvider>
      );

      fireEvent.click(screen.getByTestId('btn-toggle-contrast'));
      expect(screen.getByTestId('low-contrast').textContent).toBe('true');
      expect(window.localStorage.getItem(THEME_LOW_CONTRAST_KEY)).toBe('true');
      expect(document.documentElement.classList.contains('contrastmode')).toBe(true);
      expect(document.documentElement.getAttribute('data-contrast')).toBe('low');

      fireEvent.click(screen.getByTestId('btn-toggle-contrast'));
      expect(screen.getByTestId('low-contrast').textContent).toBe('false');
      expect(window.localStorage.getItem(THEME_LOW_CONTRAST_KEY)).toBe('false');
      expect(document.documentElement.classList.contains('contrastmode')).toBe(false);
      expect(document.documentElement.getAttribute('data-contrast')).toBe('normal');
    });

    it('TC-TH07: Restores stored settings from localStorage on mount', () => {
      window.localStorage.setItem(THEME_MODE_KEY, 'dark');
      window.localStorage.setItem(THEME_PALETTE_KEY, 'cyberpunk');
      window.localStorage.setItem(THEME_FONT_OFFSET_KEY, '3');
      window.localStorage.setItem(THEME_LOW_CONTRAST_KEY, 'true');

      render(
        <ThemeProvider>
          <ThemeTestConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('theme-mode').textContent).toBe('dark');
      expect(screen.getByTestId('theme-palette').textContent).toBe('cyberpunk');
      expect(screen.getByTestId('font-offset').textContent).toBe('3');
      expect(screen.getByTestId('low-contrast').textContent).toBe('true');
      expect(document.documentElement.getAttribute('data-theme-mode')).toBe('dark');
      expect(document.documentElement.classList.contains('darkmode')).toBe(true);
    });

    it('TC-TH08: useTheme throws descriptive error when used outside ThemeProvider', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => render(<ThemeTestConsumer />)).toThrow(/useTheme must be used within a ThemeProvider/i);
      consoleErrorSpy.mockRestore();
    });
  });

  describe('2. Shell Components (AppLayout, SideDock, DiagonalSlant, SettingsDrawer)', () => {
    it('TC-SH01: DiagonalSlant renders with hyp-slant class and aria-hidden', () => {
      render(<DiagonalSlant />);
      const slant = screen.getByTestId('diagonal-slant');
      expect(slant).toBeInTheDocument();
      expect(slant).toHaveAttribute('aria-hidden', 'true');
      expect(slant.className).toContain('hyp-slant');
    });

    it('TC-SH02: SideDock renders logo, menu trigger button, and all 6 navigation anchor links', () => {
      render(
        <ThemeProvider>
          <LanguageProvider>
            <SideDock />
          </LanguageProvider>
        </ThemeProvider>
      );

      expect(screen.getByTestId('side-dock')).toBeInTheDocument();
      expect(screen.getByTestId('menu-trigger-btn')).toBeInTheDocument();
      expect(screen.getByTestId('nav-link-about')).toHaveAttribute('href', '#about');
      expect(screen.getByTestId('nav-link-skills')).toHaveAttribute('href', '#skills');
      expect(screen.getByTestId('nav-link-flagship')).toHaveAttribute('href', '#flagship');
      expect(screen.getByTestId('nav-link-projects')).toHaveAttribute('href', '#projects');
      expect(screen.getByTestId('nav-link-experience')).toHaveAttribute('href', '#experience');
      expect(screen.getByTestId('nav-link-contact')).toHaveAttribute('href', '#contact');
    });

    it('TC-SH03: Clicking menu trigger in SideDock opens SettingsDrawer', () => {
      render(
        <ThemeProvider>
          <LanguageProvider>
            <AppLayout>
              <div>Main Content Body</div>
            </AppLayout>
          </LanguageProvider>
        </ThemeProvider>
      );

      // Drawer initially closed
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      // Click MENU button
      fireEvent.click(screen.getByTestId('menu-trigger-btn'));

      // Drawer now open
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Design & System|Settings & Themes/i })).toBeInTheDocument();
    });

    it('TC-SH04: SettingsDrawer contains Tri-Mode radios, 6 palette cards, font scaler and contrast switch', () => {
      render(
        <ThemeProvider initialMode="light" initialPalette="default">
          <LanguageProvider>
            <AppLayout>
              <div>Content</div>
            </AppLayout>
          </LanguageProvider>
        </ThemeProvider>
      );

      // Open drawer
      fireEvent.click(screen.getByTestId('menu-trigger-btn'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Check mode radio buttons
      expect(screen.getByRole('radio', { name: /Hell|Light/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /Sepia/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /Dunkel|Dark/i })).toBeInTheDocument();

      // Switch mode to dark via drawer radio
      fireEvent.click(screen.getByRole('radio', { name: /Dunkel|Dark/i }));
      expect(document.documentElement.getAttribute('data-theme-mode')).toBe('dark');

      // Check font scaler buttons
      const decBtn = screen.getByRole('button', { name: /Schrift verkleinern|Decrease font size/i });
      const incBtn = screen.getByRole('button', { name: /Schrift vergrößern|Increase font size/i });
      const resetBtn = screen.getByRole('button', { name: /Schriftgröße zurücksetzen|Reset font size/i });

      expect(decBtn).toBeInTheDocument();
      expect(incBtn).toBeInTheDocument();
      expect(resetBtn).toBeInTheDocument();

      // Increment font size
      fireEvent.click(incBtn);
      expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('15px');

      // Check contrast switch
      const contrastSwitch = screen.getByRole('switch');
      expect(contrastSwitch).toBeInTheDocument();
      fireEvent.click(contrastSwitch);
      expect(document.documentElement.getAttribute('data-contrast')).toBe('low');

      // Close drawer via close button
      const closeBtn = screen.getByRole('button', { name: /Einstellungen schließen|Close settings drawer/i });
      fireEvent.click(closeBtn);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('TC-SH05: Pressing ESC closes the SettingsDrawer', () => {
      render(
        <ThemeProvider>
          <LanguageProvider>
            <AppLayout>
              <div>Content</div>
            </AppLayout>
          </LanguageProvider>
        </ThemeProvider>
      );

      // Open drawer
      fireEvent.click(screen.getByTestId('menu-trigger-btn'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Press ESC
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('TC-SH06: AppLayout renders children inside main scroll canvas', () => {
      render(
        <ThemeProvider>
          <LanguageProvider>
            <AppLayout>
              <div data-testid="test-child">Child Section Content</div>
            </AppLayout>
          </LanguageProvider>
        </ThemeProvider>
      );

      expect(screen.getByTestId('app-layout')).toBeInTheDocument();
      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.getByText('Child Section Content')).toBeInTheDocument();
    });
  });

  describe('3. Curated Palettes Definition & Contrast Integrity', () => {
    it('TC-PAL01: Exports 6 curated palettes matching PROJECT.md interface contract', () => {
      expect(THEME_PALETTES.length).toBe(6);
      const ids = THEME_PALETTES.map((p) => p.id);
      expect(ids).toEqual(['default', 'cyberpunk', 'emerald', 'newsprint', 'pastel', 'amber']);

      for (const p of THEME_PALETTES) {
        expect(p.id).toBeDefined();
        expect(p.name).toBeDefined();
        expect(p.category).toBeDefined();
        expect(p.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(p.secondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(p.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(p.bgBase).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(p.bgSurface).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(p.contrastRatio).toBeGreaterThanOrEqual(4.5); // All >= 4.5:1 WCAG AA
      }
    });

    it('TC-PAL02: THEME_PALETTES_MAP provides instant lookup for all 6 IDs', () => {
      expect(THEME_PALETTES_MAP.default.name).toContain('Default');
      expect(THEME_PALETTES_MAP.cyberpunk.name).toContain('Cyberpunk');
      expect(THEME_PALETTES_MAP.emerald.name).toContain('Emerald');
      expect(THEME_PALETTES_MAP.newsprint.name).toContain('Newsprint');
      expect(THEME_PALETTES_MAP.pastel.name).toContain('Pastel');
      expect(THEME_PALETTES_MAP.amber.name).toContain('Amber');
    });
  });
});
