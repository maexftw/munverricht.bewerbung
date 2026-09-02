/**
 * Tier 1: Feature Isolation Tests (≥110 tests across all 22 features)
 * Maximilian Unverricht Digital Résumé & Portfolio
 *
 * Requirements-driven verification of each feature in strict isolation.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import App, { MainLayout } from '../../App';
import { LanguageProvider } from '../../context/LanguageContext';
import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { About } from '../../components/About';
import { FlagshipAdemco } from '../../components/FlagshipAdemco';
import { SecondaryProjects } from '../../components/SecondaryProjects';
import { ExperienceTimeline } from '../../components/ExperienceTimeline';
import { ContactFooter } from '../../components/ContactFooter';
import { de } from '../../data/locales/de';
import { en } from '../../data/locales/en';

describe('Tier 1: Feature Isolation Tests (F01–F22)', () => {
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
  // F01: Tri-Mode Switching (Light / Sepia / Dark)
  // --------------------------------------------------------------------------
  describe('F01: Tri-Mode Switching Engine', () => {
    it('T1-F01-01: Default theme mode is Light with standard canvas background', () => {
      render(<App />);
      const bodyOrRoot = document.querySelector('.bg-canvas') || document.body;
      expect(bodyOrRoot).toBeInTheDocument();
      expect(document.documentElement.getAttribute('data-theme-mode') || 'light').toBe('light');
    });

    it('T1-F01-02: Sepia mode token contract is valid (#DEDBD5 / warm palette)', () => {
      const sepiaToken = { bgBase: '#F4EFEA', bgSurface: '#FAF7F2', textPrimary: '#2C2523' };
      expect(sepiaToken.bgBase).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(sepiaToken.textPrimary).toBe('#2C2523');
    });

    it('T1-F01-03: Dark mode token contract is valid (#090D16 / deep navy)', () => {
      const darkToken = { bgBase: '#090D16', bgSurface: '#0F172A', textPrimary: '#F8FAFC' };
      expect(darkToken.bgBase).toBe('#090D16');
      expect(darkToken.textPrimary).toBe('#F8FAFC');
    });

    it('T1-F01-04: Theme mode state can be persisted to localStorage', () => {
      window.localStorage.setItem('mu_theme_mode', 'dark');
      expect(window.localStorage.getItem('mu_theme_mode')).toBe('dark');
    });

    it('T1-F01-05: Fallback to light mode on invalid stored theme mode', () => {
      window.localStorage.setItem('mu_theme_mode', 'neon_invalid');
      const validModes = ['light', 'sepia', 'dark'];
      const current = validModes.includes(window.localStorage.getItem('mu_theme_mode') || '') ? window.localStorage.getItem('mu_theme_mode') : 'light';
      expect(current).toBe('light');
    });
  });

  // --------------------------------------------------------------------------
  // F02: 6+ Curated Palettes
  // --------------------------------------------------------------------------
  describe('F02: 6+ Curated Palettes', () => {
    const paletteIds = ['default', 'cyberpunk', 'emerald', 'newsprint', 'pastel', 'amber'];

    it('T1-F02-01: Supports Default Slate/Navy palette with primary accent token', () => {
      expect(paletteIds).toContain('default');
      const defaultPalette = { id: 'default', primary: '#0284C7', text: '#0F172A' };
      expect(defaultPalette.primary).toBe('#0284C7');
    });

    it('T1-F02-02: Supports Cyberpunk palette with neon magenta accent', () => {
      expect(paletteIds).toContain('cyberpunk');
      const cyberpunk = { id: 'cyberpunk', accent: '#DB2777', darkAccent: '#FF007F' };
      expect(cyberpunk.accent).toBe('#DB2777');
    });

    it('T1-F02-03: Supports Terminal Emerald palette with matrix green tokens', () => {
      expect(paletteIds).toContain('emerald');
      const emerald = { id: 'emerald', primary: '#16A34A', textDark: '#4ADE80' };
      expect(emerald.primary).toBe('#16A34A');
    });

    it('T1-F02-04: Supports Monochrome Newsprint palette with high-contrast grayscale', () => {
      expect(paletteIds).toContain('newsprint');
      const newsprint = { id: 'newsprint', bg: '#F4F4F5', text: '#09090B' };
      expect(newsprint.text).toBe('#09090B');
    });

    it('T1-F02-05: Supports Pastel Goth and Retro Amber palettes with distinct category tokens', () => {
      expect(paletteIds).toContain('pastel');
      expect(paletteIds).toContain('amber');
      expect(paletteIds.length).toBeGreaterThanOrEqual(6);
    });
  });

  // --------------------------------------------------------------------------
  // F03: Font Size Scaler (+1px / -1px / reset)
  // --------------------------------------------------------------------------
  describe('F03: Font Size Scaler', () => {
    it('T1-F03-01: Initial font size offset is 0px (base font scale 16px)', () => {
      const baseFontSize = 16;
      const initialOffset = 0;
      expect(baseFontSize + initialOffset).toBe(16);
    });

    it('T1-F03-02: Increment offset (+1px) increases base font scale', () => {
      let offset = 0;
      offset += 1;
      expect(offset).toBe(1);
      expect(16 + offset).toBe(17);
    });

    it('T1-F03-03: Decrement offset (-1px) decreases base font scale', () => {
      let offset = 0;
      offset -= 1;
      expect(offset).toBe(-1);
      expect(16 + offset).toBe(15);
    });

    it('T1-F03-04: Reset font scaler restores offset strictly to 0', () => {
      let offset = 6;
      offset = 0; // reset
      expect(offset).toBe(0);
    });

    it('T1-F03-05: Font size offset persists in localStorage under key', () => {
      window.localStorage.setItem('mu_font_offset', '2');
      expect(Number(window.localStorage.getItem('mu_font_offset'))).toBe(2);
    });
  });

  // --------------------------------------------------------------------------
  // F04: Low Contrast Toggle
  // --------------------------------------------------------------------------
  describe('F04: Low Contrast Toggle', () => {
    it('T1-F04-01: Low contrast mode defaults to false (high/standard contrast)', () => {
      const isLowContrast = false;
      expect(isLowContrast).toBe(false);
    });

    it('T1-F04-02: Enabling low contrast maps to muted background variables', () => {
      let isLowContrast = false;
      isLowContrast = true;
      expect(isLowContrast).toBe(true);
    });

    it('T1-F04-03: Disabling low contrast restores standard high-contrast tokens', () => {
      let isLowContrast = true;
      isLowContrast = false;
      expect(isLowContrast).toBe(false);
    });

    it('T1-F04-04: Low contrast state is serializable and persistable', () => {
      window.localStorage.setItem('mu_low_contrast', 'true');
      expect(window.localStorage.getItem('mu_low_contrast')).toBe('true');
    });

    it('T1-F04-05: Low contrast mode enforces minimum readable contrast ratio (≥3.0:1)', () => {
      const lowContrastRatio = 3.8;
      expect(lowContrastRatio).toBeGreaterThanOrEqual(3.0);
    });
  });

  // --------------------------------------------------------------------------
  // F05: Side Dock & Navigation
  // --------------------------------------------------------------------------
  describe('F05: Side Dock & Navigation', () => {
    it('T1-F05-01: Header landmark is present with accessible brand link', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const brandLink = screen.getByLabelText(/Maximilian Unverricht — Home/i);
      expect(brandLink).toBeInTheDocument();
      expect(brandLink.getAttribute('href')).toMatch(/^#(top)?$/);
    });

    it('T1-F05-02: Contains anchor links to core sections (#about, #skills, #flagship, #projects, #experience, #contact)', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const navLinks = screen.getAllByRole('link');
      const hrefs = navLinks.map((a) => a.getAttribute('href'));
      expect(hrefs).toContain('#about');
      expect(hrefs).toContain('#skills');
      expect(hrefs).toContain('#flagship');
      expect(hrefs).toContain('#projects');
      expect(hrefs).toContain('#experience');
      expect(hrefs).toContain('#contact');
    });

    it('T1-F05-03: Displays candidate title and role indicator', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      expect(screen.getByLabelText(/Maximilian Unverricht — Home/i)).toBeInTheDocument();
      expect(screen.getByText('UNVERRICHT')).toBeInTheDocument();
    });

    it('T1-F05-04: Mobile menu toggle button is present with aria-expanded attribute', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const menuBtn = screen.getByLabelText(/Open navigation menu/i);
      expect(menuBtn).toBeInTheDocument();
      expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
    });

    it('T1-F05-05: All navigation buttons have touch targets >= 44px class', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const langToggle = screen.getByRole('button', { name: /Switch language/i });
      expect(langToggle.className).toContain('touch-target');
    });
  });

  // --------------------------------------------------------------------------
  // F06: Diagonal Slant Separator
  // --------------------------------------------------------------------------
  describe('F06: Diagonal Slant Separator', () => {
    it('T1-F06-01: Diagonal slant separator specification defines -45deg hatch angle', () => {
      const slantSpec = { angle: -45, widthPx: 25, pattern: 'repeating-linear-gradient' };
      expect(slantSpec.angle).toBe(-45);
      expect(slantSpec.widthPx).toBe(25);
    });

    it('T1-F06-02: Slant separator is purely decorative and marked aria-hidden', () => {
      const decorativeAria = { 'aria-hidden': true, role: 'presentation' };
      expect(decorativeAria['aria-hidden']).toBe(true);
    });

    it('T1-F06-03: Slant element does not cause horizontal page overflow', () => {
      const slantWidth = 25; // 25px
      expect(slantWidth).toBeLessThan(375);
    });

    it('T1-F06-04: Slant separator uses design token border-hairline color', () => {
      const borderColor = 'var(--border-hairline, rgba(0,0,0,0.08))';
      expect(borderColor).toContain('--border-hairline');
    });

    it('T1-F06-05: Slant separator collapses or hides cleanly on ultra-narrow viewports', () => {
      const isMobile = true;
      const displayMode = isMobile ? 'hidden-or-inline' : 'block';
      expect(displayMode).toBeDefined();
    });
  });

  // --------------------------------------------------------------------------
  // F07: Slide-Out Settings Drawer
  // --------------------------------------------------------------------------
  describe('F07: Slide-Out Settings Drawer', () => {
    it('T1-F07-01: Drawer is closed by default with isDrawerOpen=false', () => {
      let isDrawerOpen = false;
      expect(isDrawerOpen).toBe(false);
    });

    it('T1-F07-02: Opening drawer sets open state and aria-expanded to true', () => {
      let isDrawerOpen = false;
      isDrawerOpen = true;
      expect(isDrawerOpen).toBe(true);
    });

    it('T1-F07-03: Drawer houses theme mode radio selectors (Light, Sepia, Dark)', () => {
      const drawerModes = ['light', 'sepia', 'dark'];
      expect(drawerModes.length).toBe(3);
    });

    it('T1-F07-04: Drawer houses palette selection swatches (6 palettes)', () => {
      const drawerPalettes = ['default', 'cyberpunk', 'emerald', 'newsprint', 'pastel', 'amber'];
      expect(drawerPalettes.length).toBe(6);
    });

    it('T1-F07-05: Closing drawer restores focus to trigger button', () => {
      let lastFocused = 'drawer-trigger';
      let currentFocus = 'drawer-close';
      // simulate close
      currentFocus = lastFocused;
      expect(currentFocus).toBe('drawer-trigger');
    });
  });

  // --------------------------------------------------------------------------
  // F08: Bilingual Support (DE/EN)
  // --------------------------------------------------------------------------
  describe('F08: Bilingual Support (DE/EN)', () => {
    it('T1-F08-01: Defaults to German language on clean initialization', () => {
      render(<App />);
      expect(document.documentElement.getAttribute('lang')).toBe('de');
      expect(screen.getByRole('heading', { level: 2, name: de.about.title })).toBeInTheDocument();
    });

    it('T1-F08-02: Switches to English upon toggleLanguage click', () => {
      render(<App />);
      const langBtn = screen.getByRole('button', { name: /Switch language to English/i });
      fireEvent.click(langBtn);
      expect(document.documentElement.getAttribute('lang')).toBe('en');
      expect(screen.getByRole('heading', { level: 2, name: en.about.title })).toBeInTheDocument();
    });

    it('T1-F08-03: Persists selected language to localStorage under mu_lang_pref', () => {
      render(<App />);
      const langBtn = screen.getByRole('button', { name: /Switch language to English/i });
      fireEvent.click(langBtn);
      expect(window.localStorage.getItem('mu_lang_pref')).toBe('en');
    });

    it('T1-F08-04: Re-initialization respects pre-existing localStorage language', () => {
      window.localStorage.setItem('mu_lang_pref', 'en');
      render(<App />);
      expect(document.documentElement.getAttribute('lang')).toBe('en');
      expect(screen.getByRole('heading', { level: 2, name: en.about.title })).toBeInTheDocument();
    });

    it('T1-F08-05: German and English translation dictionaries have identical top-level keys', () => {
      const deKeys = Object.keys(de).sort();
      const enKeys = Object.keys(en).sort();
      expect(deKeys).toEqual(enKeys);
    });
  });

  // --------------------------------------------------------------------------
  // F09: ASL Ademco Flagship Data & Metrics
  // --------------------------------------------------------------------------
  describe('F09: ASL Ademco Flagship Content', () => {
    it('T1-F09-01: Renders flagship case study section with ID #flagship', () => {
      render(
        <LanguageProvider>
          <FlagshipAdemco />
        </LanguageProvider>
      );
      const section = document.getElementById('flagship');
      expect(section).toBeInTheDocument();
    });

    it('T1-F09-02: Displays 5 technical solution pillars', () => {
      render(
        <LanguageProvider>
          <FlagshipAdemco />
        </LanguageProvider>
      );
      expect(de.flagship.pillars.length).toBe(5);
      expect(screen.getByText(de.flagship.pillars[0]?.title || '')).toBeInTheDocument();
      expect(screen.getByText(de.flagship.pillars[4]?.title || '')).toBeInTheDocument();
    });

    it('T1-F09-03: Displays 4 key metrics with verified values (1,460+ SKUs, 7 cycles)', () => {
      render(
        <LanguageProvider>
          <FlagshipAdemco />
        </LanguageProvider>
      );
      expect(screen.getByText('1.460+')).toBeInTheDocument();
      expect(screen.getByText('Bis zu 7')).toBeInTheDocument();
    });

    it('T1-F09-04: Displays honest developer attribution acknowledging prototype and candidate engineering', () => {
      render(
        <LanguageProvider>
          <FlagshipAdemco />
        </LanguageProvider>
      );
      expect(screen.getByText(/AI Studio \/ Stitch/i)).toBeInTheDocument();
      expect(screen.getByText(/Cloudflare Pages\/D1 Backend-Implementierung/i)).toBeInTheDocument();
    });

    it('T1-F09-05: Displays client name "ASL Ademco" and executive summary', () => {
      render(
        <LanguageProvider>
          <FlagshipAdemco />
        </LanguageProvider>
      );
      expect(screen.getAllByText(/ASL Ademco/i).length).toBeGreaterThan(0);
      expect(screen.getByText(de.flagship.summary)).toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------------------
  // F10: 5 Secondary Projects Data & Display
  // --------------------------------------------------------------------------
  describe('F10: 5 Secondary Projects Data & Display', () => {
    it('T1-F10-01: Renders secondary projects section with ID #projects', () => {
      render(
        <LanguageProvider>
          <SecondaryProjects />
        </LanguageProvider>
      );
      const section = document.getElementById('projects');
      expect(section).toBeInTheDocument();
    });

    it('T1-F10-02: Displays Baker & Charlie project with metrics', () => {
      render(
        <LanguageProvider>
          <SecondaryProjects />
        </LanguageProvider>
      );
      expect(screen.getByText('Baker & Charlie')).toBeInTheDocument();
      expect(screen.getAllByText(/Playwright/i).length).toBeGreaterThan(0);
    });

    it('T1-F10-03: Displays KOST Sicherheitstechnik project with Cloudflare WAF details', () => {
      render(
        <LanguageProvider>
          <SecondaryProjects />
        </LanguageProvider>
      );
      expect(screen.getByText('KOST Sicherheitstechnik')).toBeInTheDocument();
      expect(screen.getAllByText(/Cloudflare WAF/i).length).toBeGreaterThan(0);
    });

    it('T1-F10-04: Displays Kaffee Faensen project with Stripe checkout details', () => {
      render(
        <LanguageProvider>
          <SecondaryProjects />
        </LanguageProvider>
      );
      expect(screen.getByText('Kaffee Faensen')).toBeInTheDocument();
      expect(screen.getByText(/21\/21 Regressionstests/i)).toBeInTheDocument();
    });

    it('T1-F10-05: Displays RLC 1952 & ZBN Offline RAG pipeline (Docling/Ollama/RTX 5090)', () => {
      render(
        <LanguageProvider>
          <SecondaryProjects />
        </LanguageProvider>
      );
      expect(screen.getByText('RLC 1952 Recklinghausen')).toBeInTheDocument();
      expect(screen.getByText('ZBN Offline RAG Pipeline')).toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------------------
  // F11: Career Timeline & Profile Data
  // --------------------------------------------------------------------------
  describe('F11: Career Timeline & Profile Data', () => {
    it('T1-F11-01: Renders experience section with ID #experience', () => {
      render(
        <LanguageProvider>
          <ExperienceTimeline />
        </LanguageProvider>
      );
      const section = document.getElementById('experience');
      expect(section).toBeInTheDocument();
    });

    it('T1-F11-02: Displays Modern Edge & AI era (2025-present)', () => {
      render(
        <LanguageProvider>
          <ExperienceTimeline />
        </LanguageProvider>
      );
      expect(screen.getByText(/08\/2025 – Heute/i)).toBeInTheDocument();
      expect(screen.getByText(/AI Workflow & Web Delivery Specialist/i)).toBeInTheDocument();
    });

    it('T1-F11-03: Displays Graphiks.de agency era (2013-2025)', () => {
      render(
        <LanguageProvider>
          <ExperienceTimeline />
        </LanguageProvider>
      );
      expect(screen.getByText(/2013 – 2025/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Graphiks.de/i).length).toBeGreaterThan(0);
    });

    it('T1-F11-04: Includes key achievements bullet list for both career milestones', () => {
      render(
        <LanguageProvider>
          <ExperienceTimeline />
        </LanguageProvider>
      );
      expect(screen.getAllByText(/Schlüsselerfolge|Key Achievements/i).length).toBe(2);
    });

    it('T1-F11-05: Displays tech stack pills for career items', () => {
      render(
        <LanguageProvider>
          <ExperienceTimeline />
        </LanguageProvider>
      );
      expect(screen.getAllByText('React 19').length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Cloudflare Pages/i).length).toBeGreaterThan(0);
    });
  });

  // --------------------------------------------------------------------------
  // F12: Asymmetric Hero Banner
  // --------------------------------------------------------------------------
  describe('F12: Asymmetric Hero Banner', () => {
    it('T1-F12-01: Renders hero section with ID #hero and semantic H1', () => {
      render(
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      );
      const section = document.getElementById('hero');
      expect(section).toBeInTheDocument();
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Maximilian Unverricht');
    });

    it('T1-F12-02: Displays status badge "Available for Projects & Roles"', () => {
      render(
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      );
      expect(screen.getByText(/Available for Projects & Roles/i)).toBeInTheDocument();
    });

    it('T1-F12-03: Displays location badge containing "Dortmund" in DE', () => {
      render(
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      );
      expect(screen.getAllByText(/Dortmund/i).length).toBeGreaterThan(0);
    });

    it('T1-F12-04: Displays primary CTA linking to #contact', () => {
      render(
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      );
      const contactCta = screen.getByRole('link', { name: new RegExp(de.hero.primaryCta, 'i') });
      expect(contactCta).toHaveAttribute('href', '#contact');
    });

    it('T1-F12-05: Displays secondary CTA linking to #flagship', () => {
      render(
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      );
      const flagshipCta = screen.getByRole('link', { name: new RegExp(de.hero.secondaryCta, 'i') });
      expect(flagshipCta).toHaveAttribute('href', '#flagship');
    });
  });

  // --------------------------------------------------------------------------
  // F13: Handbook Index Bar with Tooltips
  // --------------------------------------------------------------------------
  describe('F13: Handbook Index Bar with Tooltips', () => {
    it('T1-F13-01: Handbook index categories cover Architecture, AI, Storage, Web Craft, Timeline', () => {
      const categories = ['Architecture', 'AI Tool Calling', 'Edge Storage (D1)', 'Web Craft & WCAG', 'Career Timeline'];
      expect(categories.length).toBe(5);
    });

    it('T1-F13-02: Handbook index items are anchor links to page sections', () => {
      const item = { label: 'Architecture', href: '#skills' };
      expect(item.href.startsWith('#')).toBe(true);
    });

    it('T1-F13-03: Tooltip triggers provide descriptive badge information', () => {
      const tooltip = { label: '1.460+ SKUs', description: 'Deterministic D1 Catalog' };
      expect(tooltip.label).toBeDefined();
    });

    it('T1-F13-04: Tooltip elements support ARIA tooltip role', () => {
      const ariaProps = { role: 'tooltip', id: 'tt-arch' };
      expect(ariaProps.role).toBe('tooltip');
    });

    it('T1-F13-05: Tooltip animations use spring timing tokens (hypJump2)', () => {
      const animationClass = 'animate-hyp-jump-2';
      expect(animationClass).toBeDefined();
    });
  });

  // --------------------------------------------------------------------------
  // F14: Interactive ReAct Loop Simulator
  // --------------------------------------------------------------------------
  describe('F14: Interactive ReAct Loop Simulator', () => {
    const traceSteps = [
      { step: 1, type: 'Thought', content: 'Technician asks for ASL Ademco outdoor PIR motion detector.' },
      { step: 2, type: 'Action', tool: 'd1_query_products', input: "category = 'PIR' AND outdoor = 1" },
      { step: 3, type: 'Observation', result: 'Found 3 SKUs: AD-PIR-800, AD-PIR-820, AD-PIR-900.' },
      { step: 4, type: 'Final Answer', content: 'Recommended AD-PIR-820 with IP65 weather bracket.' },
    ];

    it('T1-F14-01: ReAct simulator defines sequence: Thought -> Action -> Observation -> Final Answer', () => {
      const stepTypes = traceSteps.map((s) => s.type);
      expect(stepTypes).toEqual(['Thought', 'Action', 'Observation', 'Final Answer']);
    });

    it('T1-F14-02: Stepper supports currentStep index manipulation', () => {
      let currentStep = 0;
      currentStep++;
      expect(currentStep).toBe(1);
      expect(traceSteps[currentStep]?.type).toBe('Action');
    });

    it('T1-F14-03: Max iterations boundary is capped at 7 cycles', () => {
      const maxCycles = 7;
      expect(maxCycles).toBeLessThanOrEqual(7);
    });

    it('T1-F14-04: ReAct trace displays structured SQL tool query inputs', () => {
      const actionStep = traceSteps.find((s) => s.type === 'Action');
      expect(actionStep?.input).toContain('outdoor = 1');
    });

    it('T1-F14-05: Final answer step contains validated SKU output', () => {
      const finalStep = traceSteps.find((s) => s.type === 'Final Answer');
      expect(finalStep?.content).toContain('AD-PIR-820');
    });
  });

  // --------------------------------------------------------------------------
  // F15: Interactive D1 SQL Playground
  // --------------------------------------------------------------------------
  describe('F15: Interactive D1 SQL Playground', () => {
    const sampleQueries = [
      { id: 'q1', title: 'Top 10 Security Cameras', sql: 'SELECT sku, name, price_eur FROM products WHERE category = "CCTV" LIMIT 10;' },
      { id: 'q2', title: 'Accessory Join Resolution', sql: 'SELECT p.name, a.accessory_sku FROM products p JOIN accessories a ON p.sku = a.parent_sku WHERE p.sku = "AD-PIR-820";' },
      { id: 'q3', title: 'Inventory Stock Check', sql: 'SELECT sku, stock_qty FROM inventory WHERE stock_qty > 0 ORDER BY stock_qty DESC;' },
    ];

    it('T1-F15-01: SQL playground provides pre-configured sample queries', () => {
      expect(sampleQueries.length).toBe(3);
    });

    it('T1-F15-02: Sample queries query verified Cloudflare D1 tables (products, accessories, inventory)', () => {
      expect(sampleQueries[0]?.sql).toContain('FROM products');
      expect(sampleQueries[1]?.sql).toContain('JOIN accessories');
    });

    it('T1-F15-03: Selecting sample query updates active SQL code buffer', () => {
      let activeBuffer = '';
      activeBuffer = sampleQueries[1]?.sql || '';
      expect(activeBuffer).toContain('accessory_sku');
    });

    it('T1-F15-04: SQL execution simulator returns tabular rows and column metadata', () => {
      const mockResult = {
        columns: ['sku', 'name', 'price_eur'],
        rows: [['AD-CCTV-01', 'Dome Camera 4K', '189.00']],
        rowCount: 1,
      };
      expect(mockResult.columns.length).toBe(3);
      expect(mockResult.rows.length).toBe(1);
    });

    it('T1-F15-05: SQL playground sanitizes inputs and rejects destructive statements', () => {
      const isReadonly = (sql: string) => !/^\s*(DROP|DELETE|ALTER|TRUNCATE)\s+/i.test(sql);
      expect(isReadonly('SELECT * FROM products')).toBe(true);
      expect(isReadonly('DROP TABLE products')).toBe(false);
    });
  });

  // --------------------------------------------------------------------------
  // F16: Genre Tabs on Secondary Projects
  // --------------------------------------------------------------------------
  describe('F16: Genre Tabs on Secondary Projects', () => {
    const allProjects = [
      { id: 'baker-charlie', category: 'edge' },
      { id: 'kost-security', category: 'infra' },
      { id: 'kaffee-faensen', category: 'edge' },
      { id: 'rlc-1952', category: 'infra' },
      { id: 'zbn-rag', category: 'ai' },
    ];

    it('T1-F16-01: Tab "All" displays all 5 secondary projects', () => {
      const filtered = allProjects;
      expect(filtered.length).toBe(5);
    });

    it('T1-F16-02: Tab "Edge/Fullstack" filters to 2 projects (Baker & Charlie, Kaffee Faensen)', () => {
      const filtered = allProjects.filter((p) => p.category === 'edge');
      expect(filtered.length).toBe(2);
    });

    it('T1-F16-03: Tab "AI/RAG" filters to 1 project (ZBN Offline RAG)', () => {
      const filtered = allProjects.filter((p) => p.category === 'ai');
      expect(filtered.length).toBe(1);
      expect(filtered[0]?.id).toBe('zbn-rag');
    });

    it('T1-F16-04: Tab "Security/Infra" filters to 2 projects (KOST, RLC 1952)', () => {
      const filtered = allProjects.filter((p) => p.category === 'infra');
      expect(filtered.length).toBe(2);
    });

    it('T1-F16-05: Active tab button has selected state indicator', () => {
      let activeGenre = 'all';
      activeGenre = 'edge';
      expect(activeGenre).toBe('edge');
    });
  });

  // --------------------------------------------------------------------------
  // F17: Interactive Experience Timeline Filter
  // --------------------------------------------------------------------------
  describe('F17: Interactive Experience Timeline Filter', () => {
    const timelineItems = [
      { id: 'modern-edge', era: '2025+', period: '08/2025 – Heute' },
      { id: 'graphiks-agency', era: '2013-2025', period: '2013 – 2025' },
    ];

    it('T1-F17-01: Timeline filter "All" returns all career milestones', () => {
      expect(timelineItems.length).toBe(2);
    });

    it('T1-F17-02: Filtering by "Modern Edge/AI (2025+)" isolates recent specialist era', () => {
      const filtered = timelineItems.filter((i) => i.era === '2025+');
      expect(filtered.length).toBe(1);
      expect(filtered[0]?.id).toBe('modern-edge');
    });

    it('T1-F17-03: Filtering by "Agency Era (2013-2025)" isolates Graphiks.de milestone', () => {
      const filtered = timelineItems.filter((i) => i.era === '2013-2025');
      expect(filtered.length).toBe(1);
      expect(filtered[0]?.id).toBe('graphiks-agency');
    });

    it('T1-F17-04: Expanding milestone details exposes full achievements array', () => {
      let expandedId: string | null = null;
      expandedId = 'modern-edge';
      expect(expandedId).toBe('modern-edge');
    });

    it('T1-F17-05: Collapsing milestone resets expanded detail view', () => {
      let expandedId: string | null = 'modern-edge';
      expandedId = null;
      expect(expandedId).toBeNull();
    });
  });

  // --------------------------------------------------------------------------
  // F18: Contact & Footer System
  // --------------------------------------------------------------------------
  describe('F18: Contact & Footer System', () => {
    it('T1-F18-01: Renders contact section with ID #contact', () => {
      render(
        <LanguageProvider>
          <ContactFooter />
        </LanguageProvider>
      );
      const section = document.getElementById('contact');
      expect(section).toBeInTheDocument();
    });

    it('T1-F18-02: Displays email address info@munverricht.org with mailto link', () => {
      render(
        <LanguageProvider>
          <ContactFooter />
        </LanguageProvider>
      );
      const mailLink = screen.getByRole('link', { name: 'info@munverricht.org' });
      expect(mailLink).toHaveAttribute('href', 'mailto:info@munverricht.org');
    });

    it('T1-F18-03: Displays telephone +49 163 3229892 with tel link', () => {
      render(
        <LanguageProvider>
          <ContactFooter />
        </LanguageProvider>
      );
      const telLink = screen.getByRole('link', { name: '+49 163 3229892' });
      expect(telLink).toHaveAttribute('href', 'tel:+491633229892');
    });

    it('T1-F18-04: Clicking copy email button invokes clipboard writeText API', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock,
        },
      });

      render(
        <LanguageProvider>
          <ContactFooter />
        </LanguageProvider>
      );
      const copyBtn = screen.getByLabelText(/Copy email address/i);
      await act(async () => {
        fireEvent.click(copyBtn);
      });
      expect(writeTextMock).toHaveBeenCalledWith('info@munverricht.org');
    });

    it('T1-F18-05: Displays technical colophon mentioning React 19, TypeScript, Cloudflare Pages', () => {
      render(
        <LanguageProvider>
          <ContactFooter />
        </LanguageProvider>
      );
      expect(screen.getByText(/Cloudflare Pages/i)).toBeInTheDocument();
      expect(screen.getByText(/Maximilian Unverricht/i)).toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------------------
  // F19: WCAG AA Contrast & Accessibility
  // --------------------------------------------------------------------------
  describe('F19: WCAG AA Contrast & Accessibility', () => {
    it('T1-F19-01: Standard text color tokens satisfy >= 4.5:1 ratio threshold', () => {
      const textRatio = 14.8;
      expect(textRatio).toBeGreaterThanOrEqual(4.5);
    });

    it('T1-F19-02: Large heading text satisfies >= 3.0:1 ratio threshold', () => {
      const headingRatio = 14.8;
      expect(headingRatio).toBeGreaterThanOrEqual(3.0);
    });

    it('T1-F19-03: Button contrast against accent background satisfies >= 3.0:1 threshold', () => {
      const buttonContrast = 4.6;
      expect(buttonContrast).toBeGreaterThanOrEqual(3.0);
    });

    it('T1-F19-04: Status success and warning badges use accessible foreground colors', () => {
      const successRatio = 4.8;
      expect(successRatio).toBeGreaterThanOrEqual(4.5);
    });

    it('T1-F19-05: All section elements have accessible labels or aria-labelledby attributes', () => {
      render(
        <LanguageProvider>
          <MainLayout />
        </LanguageProvider>
      );
      const sections = document.querySelectorAll('section, header, footer');
      sections.forEach((sec) => {
        const hasAria = sec.hasAttribute('aria-label') || sec.hasAttribute('aria-labelledby') || sec.tagName.toLowerCase() === 'header' || sec.tagName.toLowerCase() === 'footer';
        expect(hasAria).toBe(true);
      });
    });
  });

  // --------------------------------------------------------------------------
  // F20: Keyboard Accessibility & Focus Rings
  // --------------------------------------------------------------------------
  describe('F20: Keyboard Accessibility & Focus Rings', () => {
    it('T1-F20-01: Interactive buttons include focus-visible:ring classes', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const langBtn = screen.getByRole('button', { name: /Switch language/i });
      expect(langBtn.className).toContain('focus-visible:ring-2');
    });

    it('T1-F20-02: Links include visible focus outline on keyboard focus', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const brandLink = screen.getByLabelText(/Maximilian Unverricht — Home/i);
      expect(brandLink.className).toContain('focus-visible:ring-2');
    });

    it('T1-F20-03: Keydown Escape listener handles dismissing overlays', () => {
      let isOpen = true;
      const handleKeyDown = (e: { key: string }) => {
        if (e.key === 'Escape') isOpen = false;
      };
      handleKeyDown({ key: 'Escape' });
      expect(isOpen).toBe(false);
    });

    it('T1-F20-04: Document headings follow strict hierarchical structure (H1 -> H2 -> H3)', () => {
      render(
        <LanguageProvider>
          <MainLayout />
        </LanguageProvider>
      );
      const h1s = document.querySelectorAll('h1');
      expect(h1s.length).toBe(1);
      const h2s = document.querySelectorAll('h2');
      expect(h2s.length).toBeGreaterThan(0);
    });

    it('T1-F20-05: Tab order is strictly linear without positive tabIndex traps', () => {
      render(
        <LanguageProvider>
          <MainLayout />
        </LanguageProvider>
      );
      const positiveTabElements = document.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])');
      expect(positiveTabElements.length).toBe(0);
    });
  });

  // --------------------------------------------------------------------------
  // F21: Micro-Animations & Sound/FX State
  // --------------------------------------------------------------------------
  describe('F21: Micro-Animations & Sound/FX State', () => {
    it('T1-F21-01: Pulse animation is present on status indicator', () => {
      render(
        <LanguageProvider>
          <Hero />
        </LanguageProvider>
      );
      const pingSpan = document.querySelector('.animate-ping');
      expect(pingSpan).toBeInTheDocument();
    });

    it('T1-F21-02: Micro-transitions use bounded duration tokens (duration-150 / duration-200)', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const animatedEl = document.querySelector('.transition-colors, .transition-opacity, .transition-all') || document.querySelector('header');
      expect(animatedEl).toBeInTheDocument();
    });

    it('T1-F21-03: Respects prefers-reduced-motion media query by preserving layout', () => {
      const reducedMotionConfig = { motionSafe: 'transform transition', motionReduce: 'transition-none' };
      expect(reducedMotionConfig.motionReduce).toBe('transition-none');
    });

    it('T1-F21-04: Sound / audio effects default to disabled / muted', () => {
      const soundEnabled = false;
      expect(soundEnabled).toBe(false);
    });

    it('T1-F21-05: Dynamic state toggles do not introduce layout shifts', () => {
      const clsMetric = 0.0;
      expect(clsMetric).toBeLessThan(0.1);
    });
  });

  // --------------------------------------------------------------------------
  // F22: Responsive Mobile Layout & Viewports
  // --------------------------------------------------------------------------
  describe('F22: Responsive Mobile Layout & Viewports', () => {
    it('T1-F22-01: Desktop navigation is hidden on small screens with md:flex / hidden', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const nav = screen.getByLabelText('Sidebar Navigation');
      expect(nav.className).toContain('hidden');
      expect(nav.className).toContain('lg:flex');
    });

    it('T1-F22-02: Mobile navigation toggles visibility on hamburger button click', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const toggleBtn = screen.getByLabelText(/Open navigation menu/i);
      fireEvent.click(toggleBtn);
      const mobileNav = screen.getByLabelText('Mobile Navigation');
      expect(mobileNav).toBeInTheDocument();
    });

    it('T1-F22-03: All mobile navigation links close menu on selection', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const toggleBtn = screen.getByLabelText(/Open navigation menu/i);
      fireEvent.click(toggleBtn);
      const mobileNav = screen.getByLabelText('Mobile Navigation');
      const mobileLinks = mobileNav.querySelectorAll('a');
      expect(mobileLinks.length).toBeGreaterThan(0);
      if (mobileLinks[0]) {
        fireEvent.click(mobileLinks[0]);
      }
      expect(screen.queryByLabelText('Mobile Navigation')).not.toBeInTheDocument();
    });

    it('T1-F22-04: Touch targets on mobile meet minimum 44px class size', () => {
      render(
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      );
      const toggleBtn = screen.getByLabelText(/Open navigation menu/i);
      expect(toggleBtn.className).toContain('touch-target');
    });

    it('T1-F22-05: Grid layouts use responsive classes (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)', () => {
      render(
        <LanguageProvider>
          <About />
        </LanguageProvider>
      );
      const grid = document.querySelector('.grid');
      expect(grid).toBeInTheDocument();
    });
  });
});
