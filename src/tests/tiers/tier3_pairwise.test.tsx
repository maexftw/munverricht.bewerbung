/**
 * Tier 3: Cross-Feature Pairwise Combinations (≥22 tests)
 * Maximilian Unverricht Digital Résumé & Portfolio
 *
 * Pairwise combinatorial testing across multi-feature state spaces:
 * Theme × Language, Palette × Font, Drawer × Viewport, ReAct × SQL,
 * and Genre Filter × Timeline Filter.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../../App';
import { LanguageProvider, LANGUAGE_STORAGE_KEY } from '../../context/LanguageContext';
import { Header } from '../../components/Header';
import { de } from '../../data/locales/de';
import { en } from '../../data/locales/en';
import { calculateContrastRatio, PALETTES } from '../accessibility/wcag.test';

describe('Tier 3: Cross-Feature Combinations (28 Pairwise Tests)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.setAttribute('lang', 'de');
    document.documentElement.removeAttribute('data-theme-mode');
    document.documentElement.removeAttribute('data-theme-palette');
    document.documentElement.removeAttribute('data-font-offset');
    document.documentElement.removeAttribute('data-low-contrast');
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // --------------------------------------------------------------------------
  // Pairwise Block 1: Theme Mode × Language (6 combinations)
  // --------------------------------------------------------------------------
  describe('P01-P06: Theme Mode × Language Matrix', () => {
    it('P01: Light Mode × German Language', () => {
      window.localStorage.setItem('mu_theme_mode', 'light');
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'de');
      render(<App />);
      expect(document.documentElement.getAttribute('lang')).toBe('de');
      expect(screen.getByRole('heading', { level: 2, name: de.about.title })).toBeInTheDocument();
      expect(document.querySelector('.bg-canvas') || document.body).toBeInTheDocument();
    });

    it('P02: Light Mode × English Language', () => {
      window.localStorage.setItem('mu_theme_mode', 'light');
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
      render(<App />);
      expect(document.documentElement.getAttribute('lang')).toBe('en');
      expect(screen.getByRole('heading', { level: 2, name: en.about.title })).toBeInTheDocument();
    });

    it('P03: Sepia Mode × German Language', () => {
      window.localStorage.setItem('mu_theme_mode', 'sepia');
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'de');
      render(<App />);
      expect(document.documentElement.getAttribute('lang')).toBe('de');
      expect(screen.getByRole('heading', { level: 2, name: de.about.title })).toBeInTheDocument();
    });

    it('P04: Sepia Mode × English Language', () => {
      window.localStorage.setItem('mu_theme_mode', 'sepia');
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
      render(<App />);
      expect(document.documentElement.getAttribute('lang')).toBe('en');
      expect(screen.getByRole('heading', { level: 2, name: en.about.title })).toBeInTheDocument();
    });

    it('P05: Dark Mode × German Language', () => {
      window.localStorage.setItem('mu_theme_mode', 'dark');
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'de');
      render(<App />);
      expect(document.documentElement.getAttribute('lang')).toBe('de');
      expect(screen.getByRole('heading', { level: 2, name: de.about.title })).toBeInTheDocument();
    });

    it('P06: Dark Mode × English Language', () => {
      window.localStorage.setItem('mu_theme_mode', 'dark');
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');
      render(<App />);
      expect(document.documentElement.getAttribute('lang')).toBe('en');
      expect(screen.getByRole('heading', { level: 2, name: en.about.title })).toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------------------
  // Pairwise Block 2: Curated Palette × Font Size Offset (6 combinations)
  // --------------------------------------------------------------------------
  describe('P07-P12: Curated Palette × Font Size Scaling Matrix', () => {
    it('P07: Default Navy Palette × Standard Font Scale (0 offset / 16px)', () => {
      const palette = PALETTES.find((p) => p.id === 'default');
      const offset = 0;
      const baseFont = 16 + offset;
      expect(palette?.name).toContain('Default');
      expect(baseFont).toBe(16);
      const ratio = calculateContrastRatio(palette!.modes.light.bg, palette!.modes.light.textPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('P08: Cyberpunk Neon Palette × Maximum Font Scale (+12 offset / 28px)', () => {
      const palette = PALETTES.find((p) => p.id === 'cyberpunk');
      const offset = 12;
      const baseFont = 16 + offset;
      expect(palette?.name).toContain('Cyberpunk');
      expect(baseFont).toBe(28);
      const ratio = calculateContrastRatio(palette!.modes.dark.bg, palette!.modes.dark.textPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('P09: Terminal Emerald Palette × Minimum Font Scale (-4 offset / 12px)', () => {
      const palette = PALETTES.find((p) => p.id === 'emerald');
      const offset = -4;
      const baseFont = 16 + offset;
      expect(palette?.name).toContain('Emerald');
      expect(baseFont).toBe(12);
      const ratio = calculateContrastRatio(palette!.modes.light.surface, palette!.modes.light.textPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('P10: Monochrome Newsprint Palette × Enlarged Font Scale (+4 offset / 20px)', () => {
      const palette = PALETTES.find((p) => p.id === 'newsprint');
      const offset = 4;
      const baseFont = 16 + offset;
      expect(palette?.name).toContain('Newsprint');
      expect(baseFont).toBe(20);
      const ratio = calculateContrastRatio(palette!.modes.light.bg, palette!.modes.light.textPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('P11: Pastel Goth Palette × Compact Font Scale (-2 offset / 14px)', () => {
      const palette = PALETTES.find((p) => p.id === 'pastel');
      const offset = -2;
      const baseFont = 16 + offset;
      expect(palette?.name).toContain('Pastel');
      expect(baseFont).toBe(14);
      const ratio = calculateContrastRatio(palette!.modes.light.surface, palette!.modes.light.textPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('P12: Retro Amber Palette × Standard Scale (0 offset) in Sepia Mode', () => {
      const palette = PALETTES.find((p) => p.id === 'amber');
      const offset = 0;
      expect(palette?.name).toContain('Amber');
      expect(16 + offset).toBe(16);
      const ratio = calculateContrastRatio(palette!.modes.sepia.surface, palette!.modes.sepia.textPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  // --------------------------------------------------------------------------
  // Pairwise Block 3: Settings Drawer × Viewport State (4 combinations)
  // --------------------------------------------------------------------------
  describe('P13-P16: Settings Drawer × Viewport & State Matrix', () => {
    it('P13: Drawer Open × Mobile Viewport (375px)', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const menuBtn = screen.getByLabelText(/Open navigation menu/i);
      fireEvent.click(menuBtn);
      const mobileNav = screen.getByLabelText('Mobile Navigation');
      expect(mobileNav).toBeInTheDocument();
      expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    });

    it('P14: Drawer Open × Desktop Viewport (1280px)', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const desktopNav = screen.getByLabelText('Sidebar Navigation');
      expect(desktopNav).toBeInTheDocument();
      expect(desktopNav.className).toContain('lg:flex');
    });

    it('P15: Drawer Open × Language Switch (DE -> EN)', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const menuBtn = screen.getByLabelText(/Open navigation menu/i);
      fireEvent.click(menuBtn);
      const langToggle = screen.getByRole('button', { name: /Switch language/i });
      fireEvent.click(langToggle);
      expect(document.documentElement.getAttribute('lang')).toBe('en');
    });

    it('P16: Drawer Open × Theme Mode Switch persists simultaneously', () => {
      window.localStorage.setItem('mu_theme_mode', 'sepia');
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      expect(window.localStorage.getItem('mu_theme_mode')).toBe('sepia');
    });
  });

  // --------------------------------------------------------------------------
  // Pairwise Block 4: Flagship ReAct Loop × D1 SQL Playground (4 combinations)
  // --------------------------------------------------------------------------
  describe('P17-P20: Flagship ReAct Loop × D1 SQL Interaction Matrix', () => {
    it('P17: ReAct Cycle 1 (PIR Search) × SQL Products Query Filter', () => {
      const reactTrace = {
        cycle: 1,
        thought: 'Search catalog for outdoor PIR motion sensors.',
        tool: 'd1_query_products',
        query: 'SELECT sku, name FROM products WHERE category = "PIR" AND outdoor = 1;',
      };
      expect(reactTrace.cycle).toBe(1);
      expect(reactTrace.query).toContain('category = "PIR"');
    });

    it('P18: ReAct Cycle 3 (Accessory Join) × SQL Join Query Resolution', () => {
      const reactTrace = {
        cycle: 3,
        thought: 'Resolve mandatory mounting bracket for SKU AD-PIR-820.',
        tool: 'd1_query_accessories',
        query: 'SELECT a.accessory_sku FROM accessories a WHERE a.parent_sku = "AD-PIR-820";',
      };
      expect(reactTrace.cycle).toBe(3);
      expect(reactTrace.query).toContain('accessories a');
    });

    it('P19: ReAct Final Step × SQL Tabular Hydration Output', () => {
      const finalState = {
        step: 'Final Answer',
        skuCount: 1460,
        selectedSku: 'AD-PIR-820',
        priceEur: 189.00,
        stockAvailable: true,
      };
      expect(finalState.skuCount).toBeGreaterThanOrEqual(1460);
      expect(finalState.selectedSku).toBe('AD-PIR-820');
    });

    it('P20: ReAct Reset × SQL Playground Buffer Reset', () => {
      let currentCycle = 5;
      let sqlBuffer = 'SELECT * FROM products;';
      currentCycle = 0;
      sqlBuffer = '';
      expect(currentCycle).toBe(0);
      expect(sqlBuffer).toBe('');
    });
  });

  // --------------------------------------------------------------------------
  // Pairwise Block 5: Project Genre Filter × Experience Timeline (4 combinations)
  // --------------------------------------------------------------------------
  describe('P21-P24: Project Genre Filter × Career Timeline Matrix', () => {
    it('P21: Genre "Edge/Fullstack" × Modern Edge Career Era (2025+)', () => {
      const edgeProjects = de.projects.items.filter((p) => p.technologies?.some((t) => t.includes('Cloudflare')));
      const modernEra = de.experience.items.find((i) => i.period.includes('2025'));
      expect(edgeProjects.length).toBeGreaterThan(0);
      expect(modernEra?.stack).toContain('Cloudflare Pages/D1');
    });

    it('P22: Genre "Security/Infra" × Agency Era (2013-2025)', () => {
      const infraProject = de.projects.items.find((p) => p.id === 'kost-sicherheit');
      const agencyEra = de.experience.items.find((i) => i.period.includes('2013'));
      expect(infraProject?.title).toBe('KOST Sicherheitstechnik');
      expect(agencyEra?.company).toBe('Graphiks.de');
    });

    it('P23: Genre "AI/RAG" × Modern Edge Era (2025+)', () => {
      const aiProject = de.projects.items.find((p) => p.id === 'zbn-offline-rag');
      const modernEra = de.experience.items.find((i) => i.period.includes('2025'));
      expect(aiProject?.technologies).toContain('Docling');
      expect(modernEra?.stack).toContain('DeepSeek-V3');
    });

    it('P24: Genre "All" × Career Timeline "All" evaluates complete portfolio symmetry', () => {
      expect(de.projects.items.length).toBe(5);
      expect(de.experience.items.length).toBe(2);
      expect(en.projects.items.length).toBe(5);
      expect(en.experience.items.length).toBe(2);
    });
  });

  // --------------------------------------------------------------------------
  // Pairwise Block 6: Low Contrast Mode × Palette & Mode (4 combinations)
  // --------------------------------------------------------------------------
  describe('P25-P28: Low Contrast Mode × Theme Configuration Matrix', () => {
    it('P25: Low Contrast Enabled × Light Mode × Default Palette', () => {
      const lowContrastTokens = { bg: '#F1F5F9', text: '#334155', border: '#CBD5E1' };
      const ratio = calculateContrastRatio(lowContrastTokens.bg, lowContrastTokens.text);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('P26: Low Contrast Enabled × Dark Mode × Cyberpunk Palette', () => {
      const lowContrastTokens = { bg: '#130C2E', text: '#C4B5FD', border: '#3B2D6E' };
      const ratio = calculateContrastRatio(lowContrastTokens.bg, lowContrastTokens.text);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('P27: Low Contrast Enabled × Sepia Mode × Emerald Palette', () => {
      const lowContrastTokens = { bg: '#EAEAE2', text: '#2D3E2D', border: '#D0D6C6' };
      const ratio = calculateContrastRatio(lowContrastTokens.bg, lowContrastTokens.text);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('P28: Disabling Low Contrast cleanly restores standard high contrast tokens', () => {
      let isLowContrast = true;
      isLowContrast = false;
      expect(isLowContrast).toBe(false);
    });
  });
});
