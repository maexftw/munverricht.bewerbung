import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
// @ts-ignore
import { calculateContrastRatio, evaluateWcagCompliance } from '../helpers/contrast.mjs';
import { Navbar } from '../../src/components/layout/Navbar';
import { LanguageSwitcher } from '../../src/components/layout/LanguageSwitcher';
import { Footer } from '../../src/components/layout/Footer';
import { CyberShell } from '../../src/components/layout/CyberShell';
import { CyberButton } from '../../src/components/ui/CyberButton';
import { CyberTabs } from '../../src/components/ui/CyberTabs';
import { TerminalWindow } from '../../src/components/ui/TerminalWindow';
import { BentoCard } from '../../src/components/ui/BentoCard';
import { LanguageProvider } from '../../src/context/LanguageContext';

describe('CHALLENGER 2: Milestone 1 Empirical Verification Suite', () => {
  afterEach(() => {
    cleanup();
  });

  describe('1. Theme Tokens Contrast Math against Cyber Dark Canvas', () => {
    const canvasColor = '#0B0F17'; // Base canvas
    const voidColor = '#070A0F';   // Deep void
    const surfaceSolid = '#111827'; // Dark solid surface

    const themeColors = {
      'cyber-cyan': '#00F0FF',
      'cyber-cyan-dim': '#0891B2',
      'cyber-emerald': '#05DF72',
      'cyber-emerald-base': '#10B981',
      'cyber-violet': '#C084FC',
      'cyber-violet-deep': '#A855F7',
      'cyber-amber': '#F59E0B',
      'cyber-danger': '#EF4444',
      'cyber-text-primary': '#F8FAFC',
      'cyber-text-secondary': '#94A3B8',
      'cyber-text-muted': '#64748B',
    };

    it('validates cyber-cyan (#00F0FF) has >= 12.5:1 contrast against canvas (AAA)', () => {
      const ratio = calculateContrastRatio(themeColors['cyber-cyan'], canvasColor);
      expect(ratio).toBeGreaterThanOrEqual(12.5);
      const compliance = evaluateWcagCompliance(ratio);
      expect(compliance.aaaNormal).toBe(true);
    });

    it('validates cyber-emerald (#05DF72) has >= 10.5:1 contrast against canvas (AAA)', () => {
      const ratio = calculateContrastRatio(themeColors['cyber-emerald'], canvasColor);
      expect(ratio).toBeGreaterThanOrEqual(10.5);
      const compliance = evaluateWcagCompliance(ratio);
      expect(compliance.aaaNormal).toBe(true);
    });

    it('validates cyber-violet (#C084FC) has >= 7:1 (AAA) contrast against canvas', () => {
      const ratio = calculateContrastRatio(themeColors['cyber-violet'], canvasColor);
      expect(ratio).toBeGreaterThanOrEqual(7.0);
      const compliance = evaluateWcagCompliance(ratio);
      expect(compliance.aaaNormal).toBe(true);
    });

    it('validates cyber-amber (#F59E0B) has >= 8.5:1 (AAA) contrast against canvas', () => {
      const ratio = calculateContrastRatio(themeColors['cyber-amber'], canvasColor);
      expect(ratio).toBeGreaterThanOrEqual(8.5);
      const compliance = evaluateWcagCompliance(ratio);
      expect(compliance.aaaNormal).toBe(true);
    });

    it('validates cyber-text-primary (#F8FAFC) has >= 17:1 contrast against canvas', () => {
      const ratio = calculateContrastRatio(themeColors['cyber-text-primary'], canvasColor);
      expect(ratio).toBeGreaterThanOrEqual(17.0);
      const compliance = evaluateWcagCompliance(ratio);
      expect(compliance.aaaNormal).toBe(true);
    });

    it('validates cyber-text-secondary (#94A3B8) has >= 7:1 (AAA) contrast against canvas', () => {
      const ratio = calculateContrastRatio(themeColors['cyber-text-secondary'], canvasColor);
      expect(ratio).toBeGreaterThanOrEqual(7.0);
      const compliance = evaluateWcagCompliance(ratio);
      expect(compliance.aaaNormal).toBe(true);
    });

    it('empirically evaluates cyber-text-muted (#64748B) contrast against canvas and surfaces', () => {
      const ratioCanvas = calculateContrastRatio(themeColors['cyber-text-muted'], canvasColor);
      const ratioVoid = calculateContrastRatio(themeColors['cyber-text-muted'], voidColor);
      const ratioSolid = calculateContrastRatio(themeColors['cyber-text-muted'], surfaceSolid);

      // Note: #64748B achieves ~4.03:1 vs #0B0F17, 4.16:1 vs #070A0F, and 3.73:1 vs #111827.
      // This passes WCAG AA Large (>3.0:1) and UI component requirements (>3.0:1), but falls below 4.5:1 for body text.
      expect(ratioCanvas).toBeGreaterThanOrEqual(3.0);
      expect(ratioCanvas).toBeLessThan(4.5); // Documented finding: 4.03:1 vs claimed 4.61:1
      expect(ratioVoid).toBeGreaterThanOrEqual(3.0);
      expect(ratioSolid).toBeGreaterThanOrEqual(3.0);
    });

    it('validates high-contrast primary text tokens meet WCAG 2.1 AAA (>=7.0:1) on void (#070A0F)', () => {
      ['cyber-cyan', 'cyber-emerald', 'cyber-violet', 'cyber-amber', 'cyber-text-primary', 'cyber-text-secondary'].forEach((key) => {
        const hex = themeColors[key as keyof typeof themeColors];
        const ratio = calculateContrastRatio(hex, voidColor);
        expect(ratio).toBeGreaterThanOrEqual(7.0);
      });
    });

    it('validates button text contrast in primary (black text on cyan) and emerald (black text on emerald)', () => {
      const blackText = '#020617'; // slate-950
      const cyanRatio = calculateContrastRatio(blackText, themeColors['cyber-cyan']);
      expect(cyanRatio).toBeGreaterThanOrEqual(12.0); // Excellent black on cyan contrast

      const emeraldRatio = calculateContrastRatio(blackText, themeColors['cyber-emerald']);
      expect(emeraldRatio).toBeGreaterThanOrEqual(10.0); // Excellent black on emerald contrast
    });
  });

  describe('2. Touch Target Dimension Verification (>=44x44px)', () => {
    it('verifies Navbar brand link has touch-target class and min-h-[44px]', () => {
      render(
        <LanguageProvider>
          <Navbar />
        </LanguageProvider>
      );
      const brandLink = screen.getByLabelText(/Maximilian Unverricht — Home/i);
      expect(brandLink.className).toContain('touch-target');
      expect(brandLink.className).toContain('min-h-[44px]');
    });

    it('verifies all Desktop Navbar anchor links have touch-target class and min-h-[44px]', () => {
      render(
        <LanguageProvider>
          <Navbar />
        </LanguageProvider>
      );
      const nav = screen.getByLabelText(/Desktop Navigation/i);
      const links = nav.querySelectorAll('a');
      expect(links.length).toBe(6);
      links.forEach((link) => {
        expect(link.className).toContain('touch-target');
        expect(link.className).toContain('min-h-[44px]');
      });
    });

    it('verifies Navbar mobile hamburger button has min-h-[44px] and min-w-[44px]', () => {
      render(
        <LanguageProvider>
          <Navbar />
        </LanguageProvider>
      );
      const hamburger = screen.getByLabelText(/Open navigation menu/i);
      expect(hamburger.className).toContain('touch-target');
      expect(hamburger.className).toContain('min-h-[44px]');
      expect(hamburger.className).toContain('min-w-[44px]');
    });

    it('verifies LanguageSwitcher compact button has min-h-[44px] and min-w-[44px]', () => {
      render(
        <LanguageProvider>
          <LanguageSwitcher variant="compact" />
        </LanguageProvider>
      );
      const button = screen.getByRole('button');
      expect(button.className).toContain('touch-target');
      expect(button.className).toContain('min-h-[44px]');
      expect(button.className).toContain('min-w-[44px]');
    });

    it('verifies LanguageSwitcher segmented buttons have min-h-[44px]', () => {
      render(
        <LanguageProvider>
          <LanguageSwitcher variant="segmented" />
        </LanguageProvider>
      );
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);
      buttons.forEach((btn) => {
        expect(btn.className).toContain('touch-target');
        expect(btn.className).toContain('min-h-[44px]');
      });
    });

    it('verifies CyberButton has min-h-[44px] across all sizes and modes', () => {
      const { rerender } = render(<CyberButton size="sm">Small</CyberButton>);
      let btn = screen.getByRole('button');
      expect(btn.className).toContain('touch-target');
      expect(btn.className).toContain('min-h-[44px]');

      rerender(<CyberButton size="md">Medium</CyberButton>);
      btn = screen.getByRole('button');
      expect(btn.className).toContain('touch-target');
      expect(btn.className).toContain('min-h-[44px]');

      rerender(<CyberButton size="lg">Large</CyberButton>);
      btn = screen.getByRole('button');
      expect(btn.className).toContain('touch-target');
      expect(btn.className).toContain('min-h-[44px]');

      rerender(<CyberButton href="#test">Link Button</CyberButton>);
      const link = screen.getByRole('link');
      expect(link.className).toContain('touch-target');
      expect(link.className).toContain('min-h-[44px]');
    });

    it('verifies CyberTabs buttons have touch-target class and min-h-[44px]', () => {
      const tabs = [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
      ];
      render(<CyberTabs tabs={tabs} activeTab="tab1" onChange={() => {}} />);
      const buttons = screen.getAllByRole('tab');
      expect(buttons.length).toBe(2);
      buttons.forEach((tab) => {
        expect(tab.className).toContain('touch-target');
        expect(tab.className).toContain('min-h-[44px]');
      });
    });

    it('verifies Footer back-to-top button has touch-target and min-h-[44px]', () => {
      render(
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      );
      const backToTop = screen.getByRole('button', { name: /(NACH OBEN|BACK TO TOP)/i });
      expect(backToTop.className).toContain('touch-target');
      expect(backToTop.className).toContain('min-h-[44px]');
    });

    it('empirically records TerminalWindow copy button dimensions', () => {
      render(
        <TerminalWindow title="test-trace" copyContent="SELECT 1;">
          <code>SELECT 1;</code>
        </TerminalWindow>
      );
      const copyBtn = screen.getByRole('button', { name: /Copy code to clipboard/i });
      // Finding: TerminalWindow uses min-h-[32px] min-w-[32px], which is sub-44px
      expect(copyBtn.className).toContain('min-h-[32px]');
    });
  });

  describe('3. Layout Stability & 0px Horizontal Overflow Evaluation', () => {
    const viewports = [
      { name: '320px (Mobile Small)', width: 320 },
      { name: '375px (Mobile Standard)', width: 375 },
      { name: '768px (Tablet Portrait)', width: 768 },
      { name: '1024px (Tablet Landscape / Desktop)', width: 1024 },
      { name: '1440px (Laptop / Desktop)', width: 1440 },
      { name: '1920px (Full HD Desktop)', width: 1920 },
    ];

    viewports.forEach(({ name, width }) => {
      it(`renders CyberShell stably at ${name} (${width}px) with overflow-x-hidden and full width`, () => {
        window.innerWidth = width;
        window.dispatchEvent(new Event('resize'));

        const { container } = render(
          <LanguageProvider>
            <CyberShell>
              <div data-testid="test-content" className="max-w-7xl mx-auto px-4 py-8">
                <BentoCard colSpan={1}>
                  <h2>Bento Card 1</h2>
                  <p>Testing layout stability under {width}px.</p>
                </BentoCard>
              </div>
            </CyberShell>
          </LanguageProvider>
        );

        const shell = container.querySelector('[data-testid="cyber-shell"]');
        expect(shell).toBeTruthy();
        expect(shell?.className).toContain('overflow-x-hidden');
        expect(shell?.className).toContain('w-full');

        const main = container.querySelector('#main-content');
        expect(main).toBeTruthy();
        expect(main?.className).toContain('w-full');
      });
    });

    it('verifies mobile navigation drawer opens and closes without breaking container boundaries', () => {
      render(
        <LanguageProvider>
          <Navbar />
        </LanguageProvider>
      );

      const hamburger = screen.getByLabelText(/Open navigation menu/i);
      fireEvent.click(hamburger);

      const dialog = screen.getByRole('dialog', { name: /Mobile Navigation/i });
      expect(dialog).toBeTruthy();
      expect(dialog.className).toContain('fixed');
      expect(dialog.className).toContain('inset-x-0');

      const links = dialog.querySelectorAll('a');
      expect(links.length).toBe(6);
      links.forEach((link) => {
        expect(link.className).toContain('touch-target');
        expect(link.className).toContain('min-h-[48px]');
      });

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  describe('4. Component Ergonomics & ARIA Accessibility State Invariants', () => {
    it('ensures CyberTabs ARIA attributes update deterministically on click and keydown', () => {
      let active = 'all';
      const tabs = [
        { id: 'all', label: 'All Projects', count: 5 },
        { id: 'edge', label: 'Edge Backend', count: 2 },
        { id: 'ai', label: 'AI Pipelines', count: 3 },
      ];

      const { rerender } = render(
        <CyberTabs
          tabs={tabs}
          activeTab={active}
          onChange={(id) => {
            active = id;
          }}
        />
      );

      const tab1 = screen.getByRole('tab', { name: /All Projects/i });
      const tab2 = screen.getByRole('tab', { name: /Edge Backend/i });
      const tab3 = screen.getByRole('tab', { name: /AI Pipelines/i });

      expect(tab1.getAttribute('aria-selected')).toBe('true');
      expect(tab2.getAttribute('aria-selected')).toBe('false');
      expect(tab3.getAttribute('aria-selected')).toBe('false');

      fireEvent.keyDown(tab1, { key: 'ArrowRight' });
      expect(active).toBe('edge');

      rerender(
        <CyberTabs
          tabs={tabs}
          activeTab="edge"
          onChange={(id) => {
            active = id;
          }}
        />
      );

      expect(tab1.getAttribute('aria-selected')).toBe('false');
      expect(tab2.getAttribute('aria-selected')).toBe('true');
    });

    it('ensures TerminalWindow copy button copies content and displays feedback', async () => {
      let writtenText = '';
      const originalClipboard = navigator.clipboard;
      Object.assign(navigator, {
        clipboard: {
          writeText: async (text: string) => {
            writtenText = text;
            return Promise.resolve();
          },
        },
      });

      render(
        <TerminalWindow title="test-trace" copyContent="SELECT * FROM products;">
          <code>SELECT * FROM products;</code>
        </TerminalWindow>
      );

      const copyBtn = screen.getByRole('button', { name: /Copy code to clipboard/i });
      fireEvent.click(copyBtn);

      await waitFor(() => {
        expect(writtenText).toBe('SELECT * FROM products;');
        expect(screen.getByRole('button', { name: /Code copied/i })).toBeTruthy();
      });

      Object.assign(navigator, { clipboard: originalClipboard });
    });
  });
});
