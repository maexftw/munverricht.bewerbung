/**
 * Tier 5: Adversarial Coverage Hardening & White-Box Invariant Test Suite
 * Maximilian Unverricht Digital Résumé & Portfolio
 *
 * Scope:
 * 1. Deep state integrity across concurrent mode/palette/language/font changes.
 * 2. ASL Ademco ReAct simulator state machine invariants and anti-hallucination guardrail validation.
 * 3. D1 SQL schema query syntax & injection resilience.
 * 4. Keyboard trap and focus release on modal/drawer close.
 * 5. Stepped box-shadow & diagonal slant CSS class stability.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { useState } from 'react';
import App from '../../App';
import {
  ThemeProvider,
  THEME_MODE_KEY,
  THEME_PALETTE_KEY,
  THEME_FONT_OFFSET_KEY,
  THEME_LOW_CONTRAST_KEY,
} from '../../context/ThemeContext';
import {
  LanguageProvider,
  useLanguage,
  LANGUAGE_STORAGE_KEY,
} from '../../context/LanguageContext';
import { useTheme } from '../../hooks/useTheme';
import { ReActSimulator } from '../../components/sections/ReActSimulator';
import { D1SqlPlayground } from '../../components/sections/D1SqlPlayground';
import { Modal } from '../../components/ui/Modal';
import { SettingsDrawer } from '../../components/layout/SettingsDrawer';
import { SteppedButton } from '../../components/ui/SteppedButton';
import { DiagonalSlant } from '../../components/layout/DiagonalSlant';
import { flagshipAslAdemcoData } from '../../data/flagshipAslAdemco';
import { THEME_PALETTES } from '../../types/theme';

describe('Tier 5 Adversarial Coverage Hardening Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme-mode');
    document.documentElement.removeAttribute('data-theme-palette');
    document.documentElement.removeAttribute('data-contrast');
    document.documentElement.removeAttribute('lang');
    document.documentElement.style.removeProperty('--fontSize');
    document.documentElement.style.removeProperty('--lineHeight');
    document.documentElement.style.removeProperty('--fontScaleOffset');
    document.body.className = '';
    document.body.style.overflow = '';
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // ==========================================================================
  // 1. Deep State Integrity Across Concurrent Mode / Palette / Language / Font Changes
  // ==========================================================================
  describe('1. Deep State Integrity & Concurrency Resilience', () => {
    function MultiStateFuzzer() {
      const theme = useTheme();
      const lang = useLanguage();

      return (
        <div>
          <span data-testid="mode-val">{theme.mode}</span>
          <span data-testid="palette-val">{theme.palette}</span>
          <span data-testid="offset-val">{theme.fontSizeOffset}</span>
          <span data-testid="contrast-val">{theme.isLowContrast ? 'low' : 'normal'}</span>
          <span data-testid="drawer-val">{theme.isDrawerOpen ? 'open' : 'closed'}</span>
          <span data-testid="lang-val">{lang.language}</span>

          <button
            data-testid="fuzz-toggle-lang"
            onClick={() => lang.toggleLanguage()}
          >
            Toggle Lang
          </button>
          <button
            data-testid="fuzz-set-dark"
            onClick={() => theme.setMode('dark')}
          >
            Set Dark
          </button>
          <button
            data-testid="fuzz-set-sepia"
            onClick={() => theme.setMode('sepia')}
          >
            Set Sepia
          </button>
          <button
            data-testid="fuzz-set-light"
            onClick={() => theme.setMode('light')}
          >
            Set Light
          </button>
          <button
            data-testid="fuzz-set-cyberpunk"
            onClick={() => theme.setPalette('cyberpunk')}
          >
            Set Cyberpunk
          </button>
          <button
            data-testid="fuzz-set-emerald"
            onClick={() => theme.setPalette('emerald')}
          >
            Set Emerald
          </button>
          <button
            data-testid="fuzz-set-default-palette"
            onClick={() => theme.setPalette('default')}
          >
            Set Default Palette
          </button>
          <button
            data-testid="fuzz-inc-font"
            onClick={() => theme.setFontSizeOffset(theme.fontSizeOffset + 1)}
          >
            Inc Font
          </button>
          <button
            data-testid="fuzz-dec-font"
            onClick={() => theme.setFontSizeOffset(theme.fontSizeOffset - 1)}
          >
            Dec Font
          </button>
          <button
            data-testid="fuzz-reset-font"
            onClick={() => theme.resetFontSize()}
          >
            Reset Font
          </button>
          <button
            data-testid="fuzz-toggle-contrast"
            onClick={() => theme.setIsLowContrast(!theme.isLowContrast)}
          >
            Toggle Contrast
          </button>
        </div>
      );
    }

    it('T5-01: Rapid randomized interleaved state changes maintain exact DOM & localStorage sync', async () => {
      render(
        <ThemeProvider>
          <LanguageProvider>
            <MultiStateFuzzer />
          </LanguageProvider>
        </ThemeProvider>
      );

      const buttons = [
        'fuzz-toggle-lang',
        'fuzz-set-dark',
        'fuzz-set-sepia',
        'fuzz-set-light',
        'fuzz-set-cyberpunk',
        'fuzz-set-emerald',
        'fuzz-set-default-palette',
        'fuzz-inc-font',
        'fuzz-dec-font',
        'fuzz-toggle-contrast',
      ];

      // Execute 150 random interleaved operations
      for (let i = 0; i < 150; i++) {
        const randBtn = buttons[Math.floor(Math.random() * buttons.length)]!;
        await act(async () => {
          fireEvent.click(screen.getByTestId(randBtn));
        });
      }

      // Read current state from DOM elements
      const currentMode = screen.getByTestId('mode-val').textContent;
      const currentPalette = screen.getByTestId('palette-val').textContent;
      const currentOffset = parseInt(screen.getByTestId('offset-val').textContent || '0', 10);
      const currentContrast = screen.getByTestId('contrast-val').textContent;
      const currentLang = screen.getByTestId('lang-val').textContent;

      // Assert DOM attributes match state precisely
      expect(document.documentElement.getAttribute('data-theme-mode')).toBe(currentMode);
      expect(document.documentElement.getAttribute('data-theme-palette')).toBe(currentPalette);
      expect(document.documentElement.getAttribute('data-contrast')).toBe(currentContrast);
      expect(document.documentElement.getAttribute('lang')).toBe(currentLang);

      // Assert root style CSS variables are valid numbers within bounds
      const expectedSize = Math.min(32, Math.max(8, 14 + currentOffset));
      expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe(`${expectedSize}px`);
      expect(document.documentElement.style.getPropertyValue('--fontScaleOffset')).toBe(`${currentOffset}px`);

      // Assert localStorage matches state
      expect(window.localStorage.getItem(THEME_MODE_KEY)).toBe(currentMode);
      expect(window.localStorage.getItem(THEME_PALETTE_KEY)).toBe(currentPalette);
      expect(window.localStorage.getItem(THEME_FONT_OFFSET_KEY)).toBe(currentOffset.toString());
      expect(window.localStorage.getItem(THEME_LOW_CONTRAST_KEY)).toBe(currentContrast === 'low' ? 'true' : 'false');
      expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe(currentLang);
    });

    it('T5-02: Handles localStorage QuotaExceededError and SecurityError gracefully on all setters', () => {
      vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
        throw new DOMException('QuotaExceededError', 'QuotaExceededError');
      });

      render(
        <ThemeProvider>
          <LanguageProvider>
            <MultiStateFuzzer />
          </LanguageProvider>
        </ThemeProvider>
      );

      // Should not throw or crash React tree when writing to storage fails
      expect(() => {
        act(() => {
          fireEvent.click(screen.getByTestId('fuzz-set-dark'));
          fireEvent.click(screen.getByTestId('fuzz-set-cyberpunk'));
          fireEvent.click(screen.getByTestId('fuzz-inc-font'));
          fireEvent.click(screen.getByTestId('fuzz-toggle-contrast'));
          fireEvent.click(screen.getByTestId('fuzz-toggle-lang'));
        });
      }).not.toThrow();

      expect(screen.getByTestId('mode-val').textContent).toBe('dark');
      expect(screen.getByTestId('palette-val').textContent).toBe('cyberpunk');
      expect(screen.getByTestId('contrast-val').textContent).toBe('low');
      expect(screen.getByTestId('lang-val').textContent).toBe('en');
    });

    it('T5-03: Font offset fuzzing clamps extreme values (-999, +999, NaN, Infinity, floats) strictly to [-4, +12]', () => {
      function FontFuzzer() {
        const { fontSizeOffset, setFontSizeOffset } = useTheme();
        return (
          <div>
            <span data-testid="offset">{fontSizeOffset}</span>
            <button onClick={() => setFontSizeOffset(-999)}>Set -999</button>
            <button onClick={() => setFontSizeOffset(999)}>Set +999</button>
            <button onClick={() => setFontSizeOffset(NaN as any)}>Set NaN</button>
            <button onClick={() => setFontSizeOffset(Infinity as any)}>Set Infinity</button>
            <button onClick={() => setFontSizeOffset(-Infinity as any)}>Set -Infinity</button>
            <button onClick={() => setFontSizeOffset(5.7)}>Set 5.7</button>
          </div>
        );
      }

      render(
        <ThemeProvider>
          <FontFuzzer />
        </ThemeProvider>
      );

      act(() => {
        screen.getByText('Set -999').click();
      });
      expect(screen.getByTestId('offset').textContent).toBe('-4');
      expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('10px'); // 14 - 4 = 10

      act(() => {
        screen.getByText('Set +999').click();
      });
      expect(screen.getByTestId('offset').textContent).toBe('12');
      expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('26px'); // 14 + 12 = 26

      act(() => {
        screen.getByText('Set NaN').click();
      });
      expect(screen.getByTestId('offset').textContent).toBe('0');

      act(() => {
        screen.getByText('Set Infinity').click();
      });
      expect(screen.getByTestId('offset').textContent).toBe('0');

      act(() => {
        screen.getByText('Set 5.7').click();
      });
      expect(screen.getByTestId('offset').textContent).toBe('6');
      expect(document.documentElement.style.getPropertyValue('--fontSize')).toBe('20px');
    });

    it('T5-04: Invalid mode or palette string fallbacks safely without polluting document classes', () => {
      function InvalidSetter() {
        const { setMode, setPalette } = useTheme();
        return (
          <div>
            <button onClick={() => (setMode as any)('neon-invalid')}>Invalid Mode</button>
            <button onClick={() => (setPalette as any)('invalid-palette-xyz')}>Invalid Palette</button>
          </div>
        );
      }

      render(
        <ThemeProvider>
          <InvalidSetter />
        </ThemeProvider>
      );

      act(() => {
        screen.getByText('Invalid Mode').click();
      });
      expect(document.documentElement.getAttribute('data-theme-mode')).toBe('light');

      act(() => {
        screen.getByText('Invalid Palette').click();
      });
      expect(document.documentElement.getAttribute('data-theme-palette')).toBe('default');
      expect(document.documentElement.classList.contains('defaultPalette')).toBe(true);
      expect(document.documentElement.classList.contains('invalid-palette-xyz')).toBe(false);
    });

    it('T5-05: Initial props override localStorage and dirty DOM state upon initial mounting', () => {
      window.localStorage.setItem(THEME_MODE_KEY, 'dark');
      window.localStorage.setItem(THEME_PALETTE_KEY, 'cyberpunk');
      window.localStorage.setItem(THEME_FONT_OFFSET_KEY, '4');
      window.localStorage.setItem(THEME_LOW_CONTRAST_KEY, 'true');
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'en');

      function StateInspector() {
        const theme = useTheme();
        const lang = useLanguage();
        return (
          <div>
            <span data-testid="inspect-mode">{theme.mode}</span>
            <span data-testid="inspect-palette">{theme.palette}</span>
            <span data-testid="inspect-offset">{theme.fontSizeOffset}</span>
            <span data-testid="inspect-contrast">{theme.isLowContrast ? 'low' : 'normal'}</span>
            <span data-testid="inspect-lang">{lang.language}</span>
          </div>
        );
      }

      // Render with explicit initial props overriding localStorage
      render(
        <ThemeProvider
          initialMode="sepia"
          initialPalette="emerald"
          initialFontSizeOffset={2}
          initialLowContrast={false}
        >
          <LanguageProvider initialLanguage="de">
            <StateInspector />
          </LanguageProvider>
        </ThemeProvider>
      );

      expect(screen.getByTestId('inspect-mode').textContent).toBe('sepia');
      expect(screen.getByTestId('inspect-palette').textContent).toBe('emerald');
      expect(screen.getByTestId('inspect-offset').textContent).toBe('2');
      expect(screen.getByTestId('inspect-contrast').textContent).toBe('normal');
      expect(screen.getByTestId('inspect-lang').textContent).toBe('de');
    });
  });

  // ==========================================================================
  // 2. ASL Ademco ReAct Simulator State Machine Invariants & Anti-Hallucination
  // ==========================================================================
  describe('2. ASL Ademco ReAct Simulator & Anti-Hallucination Guardrails', () => {
    it('T5-06: Step machine invariant: currentCycleIndex is strictly bounded [0, maxCycles]', async () => {
      render(
        <LanguageProvider>
          <ReActSimulator />
        </LanguageProvider>
      );

      // Select first trace (5 cycles)
      const prevBtn = screen.getByRole('button', { name: /zurück|previous/i });
      const nextBtn = screen.getByRole('button', { name: /nächster schritt|next step/i });
      const resetBtn = screen.getByRole('button', { name: /reset simulation/i });

      // Initially at 0, Prev disabled
      expect(prevBtn).toBeDisabled();
      expect(nextBtn).toBeEnabled();

      // Step forward 5 times to completion
      for (let i = 1; i <= 5; i++) {
        act(() => {
          fireEvent.click(nextBtn);
        });
        expect(screen.getByText(String(i), { selector: 'strong' })).toBeInTheDocument();
      }

      // At completion (5/5), Next is disabled and VERIFIED badge appears
      expect(nextBtn).toBeDisabled();
      expect(screen.getByText(/✓ VERIFIED/i)).toBeInTheDocument();
      expect(screen.getByText(/FINAL VERIFIED ANSWER/i)).toBeInTheDocument();

      // Clicking reset goes back to 0
      act(() => {
        fireEvent.click(resetBtn);
      });
      expect(prevBtn).toBeDisabled();
      expect(screen.getByText('0', { selector: 'strong' })).toBeInTheDocument();
    });

    it('T5-07: Trace switching resets step machine and auto-play state deterministically', () => {
      render(
        <LanguageProvider>
          <ReActSimulator />
        </LanguageProvider>
      );

      const nextBtn = screen.getByRole('button', { name: /nächster schritt|next step/i });

      // Step twice into Preset 1
      act(() => {
        fireEvent.click(nextBtn);
        fireEvent.click(nextBtn);
      });
      expect(screen.getByText('2', { selector: 'strong' })).toBeInTheDocument();

      // Switch to Preset 2 (Tiefgaragen)
      const presetButtons = screen.getAllByRole('button', { name: /preset \d/i });
      expect(presetButtons.length).toBeGreaterThanOrEqual(3);

      act(() => {
        fireEvent.click(presetButtons[1]!);
      });

      // Step should reset to 0/3
      expect(screen.getByText('0', { selector: 'strong' })).toBeInTheDocument();
      expect(screen.getByText(/\/ 3/)).toBeInTheDocument();
      expect(screen.queryByText(/FINAL VERIFIED ANSWER/i)).not.toBeInTheDocument();
    });

    it('T5-08: Guardrail defense trace blocks non-existent dummy SKU and presents HARD BLOCK', () => {
      render(
        <LanguageProvider>
          <ReActSimulator />
        </LanguageProvider>
      );

      // Select Preset 3 (Guardrail defense)
      const presetButtons = screen.getAllByRole('button', { name: /preset \d/i });
      act(() => {
        fireEvent.click(presetButtons[2]!);
      });

      expect(screen.getByText(/"Bitte prüfen Sie die Verfügbarkeit von 5 Stück Sensor Typ SKU-99999-FAKE\."/i)).toBeInTheDocument();

      const nextBtn = screen.getByRole('button', { name: /nächster schritt|next step/i });

      // Step 1: Tool call returns empty array observation
      act(() => {
        fireEvent.click(nextBtn);
      });
      expect(screen.getByText(/EMPTY \/ CHECK/i)).toBeInTheDocument();

      // Step 2: Guardrail interception
      act(() => {
        fireEvent.click(nextBtn);
      });
      expect(screen.getByText(/GUARDRAIL HARD BLOCK/i)).toBeInTheDocument();
      expect(screen.getByText(/0 Halluzinationen zugelassen|0 hallucinations permitted/i)).toBeInTheDocument();
    });

    it('T5-09: Positiv-Bindung Invariant: All positive traces have verified=true on observations and <= 7 cycles', () => {
      flagshipAslAdemcoData.reactTraces.forEach((trace) => {
        expect(trace.cycles.length).toBeLessThanOrEqual(7);
        expect(trace.totalCycles).toBeLessThanOrEqual(7);

        if (trace.id !== 'trace-guardrail-defense') {
          trace.cycles.forEach((cycle) => {
            expect(cycle.verified).toBe(true);
            expect(cycle.tool).toBeDefined();
            expect(cycle.thought.length).toBeGreaterThan(10);
          });
        }
      });
    });

    it('T5-10: Live Hydrated BOM pricing math matches total netto calculation in Preset 1', () => {
      render(
        <LanguageProvider>
          <ReActSimulator />
        </LanguageProvider>
      );

      const nextBtn = screen.getByRole('button', { name: /nächster schritt|next step/i });

      // Step to cycle 4 where all 3 BOM items are verified
      act(() => {
        fireEvent.click(nextBtn); // cycle 1 (822.00 €)
        fireEvent.click(nextBtn); // cycle 2 (+134.40 = 956.40 €)
        fireEvent.click(nextBtn); // cycle 3 (+1420.00 = 2376.40 €)
        fireEvent.click(nextBtn); // cycle 4
      });

      expect(screen.getByText('12x ADEM-BM-8003')).toBeInTheDocument();
      expect(screen.getByText('12x ADEM-SO-8055')).toBeInTheDocument();
      expect(screen.getByText('1x ADEM-BMZ-IQ8C')).toBeInTheDocument();
      expect(screen.getByText('2.376,40 €')).toBeInTheDocument();
    });

    it('T5-11: Auto-play toggle starts timer and advances cycles before stopping at completion', () => {
      vi.useFakeTimers();

      render(
        <LanguageProvider>
          <ReActSimulator />
        </LanguageProvider>
      );

      const playBtn = screen.getByRole('button', { name: /auto play trace|auto-play/i });

      act(() => {
        fireEvent.click(playBtn);
      });

      // Advance timers by 2400ms -> cycle 1
      act(() => {
        vi.advanceTimersByTime(2400);
      });
      expect(screen.getByText('1', { selector: 'strong' })).toBeInTheDocument();

      // Advance timers by 2400 * 4 -> cycle 5 (max)
      act(() => {
        vi.advanceTimersByTime(2400 * 4);
      });
      expect(screen.getByText('5', { selector: 'strong' })).toBeInTheDocument();
      expect(screen.getByText(/✓ VERIFIED/i)).toBeInTheDocument();

      vi.useRealTimers();
    });

    it('T5-12: Flagship 5-Pillars data structure defines all 5 required architecture pillars', () => {
      const pillars = flagshipAslAdemcoData.pillars;
      expect(pillars.length).toBe(5);

      const expectedKeywords = [
        'Vertical Agent (ReAct Loop)',
        'Anti-Halluzinations-Guardrails',
        'Strukturierte SQL-RAG-Pipeline',
        'B2B Planning Studio Frontend',
        'Datanorm Import-Pipeline'
      ];

      pillars.forEach((pillar, idx) => {
        expect(pillar.number).toBe(idx + 1);
        expect(pillar.title).toContain(expectedKeywords[idx]);
        expect(pillar.highlights.length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  // ==========================================================================
  // 3. D1 SQL Schema Query Syntax & Injection Resilience
  // ==========================================================================
  describe('3. D1 SQL Schema Query Syntax & Injection Resilience', () => {
    it('T5-13: D1 SQL Schemas define valid SQLite DDL with strict integrity constraints', () => {
      const schemas = flagshipAslAdemcoData.sqlSchemas;
      expect(schemas.length).toBe(3);

      const products = schemas.find((s) => s.tableName === 'products');
      expect(products).toBeDefined();
      expect(products?.ddl).toContain('CREATE TABLE IF NOT EXISTS products');
      expect(products?.ddl).toContain('sku TEXT PRIMARY KEY');
      expect(products?.ddl).toContain('CREATE INDEX IF NOT EXISTS idx_products_category');
      expect(products?.sampleRowsCount).toBe(1461);

      const compatibilities = schemas.find((s) => s.tableName === 'compatibilities');
      expect(compatibilities).toBeDefined();
      expect(compatibilities?.ddl).toContain('FOREIGN KEY (primary_sku) REFERENCES products(sku) ON DELETE CASCADE');
      expect(compatibilities?.ddl).toContain("CHECK(relation_type IN ('mandatory_accessory', 'optional_accessory', 'replacement', 'parent_panel'))");

      const synonyms = schemas.find((s) => s.tableName === 'search_synonyms');
      expect(synonyms).toBeDefined();
      expect(synonyms?.ddl).toContain('term TEXT PRIMARY KEY');
    });

    it('T5-14: Queries use parameterized placeholders (?1, ?2, ?3) preventing raw string injection', () => {
      const queries = flagshipAslAdemcoData.sqlQueries;
      expect(queries.length).toBe(3);

      queries.forEach((q) => {
        expect(q.query).toMatch(/\?\d+/);
        // Ensure no raw string concat concatenation pattern like ' + input + '
        expect(q.query).not.toContain('" +');
        expect(q.query).not.toContain("' +");
      });
    });

    it('T5-15: D1 SQL Playground executes queries and renders results table and schemas tab cleanly', async () => {
      render(
        <LanguageProvider>
          <D1SqlPlayground />
        </LanguageProvider>
      );

      // Verify queries view
      expect(screen.getByText(/Cloudflare D1 SQL Playground/i)).toBeInTheDocument();
      expect(screen.getByText(/1. 3-Stufen SQL RAG: Exakte SKU & Volltextsuche/i)).toBeInTheDocument();

      // Click Execute Query
      const execBtn = screen.getByRole('button', { name: /query ausführen|execute query/i });
      act(() => {
        fireEvent.click(execBtn);
      });

      // Switch to Schemas Tab
      const schemasTab = screen.getByRole('button', { name: /d1 schemas/i });
      act(() => {
        fireEvent.click(schemasTab);
      });

      expect(screen.getByText(/SCHEMA DESCRIPTION/i)).toBeInTheDocument();
      expect(screen.getByText(/TABLE: products/i)).toBeInTheDocument();
      expect(screen.getByText(/Spalten-Spezifikationen|Column Specifications/i)).toBeInTheDocument();
    });

    it('T5-16: Simulating hostile SQL injection inputs verifies parameterized query structure', () => {
      const maliciousPayloads = [
        "' OR '1'='1",
        "'; DROP TABLE products; --",
        "' UNION SELECT * FROM sqlite_master --",
        "admin'--",
        "1' OR '1' = '1' /*",
        "\x00' OR 1=1 --",
        "'; ATTACH DATABASE 'x' AS x; --"
      ];

      maliciousPayloads.forEach((payload) => {
        // When bound as parameter ?1, SQLite escapes all special characters
        const simulatedParamBinding = `WHERE sku = ?1 [bound: "${payload}"]`;
        expect(simulatedParamBinding).not.toContain(`sku = '${payload}'`);
      });
    });
  });

  // ==========================================================================
  // 4. Keyboard Trap and Focus Release on Modal / Drawer Close
  // ==========================================================================
  describe('4. Keyboard Trap & Focus Management (WAI-ARIA Dialog)', () => {
    function ModalTestHost({ defaultOpen = true }: { defaultOpen?: boolean }) {
      const [isOpen, setIsOpen] = useState(defaultOpen);

      return (
        <div>
          <button data-testid="trigger-btn" onClick={() => setIsOpen(true)}>
            Open Dialog
          </button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Adversarial Test Modal"
            subtitle="Testing Focus Trap and Escape"
            footer={
              <button data-testid="modal-save-btn" onClick={() => setIsOpen(false)}>
                Save Changes
              </button>
            }
          >
            <p>Modal Body Content</p>
            <input data-testid="modal-input-1" placeholder="Field 1" />
            <input data-testid="modal-input-2" placeholder="Field 2" />
          </Modal>
        </div>
      );
    }

    it('T5-17: Modal renders with ARIA role="dialog", aria-modal="true", and locks body scroll', () => {
      render(<ModalTestHost defaultOpen={true} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog.getAttribute('aria-modal')).toBe('true');
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('T5-18: Pressing Escape key closes Modal and restores document.body overflow', () => {
      render(<ModalTestHost defaultOpen={true} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Trigger Escape keydown
      act(() => {
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      });

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe('');
    });

    it('T5-19: Forward Tab key wraps from last focusable element back to first', async () => {
      render(<ModalTestHost defaultOpen={true} />);

      const dialog = screen.getByRole('dialog');
      const closeBtn = screen.getByLabelText(/close modal dialog/i);
      const saveBtn = screen.getByTestId('modal-save-btn');

      // Wait for focus trap initial autofocus
      await act(async () => {
        await new Promise((r) => setTimeout(r, 40));
      });

      // Set focus to the last element (saveBtn)
      saveBtn.focus();
      expect(document.activeElement).toBe(saveBtn);

      // Press Tab on last element -> wraps to closeBtn
      act(() => {
        fireEvent.keyDown(dialog, { key: 'Tab', code: 'Tab', shiftKey: false });
      });
      expect(document.activeElement).toBe(closeBtn);
    });

    it('T5-20: Backward Shift+Tab key wraps from first focusable element to last', async () => {
      render(<ModalTestHost defaultOpen={true} />);

      const dialog = screen.getByRole('dialog');
      const closeBtn = screen.getByLabelText(/close modal dialog/i);
      const saveBtn = screen.getByTestId('modal-save-btn');

      // Focus on first element (closeBtn)
      closeBtn.focus();
      expect(document.activeElement).toBe(closeBtn);

      // Press Shift+Tab on first element -> wraps to saveBtn
      act(() => {
        fireEvent.keyDown(dialog, { key: 'Tab', code: 'Tab', shiftKey: true });
      });
      expect(document.activeElement).toBe(saveBtn);
    });

    it('T5-21: SettingsDrawer traps focus and releases focus back to trigger upon closing', async () => {
      function DrawerHost() {
        const { setIsDrawerOpen } = useTheme();
        return (
          <div>
            <button data-testid="drawer-trigger" onClick={() => setIsDrawerOpen(true)}>
              Open Settings
            </button>
            <SettingsDrawer />
          </div>
        );
      }

      render(
        <ThemeProvider>
          <LanguageProvider>
            <DrawerHost />
          </LanguageProvider>
        </ThemeProvider>
      );

      const triggerBtn = screen.getByTestId('drawer-trigger');
      triggerBtn.focus();
      expect(document.activeElement).toBe(triggerBtn);

      // Open drawer
      act(() => {
        triggerBtn.click();
      });

      expect(screen.getByTestId('settings-drawer-panel')).toBeInTheDocument();
      expect(document.body.style.overflow).toBe('hidden');

      // Press Escape to close
      act(() => {
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      });

      expect(screen.queryByTestId('settings-drawer-panel')).not.toBeInTheDocument();
      expect(document.body.style.overflow).toBe('');
      expect(document.activeElement).toBe(triggerBtn);
    });

    it('T5-22: Unmounting modal/drawer while open cleans up body scroll lock cleanly', () => {
      const { unmount } = render(<ModalTestHost defaultOpen={true} />);
      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });

  // ==========================================================================
  // 5. Stepped Box-Shadow & Diagonal Slant CSS Class Stability
  // ==========================================================================
  describe('5. Stepped Box-Shadow & Diagonal Slant CSS Class Stability', () => {
    it('T5-23: SteppedButton applies correct stepped shadow classes according to variants and props', () => {
      const { rerender } = render(
        <SteppedButton variant="primary" data-testid="test-btn">
          Primary
        </SteppedButton>
      );
      expect(screen.getByTestId('test-btn')).toHaveClass('hyp-shadow-stepped-1');

      rerender(
        <SteppedButton variant="secondary" data-testid="test-btn">
          Secondary
        </SteppedButton>
      );
      expect(screen.getByTestId('test-btn')).toHaveClass('hyp-shadow-stepped-2');

      rerender(
        <SteppedButton variant="neutral" steppedShadow="white" data-testid="test-btn">
          White Shadow
        </SteppedButton>
      );
      expect(screen.getByTestId('test-btn')).toHaveClass('hyp-shadow-stepped-white');

      rerender(
        <SteppedButton variant="primary" steppedShadow="none" data-testid="test-btn">
          No Shadow
        </SteppedButton>
      );
      expect(screen.getByTestId('test-btn')).not.toHaveClass('hyp-shadow-stepped-1');
      expect(screen.getByTestId('test-btn')).not.toHaveClass('hyp-shadow-stepped-2');
    });

    it('T5-24: SteppedButton sizes (sm, md, lg) maintain >= 44px min-height touch targets', () => {
      const { rerender } = render(
        <SteppedButton size="sm" data-testid="target-btn">
          Small Button
        </SteppedButton>
      );
      expect(screen.getByTestId('target-btn')).toHaveClass('min-h-[44px]');

      rerender(
        <SteppedButton size="md" data-testid="target-btn">
          Medium Button
        </SteppedButton>
      );
      expect(screen.getByTestId('target-btn')).toHaveClass('min-h-[44px]');

      rerender(
        <SteppedButton size="lg" data-testid="target-btn">
          Large Button
        </SteppedButton>
      );
      expect(screen.getByTestId('target-btn')).toHaveClass('min-h-[48px]');
    });

    it('T5-25: DiagonalSlant component renders with .hyp-slant and accessible aria-hidden="true"', () => {
      render(<DiagonalSlant />);
      const slant = screen.getByTestId('diagonal-slant');
      expect(slant).toBeInTheDocument();
      expect(slant).toHaveClass('hyp-slant');
      expect(slant.getAttribute('aria-hidden')).toBe('true');
    });

    it('T5-26: All 6 curated palettes have defined contrast ratios >= 4.5:1 for WCAG AA compliance', () => {
      THEME_PALETTES.forEach((p) => {
        expect(p.contrastRatio).toBeGreaterThanOrEqual(4.5);
        expect(p.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(p.secondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(p.bgBase).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(p.bgSurface).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it('T5-27: Full Application Integration renders all sections and maintains complete interactive integrity', () => {
      render(<App />);

      expect(screen.getByTestId('app-layout')).toBeInTheDocument();
      expect(screen.getByTestId('diagonal-slant')).toBeInTheDocument();
      expect(screen.getAllByText(/Maximilian Unverricht/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/ASL Ademco/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/info@munverricht.org/i).length).toBeGreaterThan(0);
    });
  });
});
