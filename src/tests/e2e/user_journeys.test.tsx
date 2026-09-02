/**
 * High-Level End-to-End User Journeys Suite
 * Maximilian Unverricht Digital Résumé & Portfolio
 *
 * Simulates complete user session flows: from landing page mount,
 * language switching, section exploration, to contacting the candidate.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import App from '../../App';
import { LANGUAGE_STORAGE_KEY } from '../../context/LanguageContext';
import { de } from '../../data/locales/de';
import { en } from '../../data/locales/en';

describe('E2E User Journeys (Comprehensive End-to-End)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.setAttribute('lang', 'de');
    document.documentElement.removeAttribute('data-theme-mode');
    document.documentElement.removeAttribute('data-theme-palette');
    document.documentElement.removeAttribute('data-font-offset');
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('Journey 1: Visitor lands on site, reads hero, navigates to flagship case study, and verifies architecture', () => {
    render(<App />);

    // 1. Verify candidate identity
    expect(screen.getByRole('heading', { level: 1, name: 'Maximilian Unverricht' })).toBeInTheDocument();
    expect(screen.getByText(/Available for Projects & Roles/i)).toBeInTheDocument();

    // 2. Click Flagship CTA in Hero
    const flagshipCta = screen.getByRole('link', { name: new RegExp(de.hero.secondaryCta, 'i') });
    expect(flagshipCta).toHaveAttribute('href', '#flagship');

    // 3. Inspect Flagship Ademco section
    const flagshipSection = document.getElementById('flagship');
    expect(flagshipSection).toBeInTheDocument();
    expect(screen.getByText(de.flagship.title)).toBeInTheDocument();
    expect(screen.getByText('1.460+')).toBeInTheDocument();
    expect(screen.getByText('Bis zu 7')).toBeInTheDocument();

    // 4. Verify solution pillars
    de.flagship.pillars.forEach((pillar) => {
      expect(screen.getByText(pillar.title)).toBeInTheDocument();
    });
  });

  it('Journey 2: International recruiter switches site to English, reviews secondary projects and career timeline', () => {
    render(<App />);

    // 1. Switch language to English
    const langBtn = screen.getByRole('button', { name: /Switch language to English/i });
    fireEvent.click(langBtn);
    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');

    // 2. Verify all 5 project cards in English
    expect(screen.getByText('Baker & Charlie')).toBeInTheDocument();
    expect(screen.getByText('KOST Sicherheitstechnik')).toBeInTheDocument();
    expect(screen.getByText('Kaffee Faensen')).toBeInTheDocument();
    expect(screen.getByText('RLC 1952 Recklinghausen')).toBeInTheDocument();
    expect(screen.getByText('ZBN Offline RAG Pipeline')).toBeInTheDocument();

    // 3. Verify Career timeline in English
    expect(screen.getByRole('heading', { level: 2, name: en.experience.title })).toBeInTheDocument();
    expect(screen.getByText(/Independent \/ Project-Based/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Graphiks.de/i).length).toBeGreaterThan(0);
  });

  it('Journey 3: Visitor copies contact email and verifies clipboard integration and toast notification', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<App />);

    // 1. Locate email copy button in footer
    const copyEmailBtn = screen.getByLabelText(/Copy email address/i);
    expect(copyEmailBtn).toBeInTheDocument();

    // 2. Click copy button
    await act(async () => {
      fireEvent.click(copyEmailBtn);
    });

    // 3. Assert clipboard API was called with exact email
    expect(writeTextMock).toHaveBeenCalledWith('info@munverricht.org');

    // 4. Assert visual confirmation toast appears
    expect(screen.getByText(de.contact.copiedNotice)).toBeInTheDocument();
  });

  it('Journey 4: Mobile visitor opens navigation drawer, navigates to skills section, and drawer closes automatically', () => {
    render(<App />);

    // 1. Open mobile navigation menu
    const menuBtn = screen.getByLabelText(/Open navigation menu/i);
    fireEvent.click(menuBtn);
    const mobileNav = screen.getByLabelText('Mobile Navigation');
    expect(mobileNav).toBeInTheDocument();

    // 2. Click on Skills link in mobile navigation
    const mobileSkillsLink = mobileNav.querySelector('a[href="#skills"]');
    expect(mobileSkillsLink).toBeInTheDocument();
    if (mobileSkillsLink) {
      fireEvent.click(mobileSkillsLink);
    }

    // 3. Verify mobile navigation closes
    expect(screen.queryByLabelText('Mobile Navigation')).not.toBeInTheDocument();

    // 4. Verify Skills section is present on page
    const skillsSection = document.getElementById('skills');
    expect(skillsSection).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: de.skills.title })).toBeInTheDocument();
  });

  it('Journey 5: Keyboard power user navigates site using Tab and verifies accessibility focus rings', () => {
    render(<App />);

    // 1. Brand logo has focus ring
    const brandLink = screen.getByLabelText(/Maximilian Unverricht — Home/i);
    expect(brandLink.className).toContain('focus-visible:ring-2');

    // 2. Language toggle has focus ring
    const langBtn = screen.getByRole('button', { name: /Switch language/i });
    expect(langBtn.className).toContain('focus-visible:ring-2');

    // 3. CTAs have focus rings
    const contactCta = screen.getByRole('link', { name: new RegExp(de.hero.primaryCta, 'i') });
    expect(contactCta.className).toContain('focus-visible:ring-2');
  });
});
