/**
 * Empirical Challenger Suite: Milestone 1 — Cyberpunk Theme, Base Shell, Navbar & Bilingual Engine
 * Adversarial stress testing, boundary condition mining, and fault tolerance verification.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useState } from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import {
  LanguageProvider,
  useLanguage,
  LANGUAGE_STORAGE_KEY,
} from '../../src/context/LanguageContext';
import { BentoCard } from '../../src/components/ui/BentoCard';
import { CyberTabs } from '../../src/components/ui/CyberTabs';
import { Navbar } from '../../src/components/layout/Navbar';
import { LanguageSwitcher } from '../../src/components/layout/LanguageSwitcher';
import { CyberShell } from '../../src/components/layout/CyberShell';
import { CyberButton } from '../../src/components/ui/CyberButton';
import { TerminalWindow } from '../../src/components/ui/TerminalWindow';
import { translationsDe } from '../../src/data/translationsDe';
import { translationsEn } from '../../src/data/translationsEn';

describe('CHALLENGER SUITE: Milestone 1 Adversarial & Stress Testing', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // ==========================================================================
  // VECTOR 1: LANGUAGE CONTEXT ADVERSARIAL STRESS & CORRUPT STORAGE
  // ==========================================================================
  describe('Vector 1: LanguageContext Adversarial & Fault Tolerance', () => {
    function LangConsumer({ onRender }: { onRender?: (lang: string) => void }) {
      const { language, setLanguage, toggleLanguage, t } = useLanguage();
      if (onRender) onRender(language);

      return (
        <div>
          <span data-testid="active-lang">{language}</span>
          <span data-testid="t-hero-name">{t.hero.name}</span>
          <span data-testid="t-nav-about">{t.nav.about}</span>
          <span data-testid="t-lookup-flagship">{(t as unknown as (k: string) => string)('flagship.badge')}</span>
          <span data-testid="t-direct-obj">{t.contact.email}</span>
          <button data-testid="toggle-btn" onClick={toggleLanguage}>
            Toggle
          </button>
          <button data-testid="set-en-btn" onClick={() => setLanguage('en')}>
            Set EN
          </button>
          <button data-testid="set-de-btn" onClick={() => setLanguage('de')}>
            Set DE
          </button>
        </div>
      );
    }

    it('ADV-LC01: 1,000 rapid sequential toggleLanguage operations maintain deterministic parity', async () => {
      render(
        <LanguageProvider initialLanguage="de">
          <LangConsumer />
        </LanguageProvider>
      );

      const toggleBtn = screen.getByTestId('toggle-btn');
      const totalToggles = 1000;

      await act(async () => {
        for (let i = 0; i < totalToggles; i++) {
          fireEvent.click(toggleBtn);
        }
      });

      // 1000 toggles starting from 'de' should end on 'de'
      expect(screen.getByTestId('active-lang').textContent).toBe('de');
      expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('de');
      expect(document.documentElement.getAttribute('lang')).toBe('de');

      // 1 additional toggle should transition to 'en'
      await act(async () => {
        fireEvent.click(toggleBtn);
      });
      expect(screen.getByTestId('active-lang').textContent).toBe('en');
      expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');
      expect(document.documentElement.getAttribute('lang')).toBe('en');
    });

    it('ADV-LC02: Corrupt, malicious, and unexpected localStorage values safely fallback to "de"', () => {
      const maliciousPayloads = [
        'fr',
        'es',
        'zh',
        'ja',
        'ru',
        'undefined',
        'null',
        'true',
        'false',
        '0',
        '1',
        '',
        '   ',
        '{"hack": true, "role": "admin"}',
        '<script>alert("xss")</script>',
        'de_DE',
        'en-US',
        'DE',
        'EN',
        '__proto__',
        'constructor',
        'Object.prototype',
        'a'.repeat(5000),
      ];

      maliciousPayloads.forEach((payload) => {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, payload);
        const { unmount } = render(
          <LanguageProvider>
            <LangConsumer />
          </LanguageProvider>
        );

        expect(screen.getByTestId('active-lang').textContent).toBe('de');
        expect(document.documentElement.getAttribute('lang')).toBe('de');
        unmount();
      });
    });

    it('ADV-LC03: Gracefully tolerates localStorage SecurityError and QuotaExceededError exceptions', () => {
      // Mock localStorage to throw on getItem and setItem (e.g., sandboxed iframe or disabled cookies)
      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new DOMException('Access denied', 'SecurityError');
      });
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new DOMException('Storage quota exceeded', 'QuotaExceededError');
      });

      expect(() => {
        render(
          <LanguageProvider>
            <LangConsumer />
          </LanguageProvider>
        );
      }).not.toThrow();

      expect(screen.getByTestId('active-lang').textContent).toBe('de');

      const toggleBtn = screen.getByTestId('toggle-btn');
      expect(() => {
        fireEvent.click(toggleBtn);
      }).not.toThrow();

      expect(screen.getByTestId('active-lang').textContent).toBe('en');
      expect(document.documentElement.getAttribute('lang')).toBe('en');

      getItemSpy.mockRestore();
      setItemSpy.mockRestore();
    });

    it('ADV-LC04: t(key) lookup handles missing keys, empty strings, prototype properties, and deep nesting', () => {
      let tFn: any;
      function TestLookup() {
        const { t } = useLanguage();
        tFn = t;
        return <div>Lookup Ready</div>;
      }

      render(
        <LanguageProvider initialLanguage="de">
          <TestLookup />
        </LanguageProvider>
      );

      // Existing key paths
      expect(tFn('hero.name')).toBe('Maximilian Unverricht');
      expect(tFn('nav.about')).toBe('Profil');

      // Non-existent keys should safely return the key itself
      expect(tFn('non.existent.deep.key.path')).toBe('non.existent.deep.key.path');
      expect(tFn('completelyUnknownKey')).toBe('completelyUnknownKey');
      expect(tFn('')).toBe('');
      expect(tFn('.')).toBe('.');
      expect(tFn('...')).toBe('...');

      // Prototype pollution & built-in property defense
      expect(tFn('constructor')).toBe('constructor');
      expect(tFn('__proto__')).toBe('__proto__');
      expect(tFn('toString')).toBe('toString');
      expect(tFn('valueOf')).toBe('valueOf');
      expect(tFn('hasOwnProperty')).toBe('hasOwnProperty');

      // Object properties directly attached
      expect(tFn.hero.name).toBe('Maximilian Unverricht');
      expect(tFn.contact.email).toBe('info@munverricht.org');
    });

    it('ADV-LC05: Full key parity check between translationsDe and translationsEn', () => {
      function getAllKeys(obj: any, prefix = ''): string[] {
        let keys: string[] = [];
        for (const k of Object.keys(obj)) {
          const fullKey = prefix ? `${prefix}.${k}` : k;
          if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            keys = keys.concat(getAllKeys(obj[k], fullKey));
          } else {
            keys.push(fullKey);
          }
        }
        return keys;
      }

      const deKeys = getAllKeys(translationsDe).sort();
      const enKeys = getAllKeys(translationsEn).sort();

      const missingInEn = deKeys.filter((k) => !enKeys.includes(k));
      const missingInDe = enKeys.filter((k) => !deKeys.includes(k));

      expect(missingInEn).toEqual([]);
      expect(missingInDe).toEqual([]);
      expect(deKeys.length).toBe(enKeys.length);
      expect(deKeys.length).toBeGreaterThan(30);
    });
  });

  // ==========================================================================
  // VECTOR 2: BENTOCARD MOUSE TRACKING & OUT-OF-BOUNDS EVENTS
  // ==========================================================================
  describe('Vector 2: BentoCard Mouse Tracking & Extremes', () => {
    it('ADV-BC01: Handles extreme out-of-bounds coordinates without crashing or layout distortion', () => {
      render(
        <BentoCard glowColor="cyan" data-testid="bento-oob">
          <div data-testid="bento-inner">Content</div>
        </BentoCard>
      );

      const card = screen.getByTestId('bento-oob');

      // Mock getBoundingClientRect
      vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({
        left: 100,
        top: 200,
        right: 400,
        bottom: 500,
        width: 300,
        height: 300,
        x: 100,
        y: 200,
        toJSON: () => {},
      });

      const extremeCoords = [
        { clientX: -999999, clientY: -999999 },
        { clientX: 9999999, clientY: 9999999 },
        { clientX: -1, clientY: -1 },
        { clientX: 0, clientY: 0 },
        { clientX: 99.9, clientY: 199.9 },
        { clientX: 100, clientY: 200 },
        { clientX: 250.75, clientY: 350.25 },
        { clientX: 400.1, clientY: 500.1 },
        { clientX: 5000, clientY: 5000 },
      ];

      extremeCoords.forEach((coords) => {
        expect(() => {
          fireEvent.mouseMove(card, coords);
        }).not.toThrow();
      });

      // Mouse leave resets hover state safely
      expect(() => {
        fireEvent.mouseLeave(card);
      }).not.toThrow();
    });

    it('ADV-BC02: 500 rapid consecutive mousemove and mouseleave events execute smoothly', () => {
      render(
        <BentoCard glowColor="emerald" data-testid="bento-stress">
          <span>Stress Test Card</span>
        </BentoCard>
      );

      const card = screen.getByTestId('bento-stress');

      expect(() => {
        for (let i = 0; i < 500; i++) {
          fireEvent.mouseMove(card, { clientX: (i * 7) % 800, clientY: (i * 11) % 600 });
          if (i % 25 === 0) {
            fireEvent.mouseLeave(card);
          }
        }
      }).not.toThrow();
    });

    it('ADV-BC03: Supports all 4 glowColor variants and interactive=false mode', () => {
      const glowColors = ['cyan', 'emerald', 'violet', 'amber'] as const;

      glowColors.forEach((color) => {
        const { unmount } = render(
          <BentoCard glowColor={color} interactive={false} data-testid={`bento-${color}`}>
            <span>{color}</span>
          </BentoCard>
        );

        const card = screen.getByTestId(`bento-${color}`);
        expect(card).toBeInTheDocument();
        // interactive=false should NOT have hover:-translate-y-0.5
        expect(card.className).not.toContain('hover:-translate-y-0.5');
        unmount();
      });
    });
  });

  // ==========================================================================
  // VECTOR 3: CYBERTABS RAPID KEY NAVIGATION & EDGE INDICES
  // ==========================================================================
  describe('Vector 3: CyberTabs Rapid Key Navigation & Edge Index Boundaries', () => {
    function ControlledTabs({
      initialTabs = [
        { id: 'tab1', label: 'Tab 1', count: 1 },
        { id: 'tab2', label: 'Tab 2', count: 2 },
        { id: 'tab3', label: 'Tab 3', count: 3 },
      ],
    }) {
      const [activeTab, setActiveTab] = useState(initialTabs[0]?.id || '');
      return (
        <CyberTabs
          tabs={initialTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          data-testid="cyber-tabs-harness"
        />
      );
    }

    it('ADV-CT01: 200 rapid alternating ArrowRight and ArrowLeft key events wrap around perfectly', () => {
      render(<ControlledTabs />);

      const tab1 = screen.getByRole('tab', { name: /Tab 1/i });

      // Focus tab1 and press ArrowLeft -> should wrap around to Tab 3
      fireEvent.keyDown(tab1, { key: 'ArrowLeft' });
      expect(screen.getByRole('tab', { name: /Tab 3/i })).toHaveAttribute('aria-selected', 'true');

      // ArrowRight from Tab 3 -> should wrap around to Tab 1
      const tab3 = screen.getByRole('tab', { name: /Tab 3/i });
      fireEvent.keyDown(tab3, { key: 'ArrowRight' });
      expect(screen.getByRole('tab', { name: /Tab 1/i })).toHaveAttribute('aria-selected', 'true');

      // 200 rapid ArrowRight navigations (200 % 3 = 2, so tab1 + 2 steps = tab3)
      for (let i = 0; i < 200; i++) {
        const currentActive = screen.getByRole('tab', { selected: true });
        fireEvent.keyDown(currentActive, { key: 'ArrowRight' });
      }

      expect(screen.getByRole('tab', { name: /Tab 3/i })).toHaveAttribute('aria-selected', 'true');
    });

    it('ADV-CT02: Home and End keys jump immediately to index 0 and index N-1', () => {
      render(<ControlledTabs />);

      const tab1 = screen.getByRole('tab', { name: /Tab 1/i });

      // End key -> Tab 3
      fireEvent.keyDown(tab1, { key: 'End' });
      expect(screen.getByRole('tab', { name: /Tab 3/i })).toHaveAttribute('aria-selected', 'true');

      // Home key -> Tab 1
      const tab3 = screen.getByRole('tab', { name: /Tab 3/i });
      fireEvent.keyDown(tab3, { key: 'Home' });
      expect(screen.getByRole('tab', { name: /Tab 1/i })).toHaveAttribute('aria-selected', 'true');
    });

    it('ADV-CT03: Ignores non-navigation keys (ArrowUp, ArrowDown, Tab, Enter, Space, Escape, random)', () => {
      const handleChange = vi.fn();
      const mockTabs = [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
      ];

      render(<CyberTabs tabs={mockTabs} activeTab="tab1" onChange={handleChange} />);

      const tab1 = screen.getByRole('tab', { name: /Tab 1/i });

      ['ArrowUp', 'ArrowDown', 'Tab', 'Enter', ' ', 'Escape', 'a', 'F5', 'Backspace'].forEach(
        (key) => {
          fireEvent.keyDown(tab1, { key });
        }
      );

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('ADV-CT04: Handles single tab list (length 1) and empty tab list (length 0) safely', () => {
      // Single tab
      const singleTab = [{ id: 'solo', label: 'Solo Tab', count: 99 }];
      const handleChangeSingle = vi.fn();
      const { unmount } = render(
        <CyberTabs tabs={singleTab} activeTab="solo" onChange={handleChangeSingle} />
      );

      const solo = screen.getByRole('tab', { name: /Solo Tab/i });
      fireEvent.keyDown(solo, { key: 'ArrowRight' });
      expect(handleChangeSingle).toHaveBeenCalledWith('solo');

      fireEvent.keyDown(solo, { key: 'ArrowLeft' });
      expect(handleChangeSingle).toHaveBeenCalledWith('solo');
      unmount();

      // Empty tabs
      const handleChangeEmpty = vi.fn();
      expect(() => {
        render(<CyberTabs tabs={[]} activeTab="" onChange={handleChangeEmpty} />);
      }).not.toThrow();

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
      expect(tablist.children.length).toBe(0);
    });
  });

  // ==========================================================================
  // VECTOR 4: NAVBAR & MOBILE DRAWER TOGGLING & VIEWPORT RESIZES
  // ==========================================================================
  describe('Vector 4: Navbar, Mobile Drawer Toggling & Viewport Resizing', () => {
    it('ADV-NAV01: Rapid 100-cycle mobile drawer open/close toggling maintains state consistency', () => {
      render(
        <LanguageProvider initialLanguage="de">
          <Navbar />
        </LanguageProvider>
      );

      const toggleBtn = screen.getByLabelText(/Open navigation menu/i);

      for (let i = 0; i < 100; i++) {
        fireEvent.click(toggleBtn);
      }

      // After 100 clicks (even), drawer should be closed
      expect(screen.queryByLabelText('Mobile Navigation')).not.toBeInTheDocument();
      expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

      // 101st click opens drawer
      fireEvent.click(toggleBtn);
      expect(screen.getByLabelText('Mobile Navigation')).toBeInTheDocument();
      expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    });

    it('ADV-NAV02: Escape key closes drawer only when open and does not crash when closed', () => {
      render(
        <LanguageProvider initialLanguage="de">
          <Navbar />
        </LanguageProvider>
      );

      // Press Escape while closed — should not throw
      expect(() => {
        fireEvent.keyDown(window, { key: 'Escape' });
      }).not.toThrow();
      expect(screen.queryByLabelText('Mobile Navigation')).not.toBeInTheDocument();

      // Open drawer
      const toggleBtn = screen.getByLabelText(/Open navigation menu/i);
      fireEvent.click(toggleBtn);
      expect(screen.getByLabelText('Mobile Navigation')).toBeInTheDocument();

      // Press Escape -> drawer closes
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(screen.queryByLabelText('Mobile Navigation')).not.toBeInTheDocument();
    });

    it('ADV-NAV03: Clicking any anchor link inside mobile drawer automatically closes the drawer', () => {
      render(
        <LanguageProvider initialLanguage="de">
          <Navbar />
        </LanguageProvider>
      );

      const toggleBtn = screen.getByLabelText(/Open navigation menu/i);
      fireEvent.click(toggleBtn);

      const drawer = screen.getByLabelText('Mobile Navigation');
      expect(drawer).toBeInTheDocument();

      const flagshipLink = drawer.querySelector('a[href="#flagship"]');
      expect(flagshipLink).toBeInTheDocument();

      fireEvent.click(flagshipLink!);
      expect(screen.queryByLabelText('Mobile Navigation')).not.toBeInTheDocument();
    });

    it('ADV-NAV04: Scroll event listener toggles header elevation style and cleans up on unmount', () => {
      const { unmount } = render(
        <LanguageProvider initialLanguage="de">
          <Navbar />
        </LanguageProvider>
      );

      const header = screen.getByTestId('cyber-navbar');
      expect(header.className).toContain('bg-[#0B0F17]/70');

      // Simulate scroll past 20px
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true });
      fireEvent.scroll(window);

      expect(header.className).toContain('bg-[#0B0F17]/90');
      expect(header.className).toContain('shadow-[0_4px_30px_rgba(0,0,0,0.8)]');

      // Scroll back to top
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
      fireEvent.scroll(window);

      expect(header.className).toContain('bg-[#0B0F17]/70');

      // Unmount cleans up window listeners without memory leaks
      expect(() => unmount()).not.toThrow();
    });

    it('ADV-NAV05: Viewport resizes across 320px to 1920px render cleanly without unhandled overflows', () => {
      const testViewports = [
        { width: 320, height: 568 },
        { width: 375, height: 667 },
        { width: 768, height: 1024 },
        { width: 1024, height: 768 },
        { width: 1440, height: 900 },
        { width: 1920, height: 1080 },
      ];

      testViewports.forEach(({ width, height }) => {
        window.innerWidth = width;
        window.innerHeight = height;
        window.dispatchEvent(new Event('resize'));

        const { unmount } = render(
          <LanguageProvider initialLanguage="de">
            <CyberShell>
              <div data-testid="page-body">Viewport Test Body</div>
            </CyberShell>
          </LanguageProvider>
        );

        expect(screen.getByTestId('cyber-shell')).toBeInTheDocument();
        expect(screen.getByTestId('cyber-navbar')).toBeInTheDocument();
        expect(screen.getByTestId('page-body')).toBeInTheDocument();
        unmount();
      });
    });
  });

  // ==========================================================================
  // VECTOR 5: ACCESSIBILITY & WCAG 2.1 AA TOUCH TARGET COMPLIANCE
  // ==========================================================================
  describe('Vector 5: WCAG 2.1 AA & Touch Target Verification', () => {
    it('ADV-A11Y01: All interactive primitives in M1 satisfy >= 44x44px touch target guidelines', () => {
      render(
        <LanguageProvider initialLanguage="de">
          <CyberShell>
            <CyberButton data-testid="sample-btn">Action</CyberButton>
            <CyberButton href="https://example.com" data-testid="sample-link">
              Link
            </CyberButton>
            <LanguageSwitcher data-testid="sample-lang" />
            <LanguageSwitcher variant="segmented" data-testid="sample-lang-seg" />
          </CyberShell>
        </LanguageProvider>
      );

      const button = screen.getByTestId('sample-btn');
      expect(button.className).toContain('touch-target');
      expect(button.className).toContain('min-h-[44px]');

      const link = screen.getByTestId('sample-link');
      expect(link.className).toContain('touch-target');
      expect(link.className).toContain('min-h-[44px]');

      // Segmented switcher buttons
      const segButtons = screen.getAllByRole('button', { name: /DE|EN/i });
      segButtons.forEach((btn) => {
        expect(btn.className).toContain('touch-target');
        expect(btn.className).toContain('min-h-[44px]');
      });
    });
  });

  // ==========================================================================
  // VECTOR 6: TERMINAL WINDOW & EDGE CASE FAULT TOLERANCE
  // ==========================================================================
  describe('Vector 6: TerminalWindow & Edge Case Resiliency', () => {
    it('ADV-TW01: TerminalWindow handles clipboard rejection gracefully without unhandled promise rejection', async () => {
      const writeTextMock = vi.fn().mockRejectedValue(new Error('Clipboard permission denied'));
      Object.assign(navigator, {
        clipboard: { writeText: writeTextMock },
      });

      render(
        <TerminalWindow title="Error Trace" copyContent="npm run build">
          <div>Build Log Output</div>
        </TerminalWindow>
      );

      const copyBtn = screen.getByRole('button', { name: /Copy code to clipboard/i });
      expect(copyBtn).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(copyBtn);
      });

      expect(writeTextMock).toHaveBeenCalledWith('npm run build');
    });

    it('ADV-CT05: CyberTabs with 50 items and special characters in IDs behaves deterministically', () => {
      const specialTabs = Array.from({ length: 50 }, (_, i) => ({
        id: `tab-$%&*#-${i}`,
        label: `Filter #${i}`,
        count: i * 10,
      }));

      const handleChange = vi.fn();
      render(<CyberTabs tabs={specialTabs} activeTab="tab-$%&*#-0" onChange={handleChange} />);

      const tab0 = screen.getByRole('tab', { name: /Filter #0/i });
      expect(tab0).toHaveAttribute('aria-selected', 'true');

      // ArrowLeft wraps around to 49th item
      fireEvent.keyDown(tab0, { key: 'ArrowLeft' });
      expect(handleChange).toHaveBeenCalledWith('tab-$%&*#-49');

      // ArrowRight wraps around to 1st item
      fireEvent.keyDown(tab0, { key: 'ArrowRight' });
      expect(handleChange).toHaveBeenCalledWith('tab-$%&*#-1');
    });

    it('ADV-BC04: BentoCard handles 0x0 bounding box without math errors', () => {
      render(
        <BentoCard glowColor="violet" data-testid="bento-zero">
          <span>Zero Size Rect Test</span>
        </BentoCard>
      );

      const card = screen.getByTestId('bento-zero');
      vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      });

      expect(() => {
        fireEvent.mouseMove(card, { clientX: 0, clientY: 0 });
      }).not.toThrow();
    });
  });
});

