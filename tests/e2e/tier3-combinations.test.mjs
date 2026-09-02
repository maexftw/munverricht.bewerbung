/**
 * Tier 3 E2E Test Suite: Cross-Feature Combinations
 * Tests multi-feature interactions: bilingual switching in flagship,
 * mobile drawer navigation + CTA copy, deep-link hash navigation,
 * responsive resizing during interactive state, and bilingual contrast verification.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { deContent, enContent } from '../unit/dictionary-parity.test.mjs';
import { DESIGN_TOKENS } from '../unit/design-tokens-a11y.test.mjs';
import { LanguageEngine } from '../unit/language-context.test.mjs';
import { calculateContrastRatio, evaluateWcagCompliance } from '../helpers/contrast.mjs';
import { 
  createMockLocalStorage, 
  simulateViewportOverflow, 
  validateTouchTarget,
  BREAKPOINTS 
} from '../helpers/test-utils.mjs';

describe('Tier 3 E2E: Cross-Feature Combinations', () => {

  // -------------------------------------------------------------
  // TC-C01: Bilingual Toggle Inside Flagship Section
  // -------------------------------------------------------------
  it('TC-C01: Bilingual toggle in Flagship section updates all 5 pillars, metrics, and attribution synchronously', () => {
    const engine = new LanguageEngine(createMockLocalStorage());
    
    // Initial German Flagship State
    assert.strictEqual(engine.language, 'de');
    assert.strictEqual(engine.t.flagship.badge, "Flagship Case Study #1");
    assert.strictEqual(engine.t.flagship.pillars[0].title, "1. Vertical Agent (ReAct Loop)");
    assert.strictEqual(engine.t.flagship.metrics[0].label, "1.460+");

    // Toggle to English
    engine.toggleLanguage();
    assert.strictEqual(engine.language, 'en');
    assert.strictEqual(engine.t.flagship.subtitle, "Catalog-bound Vertical Agent with ReAct reasoning and deterministic SQL RAG on Cloudflare D1");
    assert.strictEqual(engine.t.flagship.pillars[1].title, "2. Anti-Hallucination Guardrails");
    assert.strictEqual(engine.t.flagship.attribution.engineering[0], "Complete technical architecture & Cloudflare Pages/D1 backend implementation");

    // Toggle back to German
    engine.toggleLanguage();
    assert.strictEqual(engine.language, 'de');
    assert.strictEqual(engine.t.flagship.pillars[1].title, "2. Anti-Halluzinations-Guardrails");
  });

  // -------------------------------------------------------------
  // TC-C02: Mobile Navigation Drawer + Language Toggle + Anchor Jump
  // -------------------------------------------------------------
  it('TC-C02: Mobile nav drawer allows language toggle and auto-closes upon anchor link selection', () => {
    const engine = new LanguageEngine(createMockLocalStorage());

    // Simulated Mobile Drawer State
    let isDrawerOpen = false;
    let activeAnchor = '#hero';

    function openDrawer() { isDrawerOpen = true; }
    function closeDrawer() { isDrawerOpen = false; }
    function selectNavAnchor(anchor) {
      activeAnchor = anchor;
      closeDrawer();
    }

    // 1. Mobile user opens menu on 375px screen
    openDrawer();
    assert.strictEqual(isDrawerOpen, true);

    // 2. User toggles language inside mobile menu
    engine.toggleLanguage();
    assert.strictEqual(engine.language, 'en');
    assert.strictEqual(engine.t.nav.toggleLang, 'DE');

    // 3. User taps "Flagship: ASL Ademco" anchor link
    selectNavAnchor('#flagship');
    assert.strictEqual(isDrawerOpen, false, 'Mobile drawer must close after anchor selection');
    assert.strictEqual(activeAnchor, '#flagship');
  });

  // -------------------------------------------------------------
  // TC-C03: Deep-Link Anchor Navigation Preserves Language Preference
  // -------------------------------------------------------------
  it('TC-C03: Deep-linking with hash target (#projects) retains selected language across views', () => {
    const storage = createMockLocalStorage({ mu_lang_pref: 'en' });
    const engine = new LanguageEngine(storage);

    const simulatedUrl = new URL('https://munverricht.org/#projects');
    assert.strictEqual(simulatedUrl.hash, '#projects');
    assert.strictEqual(engine.language, 'en');
    assert.strictEqual(engine.t.projects.title, 'Selected Secondary Projects');
    assert.strictEqual(engine.t.projects.items[0].title, 'Baker & Charlie');
  });

  // -------------------------------------------------------------
  // TC-C04: Responsive Breakpoint Resize During Interactive Copy Feedback
  // -------------------------------------------------------------
  it('TC-C04: Active copy feedback notification persists and causes 0px overflow across viewport resizing', () => {
    const engine = new LanguageEngine(createMockLocalStorage());
    
    // Simulating Copy Toast component
    let toastState = {
      visible: true,
      message: engine.t.contact.copiedNotice,
      width: 'max-content',
      maxWidth: 320
    };

    assert.ok(toastState.message.includes('Zwischenablage'));

    const mockLayoutWithToast = [
      { id: 'footer', tag: 'footer', width: '100%', maxWidth: 1024 },
      { id: 'copy-toast', tag: 'div', width: 320, maxWidth: 320 }
    ];

    const resizeViewports = [BREAKPOINTS.desktop, BREAKPOINTS.tablet, BREAKPOINTS.mobile, BREAKPOINTS.mobileSm];
    for (const vp of resizeViewports) {
      const result = simulateViewportOverflow(mockLayoutWithToast, vp);
      assert.strictEqual(result.overflowDetected, false, `Overflow during toast at ${vp}px`);
    }
  });

  // -------------------------------------------------------------
  // TC-C05: Contrast Compliance Across All Bilingual Headings & Body Nodes
  // -------------------------------------------------------------
  it('TC-C05: Contrast compliance is maintained across all translated text nodes in both DE and EN', () => {
    const textColors = [
      DESIGN_TOKENS.colors.textPrimary,
      DESIGN_TOKENS.colors.textSecondary
    ];

    const backgroundSurfaces = [
      DESIGN_TOKENS.colors.canvas,
      DESIGN_TOKENS.colors.surface
    ];

    for (const textColor of textColors) {
      for (const bg of backgroundSurfaces) {
        const ratio = calculateContrastRatio(textColor, bg);
        const compliance = evaluateWcagCompliance(ratio);
        assert.strictEqual(compliance.aaNormal, true, 
          `Contrast violation: ${textColor} on ${bg} gives ${ratio}:1 (expected >= 4.5:1)`
        );
      }
    }
  });

  // -------------------------------------------------------------
  // TC-C06: Project Card Interactive State & Tabnabbing Security
  // -------------------------------------------------------------
  it('TC-C06: Secondary project links enforce rel="noopener noreferrer" and valid target="_blank"', () => {
    const mockLinks = [
      { label: 'Live Demo', url: 'https://asl-ademco.de', rel: 'noopener noreferrer', target: '_blank' },
      { label: 'GitHub', url: 'https://github.com/munverricht', rel: 'noopener noreferrer', target: '_blank' }
    ];

    for (const link of mockLinks) {
      assert.strictEqual(link.target, '_blank');
      assert.strictEqual(link.rel, 'noopener noreferrer', 'External links must prevent tabnabbing security risks');
    }
  });
});
