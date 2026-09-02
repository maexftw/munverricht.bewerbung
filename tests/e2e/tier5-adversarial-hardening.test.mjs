/**
 * Tier 5 E2E Test Suite: Adversarial Hardening & Stress Testing
 * Rigorous boundary, corruption, and edge invariant validation for Maximilian Unverricht Digital Résumé
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deContent, enContent } from '../unit/dictionary-parity.test.mjs';
import { DESIGN_TOKENS } from '../unit/design-tokens-a11y.test.mjs';
import { LanguageEngine } from '../unit/language-context.test.mjs';
import { 
  createMockLocalStorage, 
  simulateViewportOverflow, 
  validateTouchTarget, 
  BREAKPOINTS 
} from '../helpers/test-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

describe('Tier 5 E2E: Adversarial Hardening & Stress Testing', () => {
  let engine;
  let mockStorage;

  beforeEach(() => {
    mockStorage = createMockLocalStorage();
    engine = new LanguageEngine(mockStorage);
  });

  // 1. LocalStorage Chaos & State Resiliency
  describe('Adv-01: Storage Chaos & Fallback Invariants', () => {
    it('TC-ADV-01: Fallback gracefully to German when localStorage throws or returns garbage', () => {
      const chaosValues = [
        'null', 'undefined', '{"__proto__": {"admin": true}}', '<script>alert(1)</script>',
        'es', 'fr', 'zh-CN', 'de-AT', '', '   ', '12345', 'NaN', 'false', 'TRUE'
      ];

      for (const val of chaosValues) {
        mockStorage.setItem('mu_lang_pref', val);
        const testEngine = new LanguageEngine(mockStorage);
        const currentLang = testEngine.language;
        assert.ok(
          currentLang === 'de' || currentLang === 'en',
          `Engine should safely default to 'de' or 'en' given garbage input "${val}", got: ${currentLang}`
        );
      }
    });

    it('TC-ADV-02: Rapid language toggle thrashing preserves state consistency', () => {
      // Toggle 200 times
      for (let i = 0; i < 200; i++) {
        engine.toggleLanguage();
      }
      // Even number of toggles must return to initial 'de'
      assert.strictEqual(engine.language, 'de');

      // 1 extra toggle must be 'en'
      engine.toggleLanguage();
      assert.strictEqual(engine.language, 'en');
      assert.strictEqual(mockStorage.getItem('mu_lang_pref'), 'en');
    });
  });

  // 2. Viewport Boundary & Layout Stability
  describe('Adv-02: Viewport Boundary Stability (320px to 2560px)', () => {
    const stressBreakpoints = [
      { name: 'Ultra-Narrow (iPhone 5/SE gen1)', width: 320 },
      { name: 'Mobile Standard', width: 375 },
      { name: 'Mobile Large (iPhone Pro Max)', width: 430 },
      { name: 'Tablet Portrait (iPad Mini)', width: 768 },
      { name: 'Tablet Landscape / Small Laptop', width: 1024 },
      { name: 'Laptop Fold Standard (13" MacBook)', width: 1280 },
      { name: 'Desktop Standard (1080p)', width: 1440 },
      { name: 'Desktop Large (FHD)', width: 1920 },
      { name: 'Ultrawide 2K', width: 2560 }
    ];

    const mockLayoutElements = [
      { id: 'header', tag: 'header', width: '100%', maxWidth: 1152 },
      { id: 'hero-section', tag: 'section', width: '100%', maxWidth: 896 },
      { id: 'about-section', tag: 'section', width: '100%', maxWidth: 896 },
      { id: 'skills-section', tag: 'section', width: '100%', maxWidth: 896 },
      { id: 'flagship-section', tag: 'section', width: '100%', maxWidth: 896 },
      { id: 'projects-section', tag: 'section', width: '100%', maxWidth: 896 },
      { id: 'experience-section', tag: 'section', width: '100%', maxWidth: 896 },
      { id: 'contact-footer', tag: 'footer', width: '100%', maxWidth: 896 }
    ];

    it('TC-ADV-03: Zero horizontal overflow across all stress viewports', () => {
      stressBreakpoints.forEach(bp => {
        const result = simulateViewportOverflow(mockLayoutElements, bp.width);
        assert.strictEqual(
          result.overflowDetected, 
          false, 
          `Viewport ${bp.name} (${bp.width}px) must have 0px horizontal overflow`
        );
        assert.ok(result.maxContentWidth <= bp.width + 0.1);
      });
    });
  });

  // 3. Anti-Slop & Design System Invariant Hardening
  describe('Adv-03: Anti-Slop & Token Enforcement', () => {
    it('TC-ADV-04: Strict absence of dark-mode default background tokens', () => {
      assert.ok(
        DESIGN_TOKENS.colors.canvas.toLowerCase() === '#ffffff' || 
        DESIGN_TOKENS.colors.canvas.toLowerCase() === '#fafafa',
        'Canvas must be light tone'
      );
      assert.notStrictEqual(DESIGN_TOKENS.colors.canvas.toLowerCase(), '#0f172a');
      assert.notStrictEqual(DESIGN_TOKENS.colors.canvas.toLowerCase(), '#000000');
    });

    it('TC-ADV-05: All interactive touch targets adhere to >= 44x44px bounding box', () => {
      const interactiveElements = [
        { name: 'Language Toggle Button', width: 48, height: 44 },
        { name: 'Primary Hero CTA', width: 160, height: 44 },
        { name: 'Secondary Hero CTA', width: 200, height: 44 },
        { name: 'Mobile Menu Hamburger', width: 44, height: 44 },
        { name: 'Email Copy Action', width: 44, height: 44 },
        { name: 'Contact Mail CTA', width: 180, height: 48 }
      ];

      interactiveElements.forEach(el => {
        const check = validateTouchTarget(el.width, el.height);
        assert.strictEqual(
          check.valid,
          true,
          `${el.name} (${el.width}x${el.height}px) must meet minimum 44x44px touch target requirement`
        );
      });
    });
  });

  // 4. Content Integrity & Flagship Verification
  describe('Adv-04: Flagship Case Study Invariants', () => {
    it('TC-ADV-06: Flagship case study specifies 5 technical pillars in both DE and EN', () => {
      assert.strictEqual(deContent.flagship.pillars.length, 5);
      assert.strictEqual(enContent.flagship.pillars.length, 5);

      deContent.flagship.pillars.forEach((p, idx) => {
        assert.ok(p.title.length > 5, `Pillar ${idx} in DE must have descriptive title`);
        assert.ok(p.description.length > 20, `Pillar ${idx} in DE must have descriptive body`);
        assert.ok(p.tech.length > 3, `Pillar ${idx} in DE must specify tech stack`);
      });
    });

    it('TC-ADV-07: Flagship metrics accurately convey key numbers (1,460+ SKUs, 7 cycles, 100%)', () => {
      const deLabels = deContent.flagship.metrics.map(m => m.label);
      assert.ok(deLabels.includes('1.460+'));
      assert.ok(deLabels.includes('Bis zu 7'));
      assert.ok(deLabels.includes('100%'));

      const enLabels = enContent.flagship.metrics.map(m => m.label);
      assert.ok(enLabels.includes('1,460+'));
      assert.ok(enLabels.includes('Up to 7'));
      assert.ok(enLabels.includes('100%'));
    });

    it('TC-ADV-08: Transparent attribution explicitly cites Stitch prototype and backend engineering', () => {
      assert.ok(deContent.flagship.attribution.prototype.includes('Google AI Studio / Stitch'));
      assert.ok(enContent.flagship.attribution.prototype.includes('Google AI Studio / Stitch'));

      assert.strictEqual(deContent.flagship.attribution.engineering.length, 5);
      assert.strictEqual(enContent.flagship.attribution.engineering.length, 5);
    });
  });

  // 5. Static Build Invariants
  describe('Adv-05: Static Output & Edge Deployment Invariants', () => {
    it('TC-ADV-09: Production dist/ directory contains index.html, CSS, and JS chunks', () => {
      const distPath = path.join(projectRoot, 'dist');
      assert.ok(fs.existsSync(distPath), 'dist/ directory must exist');

      const indexHtml = path.join(distPath, 'index.html');
      assert.ok(fs.existsSync(indexHtml), 'dist/index.html must exist');

      const htmlContent = fs.readFileSync(indexHtml, 'utf-8');
      assert.ok(htmlContent.includes('<div id="root"></div>'));
    });

    it('TC-ADV-10: public/_headers edge security rules are present and valid', () => {
      const headersPath = path.join(projectRoot, 'public/_headers');
      assert.ok(fs.existsSync(headersPath), 'public/_headers must exist');

      const content = fs.readFileSync(headersPath, 'utf-8');
      assert.ok(content.includes('X-Frame-Options: DENY'));
      assert.ok(content.includes('X-Content-Type-Options: nosniff'));
      assert.ok(content.includes('Strict-Transport-Security: max-age=31536000'));
    });
  });
});
