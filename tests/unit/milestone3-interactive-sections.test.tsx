import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { LanguageProvider } from '../../src/context/LanguageContext';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { Badge } from '../../src/components/ui/Badge';
import { SteppedButton } from '../../src/components/ui/SteppedButton';
import { CodeBlock } from '../../src/components/ui/CodeBlock';
import { Tooltip } from '../../src/components/ui/Tooltip';
import { Modal } from '../../src/components/ui/Modal';
import { HeroBanner } from '../../src/components/sections/HeroBanner';
import { HandbookIndex } from '../../src/components/sections/HandbookIndex';
import { FlagshipCaseStudy } from '../../src/components/sections/FlagshipCaseStudy';
import { ReActSimulator } from '../../src/components/sections/ReActSimulator';
import { D1SqlPlayground } from '../../src/components/sections/D1SqlPlayground';
import { SecondaryProjects } from '../../src/components/sections/SecondaryProjects';
import { ProjectCard } from '../../src/components/sections/ProjectCard';
import { ExperienceTimeline } from '../../src/components/sections/ExperienceTimeline';
import { SkillsMatrix } from '../../src/components/sections/SkillsMatrix';
import { ContactFooter } from '../../src/components/sections/ContactFooter';
import { secondaryProjectsData } from '../../src/data/secondaryProjects';

const renderWithProviders = (ui: React.ReactElement, initialLanguage: 'de' | 'en' = 'de') => {
  return render(
    <ThemeProvider>
      <LanguageProvider initialLanguage={initialLanguage}>{ui}</LanguageProvider>
    </ThemeProvider>
  );
};

