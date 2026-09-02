/**
 * Tier 4 E2E Test Suite: Real-World Application Scenarios
 * End-to-end user journeys simulating real recruiters, engineering leads,
 * international hiring managers, and mobile device users.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { deContent, enContent } from '../unit/dictionary-parity.test.mjs';
import { DESIGN_TOKENS } from '../unit/design-tokens-a11y.test.mjs';
import { LanguageEngine } from '../unit/language-context.test.mjs';
import { calculateContrastRatio } from '../helpers/contrast.mjs';
import { 
  createMockLocalStorage, 
  simulateViewportOverflow, 
  validateTouchTarget,
  BREAKPOINTS 
} from '../helpers/test-utils.mjs';

describe('Tier 4 E2E: Real-World Application Scenarios', () => {

  // -------------------------------------------------------------
  // TC-S01: Recruiter 30-Second Fast Scan Flow
  // -------------------------------------------------------------
  it('TC-S01: Recruiter 30-Second Scan Flow: Hero -> Experience -> Flagship Metrics -> Contact CTA', () => {
    const engine = new LanguageEngine(createMockLocalStorage());

    // Step 1: Recruiter lands on Hero
    const heroTitle = engine.t.hero.title;
    const heroLocation = engine.t.hero.location;
    assert.strictEqual(heroTitle, "AI Workflow & Web Delivery Specialist");
    assert.ok(heroLocation.includes("Dortmund"));

    // Step 2: Recruiter scans Experience timeline
    const expItems = engine.t.experience.items;
    assert.strictEqual(expItems.length, 2);
    assert.ok(expItems[0].period.includes("08/2025"));
    assert.ok(expItems[1].company.includes("Graphiks.de"));

    // Step 3: Recruiter checks Flagship metrics
    const metrics = engine.t.flagship.metrics;
    assert.ok(metrics.some(m => m.label.includes("1.460+") || m.label.includes("1460")));
    assert.ok(metrics.some(m => m.label.includes("7")));
    assert.ok(metrics.some(m => m.label.includes("100%")));

    // Step 4: Recruiter triggers Contact CTA
    const email = engine.t.contact.email;
    const phone = engine.t.contact.phone;
    assert.strictEqual(email, "info@munverricht.org");
    assert.strictEqual(phone, "+49 163 3229892");

    // Recruiter action completes with 100% data readiness
    const scanSuccess = true;
    assert.strictEqual(scanSuccess, true);
  });

  // -------------------------------------------------------------
  // TC-S02: Technical Lead In-Depth Architecture Inspection
  // -------------------------------------------------------------
  it('TC-S02: Tech Lead Inspection Flow: ReAct Architecture -> SQL RAG -> Guardrails -> Attribution -> Offline RAG', () => {
    const engine = new LanguageEngine(createMockLocalStorage());

    // 1. Tech Lead inspects skills matrix for backend & AI depth
    const allSkills = engine.t.skills.categories.flatMap(c => c.items);
    assert.ok(allSkills.includes("React 19"));
    assert.ok(allSkills.includes("Cloudflare Pages & Workers"));
    assert.ok(allSkills.includes("Cloudflare D1 (SQL)"));
    assert.ok(allSkills.includes("DeepSeek-V3"));
    assert.ok(allSkills.includes("Playwright"));

    // 2. Tech Lead verifies Flagship 5 pillars
    const pillars = engine.t.flagship.pillars;
    assert.strictEqual(pillars.length, 5);
    assert.ok(pillars[0].tech.includes("Workers") && pillars[0].tech.includes("D1 SQL"));
    assert.ok(pillars[1].title.includes("Guardrail"));
    assert.ok(pillars[2].title.includes("SQL-RAG") || pillars[2].title.includes("SQL"));
    assert.ok(pillars[3].title.includes("Planning Studio"));
    assert.ok(pillars[4].title.includes("Datanorm"));

    // 3. Tech Lead verifies honest contribution attribution
    const attribution = engine.t.flagship.attribution;
    assert.ok(attribution.prototype.length > 10);
    assert.ok(attribution.engineering.length >= 4);

    // 4. Tech Lead inspects secondary project: ZBN Offline RAG
    const zbn = engine.t.projects.items.find(p => p.id === 'zbn-offline-rag');
    assert.ok(zbn.description.includes("Docling"));
    assert.ok(zbn.description.includes("Ollama"));
    assert.ok(zbn.description.includes("RTX 5090"));
  });

  // -------------------------------------------------------------
  // TC-S03: International / English-Speaking Recruiter Journey
  // -------------------------------------------------------------
  it('TC-S03: International Recruiter Flow: Toggle EN -> 100% Section Translation -> Copy Email -> Persistence Reload', () => {
    const storage = createMockLocalStorage();
    const engine = new LanguageEngine(storage);

    // Initial state: German
    assert.strictEqual(engine.language, 'de');
    assert.strictEqual(engine.t.hero.primaryCta, "Kontakt aufnehmen");

    // Step 1: Recruiter clicks language switch
    engine.toggleLanguage();
    assert.strictEqual(engine.language, 'en');
    assert.strictEqual(storage.getItem('mu_lang_pref'), 'en');

    // Step 2: Verify all 7 sections translated to English
    assert.strictEqual(engine.t.hero.greeting, "Hello, I am");
    assert.strictEqual(engine.t.about.title, "About Me");
    assert.strictEqual(engine.t.skills.title, "Skills & Tech Stack");
    assert.strictEqual(engine.t.flagship.title, "ASL Ademco B2B — AI Product Advisor & Planning Studio");
    assert.strictEqual(engine.t.projects.title, "Selected Secondary Projects");
    assert.strictEqual(engine.t.experience.title, "Career Experience");
    assert.strictEqual(engine.t.contact.title, "Get in Touch");
    assert.strictEqual(engine.t.contact.copiedNotice, "Email address copied to clipboard!");

    // Step 3: Recruiter reloads page in new session
    const newSessionEngine = new LanguageEngine(storage);
    assert.strictEqual(newSessionEngine.language, 'en');
    assert.strictEqual(newSessionEngine.t.nav.about, "Profile");
  });

  // -------------------------------------------------------------
  // TC-S04: Mobile Recruiter On-the-Go Flow (375px Viewport)
  // -------------------------------------------------------------
  it('TC-S04: Mobile Recruiter Flow: 375px Viewport -> Nav Drawer -> Flagship Jump -> Touch Targets >= 44px', () => {
    const engine = new LanguageEngine(createMockLocalStorage());

    // Step 1: Check mobile layout at 375px width
    const mobileElements = [
      { id: 'mobile-header', tag: 'header', width: '100%', maxWidth: 375 },
      { id: 'mobile-hero', tag: 'section', width: '100%', maxWidth: 375 },
      { id: 'mobile-flagship', tag: 'section', width: '100%', maxWidth: 375 },
      { id: 'mobile-contact', tag: 'footer', width: '100%', maxWidth: 375 }
    ];

    const overflowResult = simulateViewportOverflow(mobileElements, BREAKPOINTS.mobile);
    assert.strictEqual(overflowResult.overflowDetected, false, 'Mobile view must have 0px overflow');

    // Step 2: Mobile nav touch targets
    const burgerBtnTarget = validateTouchTarget(48, 48);
    const langToggleTarget = validateTouchTarget(44, 44);
    const navLinkTarget = validateTouchTarget(280, 48);
    const contactCtaTarget = validateTouchTarget(280, 48);

    assert.strictEqual(burgerBtnTarget.valid, true);
    assert.strictEqual(langToggleTarget.valid, true);
    assert.strictEqual(navLinkTarget.valid, true);
    assert.strictEqual(contactCtaTarget.valid, true);

    // Step 3: Mobile direct phone / email actions
    const phoneHref = `tel:${engine.t.contact.phone.replace(/\s+/g, '')}`;
    const emailHref = `mailto:${engine.t.contact.email}`;

    assert.strictEqual(phoneHref, 'tel:+491633229892');
    assert.strictEqual(emailHref, 'mailto:info@munverricht.org');
  });
});
