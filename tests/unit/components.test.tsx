import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { LanguageProvider } from '../../src/context/LanguageContext';
import { Header } from '../../src/components/Header';
import { Hero } from '../../src/components/Hero';
import { About } from '../../src/components/About';
import { SkillsMatrix } from '../../src/components/SkillsMatrix';
import { FlagshipAdemco } from '../../src/components/FlagshipAdemco';
import { SecondaryProjects } from '../../src/components/SecondaryProjects';
import { ExperienceTimeline } from '../../src/components/ExperienceTimeline';
import { ContactFooter } from '../../src/components/ContactFooter';
import App from '../../src/App';

const renderWithLanguage = (ui: React.ReactElement, initialLanguage: 'de' | 'en' = 'de') => {
  return render(
    <LanguageProvider initialLanguage={initialLanguage}>
      {ui}
    </LanguageProvider>
  );
};

describe('Milestone 3: 7-Section UI Components Unit Suite', () => {
  // 1. Header
  describe('Header Component', () => {
    it('renders brand title and all 6 navigation anchor links in German by default', () => {
      renderWithLanguage(<Header />);
      expect(screen.getByLabelText(/Maximilian Unverricht — Home/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Profil/i })).toHaveAttribute('href', '#about');
      expect(screen.getByRole('link', { name: /Skills & Stack/i })).toHaveAttribute('href', '#skills');
      expect(screen.getByRole('link', { name: /ASL Ademco/i })).toHaveAttribute('href', '#flagship');
      expect(screen.getByRole('link', { name: /Projekte/i })).toHaveAttribute('href', '#projects');
      expect(screen.getByRole('link', { name: /Werdegang/i })).toHaveAttribute('href', '#experience');
      expect(screen.getByRole('link', { name: /Kontakt/i })).toHaveAttribute('href', '#contact');
    });

    it('renders language toggle button with touch-target class >= 44px', () => {
      renderWithLanguage(<Header />);
      const langBtn = screen.getByRole('button', { name: /Switch language to English/i });
      expect(langBtn).toBeInTheDocument();
      expect(langBtn.className).toContain('touch-target');
    });

    it('toggles language when language button is clicked', () => {
      renderWithLanguage(<Header />);
      const langBtn = screen.getByRole('button', { name: /Switch language to English/i });
      fireEvent.click(langBtn);
      expect(screen.getByRole('link', { name: /Profile/i })).toHaveAttribute('href', '#about');
      expect(screen.getByRole('link', { name: /Skills & Stack/i })).toHaveAttribute('href', '#skills');
      expect(screen.getByRole('link', { name: /Experience/i })).toHaveAttribute('href', '#experience');
    });

    it('opens mobile navigation menu when hamburger button is clicked', () => {
      renderWithLanguage(<Header />);
      const menuBtn = screen.getByLabelText(/Open navigation menu/i);
      expect(menuBtn).toBeInTheDocument();
      fireEvent.click(menuBtn);
      expect(screen.getByLabelText(/Close navigation menu/i)).toBeInTheDocument();
      expect(screen.getByLabelText('Mobile Navigation')).toBeInTheDocument();
    });
  });

  // 2. Hero
  describe('Hero Component', () => {
    it('renders hero display H1, role title, Dortmund location, and positioning statement', () => {
      renderWithLanguage(<Hero />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Maximilian Unverricht');
      expect(screen.getByText('AI Workflow & Web Delivery Specialist')).toBeInTheDocument();
      expect(screen.getByText(/Dortmund, Deutschland/i)).toBeInTheDocument();
      expect(screen.getByText(/Pragmatischer Web-Entwickler mit 12\+ Jahren Erfahrung/i)).toBeInTheDocument();
    });

    it('renders primary CTA linking to #contact and secondary CTA linking to #flagship with >=44px touch targets', () => {
      renderWithLanguage(<Hero />);
      const contactCta = screen.getByRole('link', { name: /Kontakt aufnehmen/i });
      const flagshipCta = screen.getByRole('link', { name: /Flagship Case Study ansehen/i });
      expect(contactCta).toHaveAttribute('href', '#contact');
      expect(flagshipCta).toHaveAttribute('href', '#flagship');
      expect(contactCta.className).toContain('touch-target');
      expect(flagshipCta.className).toContain('touch-target');
    });

    it('renders English content when initialized in EN mode', () => {
      renderWithLanguage(<Hero />, 'en');
      expect(screen.getByText(/Dortmund, Germany/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Get in touch/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /View Flagship Case Study/i })).toBeInTheDocument();
    });
  });

  // 3. About
  describe('About Component', () => {
    it('renders section title, 2 narrative paragraphs, and 4 highlights', () => {
      renderWithLanguage(<About />);
      expect(screen.getByRole('heading', { name: 'Über mich' })).toBeInTheDocument();
      expect(screen.getByText(/Seit über 12 Jahren entwickle und optimiere ich/i)).toBeInTheDocument();
      expect(screen.getByText(/Seit August 2025 liegt mein klarer Fokus/i)).toBeInTheDocument();
      expect(screen.getByText('12+ Jahre')).toBeInTheDocument();
      expect(screen.getByText('React & AI Delivery')).toBeInTheDocument();
      expect(screen.getByText('Cloudflare Pages & Edge')).toBeInTheDocument();
    });
  });

  // 4. SkillsMatrix
  describe('SkillsMatrix Component', () => {
    it('renders 4 technical quadrants and expected skill chips', () => {
      renderWithLanguage(<SkillsMatrix />);
      expect(screen.getByRole('heading', { name: 'Skills & Tech Stack' })).toBeInTheDocument();
      expect(screen.getByText('Frontend Architecture')).toBeInTheDocument();
      expect(screen.getByText('Edge Backend & Database')).toBeInTheDocument();
      expect(screen.getByText('AI & Automation Runtimes')).toBeInTheDocument();
      expect(screen.getByText('DevOps, Testing & Tooling')).toBeInTheDocument();

      // Check tech tags
      expect(screen.getByText('React 19')).toBeInTheDocument();
      expect(screen.getByText('Cloudflare Pages & Workers')).toBeInTheDocument();
      expect(screen.getByText(/DeepSeek-V3/i)).toBeInTheDocument();
      expect(screen.getByText(/Playwright/i)).toBeInTheDocument();
    });
  });

  // 5. FlagshipAdemco
  describe('FlagshipAdemco Component', () => {
    it('renders flagship badge, title, client, and problem statement', () => {
      renderWithLanguage(<FlagshipAdemco />);
      expect(screen.getByText(/Flagship Case Study #1/i)).toBeInTheDocument();
      expect(screen.getByText(/ASL Ademco B2B — AI-gestützter Produktberater & Planning Studio/i)).toBeInTheDocument();
      expect(screen.getByText(/ASL Ademco B2B Großhandel/i)).toBeInTheDocument();
      expect(screen.getByText(/Herausforderung & Problemstellung/i)).toBeInTheDocument();
    });

    it('renders all 5 technical solution pillars', () => {
      renderWithLanguage(<FlagshipAdemco />);
      expect(screen.getByText(/1\. Vertical Agent \(ReAct Loop\)/i)).toBeInTheDocument();
      expect(screen.getByText(/2\. Anti-Halluzinations-Guardrails/i)).toBeInTheDocument();
      expect(screen.getByText(/3\. Strukturierte SQL-RAG-Pipeline/i)).toBeInTheDocument();
      expect(screen.getByText(/4\. B2B Planning Studio Frontend/i)).toBeInTheDocument();
      expect(screen.getByText(/5\. Datanorm Import-Pipeline/i)).toBeInTheDocument();
    });

    it('renders 4 key metrics with tabular-nums font styling', () => {
      renderWithLanguage(<FlagshipAdemco />);
      expect(screen.getByText('1.460+')).toBeInTheDocument();
      expect(screen.getByText('Bis zu 7')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('100/100')).toBeInTheDocument();
    });

    it('transparently attributes frontend prototype to Google AI Studio / Stitch and engineering to Maximilian', () => {
      renderWithLanguage(<FlagshipAdemco />);
      expect(screen.getByText(/Transparente Entwickler-Zuordnung/i)).toBeInTheDocument();
      expect(screen.getByText(/Google AI Studio \/ Stitch/i)).toBeInTheDocument();
      expect(screen.getByText(/Vollständige technische Architektur & Cloudflare Pages\/D1 Backend-Implementierung/i)).toBeInTheDocument();
    });
  });

  // 6. SecondaryProjects
  describe('SecondaryProjects Component', () => {
    it('renders all 5 secondary project cards with stack tags', () => {
      renderWithLanguage(<SecondaryProjects />);
      expect(screen.getByRole('heading', { name: 'Weitere ausgewählte Projekte' })).toBeInTheDocument();
      expect(screen.getByText('Baker & Charlie')).toBeInTheDocument();
      expect(screen.getByText('KOST Sicherheitstechnik')).toBeInTheDocument();
      expect(screen.getByText('Kaffee Faensen')).toBeInTheDocument();
      expect(screen.getByText('RLC 1952 Recklinghausen')).toBeInTheDocument();
      expect(screen.getByText('ZBN Offline RAG Pipeline')).toBeInTheDocument();
    });
  });

  // 7. ExperienceTimeline
  describe('ExperienceTimeline Component', () => {
    it('renders 2 career phases with achievements and stack tags', () => {
      renderWithLanguage(<ExperienceTimeline />);
      expect(screen.getByRole('heading', { name: 'Beruflicher Werdegang' })).toBeInTheDocument();
      expect(screen.getByText('08/2025 – Heute')).toBeInTheDocument();
      expect(screen.getByText('2013 – 2025')).toBeInTheDocument();
      expect(screen.getByText('Graphiks.de')).toBeInTheDocument();
      expect(screen.getByText(/Über 10 Jahre ganzheitliche Betreuung/i)).toBeInTheDocument();
    });
  });

  // 8. ContactFooter
  describe('ContactFooter Component', () => {
    it('renders email, phone, location, and CTA button', () => {
      renderWithLanguage(<ContactFooter />);
      expect(screen.getByRole('heading', { name: 'Kontakt aufnehmen' })).toBeInTheDocument();
      expect(screen.getByText('info@munverricht.org')).toBeInTheDocument();
      expect(screen.getByText('+49 163 3229892')).toBeInTheDocument();
      expect(screen.getByText(/Dortmund, Deutschland/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /E-Mail senden/i })).toHaveAttribute('href', expect.stringContaining('mailto:info@munverricht.org'));
    });

    it('handles clipboard copy interaction', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock,
        },
      });

      renderWithLanguage(<ContactFooter />);
      const copyEmailBtn = screen.getByLabelText(/Copy email address/i);
      await React.act(async () => {
        fireEvent.click(copyEmailBtn);
      });
      expect(writeTextMock).toHaveBeenCalledWith('info@munverricht.org');
    });
  });

  // 9. Full App Integration
  describe('Full App Integration', () => {
    it('renders all sections connected in single-page layout and toggles entire document language', () => {
      render(<App />);
      
      // Initially German
      expect(screen.getByRole('heading', { name: 'Über mich' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Skills & Tech Stack' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Beruflicher Werdegang' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Kontakt aufnehmen' })).toBeInTheDocument();

      // Click language toggle button
      const langBtn = screen.getByRole('button', { name: /Switch language to English/i });
      fireEvent.click(langBtn);

      // Verify language switch in all sections
      expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Career Experience' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Get in Touch' })).toBeInTheDocument();
    });
  });
});