describe('Milestone 3: Interactive Sections & UI Components Suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------
  // 1. UI Components Tests
  // -------------------------------------------------------------
  describe('UI Component: Badge', () => {
    it('renders text with pulsing status dot and custom variants', () => {
      render(<Badge variant="stepped" pulsing={true}>Live Status</Badge>);
      expect(screen.getByText('Live Status')).toBeInTheDocument();
      const dot = document.querySelector('.animate-ping');
      expect(dot).toBeInTheDocument();
    });

    it('applies accent1 and outline variant classes correctly', () => {
      const { container } = render(<Badge variant="accent1">Accent Tag</Badge>);
      expect(container.firstChild).toHaveClass('bg-[var(--accent1)]');
    });
  });

  describe('UI Component: SteppedButton', () => {
    it('renders button with stepped box-shadows and handles click events', () => {
      const handleClick = vi.fn();
      render(
        <SteppedButton variant="primary" steppedShadow="accent1" onClick={handleClick}>
          Action Button
        </SteppedButton>
      );
      const btn = screen.getByRole('button', { name: 'Action Button' });
      expect(btn).toHaveClass('hyp-shadow-stepped-1');
      expect(btn).toHaveClass('touch-target');
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders disabled state properly', () => {
      render(
        <SteppedButton variant="secondary" disabled={true}>
          Disabled Action
        </SteppedButton>
      );
      const btn = screen.getByRole('button', { name: 'Disabled Action' });
      expect(btn).toBeDisabled();
    });
  });

  describe('UI Component: CodeBlock', () => {
    it('renders code content and copies text to clipboard', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock,
        },
      });

      render(
        <CodeBlock
          code="SELECT * FROM products;"
          language="sql"
          title="Query 1"
          executionTimeMs={2.4}
          showLineNumbers={true}
        />
      );

      expect(screen.getByText('Query 1')).toBeInTheDocument();
      expect(screen.getByText('⚡ 2.4ms')).toBeInTheDocument();
      expect(screen.getByText('SELECT * FROM products;')).toBeInTheDocument();

      const copyBtn = screen.getByRole('button', { name: /Copy code to clipboard/i });
      await act(async () => {
        fireEvent.click(copyBtn);
      });
      expect(writeTextMock).toHaveBeenCalledWith('SELECT * FROM products;');
    });
  });

  describe('UI Component: Tooltip', () => {
    it('displays tooltip on hover/focus matching hypJump2 animation', async () => {
      render(
        <Tooltip content="Tooltip Hint" position="top">
          <button>Hover Me</button>
        </Tooltip>
      );

      const trigger = screen.getByText('Hover Me');
      fireEvent.mouseEnter(trigger);

      await act(async () => {
        await new Promise((r) => setTimeout(r, 150));
      });

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('Tooltip Hint');
    });
  });

  describe('UI Component: Modal', () => {
    it('renders accessible modal dialog when open and closes on ESC or close button', () => {
      const handleClose = vi.fn();
      const { rerender } = render(
        <Modal isOpen={true} onClose={handleClose} title="Test Modal" subtitle="Modal Subtitle">
          <p>Modal Body Content</p>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Test Modal' })).toBeInTheDocument();
      expect(screen.getByText('Modal Body Content')).toBeInTheDocument();

      // Close via close button
      const closeBtn = screen.getByRole('button', { name: /Close modal dialog/i });
      fireEvent.click(closeBtn);
      expect(handleClose).toHaveBeenCalledTimes(1);

      // Close via Escape key
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalledTimes(2);

      // Hidden when closed
      rerender(
        <Modal isOpen={false} onClose={handleClose} title="Test Modal">
          <p>Modal Body Content</p>
        </Modal>
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------
  // 2. Sections & Interactive Subsystems Tests
  // -------------------------------------------------------------
  describe('Section: HeroBanner', () => {
    it('renders 3 stat pill boxes, title, location badge, and CTA buttons', () => {
      renderWithProviders(<HeroBanner />);
      expect(screen.getByText(/12\+ Jahre Web-Engineering|12\+ Years Web Engineering/i)).toBeInTheDocument();
      expect(screen.getByText(/React 19 & Cloudflare Edge D1/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Maximilian Unverricht');
      expect(screen.getByText(/Available for Projects & Roles/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Flagship Case Study ansehen|View Flagship Case Study/i })).toHaveAttribute(
        'href',
        '#flagship'
      );
    });
  });

  describe('Section: HandbookIndex', () => {
    it('renders all 5 quick-jump navigation chips', () => {
      renderWithProviders(<HandbookIndex />);
      expect(screen.getByText(/Architektur|Architecture/i)).toBeInTheDocument();
      expect(screen.getByText('AI Tool Calling')).toBeInTheDocument();
      expect(screen.getByText('Edge Storage')).toBeInTheDocument();
      expect(screen.getByText(/Web Craft & WCAG/i)).toBeInTheDocument();
      expect(screen.getByText(/Werdegang|Career Timeline/i)).toBeInTheDocument();
    });
  });

  describe('Section: FlagshipCaseStudy', () => {
    it('renders 5 architectural pillars, KPIs, and transparent attribution', () => {
      renderWithProviders(<FlagshipCaseStudy />);
      expect(screen.getByText(/Flagship Case Study #1/i)).toBeInTheDocument();
      expect(screen.getByText(/Herausforderung & Problemstellung|Challenge & Problem Statement/i)).toBeInTheDocument();
      expect(screen.getByText(/1\. Vertical Agent \(ReAct Loop\)|1\. ReAct Loop/i)).toBeInTheDocument();
      expect(screen.getByText(/2\. Anti-Halluzinations-Guardrails|Multi-Provider/i)).toBeInTheDocument();
      expect(screen.getByText(/3\. Strukturierte SQL-RAG|Deterministic SQL/i)).toBeInTheDocument();
      expect(screen.getByText(/4\. B2B Planning Studio/i)).toBeInTheDocument();
      expect(screen.getByText(/5\. Datanorm/i)).toBeInTheDocument();
      expect(screen.getAllByText(/1,460\+|1\.460\+/i).length).toBeGreaterThan(0);
    });
  });

  describe('Section: ReActSimulator', () => {
    it('allows stepping through cycles and updates live BOM calculation', () => {
      renderWithProviders(<ReActSimulator />);
      expect(screen.getByText(/ReAct Agent Loop Simulator/i)).toBeInTheDocument();

      // Initial state (Cycle 0)
      expect(screen.getByText(/Noch keine Artikel verifiziert|No items verified yet/i)).toBeInTheDocument();

      // Step forward to Cycle 1
      const nextBtn = screen.getByRole('button', { name: /Next step/i });
      fireEvent.click(nextBtn);
      expect(screen.getAllByText(/ADEM-BM-8003/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/822,00 €/i).length).toBeGreaterThan(0);

      // Step forward to Cycle 2 (Mandatory accessory resolution)
      fireEvent.click(nextBtn);
      expect(screen.getAllByText(/ADEM-SO-8055/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Mandatory Base/i)).toBeInTheDocument();

      // Step forward to Cycle 3 (Control panel)
      fireEvent.click(nextBtn);
      expect(screen.getAllByText(/ADEM-BMZ-IQ8C/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/2.376,40 €/i).length).toBeGreaterThan(0);

      // Step back
      const prevBtn = screen.getByRole('button', { name: /Previous step/i });
      fireEvent.click(prevBtn);
      expect(screen.getByText('2')).toBeInTheDocument();

      // Reset
      const resetBtn = screen.getByRole('button', { name: /Reset simulation/i });
      fireEvent.click(resetBtn);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('switches between query presets', () => {
      renderWithProviders(<ReActSimulator />);
      const preset2Btn = screen.getByRole('button', { name: /Preset 2/i });
      fireEvent.click(preset2Btn);
      expect(screen.getByText(/Wir rüsten eine Tiefgarage um/i)).toBeInTheDocument();

      const nextBtn = screen.getByRole('button', { name: /Next step/i });
      fireEvent.click(nextBtn);
      expect(screen.getAllByText(/ADEM-BWM-65PRO/i).length).toBeGreaterThan(0);
    });
  });

  describe('Section: D1SqlPlayground', () => {
    it('executes SQL queries and displays simulated results table', async () => {
      renderWithProviders(<D1SqlPlayground />);
      expect(screen.getByText(/Cloudflare D1 SQL Playground/i)).toBeInTheDocument();

      const runBtn = screen.getByRole('button', { name: /Query Ausführen|Execute Query/i });
      fireEvent.click(runBtn);

      await act(async () => {
        await new Promise((r) => setTimeout(r, 500));
      });

      expect(screen.getByText(/Abfrageergebnis|Query Result/i)).toBeInTheDocument();
      expect(screen.getAllByText(/ADEM-BM-8003/i).length).toBeGreaterThan(0);
    });

    it('switches to D1 Schemas view and inspects table DDL', () => {
      renderWithProviders(<D1SqlPlayground />);
      const schemasTabBtn = screen.getByRole('button', { name: /D1 Schemas/i });
      fireEvent.click(schemasTabBtn);

      expect(screen.getByText(/TABLE: products/i)).toBeInTheDocument();
      expect(screen.getByText(/CREATE TABLE IF NOT EXISTS products/i)).toBeInTheDocument();
      expect(screen.getByText('PRIMARY')).toBeInTheDocument();
    });
  });

  describe('Section: SecondaryProjects & ProjectCard', () => {
    it('filters secondary projects by category tabs', () => {
      renderWithProviders(<SecondaryProjects />);
      expect(screen.getByText('Baker & Charlie')).toBeInTheDocument();
      expect(screen.getByText('KOST Sicherheitstechnik')).toBeInTheDocument();
      expect(screen.getByText('ZBN Offline RAG Pipeline')).toBeInTheDocument();

      // Filter by AI & RAG
      const aiTab = screen.getByRole('button', { name: /Offline AI & RAG/i });
      fireEvent.click(aiTab);
      expect(screen.getByText('ZBN Offline RAG Pipeline')).toBeInTheDocument();
      expect(screen.queryByText('Baker & Charlie')).not.toBeInTheDocument();

      // Filter by Edge
      const edgeTab = screen.getByRole('button', { name: /Edge & Fullstack/i });
      fireEvent.click(edgeTab);
      expect(screen.getByText('Baker & Charlie')).toBeInTheDocument();
      expect(screen.getByText('Kaffee Faensen')).toBeInTheDocument();
      expect(screen.queryByText('KOST Sicherheitstechnik')).not.toBeInTheDocument();
    });

    it('expands and collapses ProjectCard architecture details', () => {
      const sampleProject = secondaryProjectsData[0]!;
      renderWithProviders(<ProjectCard project={sampleProject} />);

      expect(screen.getByText('Baker & Charlie')).toBeInTheDocument();
      const toggleBtn = screen.getByRole('button', { name: /Architektur & Details anzeigen|Show Architecture & Details/i });
      fireEvent.click(toggleBtn);

      expect(screen.getByText(/Statische Single-Page Application auf Cloudflare Pages/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Details ausblenden|Hide Details/i })).toBeInTheDocument();
    });
  });

  describe('Section: ExperienceTimeline', () => {
    it('filters between Modern Edge and Agency eras and renders translated achievements', () => {
      renderWithProviders(<ExperienceTimeline />);
      expect(screen.getByRole('heading', { level: 2, name: /Beruflicher Werdegang|Career Experience/i })).toBeInTheDocument();
      expect(screen.getByText('08/2025 – Heute')).toBeInTheDocument();

      // Filter to modern era only
      const modernBtn = screen.getByRole('button', { name: /Modern Edge & AI/i });
      fireEvent.click(modernBtn);
      expect(screen.getByText('08/2025 – Heute')).toBeInTheDocument();
      expect(screen.queryByText(/Full-Stack Webentwickler/i)).not.toBeInTheDocument();
    });
  });

  describe('Section: SkillsMatrix', () => {
    it('renders 4 skill quadrants and engineering philosophy principles', () => {
      renderWithProviders(<SkillsMatrix />);
      expect(screen.getByText('Frontend Architecture')).toBeInTheDocument();
      expect(screen.getByText('Edge Backend & Database')).toBeInTheDocument();
      expect(screen.getByText('AI & Automation Runtimes')).toBeInTheDocument();
      expect(screen.getByText('DevOps, Testing & Tooling')).toBeInTheDocument();
      expect(screen.getByText(/Ingenieur-Prinzipien & Arbeitsphilosophie|Engineering Philosophy/i)).toBeInTheDocument();
    });
  });

  describe('Section: ContactFooter', () => {
    it('handles clipboard copy, direct email/phone links, and opens Impressum modal', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock,
        },
      });

      renderWithProviders(<ContactFooter />);
      expect(screen.getByRole('heading', { name: /Kontakt aufnehmen|Get in Touch/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'info@munverricht.org' })).toHaveAttribute('href', 'mailto:info@munverricht.org');

      // Copy email
      const copyBtn = screen.getByLabelText(/Copy email address/i);
      await act(async () => {
        fireEvent.click(copyBtn);
      });
      expect(writeTextMock).toHaveBeenCalledWith('info@munverricht.org');
      expect(screen.getByText(/E-Mail-Adresse in die Zwischenablage kopiert!|Copied/i)).toBeInTheDocument();

      // Open Impressum Modal
      const impressumBtn = screen.getByRole('button', { name: /Impressum & Datenschutz|Imprint & Legal/i });
      fireEvent.click(impressumBtn);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Impressum & Rechtliche Hinweise|Imprint & Legal Notice/i })).toBeInTheDocument();
    });
  });
});
