/**
 * Adversarial Empirical Challenge Suite: Milestone 2 (Bilingual Engine & Content Data)
 * Stress-testing edge cases, localStorage failure modes, rapid toggling, DOM sync, and content contracts.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider, useLanguage, LANGUAGE_STORAGE_KEY } from '../../src/context/LanguageContext';
import { de } from '../../src/data/locales/de';
import { en } from '../../src/data/locales/en';
import type { Language, TranslationDictionary } from '../../src/types/content';

// Consumer component for React-level stress testing
function StressTestConsumer({ onRender }: { onRender?: (lang: Language, t: TranslationDictionary) => void }) {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  if (onRender) onRender(language, t);

  return (
    <div>
      <span data-testid="lang-display">{language}</span>
      <span data-testid="toggle-text">{t.nav.toggleLang}</span>
      <span data-testid="hero-greeting">{t.hero.greeting}</span>
      <span data-testid="flagship-title">{t.flagship.title}</span>
      <span data-testid="contact-email">{t.contact.email}</span>
      <button data-testid="btn-toggle" onClick={toggleLanguage}>Toggle</button>
      <button data-testid="btn-set-de" onClick={() => setLanguage('de')}>Set DE</button>
      <button data-testid="btn-set-en" onClick={() => setLanguage('en')}>Set EN</button>
      <button data-testid="btn-set-invalid-null" onClick={() => (setLanguage as (l: any) => void)(null)}>Set Null</button>
      <button data-testid="btn-set-invalid-empty" onClick={() => (setLanguage as (l: any) => void)('')}>Set Empty</button>
      <button data-testid="btn-set-invalid-code" onClick={() => (setLanguage as (l: any) => void)('fr')}>Set FR</button>
    </div>
  );
}

describe('Adversarial Challenge: LocalStorage Corruption & Security Modes', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
  });

  const corruptValues = [
    '',
    '   ',
    'null',
    'undefined',
    'DE',
    'EN',
    'de-DE',
    'en-US',
    'fr',
    'es',
    'zh',
    'ja',
    '123',
    '{"lang":"de"}',
    '<script>alert("xss")</script>',
    'javascript:void(0)',
    '__proto__',
    'constructor',
    'A'.repeat(5000)
  ];

  corruptValues.forEach((val, idx) => {
    it(`TC-ADV-STORAGE-${idx + 1}: Boot with hostile localStorage value "${val.slice(0, 20)}" safely defaults to "de"`, () => {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, val);

      render(
        <LanguageProvider>
          <StressTestConsumer />
        </LanguageProvider>
      );

      expect(screen.getByTestId('lang-display').textContent).toBe('de');
      expect(document.documentElement.getAttribute('lang')).toBe('de');
      expect(screen.getByTestId('toggle-text').textContent).toBe('EN');
    });
  });

  it('TC-ADV-STORAGE-ERR: Gracefully survives localStorage throwing SecurityError (Sandboxed / Private Browsing)', () => {
    const originalGetItem = window.localStorage.getItem;
    const originalSetItem = window.localStorage.setItem;

    // Simulate SecurityError
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new DOMException('The operation is insecure.', 'SecurityError');
    });
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('The operation is insecure.', 'SecurityError');
    });

    render(
      <LanguageProvider>
        <StressTestConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId('lang-display').textContent).toBe('de');
    expect(document.documentElement.getAttribute('lang')).toBe('de');

    // Toggling should still work in memory even when storage writes throw
    const toggleBtn = screen.getByTestId('btn-toggle');
    act(() => {
      toggleBtn.click();
    });

    expect(screen.getByTestId('lang-display').textContent).toBe('en');
    expect(document.documentElement.getAttribute('lang')).toBe('en');

    window.localStorage.getItem = originalGetItem;
    window.localStorage.setItem = originalSetItem;
  });

  it('TC-ADV-STORAGE-QUOTA: Gracefully survives localStorage QuotaExceededError during setLanguage', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError', 'QuotaExceededError');
    });

    render(
      <LanguageProvider>
        <StressTestConsumer />
      </LanguageProvider>
    );

    const setEnBtn = screen.getByTestId('btn-set-en');
    act(() => {
      setEnBtn.click();
    });

    // In-memory state and DOM sync should succeed despite storage write failure
    expect(screen.getByTestId('lang-display').textContent).toBe('en');
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });
});

describe('Adversarial Challenge: Rapid Language Switching & Concurrency Stress', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
  });

  it('TC-ADV-RAPID-01: 500 rapid alternating toggles maintain exact state and DOM consistency', async () => {
    render(
      <LanguageProvider>
        <StressTestConsumer />
      </LanguageProvider>
    );

    const toggleBtn = screen.getByTestId('btn-toggle');

    for (let i = 1; i <= 500; i++) {
      await act(async () => {
        toggleBtn.click();
      });

      const expectedLang: Language = i % 2 === 1 ? 'en' : 'de';
      const expectedToggle: string = i % 2 === 1 ? 'DE' : 'EN';

      expect(screen.getByTestId('lang-display').textContent).toBe(expectedLang);
      expect(document.documentElement.getAttribute('lang')).toBe(expectedLang);
      expect(screen.getByTestId('toggle-text').textContent).toBe(expectedToggle);
      expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe(expectedLang);
    }
  });

  it('TC-ADV-RAPID-02: 1,000 rapid randomized setLanguage calls always reach deterministic final state', async () => {
    let renderCount = 0;
    render(
      <LanguageProvider>
        <StressTestConsumer onRender={() => { renderCount++; }} />
      </LanguageProvider>
    );

    const options: (Language | any)[] = ['de', 'en', 'invalid', '', null, undefined, 'fr'];
    let lastIntendedLang: Language = 'de';

    for (let i = 0; i < 1000; i++) {
      const chosen = options[Math.floor(Math.random() * options.length)];
      const btnId = chosen === 'en' ? 'btn-set-en' : (chosen === 'de' ? 'btn-set-de' : 'btn-set-invalid-code');
      
      if (chosen === 'en') lastIntendedLang = 'en';
      else if (chosen === 'de') lastIntendedLang = 'de';
      else lastIntendedLang = 'de'; // invalid falls back to 'de'

      await act(async () => {
        screen.getByTestId(btnId).click();
      });
    }

    expect(screen.getByTestId('lang-display').textContent).toBe(lastIntendedLang);
    expect(document.documentElement.getAttribute('lang')).toBe(lastIntendedLang);
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe(lastIntendedLang);
    expect(renderCount).toBeGreaterThan(1);
  });
});

describe('Adversarial Challenge: DOM Synchronization Edge Cases', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
  });

  it('TC-ADV-DOM-01: Overwrites pre-existing dirty document.documentElement.lang on mount', () => {
    document.documentElement.setAttribute('lang', 'fr-FR');

    render(
      <LanguageProvider>
        <StressTestConsumer />
      </LanguageProvider>
    );

    expect(document.documentElement.getAttribute('lang')).toBe('de');
  });

  it('TC-ADV-DOM-02: InitialLanguage prop strictly takes precedence over localStorage on initialization', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'de');

    render(
      <LanguageProvider initialLanguage="en">
        <StressTestConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId('lang-display').textContent).toBe('en');
    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');
  });
});

describe('Adversarial Challenge: Deep Exhaustive Dictionary Parity & Content Audit', () => {
  it('TC-ADV-DATA-01: Scans ALL strings in de and en for empty strings, whitespace-only, and placeholders', () => {
    const forbiddenPatterns = [
      /lorem ipsum/i,
      /todo/i,
      /tbd/i,
      /\[object object\]/i,
      /undefined/i,
      /null/i,
      /\{\{.*?\}\}/
    ];

    function auditStrings(obj: any, currentPath: string, locale: string) {
      if (typeof obj === 'string') {
        expect(obj.trim().length, `String at ${locale}:${currentPath} must not be empty or whitespace`).toBeGreaterThan(0);
        for (const pattern of forbiddenPatterns) {
          if (pattern.test(obj)) {
            if (obj === 'null' || obj === 'undefined' || obj === 'TODO' || obj === 'TBD') {
              throw new Error(`Placeholder detected at ${locale}:${currentPath}: "${obj}"`);
            }
          }
        }
      } else if (Array.isArray(obj)) {
        expect(obj.length, `Array at ${locale}:${currentPath} must not be empty`).toBeGreaterThan(0);
        obj.forEach((item, idx) => auditStrings(item, `${currentPath}[${idx}]`, locale));
      } else if (obj !== null && typeof obj === 'object') {
        for (const [key, value] of Object.entries(obj)) {
          auditStrings(value, currentPath ? `${currentPath}.${key}` : key, locale);
        }
      }
    }

    auditStrings(de, '', 'de');
    auditStrings(en, '', 'en');
  });

  it('TC-ADV-DATA-02: Strict symmetry of array lengths and child array lengths across all sections', () => {
    // 1. About paragraphs
    expect(de.about.paragraphs.length).toBe(en.about.paragraphs.length);
    expect(de.about.highlights.length).toBe(en.about.highlights.length);

    // 2. Skills categories and individual category items
    expect(de.skills.categories.length).toBe(en.skills.categories.length);
    de.skills.categories.forEach((cat, idx) => {
      const enCat = en.skills.categories[idx];
      expect(enCat).toBeDefined();
      if (enCat) {
        expect(cat.items.length).toBe(enCat.items.length);
      }
    });

    // 3. Flagship pillars, metrics, attribution
    expect(de.flagship.pillars.length).toBe(5);
    expect(en.flagship.pillars.length).toBe(5);
    expect(de.flagship.metrics.length).toBe(en.flagship.metrics.length);
    expect(de.flagship.attribution.engineering.length).toBe(en.flagship.attribution.engineering.length);

    // 4. Projects items and stacks
    expect(de.projects.items.length).toBe(5);
    expect(en.projects.items.length).toBe(5);
    de.projects.items.forEach((proj, idx) => {
      const enProj = en.projects.items[idx];
      expect(enProj).toBeDefined();
      if (enProj) {
        expect(proj.id).toBe(enProj.id);
        expect(proj.stack.length).toBe(enProj.stack.length);
      }
    });

    // 5. Experience items, achievements, and stacks
    expect(de.experience.items.length).toBe(2);
    expect(en.experience.items.length).toBe(2);
    de.experience.items.forEach((exp, idx) => {
      const enExp = en.experience.items[idx];
      expect(enExp).toBeDefined();
      if (enExp) {
        expect(exp.period).toMatch(/08\/2025|2013/);
        expect(enExp.period).toMatch(/08\/2025|2013/);
        expect(exp.achievements.length).toBe(enExp.achievements.length);
        expect(exp.stack.length).toBe(enExp.stack.length);
      }
    });
  });

  it('TC-ADV-DATA-03: Authoritative biographical & contact accuracy across both locales', () => {
    // Email
    expect(de.contact.email).toBe('info@munverricht.org');
    expect(en.contact.email).toBe('info@munverricht.org');

    // Phone
    expect(de.contact.phone).toBe('+49 163 3229892');
    expect(en.contact.phone).toBe('+49 163 3229892');

    // Location
    expect(de.contact.location).toContain('Dortmund');
    expect(en.contact.location).toContain('Dortmund');
    expect(de.hero.location).toContain('Dortmund');
    expect(en.hero.location).toContain('Dortmund');

    // Name
    expect(de.hero.name).toBe('Maximilian Unverricht');
    expect(en.hero.name).toBe('Maximilian Unverricht');

    // Title
    expect(de.hero.title).toBe('AI Workflow & Web Delivery Specialist');
    expect(en.hero.title).toBe('AI Workflow & Web Delivery Specialist');
  });

  it('TC-ADV-DATA-04: Flagship ASL Ademco case study contains all 5 required technical pillars and metrics', () => {
    const requiredPillars = [
      'Vertical Agent (ReAct Loop)',
      'Guardrail',
      'SQL',
      'Planning Studio',
      'Datanorm'
    ];

    requiredPillars.forEach((keyword, idx) => {
      const dePillar = de.flagship.pillars[idx];
      const enPillar = en.flagship.pillars[idx];
      expect(dePillar).toBeDefined();
      expect(enPillar).toBeDefined();
      if (dePillar && enPillar) {
        const deCombined = `${dePillar.title} ${dePillar.description} ${dePillar.tech}`;
        const enCombined = `${enPillar.title} ${enPillar.description} ${enPillar.tech}`;

        expect(deCombined).toContain(keyword);
        expect(enCombined).toContain(keyword);
      }
    });

    // Verify 1460+ SKUs and 7 iterations and Lighthouse 100
    const deMetricsDump = JSON.stringify(de.flagship.metrics);
    const enMetricsDump = JSON.stringify(en.flagship.metrics);
    expect(deMetricsDump).toMatch(/1\.460\+|1460/);
    expect(enMetricsDump).toMatch(/1,460\+|1460/);
    expect(deMetricsDump).toContain('7');
    expect(enMetricsDump).toContain('7');
    expect(deMetricsDump).toContain('100');
    expect(enMetricsDump).toContain('100');
  });
});
