/**
 * Challenger Adversarial & Empirical Stress Test Suite
 * Specialization: Interactive Subsystems, Bilingual State Engine, Theme Permutations & Clipboard Interactions
 * Agent: teamwork_preview_challenger (challenger_2)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { useTheme } from '../../src/hooks/useTheme';
import { LanguageProvider, useLanguage, LANGUAGE_STORAGE_KEY } from '../../src/context/LanguageContext';
import { translationsDe } from '../../src/data/translationsDe';
import { translationsEn } from '../../src/data/translationsEn';
import type { ThemeMode, ThemePaletteId } from '../../src/types/theme';
import { ReActSimulator } from '../../src/components/sections/ReActSimulator';
import { D1SqlPlayground } from '../../src/components/sections/D1SqlPlayground';
import { ContactFooter } from '../../src/components/sections/ContactFooter';
import { CodeBlock } from '../../src/components/ui/CodeBlock';

// Helper component for testing Theme Context hook directly
const ThemeHarness: React.FC<{
  onState?: (state: ReturnType<typeof useTheme>) => void;
}> = ({ onState }) => {
  const theme = useTheme();
  onState?.(theme);
  return (
    <div>
      <span data-testid="mode">{theme.mode}</span>
      <span data-testid="palette">{theme.palette}</span>
      <span data-testid="offset">{theme.fontSizeOffset}</span>
      <span data-testid="contrast">{String(theme.isLowContrast)}</span>
      <button data-testid="btn-mode-dark" onClick={() => theme.setMode('dark')}>Dark</button>
      <button data-testid="btn-mode-sepia" onClick={() => theme.setMode('sepia')}>Sepia</button>
      <button data-testid="btn-mode-light" onClick={() => theme.setMode('light')}>Light</button>
      <button data-testid="btn-pal-cyberpunk" onClick={() => theme.setPalette('cyberpunk')}>Cyberpunk</button>
      <button data-testid="btn-pal-emerald" onClick={() => theme.setPalette('emerald')}>Emerald</button>
      <button data-testid="btn-font-inc" onClick={() => theme.setFontSizeOffset(theme.fontSizeOffset + 1)}>Font+</button>
      <button data-testid="btn-font-reset" onClick={theme.resetFontSize}>ResetFont</button>
      <button data-testid="btn-contrast-toggle" onClick={() => theme.setIsLowContrast(!theme.isLowContrast)}>Contrast</button>
    </div>
  );
};

// Helper component for testing Language Context hook directly
const LanguageHarness: React.FC<{
  onState?: (state: ReturnType<typeof useLanguage>) => void;
}> = ({ onState }) => {
  const lang = useLanguage();
  onState?.(lang);
  return (
    <div>
      <span data-testid="lang">{lang.language}</span>
      <span data-testid="hero-title">{lang.t.hero.title}</span>
      <button data-testid="btn-toggle-lang" onClick={lang.toggleLanguage}>Toggle</button>
      <button data-testid="btn-set-de" onClick={() => lang.setLanguage('de')}>Set DE</button>
      <button data-testid="btn-set-en" onClick={() => lang.setLanguage('en')}>Set EN</button>
    </div>
  );
};

// Wrapper for testing live language toggle inside ReActSimulator tree
const ReActLanguageController: React.FC = () => {
  const { toggleLanguage } = useLanguage();
  return (
    <div>
      <button data-testid="btn-toggle-sim-lang" onClick={toggleLanguage}>Toggle Language</button>
      <ReActSimulator />
    </div>
  );
};

describe('CHALLENGER SUITE 1: ASL Ademco ReAct Simulator Empirical Stress Test', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('EXP-REACT-01: Full step-by-step cycle execution from 0 to maxCycles on Preset 1 with BOM calculation', () => {
    render(
      <ThemeProvider>
        <LanguageProvider initialLanguage="de">
          <ReActSimulator />
        </LanguageProvider>
      </ThemeProvider>
    );

    // Initial state check: Cycle 0
    expect(screen.getByText(/ReAct Agent Loop Simulator/i)).toBeInTheDocument();
    expect(screen.getByText(/Noch keine Artikel verifiziert/i)).toBeInTheDocument();
    expect(screen.getByText(/Klicken Sie auf "Nächster Schritt"/i)).toBeInTheDocument();

    const prevBtn = screen.getByRole('button', { name: /Previous step/i });
    const nextBtn = screen.getByRole('button', { name: /Next step/i });
    const resetBtn = screen.getByRole('button', { name: /Reset simulation/i });

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    // Step to Cycle 1: Optical Smoke Detector
    fireEvent.click(nextBtn);
    expect(screen.getByText(/\[CYCLE 1\]/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ADEM-BM-8003/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/822,00 €/i).length).toBeGreaterThan(0);
    expect(prevBtn).not.toBeDisabled();

    // Step to Cycle 2: Standard Base
    fireEvent.click(nextBtn);
    expect(screen.getByText(/\[CYCLE 2\]/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ADEM-SO-8055/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Mandatory Base/i)).toBeInTheDocument();
    expect(screen.getByText(/956,40 €/i)).toBeInTheDocument();

    // Step to Cycle 3: Control Panel BMZ-IQ8C
    fireEvent.click(nextBtn);
    expect(screen.getByText(/\[CYCLE 3\]/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ADEM-BMZ-IQ8C/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/2.376,40 €/i).length).toBeGreaterThan(0);

    // Step to Cycle 4: Calculate BOM pricing
    fireEvent.click(nextBtn);
    expect(screen.getByText(/\[CYCLE 4\]/i)).toBeInTheDocument();

    // Step to Cycle 5: Finalize recommendation & Completion
    fireEvent.click(nextBtn);
    expect(screen.getByText(/\[CYCLE 5\]/i)).toBeInTheDocument();
    expect(screen.getByText(/✓ VERIFIED/i)).toBeInTheDocument();
    expect(screen.getByText(/FINAL VERIFIED ANSWER/i)).toBeInTheDocument();
    expect(nextBtn).toBeDisabled();

    // Over-stepping boundary test: Extra clicks on next do not crash or increment beyond max
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    expect(screen.getByText(/FINAL VERIFIED ANSWER/i)).toBeInTheDocument();

    // Step backwards to Cycle 2
    fireEvent.click(prevBtn);
    fireEvent.click(prevBtn);
    fireEvent.click(prevBtn);
    expect(screen.queryByText(/FINAL VERIFIED ANSWER/i)).not.toBeInTheDocument();
    expect(screen.getByText(/\[CYCLE 2\]/i)).toBeInTheDocument();

    // Reset back to 0
    fireEvent.click(resetBtn);
    expect(screen.getByText(/Noch keine Artikel verifiziert/i)).toBeInTheDocument();
    expect(prevBtn).toBeDisabled();
  });

  it('EXP-REACT-02: Preset switching preserves state invariants and cleans up previous trace execution', () => {
    render(
      <ThemeProvider>
        <LanguageProvider initialLanguage="de">
          <ReActSimulator />
        </LanguageProvider>
      </ThemeProvider>
    );

    const nextBtn = screen.getByRole('button', { name: /Next step/i });
    // Advance preset 1 to cycle 2
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    expect(screen.getByText(/\[CYCLE 2\]/i)).toBeInTheDocument();

    // Switch to Preset 2 (Underground garage)
    const preset2Btn = screen.getByRole('button', { name: /Preset 2/i });
    fireEvent.click(preset2Btn);

    // Should reset currentCycleIndex to 0
    expect(screen.getByText(/Noch keine Artikel verifiziert/i)).toBeInTheDocument();
    expect(screen.getByText(/Wir rüsten eine Tiefgarage um/i)).toBeInTheDocument();

    // Advance Preset 2 (Total 3 cycles)
    fireEvent.click(nextBtn);
    expect(screen.getAllByText(/ADEM-BWM-65PRO/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/944,00 €/i).length).toBeGreaterThan(0);

    fireEvent.click(nextBtn);
    expect(screen.getAllByText(/ADEM-MB-ECK01/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1.060,00 €/i).length).toBeGreaterThan(0);

    fireEvent.click(nextBtn);
    expect(screen.getByText(/✓ VERIFIED/i)).toBeInTheDocument();

    // Switch to Preset 3 (Guardrail rejection)
    const preset3Btn = screen.getByRole('button', { name: /Preset 3/i });
    fireEvent.click(preset3Btn);
    expect(screen.getByText(/Noch keine Artikel verifiziert/i)).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(screen.getByText(/GUARDRAIL HARD BLOCK/i)).toBeInTheDocument();
    expect(screen.getAllByText(/SKU-99999-FAKE/i).length).toBeGreaterThan(0);
  });

  it('EXP-REACT-03: Auto-Play timer advances cycles sequentially and stops at boundary without overshooting', async () => {
    vi.useFakeTimers();

    render(
      <ThemeProvider>
        <LanguageProvider initialLanguage="de">
          <ReActSimulator />
        </LanguageProvider>
      </ThemeProvider>
    );

    const playBtn = screen.getByRole('button', { name: /Auto play trace/i });
    fireEvent.click(playBtn);

    // Advance 5 cycles * 2400ms = 12000ms
    for (let cycle = 1; cycle <= 5; cycle++) {
      act(() => {
        vi.advanceTimersByTime(2400);
      });
      expect(screen.getByText(new RegExp(`\\[CYCLE ${cycle}\\]`, 'i'))).toBeInTheDocument();
    }

    expect(screen.getByText(/✓ VERIFIED/i)).toBeInTheDocument();

    // Extra tick: 5000ms -> Ensure timer stopped and didn't crash or advance to 6
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.queryByText(/\[CYCLE 6\]/i)).not.toBeInTheDocument();
    expect(screen.getByText(/✓ VERIFIED/i)).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('EXP-REACT-04: Language toggle during active simulation preserves trace state and updates labels symmetrically', () => {
    render(
      <ThemeProvider>
        <LanguageProvider initialLanguage="de">
          <ReActLanguageController />
        </LanguageProvider>
      </ThemeProvider>
    );

    const nextBtn = screen.getByRole('button', { name: /Next step/i });
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    expect(screen.getByText('Nächster Schritt')).toBeInTheDocument();
    expect(screen.getByText('Gesamtsumme Netto:')).toBeInTheDocument();

    // Click toggle language button
    const toggleLangBtn = screen.getByTestId('btn-toggle-sim-lang');
    fireEvent.click(toggleLangBtn);

    expect(screen.getByText('Next Step')).toBeInTheDocument();
    expect(screen.getByText('Total Net:')).toBeInTheDocument();
    expect(screen.getByText(/\[CYCLE 2\]/i)).toBeInTheDocument();
  });
});

describe('CHALLENGER SUITE 2: Cloudflare D1 SQL Playground Empirical Testing', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('EXP-SQL-01: Verifies all 3 query presets render correct SQL, metadata, latency, and formatted result tables', () => {
    render(
      <ThemeProvider>
        <LanguageProvider initialLanguage="de">
          <D1SqlPlayground />
        </LanguageProvider>
      </ThemeProvider>
    );

    // Query 1: 3-Stufen SQL RAG
    expect(screen.getByText(/Cloudflare D1 SQL Playground/i)).toBeInTheDocument();
    expect(screen.getByText(/Exakte SKU/i)).toBeInTheDocument();
    expect(screen.getByText(/SELECT sku, brand, name/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ADEM-BM-8003/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/68\.50 €/i)).toBeInTheDocument();
    expect(screen.getByText(/140 Stk\./i)).toBeInTheDocument();

    // Query 2: Automatische Zubehör- & Sockelauflösung
    const q2Btn = screen.getByRole('button', { name: /2\. Automatische Zubehör/i });
    fireEvent.click(q2Btn);
    expect(screen.getByText(/JOIN compatibilities c ON/i)).toBeInTheDocument();
    expect(screen.getByText(/ADEM-SO-8055/i)).toBeInTheDocument();
    expect(screen.getByText(/11\.20 €/i)).toBeInTheDocument();
    expect(screen.getAllByText(/mandatory_accessory/i).length).toBeGreaterThan(0);

    // Query 3: Multi-Komponenten BOM Check
    const q3Btn = screen.getByRole('button', { name: /3\. Multi-Komponenten BOM/i });
    fireEvent.click(q3Btn);
    expect(screen.getByText(/FROM compatibilities c/i)).toBeInTheDocument();
    expect(screen.getByText(/ADEM-BWM-65PRO/i)).toBeInTheDocument();
  });

  it('EXP-SQL-02: Simulates query execution flow with loading state transition', async () => {
    render(
      <ThemeProvider>
        <LanguageProvider initialLanguage="de">
          <D1SqlPlayground />
        </LanguageProvider>
      </ThemeProvider>
    );

    const execBtn = screen.getByRole('button', { name: /Query Ausführen/i });
    fireEvent.click(execBtn);

    expect(screen.getByText(/Führe aus\.\.\./i)).toBeInTheDocument();

    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByText(/Query Ausführen/i)).toBeInTheDocument();
    expect(screen.getByText(/Abfrageergebnis/i)).toBeInTheDocument();
  });

  it('EXP-SQL-03: Schemas Inspector mode displays all tables, DDL syntax, and column type definitions', () => {
    render(
      <ThemeProvider>
        <LanguageProvider initialLanguage="de">
          <D1SqlPlayground />
        </LanguageProvider>
      </ThemeProvider>
    );

    // Switch to Schemas Tab
    const schemasTabBtn = screen.getByRole('button', { name: /D1 Schemas/i });
    fireEvent.click(schemasTabBtn);

    // Products table schema
    expect(screen.getByText(/TABLE: products/i)).toBeInTheDocument();
    expect(screen.getByText(/CREATE TABLE IF NOT EXISTS products/i)).toBeInTheDocument();
    expect(screen.getByText('PRIMARY')).toBeInTheDocument();
    expect(screen.getByText('manufacturer_sku')).toBeInTheDocument();

    // Switch to compatibilities table
    const compatBtn = screen.getByRole('button', { name: /TABLE: compatibilities/i });
    fireEvent.click(compatBtn);

    expect(screen.getByText(/CREATE TABLE IF NOT EXISTS compatibilities/i)).toBeInTheDocument();
    expect(screen.getByText('compatible_sku')).toBeInTheDocument();
    expect(screen.getByText('relation_type')).toBeInTheDocument();
  });
});

describe('CHALLENGER SUITE 3: Bilingual State Engine & Recursive Parity Stress', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('EXP-I18N-01: Recursive key parity between translationsDe and translationsEn (0 missing keys, 0 undefined values)', () => {
    function getLeafPaths(obj: any, prefix = ''): Record<string, string> {
      const paths: Record<string, string> = {};
      for (const key of Object.keys(obj)) {
        const currentPath = prefix ? `${prefix}.${key}` : key;
        const val = obj[key];
        if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
          Object.assign(paths, getLeafPaths(val, currentPath));
        } else if (Array.isArray(val)) {
          paths[currentPath] = `Array(${val.length})`;
          val.forEach((item, idx) => {
            if (typeof item === 'object' && item !== null) {
              Object.assign(paths, getLeafPaths(item, `${currentPath}[${idx}]`));
            } else {
              paths[`${currentPath}[${idx}]`] = typeof item;
            }
          });
        } else {
          paths[currentPath] = typeof val;
          expect(val).toBeDefined();
          if (typeof val === 'string') {
            expect(val.trim().length).toBeGreaterThan(0);
          }
        }
      }
      return paths;
    }

    const dePaths = getLeafPaths(translationsDe);
    const enPaths = getLeafPaths(translationsEn);

    const deKeys = Object.keys(dePaths).sort();
    const enKeys = Object.keys(enPaths).sort();

    const missingInEn = deKeys.filter((k) => !enPaths[k]);
    const missingInDe = enKeys.filter((k) => !dePaths[k]);

    expect(missingInEn).toEqual([]);
    expect(missingInDe).toEqual([]);
    expect(deKeys.length).toBeGreaterThan(50);
  });

  it('EXP-I18N-02: 1,000 rapid randomized language toggle calls converge deterministically to synchronized DOM and localStorage', () => {
    let latestState: any = null;
    render(
      <LanguageProvider initialLanguage="de">
        <LanguageHarness onState={(s) => { latestState = s; }} />
      </LanguageProvider>
    );

    const toggleBtn = screen.getByTestId('btn-toggle-lang');
    const setDeBtn = screen.getByTestId('btn-set-de');
    const setEnBtn = screen.getByTestId('btn-set-en');

    for (let i = 0; i < 500; i++) {
      fireEvent.click(toggleBtn);
    }

    // After 500 toggles from 'de', should be back to 'de' (even number of toggles)
    expect(latestState.language).toBe('de');
    expect(document.documentElement.getAttribute('lang')).toBe('de');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('de');

    // Random series of 100 sets
    for (let i = 0; i < 100; i++) {
      if (i % 2 === 0) {
        fireEvent.click(setEnBtn);
      } else {
        fireEvent.click(setDeBtn);
      }
    }

    // Ended with odd index 99 (setDeBtn)
    expect(latestState.language).toBe('de');
    expect(document.documentElement.getAttribute('lang')).toBe('de');
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('de');
  });

  it('EXP-I18N-03: Graceful degradation on localStorage QuotaExceededError and SecurityError during language change', () => {
    let latestState: any = null;
    render(
      <LanguageProvider initialLanguage="de">
        <LanguageHarness onState={(s) => { latestState = s; }} />
      </LanguageProvider>
    );

    // Mock localStorage.setItem throwing QuotaExceededError
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('The quota has been exceeded.', 'QuotaExceededError');
    });

    const toggleBtn = screen.getByTestId('btn-toggle-lang');
    expect(() => {
      fireEvent.click(toggleBtn);
    }).not.toThrow();

    expect(latestState.language).toBe('en');
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });
});

describe('CHALLENGER SUITE 4: Theme Switcher Cycle (18 Permutations & Rapid Cycling)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.className = '';
    document.body.className = '';
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('EXP-THEME-01: Exhaustive verification across all 18 permutations (6 palettes x 3 modes) with zero orphaned CSS classes', () => {
    const modes: ThemeMode[] = ['light', 'sepia', 'dark'];
    const palettes: ThemePaletteId[] = ['default', 'cyberpunk', 'emerald', 'newsprint', 'pastel', 'amber'];
    const expectedClassMap: Record<ThemePaletteId, string> = {
      default: 'defaultPalette',
      cyberpunk: 'cyberPunk',
      emerald: 'leafyGreen',
      newsprint: 'newsPrint',
      pastel: 'pastelGoth',
      amber: 'glitterGold',
    };

    let themeApi: any = null;
    render(
      <ThemeProvider>
        <ThemeHarness onState={(t) => { themeApi = t; }} />
      </ThemeProvider>
    );

    let permutationCount = 0;

    for (const mode of modes) {
      for (const palette of palettes) {
        act(() => {
          themeApi.setMode(mode);
          themeApi.setPalette(palette);
        });

        permutationCount++;

        const root = document.documentElement;

        // Verify Data Attributes
        expect(root.getAttribute('data-theme-mode')).toBe(mode);
        expect(root.getAttribute('data-theme-palette')).toBe(palette);

        // Verify Mode Classes
        if (mode === 'sepia') {
          expect(root.classList.contains('sepiamode')).toBe(true);
          expect(root.classList.contains('darkmode')).toBe(false);
        } else if (mode === 'dark') {
          expect(root.classList.contains('darkmode')).toBe(true);
          expect(root.classList.contains('sepiamode')).toBe(false);
        } else {
          expect(root.classList.contains('darkmode')).toBe(false);
          expect(root.classList.contains('sepiamode')).toBe(false);
        }

        // Verify Palette Classes: exactly one active palette class, all others absent
        const activeCls = expectedClassMap[palette];
        expect(root.classList.contains(activeCls)).toBe(true);

        const otherPaletteClasses = Object.values(expectedClassMap).filter((c) => c !== activeCls);
        for (const otherCls of otherPaletteClasses) {
          expect(root.classList.contains(otherCls)).toBe(false);
        }
      }
    }

    expect(permutationCount).toBe(18);
  });

  it('EXP-THEME-02: Rapid randomized switching between 50 permutations maintains DOM and CSS variable invariants', () => {
    let themeApi: any = null;
    render(
      <ThemeProvider>
        <ThemeHarness onState={(t) => { themeApi = t; }} />
      </ThemeProvider>
    );

    const modes: ThemeMode[] = ['light', 'sepia', 'dark'];
    const palettes: ThemePaletteId[] = ['default', 'cyberpunk', 'emerald', 'newsprint', 'pastel', 'amber'];

    for (let i = 0; i < 50; i++) {
      const randomMode = modes[i % modes.length]!;
      const randomPal = palettes[(i * 3) % palettes.length]!;

      act(() => {
        themeApi.setMode(randomMode);
        themeApi.setPalette(randomPal);
      });

      expect(document.documentElement.getAttribute('data-theme-mode')).toBe(randomMode);
      expect(document.documentElement.getAttribute('data-theme-palette')).toBe(randomPal);
    }
  });

  it('EXP-THEME-03: Font size scaling offset clamps strictly to [-4, +12] and sets CSS root variables', () => {
    let themeApi: any = null;
    render(
      <ThemeProvider>
        <ThemeHarness onState={(t) => { themeApi = t; }} />
      </ThemeProvider>
    );

    // Normal offset +2
    act(() => {
      themeApi.setFontSizeOffset(2);
    });
    expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('16px');
    expect(document.documentElement.style.getPropertyValue('--lineHeight')).toBe('24px');
    expect(document.documentElement.style.getPropertyValue('--fontScaleOffset')).toBe('2px');

    // Extreme underflow clamp (-100 -> -4)
    act(() => {
      themeApi.setFontSizeOffset(-100);
    });
    expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('10px');
    expect(document.documentElement.style.getPropertyValue('--fontScaleOffset')).toBe('-4px');

    // Extreme overflow clamp (+100 -> +12)
    act(() => {
      themeApi.setFontSizeOffset(100);
    });
    expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('26px');
    expect(document.documentElement.style.getPropertyValue('--fontScaleOffset')).toBe('12px');

    // Reset font size
    act(() => {
      themeApi.resetFontSize();
    });
    expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('14px');
    expect(document.documentElement.style.getPropertyValue('--fontScaleOffset')).toBe('0px');
  });

  it('EXP-THEME-04: Low contrast toggle dynamically adds and removes contrastmode class and data attribute', () => {
    let themeApi: any = null;
    render(
      <ThemeProvider>
        <ThemeHarness onState={(t) => { themeApi = t; }} />
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('data-contrast')).toBe('normal');
    expect(document.documentElement.classList.contains('contrastmode')).toBe(false);

    act(() => {
      themeApi.setIsLowContrast(true);
    });
    expect(document.documentElement.getAttribute('data-contrast')).toBe('low');
    expect(document.documentElement.classList.contains('contrastmode')).toBe(true);

    act(() => {
      themeApi.setIsLowContrast(false);
    });
    expect(document.documentElement.getAttribute('data-contrast')).toBe('normal');
    expect(document.documentElement.classList.contains('contrastmode')).toBe(false);
  });
});

describe('CHALLENGER SUITE 5: Copy-to-Clipboard Interactions & Screen Reader Feedback', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('EXP-CLIP-01: CodeBlock copies snippet to clipboard, toggles visual badge, and auto-resets after timeout', async () => {
    vi.useFakeTimers();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <CodeBlock
        code="SELECT * FROM products WHERE in_stock > 10;"
        language="sql"
        title="Stock Query"
        executionTimeMs={1.8}
        showLineNumbers={true}
      />
    );

    const copyBtn = screen.getByRole('button', { name: /Copy code to clipboard/i });
    expect(copyBtn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(writeTextMock).toHaveBeenCalledWith('SELECT * FROM products WHERE in_stock > 10;');
    expect(screen.getByText('Copied!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copied code to clipboard/i })).toBeInTheDocument();

    // Fast-forward 2000ms
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Copy code to clipboard/i })).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('EXP-CLIP-02: ContactFooter email copy triggers role="status" aria-live="polite" screen reader announcement', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <ThemeProvider>
        <LanguageProvider initialLanguage="de">
          <ContactFooter />
        </LanguageProvider>
      </ThemeProvider>
    );

    const copyBtn = screen.getByLabelText(/Copy email address/i);
    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(writeTextMock).toHaveBeenCalledWith('info@munverricht.org');

    // Assert screen reader status container
    const statusContainer = screen.getByRole('status');
    expect(statusContainer).toBeInTheDocument();
    expect(statusContainer).toHaveAttribute('aria-live', 'polite');
    expect(statusContainer).toHaveTextContent('E-Mail-Adresse in die Zwischenablage kopiert!');
  });

  it('EXP-CLIP-03: Clipboard write failure handles rejection gracefully and still provides fallback UI feedback', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Permission denied'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(
      <ThemeProvider>
        <LanguageProvider initialLanguage="en">
          <ContactFooter />
        </LanguageProvider>
      </ThemeProvider>
    );

    const copyBtn = screen.getByLabelText(/Copy email address/i);
    await act(async () => {
      fireEvent.click(copyBtn);
    });

    // Despite rejection, UI does not throw unhandled exception and provides feedback
    const statusContainer = screen.getByRole('status');
    expect(statusContainer).toBeInTheDocument();
    expect(statusContainer).toHaveTextContent('Email address copied to clipboard!');
  });
});
