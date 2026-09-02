/**
 * Unit Test: Design Tokens, WCAG 2.1 AA Contrast Ratios & 4pt/8pt Rhythm Scale
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateContrastRatio, evaluateWcagCompliance } from '../helpers/contrast.mjs';
import { isRhythmAligned, validateTouchTarget, auditForAntiSlopViolations } from '../helpers/test-utils.mjs';

// Canonical Design System Tokens per DESIGN_SYSTEM.md / frontend_design_suite
export const DESIGN_TOKENS = {
  colors: {
    canvas: '#FFFFFF',
    surface: '#F8FAFC',       // Slate 50
    surfaceSubtle: '#F1F5F9', // Slate 100
    border: '#E2E8F0',        // Slate 200
    borderStrong: '#CBD5E1',  // Slate 300
    textPrimary: '#0F172A',   // Slate 900
    textSecondary: '#475569', // Slate 600
    textMuted: '#64748B',     // Slate 500
    accent: '#0284C7',        // Sky 600 (Corporate High-Trust)
    accentHover: '#0369A1',   // Sky 700
    accentLight: '#E0F2FE',   // Sky 100
    brandDark: '#0F172A',     // Primary Dark Button
    brandTextOnDark: '#FFFFFF'
  },
  typography: {
    fontSans: 'Montserrat, Geist, system-ui, -apple-system, sans-serif',
    fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    bodyReadingWidth: '65ch',
    displayLineHeight: '1.15',
    bodyLineHeight: '1.625'
  },
  dials: {
    designVariance: 0.3,
    motionIntensity: 0.2,
    visualDensity: 0.5
  },
  spacing: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128]
};

describe('Unit Test: Design Tokens & WCAG 2.1 AA Contrast Engine', () => {
  it('TC-DT01: Primary text (#0F172A) on Canvas (#FFFFFF) satisfies WCAG AA & AAA (>= 7.0:1)', () => {
    const ratio = calculateContrastRatio(DESIGN_TOKENS.colors.textPrimary, DESIGN_TOKENS.colors.canvas);
    const result = evaluateWcagCompliance(ratio);
    assert.ok(ratio >= 15.0, `Expected contrast >= 15.0:1, got ${ratio.toFixed(2)}:1`);
    assert.strictEqual(result.aaNormal, true);
    assert.strictEqual(result.aaaNormal, true);
  });

  it('TC-DT02: Secondary text (#475569) on Canvas (#FFFFFF) satisfies WCAG AA Normal Text (>= 4.5:1)', () => {
    const ratio = calculateContrastRatio(DESIGN_TOKENS.colors.textSecondary, DESIGN_TOKENS.colors.canvas);
    const result = evaluateWcagCompliance(ratio);
    assert.ok(ratio >= 4.5, `Secondary text contrast must be >= 4.5:1, got ${ratio.toFixed(2)}:1`);
    assert.strictEqual(result.aaNormal, true);
  });

  it('TC-DT03: Primary text on Surface (#F8FAFC) satisfies WCAG AA & AAA', () => {
    const ratio = calculateContrastRatio(DESIGN_TOKENS.colors.textPrimary, DESIGN_TOKENS.colors.surface);
    const result = evaluateWcagCompliance(ratio);
    assert.ok(ratio >= 14.0, `Primary on surface must be >= 14.0:1, got ${ratio.toFixed(2)}:1`);
    assert.strictEqual(result.aaNormal, true);
    assert.strictEqual(result.aaaNormal, true);
  });

  it('TC-DT04: Primary brand button text (#FFFFFF) on Brand Dark (#0F172A) satisfies WCAG AAA', () => {
    const ratio = calculateContrastRatio(DESIGN_TOKENS.colors.brandTextOnDark, DESIGN_TOKENS.colors.brandDark);
    const result = evaluateWcagCompliance(ratio);
    assert.ok(ratio >= 15.0, `Brand button contrast must be >= 15.0:1, got ${ratio.toFixed(2)}:1`);
    assert.strictEqual(result.aaNormal, true);
    assert.strictEqual(result.aaaNormal, true);
  });

  it('TC-DT05: Accent button hover (#0369A1) with white text satisfies WCAG AA (>= 4.5:1)', () => {
    const ratio = calculateContrastRatio('#FFFFFF', DESIGN_TOKENS.colors.accentHover);
    const result = evaluateWcagCompliance(ratio);
    assert.ok(ratio >= 4.5, `Accent hover button contrast must be >= 4.5:1, got ${ratio.toFixed(2)}:1`);
    assert.strictEqual(result.aaNormal, true);
  });

  it('TC-DT06: 4pt/8pt rhythm scale strictly adheres to 4px increments without odd pixel offsets', () => {
    const validSpacingSteps = [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128];
    for (const step of validSpacingSteps) {
      assert.strictEqual(isRhythmAligned(step), true, `Step ${step}px should be rhythm-aligned`);
    }

    // Negative verification: odd pixel values fail
    const invalidSteps = [13, 19, 27, 33, 47];
    for (const step of invalidSteps) {
      assert.strictEqual(isRhythmAligned(step), false, `Odd step ${step}px should NOT be rhythm-aligned`);
    }
  });

  it('TC-DT07: Touch targets evaluate correctly for mobile min size >= 44x44px', () => {
    const validButton = validateTouchTarget(48, 48);
    assert.strictEqual(validButton.valid, true);
    assert.strictEqual(validButton.deficit.width, 0);
    assert.strictEqual(validButton.deficit.height, 0);

    const minButton = validateTouchTarget(44, 44);
    assert.strictEqual(minButton.valid, true);

    const subMinButton = validateTouchTarget(32, 32);
    assert.strictEqual(subMinButton.valid, false);
    assert.strictEqual(subMinButton.deficit.width, 12);
    assert.strictEqual(subMinButton.deficit.height, 12);
  });

  it('TC-DT08: Three Dials calibration adheres to corporate professional portfolio preset', () => {
    assert.ok(DESIGN_TOKENS.dials.designVariance >= 0.2 && DESIGN_TOKENS.dials.designVariance <= 0.6);
    assert.ok(DESIGN_TOKENS.dials.motionIntensity <= 0.4, 'Motion intensity must be subtle (<= 0.4)');
    assert.ok(DESIGN_TOKENS.dials.visualDensity >= 0.4 && DESIGN_TOKENS.dials.visualDensity <= 0.7);
  });

  it('TC-DT09: Anti-slop audit rejects generic purple/neon mesh gradients and pill badge overload', () => {
    const sloppyCode = `<div className="bg-gradient-to-r from-purple-900 to-violet-900 rounded-full rounded-full rounded-full rounded-full rounded-full rounded-full rounded-full"></div>`;
    const audit1 = auditForAntiSlopViolations(sloppyCode);
    assert.strictEqual(audit1.hasSlop, true);
    assert.ok(audit1.violations.some(v => v.includes('purple/violet')));

    const cleanCode = `<div className="bg-white border border-slate-200 text-slate-900 rounded-lg p-6"></div>`;
    const audit2 = auditForAntiSlopViolations(cleanCode);
    assert.strictEqual(audit2.hasSlop, false);
    assert.strictEqual(audit2.violations.length, 0);
  });
});
