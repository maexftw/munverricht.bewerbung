import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider, useLanguage, LANGUAGE_STORAGE_KEY } from '../../src/context/LanguageContext';
import { de } from '../../src/data/locales/de';
import { en } from '../../src/data/locales/en';

function TestConsumer() {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();

  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <span data-testid="hero-name">{t.hero.name}</span>
      <span data-testid="nav-toggle">{t.nav.toggleLang}</span>
      <span data-testid="hero-cta">{t.hero.primaryCta}</span>
      <span data-testid="contact-email">{t.contact.email}</span>
      <button data-testid="toggle-btn" onClick={toggleLanguage}>
        Toggle
      </button>
      <button data-testid="set-en-btn" onClick={() => setLanguage('en')}>
        Set EN
      </button>
      <button data-testid="set-de-btn" onClick={() => setLanguage('de')}>
        Set DE
      </button>
      <button
        data-testid="set-invalid-btn"
        onClick={() => (setLanguage as (l: string) => void)('invalid_code')}
      >
        Set Invalid
      </button>
    </div>
  );
}

describe('LanguageContext & LanguageProvider (Vitest / React 19)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
  });

  it('TC-CTX01: defaults to German (de) when localStorage is empty', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang').textContent).toBe('de');
    expect(screen.getByTestId('nav-toggle').textContent).toBe('EN');
    expect(screen.getByTestId('hero-name').textContent).toBe('Maximilian Unverricht');
    expect(screen.getByTestId('hero-cta').textContent).toBe('Kontakt aufnehmen');
    expect(document.documentElement.getAttribute('lang')).toBe('de');
  });

  it('TC-CTX02: toggling language switches between de and en, updates localStorage and html lang', async () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );

    const toggleBtn = screen.getByTestId('toggle-btn');

    // Switch to EN
    await act(async () => {
      toggleBtn.click();
    });

    expect(screen.getByTestId('current-lang').textContent).toBe('en');
    expect(screen.getByTestId('nav-toggle').textContent).toBe('DE');
    expect(screen.getByTestId('hero-cta').textContent).toBe('Get in touch');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');
    expect(document.documentElement.getAttribute('lang')).toBe('en');

    // Switch back to DE
    await act(async () => {
      toggleBtn.click();
    });

    expect(screen.getByTestId('current-lang').textContent).toBe('de');
    expect(screen.getByTestId('nav-toggle').textContent).toBe('EN');
    expect(screen.getByTestId('hero-cta').textContent).toBe('Kontakt aufnehmen');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('de');
    expect(document.documentElement.getAttribute('lang')).toBe('de');
  });

  it('TC-CTX03: setLanguage directly switches language and persists preference', async () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );

    const setEnBtn = screen.getByTestId('set-en-btn');
    await act(async () => {
      setEnBtn.click();
    });

    expect(screen.getByTestId('current-lang').textContent).toBe('en');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');

    const setDeBtn = screen.getByTestId('set-de-btn');
    await act(async () => {
      setDeBtn.click();
    });

    expect(screen.getByTestId('current-lang').textContent).toBe('de');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('de');
  });

  it('TC-CTX04: boots with pre-stored language preference from localStorage', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang').textContent).toBe('en');
    expect(screen.getByTestId('hero-cta').textContent).toBe('Get in touch');
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  it('TC-CTX05: falls back gracefully to de if localStorage contains corrupted/invalid values', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'corrupted_value_123');

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang').textContent).toBe('de');
    expect(document.documentElement.getAttribute('lang')).toBe('de');
  });

  it('TC-CTX06: falls back to de when setLanguage is called with invalid parameter', async () => {
    render(
      <LanguageProvider initialLanguage="en">
        <TestConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang').textContent).toBe('en');

    const setInvalidBtn = screen.getByTestId('set-invalid-btn');
    await act(async () => {
      setInvalidBtn.click();
    });

    expect(screen.getByTestId('current-lang').textContent).toBe('de');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('de');
    expect(document.documentElement.getAttribute('lang')).toBe('de');
  });

  it('TC-CTX07: useLanguage throws descriptive error when used outside LanguageProvider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestConsumer />)).toThrow(
      'useLanguage must be used within a LanguageProvider'
    );

    consoleErrorSpy.mockRestore();
  });

  it('TC-CTX08: dictionary data contains authoritative email and identical structure in both de and en', () => {
    expect(de.contact.email).toBe('info@munverricht.org');
    expect(en.contact.email).toBe('info@munverricht.org');
    expect(de.flagship.pillars.length).toBe(5);
    expect(en.flagship.pillars.length).toBe(5);
    expect(de.projects.items.length).toBe(5);
    expect(en.projects.items.length).toBe(5);
    expect(de.experience.items.length).toBe(2);
    expect(en.experience.items.length).toBe(2);
  });
});
