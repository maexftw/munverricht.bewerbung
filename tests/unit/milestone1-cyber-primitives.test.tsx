/**
 * Unit Test Suite: Milestone 1 — Cyberpunk Primitives & Layout Architecture
 * Tests BentoCard, CyberButton, GlowingBadge, TerminalWindow, CyberTabs, Navbar, LanguageSwitcher, CyberShell, Footer
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider } from '../../src/context/LanguageContext';
import { BentoCard } from '../../src/components/ui/BentoCard';
import { CyberButton } from '../../src/components/ui/CyberButton';
import { GlowingBadge } from '../../src/components/ui/GlowingBadge';
import { TerminalWindow } from '../../src/components/ui/TerminalWindow';
import { CyberTabs } from '../../src/components/ui/CyberTabs';
import { Navbar } from '../../src/components/layout/Navbar';
import { LanguageSwitcher } from '../../src/components/layout/LanguageSwitcher';
import { CyberShell } from '../../src/components/layout/CyberShell';
import { Footer } from '../../src/components/layout/Footer';

describe('Milestone 1: Cyberpunk Theme, UI Primitives & Shell Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
  });

  describe('1. BentoCard Component', () => {
    it('TC-BC01: renders children with spotlight background and cyber borders', () => {
      render(
        <BentoCard glowColor="cyan" data-testid="bento-card">
          <h3>Bento Title</h3>
          <p>Bento Content Body</p>
        </BentoCard>
      );

      const card = screen.getByTestId('bento-card');
      expect(card).toBeInTheDocument();
      expect(screen.getByText('Bento Title')).toBeInTheDocument();
      expect(screen.getByText('Bento Content Body')).toBeInTheDocument();
      expect(card.className).toContain('border-cyan-500/20');
    });

    it('TC-BC02: updates spotlight radial gradient on mousemove and clears on mouseleave', () => {
      render(
        <BentoCard glowColor="emerald" data-testid="bento-card-move">
          <span>Card Content</span>
        </BentoCard>
      );

      const card = screen.getByTestId('bento-card-move');
      
      // Simulate mouse move
      fireEvent.mouseMove(card, { clientX: 150, clientY: 80 });
      // Spotlight element should exist
      const spotlight = card.querySelector('div[aria-hidden="true"]');
      expect(spotlight).toBeInTheDocument();

      // Simulate mouse leave
      fireEvent.mouseLeave(card);
    });

    it('TC-BC03: applies colSpan, rowSpan, and cornerCut styles correctly', () => {
      render(
        <BentoCard colSpan={2} rowSpan={2} cornerCut={true} data-testid="bento-custom">
          <span>Custom Span Card</span>
        </BentoCard>
      );

      const card = screen.getByTestId('bento-custom');
      expect(card.className).toContain('md:col-span-2');
      expect(card.className).toContain('md:row-span-2');
      expect(card.className).toContain('cyber-corner-cut');
    });
  });

  describe('2. CyberButton Component', () => {
    it('TC-CB01: renders button with >=44px touch target and default cyber cut-corner', () => {
      render(<CyberButton data-testid="cyber-btn">Click Me</CyberButton>);
      const btn = screen.getByTestId('cyber-btn');
      expect(btn).toBeInTheDocument();
      expect(btn.className).toContain('touch-target');
      expect(btn.className).toContain('min-h-[44px]');
      expect(btn.className).toContain('cyber-corner-cut');
    });

    it('TC-CB02: renders as link (<a>) when href is provided with secure rel for target="_blank"', () => {
      render(
        <CyberButton href="https://github.com/munverricht" target="_blank" data-testid="cyber-link">
          GitHub Profile
        </CyberButton>
      );
      const link = screen.getByTestId('cyber-link');
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', 'https://github.com/munverricht');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('TC-CB03: supports emerald, secondary, ghost, and danger variants with disabled state', () => {
      const { rerender } = render(<CyberButton variant="emerald" disabled>Emerald Action</CyberButton>);
      let btn = screen.getByRole('button', { name: 'Emerald Action' });
      expect(btn).toBeDisabled();
      expect(btn.className).toContain('bg-emerald-500');

      rerender(<CyberButton variant="danger">Danger Action</CyberButton>);
      btn = screen.getByRole('button', { name: 'Danger Action' });
      expect(btn.className).toContain('bg-red-950/80');
    });
  });

  describe('3. GlowingBadge Component', () => {
    it('TC-GB01: renders pulsing status LED with monospaced tabular numerals', () => {
      render(
        <GlowingBadge variant="emerald" pulsing={true} data-testid="glowing-badge">
          AVAILABLE FOR ROLES
        </GlowingBadge>
      );
      const badge = screen.getByTestId('glowing-badge');
      expect(badge).toBeInTheDocument();
      expect(badge.className).toContain('font-mono');
      expect(badge.querySelector('.motion-safe\\:animate-ping')).toBeInTheDocument();
    });

    it('TC-GB02: renders non-pulsing badge with custom icon and cyan styling', () => {
      render(
        <GlowingBadge variant="cyan" pulsing={false} icon={<span data-testid="badge-icon">★</span>}>
          EXPERIENCE: 12+ YEARS
        </GlowingBadge>
      );
      expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
      expect(screen.getByText('EXPERIENCE: 12+ YEARS')).toBeInTheDocument();
    });
  });

  describe('4. TerminalWindow Component', () => {
    it('TC-TW01: renders terminal chrome with dots, custom title, and monospaced content feed', () => {
      render(
        <TerminalWindow title="agent@cloudflare-worker:~" data-testid="terminal-window">
          <code>SELECT * FROM products WHERE in_stock = 1;</code>
        </TerminalWindow>
      );
      expect(screen.getByTestId('terminal-window')).toBeInTheDocument();
      expect(screen.getByText('agent@cloudflare-worker:~')).toBeInTheDocument();
      expect(screen.getByText(/SELECT \* FROM products/)).toBeInTheDocument();
    });

    it('TC-TW02: copies code content to clipboard when copy button is clicked', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: { writeText: writeTextMock },
      });

      render(
        <TerminalWindow title="SQL Runner" copyContent="SELECT * FROM products;">
          <p>Query Output</p>
        </TerminalWindow>
      );

      const copyBtn = screen.getByRole('button', { name: /Copy code to clipboard/i });
      await act(async () => {
        fireEvent.click(copyBtn);
      });

      expect(writeTextMock).toHaveBeenCalledWith('SELECT * FROM products;');
    });
  });

  describe('5. CyberTabs Component', () => {
    const mockTabs = [
      { id: 'all', label: 'All Projects', count: 5 },
      { id: 'edge', label: 'Edge Backend', count: 2 },
      { id: 'ai', label: 'AI Pipelines', count: 1 },
      { id: 'infra', label: 'Cloud Infra', count: 2 },
    ];

    it('TC-CT01: renders ARIA tablist with active tab having aria-selected=true and tabIndex=0', () => {
      const handleChange = vi.fn();
      render(<CyberTabs tabs={mockTabs} activeTab="all" onChange={handleChange} />);

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();

      const allTab = screen.getByRole('tab', { name: /All Projects/i });
      const edgeTab = screen.getByRole('tab', { name: /Edge Backend/i });

      expect(allTab).toHaveAttribute('aria-selected', 'true');
      expect(allTab).toHaveAttribute('tabIndex', '0');
      expect(edgeTab).toHaveAttribute('aria-selected', 'false');
      expect(edgeTab).toHaveAttribute('tabIndex', '-1');
    });

    it('TC-CT02: navigates through tabs with keyboard arrow keys (ArrowRight, ArrowLeft, Home, End)', () => {
      const handleChange = vi.fn();
      render(<CyberTabs tabs={mockTabs} activeTab="all" onChange={handleChange} />);

      const allTab = screen.getByRole('tab', { name: /All Projects/i });

      // ArrowRight -> Edge
      fireEvent.keyDown(allTab, { key: 'ArrowRight' });
      expect(handleChange).toHaveBeenCalledWith('edge');

      // End -> Infra
      fireEvent.keyDown(allTab, { key: 'End' });
      expect(handleChange).toHaveBeenCalledWith('infra');

      // Home -> All
      fireEvent.keyDown(allTab, { key: 'Home' });
      expect(handleChange).toHaveBeenCalledWith('all');
    });
  });

  describe('6. Navbar & LanguageSwitcher Components', () => {
    it('TC-NAV01: renders sticky HUD navbar with brand link, anchor links, and language toggle', () => {
      render(
        <LanguageProvider initialLanguage="de">
          <Navbar />
        </LanguageProvider>
      );

      expect(screen.getByTestId('cyber-navbar')).toBeInTheDocument();
      expect(screen.getByLabelText(/Maximilian Unverricht — Home/i)).toBeInTheDocument();
      expect(screen.getByTestId('nav-link-about')).toHaveAttribute('href', '#about');
      expect(screen.getByTestId('nav-link-skills')).toHaveAttribute('href', '#skills');
      expect(screen.getByTestId('nav-link-flagship')).toHaveAttribute('href', '#flagship');
      expect(screen.getByTestId('nav-link-projects')).toHaveAttribute('href', '#projects');
      expect(screen.getByTestId('nav-link-experience')).toHaveAttribute('href', '#experience');
      expect(screen.getByTestId('nav-link-contact')).toHaveAttribute('href', '#contact');
    });

    it('TC-NAV02: opens and closes mobile menu drawer via button click and ESC key', () => {
      render(
        <LanguageProvider initialLanguage="de">
          <Navbar />
        </LanguageProvider>
      );

      const openBtn = screen.getByLabelText(/Open navigation menu/i);
      fireEvent.click(openBtn);

      const drawer = screen.getByLabelText('Mobile Navigation');
      expect(drawer).toBeInTheDocument();

      // Press ESC to close
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(screen.queryByLabelText('Mobile Navigation')).not.toBeInTheDocument();
    });

    it('TC-NAV03: toggles language via LanguageSwitcher and updates labels in Navbar', async () => {
      render(
        <LanguageProvider initialLanguage="de">
          <Navbar />
        </LanguageProvider>
      );

      const toggleBtn = screen.getByRole('button', { name: /Switch language to English/i });
      await act(async () => {
        fireEvent.click(toggleBtn);
      });

      expect(screen.getByTestId('nav-link-about')).toHaveTextContent('Profile');
      expect(screen.getByTestId('nav-link-projects')).toHaveTextContent('Projects');
      expect(screen.getByTestId('nav-link-experience')).toHaveTextContent('Experience');
    });

    it('TC-LS01: renders segmented LanguageSwitcher and switches between DE and EN', async () => {
      render(
        <LanguageProvider initialLanguage="de">
          <LanguageSwitcher variant="segmented" />
        </LanguageProvider>
      );

      const enBtn = screen.getByRole('button', { name: 'EN' });
      await act(async () => {
        fireEvent.click(enBtn);
      });
      expect(enBtn).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('7. CyberShell & Footer Layout Components', () => {
    it('TC-SH01: CyberShell wraps content with micro-grid overlay and renders Navbar and Footer', () => {
      render(
        <LanguageProvider>
          <CyberShell>
            <div data-testid="shell-child">Cyber Shell Content</div>
          </CyberShell>
        </LanguageProvider>
      );

      expect(screen.getByTestId('cyber-shell')).toBeInTheDocument();
      expect(screen.getByTestId('shell-child')).toBeInTheDocument();
      expect(screen.getByTestId('cyber-navbar')).toBeInTheDocument();
      expect(screen.getByText(/DIN ISO \/ GDPR DSGVO KONFORM/i)).toBeInTheDocument();
    });

    it('TC-FT01: Footer renders contact info, email mailto, tel link, and back-to-top button', () => {
      const scrollMock = vi.fn();
      window.scrollTo = scrollMock;

      render(
        <LanguageProvider initialLanguage="de">
          <Footer />
        </LanguageProvider>
      );

      expect(screen.getByText('info@munverricht.org')).toBeInTheDocument();
      expect(screen.getByText('+49 163 3229892')).toBeInTheDocument();

      const backToTopBtn = screen.getByRole('button', { name: /NACH OBEN/i });
      fireEvent.click(backToTopBtn);
      expect(scrollMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
  });
});
