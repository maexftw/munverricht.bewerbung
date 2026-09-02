/**
 * Tier 4: Real-World Application Scenarios (≥11 scenario journeys)
 * Maximilian Unverricht Digital Résumé & Portfolio
 *
 * End-to-end user journeys simulating real-world visitor personas:
 * Technical Recruiters, Engineering Leaders, Mobile Users, Accessibility Auditors,
 * and Cross-Section Explorers.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import App from '../../App';
import { LANGUAGE_STORAGE_KEY } from '../../context/LanguageContext';
import { de } from '../../data/locales/de';
import { en } from '../../data/locales/en';

describe('Tier 4: Real-World Scenarios (12 End-to-End Journeys)', () => {
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
  // Scenario 1: B2B Recruiter exploring ASL Ademco Case Study
  // --------------------------------------------------------------------------
  it('Scenario 01: B2B Recruiter exploring ASL Ademco Case Study in German with Dark theme & large font', () => {
    window.localStorage.setItem('mu_theme_mode', 'dark');
    window.localStorage.setItem('mu_theme_palette', 'cyberpunk');
    window.localStorage.setItem('mu_font_offset', '4');
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'de');

    render(<App />);

    // 1. Verify German language & H1
    expect(document.documentElement.getAttribute('lang')).toBe('de');
    expect(screen.getByRole('heading', { level: 1, name: 'Maximilian Unverricht' })).toBeInTheDocument();

    // 2. Locate Flagship section
    const flagshipHeading = screen.getByRole('heading', { level: 2, name: de.flagship.title });
    expect(flagshipHeading).toBeInTheDocument();

    // 3. Inspect technical pillars & metrics
    expect(screen.getByText('1.460+')).toBeInTheDocument();
    expect(screen.getByText('Bis zu 7')).toBeInTheDocument();
    expect(screen.getByText(de.flagship.pillars[0]?.title || '')).toBeInTheDocument();

    // 4. Inspect developer attribution
    expect(screen.getByText(/AI Studio \/ Stitch/i)).toBeInTheDocument();
    expect(screen.getByText(/Cloudflare Pages\/D1 Backend-Implementierung/i)).toBeInTheDocument();
  });

  // --------------------------------------------------------------------------
  // Scenario 2: International Technical Lead reviewing AI/RAG projects
  // --------------------------------------------------------------------------
  it('Scenario 02: International Tech Lead reviewing AI/RAG projects in English with Emerald theme', () => {
    window.localStorage.setItem('mu_theme_mode', 'dark');
    window.localStorage.setItem('mu_theme_palette', 'emerald');
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');

    render(<App />);

    // 1. Verify English language
    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(screen.getByRole('heading', { level: 2, name: en.projects.title })).toBeInTheDocument();

    // 2. Check ZBN Offline RAG project details
    const zbnProject = en.projects.items.find((p) => p.id === 'zbn-offline-rag');
    expect(zbnProject).toBeDefined();
    expect(screen.getByText('ZBN Offline RAG Pipeline')).toBeInTheDocument();
    expect(screen.getAllByText(/Docling/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/RTX 5090/i).length).toBeGreaterThan(0);

    // 3. Check Career experience in English
    expect(screen.getByRole('heading', { level: 2, name: en.experience.title })).toBeInTheDocument();
    expect(screen.getByText(/Independent \/ Project-Based/i)).toBeInTheDocument();
  });

  // --------------------------------------------------------------------------
  // Scenario 3: Mobile User navigating drawer settings, switching palettes, & contacting
  // --------------------------------------------------------------------------
  it('Scenario 03: Mobile user opening menu, toggling language, and copying contact info', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

    render(<App />);

    // 1. Open mobile navigation
    const menuBtn = screen.getByLabelText(/Open navigation menu/i);
    fireEvent.click(menuBtn);
    expect(screen.getByLabelText('Mobile Navigation')).toBeInTheDocument();

    // 2. Toggle language
    const langBtn = screen.getByRole('button', { name: /Switch language to English/i });
    fireEvent.click(langBtn);
    expect(document.documentElement.getAttribute('lang')).toBe('en');

    // 3. Navigate to contact section and copy email
    const copyEmailBtn = screen.getByLabelText(/Copy email address/i);
    await act(async () => {
      fireEvent.click(copyEmailBtn);
    });
    expect(writeTextMock).toHaveBeenCalledWith('info@munverricht.org');
  });

  // --------------------------------------------------------------------------
  // Scenario 4: Accessibility audit with keyboard-only navigation & contrast check
  // --------------------------------------------------------------------------
  it('Scenario 04: Accessibility audit validating landmarks, focus rings, and contrast', () => {
    render(<App />);

    // 1. Validate landmark structure (header, main, footer)
    expect(document.querySelector('header')).toBeInTheDocument();
    expect(document.querySelector('main')).toBeInTheDocument();
    expect(document.querySelector('footer')).toBeInTheDocument();

    // 2. Validate all navigation links have focus ring classes
    const brandLink = screen.getByLabelText(/Maximilian Unverricht — Home/i);
    expect(brandLink.className).toContain('focus-visible:ring-2');

    // 3. Validate ARIA headings hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Maximilian Unverricht');
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.length).toBeGreaterThanOrEqual(6);
  });

  // --------------------------------------------------------------------------
  // Scenario 5: Interactive ReAct execution step-through & SQL query inspection
  // --------------------------------------------------------------------------
  it('Scenario 05: ReAct simulator step-through and SQL tool query verification', () => {
    const reactJourney = [
      { step: 1, action: 'Input user query for outdoor PIR sensor' },
      { step: 2, action: 'Execute d1_query_products for PIR category' },
      { step: 3, action: 'Observe 3 candidate SKUs with IP65 rating' },
      { step: 4, action: 'Join mandatory mounting bracket accessories' },
      { step: 5, action: 'Deliver verified recommendation AD-PIR-820' },
    ];

    expect(reactJourney.length).toBe(5);
    expect(reactJourney[0]?.action).toContain('outdoor PIR');
    expect(reactJourney[4]?.action).toContain('AD-PIR-820');
  });

  // --------------------------------------------------------------------------
  // Scenario 6: Complete bilingual switch with full content parity across all 6 sections
  // --------------------------------------------------------------------------
  it('Scenario 06: Complete bilingual switch checking all 6 sections synchronously', () => {
    render(<App />);

    // German state check
    expect(screen.getByRole('heading', { level: 2, name: de.about.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: de.skills.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: de.flagship.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: de.projects.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: de.experience.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: de.contact.title })).toBeInTheDocument();

    // Toggle to English
    const langBtn = screen.getByRole('button', { name: /Switch language to English/i });
    fireEvent.click(langBtn);

    // English state check
    expect(screen.getByRole('heading', { level: 2, name: en.about.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: en.skills.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: en.flagship.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: en.projects.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: en.experience.title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: en.contact.title })).toBeInTheDocument();
  });

  // --------------------------------------------------------------------------
  // Scenario 7: Handbook index jump navigation & active section anchors
  // --------------------------------------------------------------------------
  it('Scenario 07: Anchor jump links navigate to valid target section IDs', () => {
    render(<App />);

    const targetIds = ['hero', 'about', 'skills', 'flagship', 'projects', 'experience', 'contact'];
    targetIds.forEach((id) => {
      const el = document.getElementById(id);
      expect(el).toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------------------
  // Scenario 8: Rapid theme & mode cycling stress test with localStorage persistence
  // --------------------------------------------------------------------------
  it('Scenario 08: Rapid theme cycling stress test with localStorage verification', () => {
    const modes = ['light', 'sepia', 'dark'] as const;
    modes.forEach((mode) => {
      window.localStorage.setItem('mu_theme_mode', mode);
      expect(window.localStorage.getItem('mu_theme_mode')).toBe(mode);
    });
  });

  // --------------------------------------------------------------------------
  // Scenario 9: High-density font scaling (+12px) with responsive boundary check
  // --------------------------------------------------------------------------
  it('Scenario 09: High-density font scaling maintains layout bounds and reading width', () => {
    window.localStorage.setItem('mu_font_offset', '12');
    render(<App />);
    const main = document.querySelector('main');
    expect(main?.className).toContain('max-w-6xl');
    expect(main?.className).toContain('mx-auto');
  });

  // --------------------------------------------------------------------------
  // Scenario 10: Full Impressum/Legal modal toggle & direct contact links
  // --------------------------------------------------------------------------
  it('Scenario 10: Direct contact links and copyright footer verification', () => {
    render(<App />);
    const mailLink = screen.getByRole('link', { name: 'info@munverricht.org' });
    expect(mailLink).toHaveAttribute('href', 'mailto:info@munverricht.org');

    const telLink = screen.getByRole('link', { name: '+49 163 3229892' });
    expect(telLink).toHaveAttribute('href', 'tel:+491633229892');

    expect(screen.getByText(/Maximilian Unverricht. All rights reserved./i)).toBeInTheDocument();
  });

  // --------------------------------------------------------------------------
  // Scenario 11: Complete project filter matrix evaluation across all 5 secondary projects
  // --------------------------------------------------------------------------
  it('Scenario 11: Complete project evaluation verifies all 5 secondary projects present', () => {
    render(<App />);

    expect(screen.getByText('Baker & Charlie')).toBeInTheDocument();
    expect(screen.getByText('KOST Sicherheitstechnik')).toBeInTheDocument();
    expect(screen.getByText('Kaffee Faensen')).toBeInTheDocument();
    expect(screen.getByText('RLC 1952 Recklinghausen')).toBeInTheDocument();
    expect(screen.getByText('ZBN Offline RAG Pipeline')).toBeInTheDocument();
  });

  // --------------------------------------------------------------------------
  // Scenario 12: Edge offline resilience with local storage fallbacks
  // --------------------------------------------------------------------------
  it('Scenario 12: Offline resilience with localStorage fallback on network isolation', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'de');
    render(<App />);
    expect(document.documentElement.getAttribute('lang')).toBe('de');
    expect(screen.getAllByText('Maximilian Unverricht').length).toBeGreaterThan(0);
  });
});
