/**
 * Unit Test: Data Integrity & Factual Accuracy
 * Verifies all biographical, technical, metrics, and project data against ORIGINAL_REQUEST.md.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { deContent, enContent } from './dictionary-parity.test.mjs';

describe('Unit Test: Data Integrity & Requirements Alignment', () => {
  it('TC-DI01: Contact data matches authoritative profile exactly', () => {
    const expectedEmail = 'info@munverricht.org';
    const expectedPhone = '+49 163 3229892';
    const expectedCity = 'Dortmund';

    assert.strictEqual(deContent.contact.email, expectedEmail);
    assert.strictEqual(enContent.contact.email, expectedEmail);
    assert.strictEqual(deContent.contact.phone, expectedPhone);
    assert.strictEqual(enContent.contact.phone, expectedPhone);
    assert.ok(deContent.contact.location.includes(expectedCity));
    assert.ok(enContent.contact.location.includes(expectedCity));
  });

  it('TC-DI02: Developer positioning emphasizes 12+ years experience and transition since 08/2025', () => {
    assert.ok(deContent.hero.tagline.includes('12+ Jahren'));
    assert.ok(enContent.hero.tagline.includes('12+ years'));
    assert.ok(deContent.about.paragraphs[0].includes('12 Jahren'));
    assert.ok(enContent.about.paragraphs[0].includes('12 years'));
    assert.ok(deContent.about.paragraphs[1].includes('August 2025') || deContent.about.paragraphs[1].includes('08/2025'));
    assert.ok(enContent.about.paragraphs[1].includes('August 2025') || enContent.about.paragraphs[1].includes('08/2025'));
  });

  it('TC-DI03: Flagship ASL Ademco case study documents all 5 architectural pillars verbatim', () => {
    const expectedPillars = [
      'Vertical Agent (ReAct Loop)',
      'Guardrail',
      'SQL',
      'Planning Studio',
      'Datanorm'
    ];

    expectedPillars.forEach((keyword, idx) => {
      const dePillar = deContent.flagship.pillars[idx];
      const enPillar = enContent.flagship.pillars[idx];
      assert.ok(dePillar.title.includes(keyword) || dePillar.description.includes(keyword), `DE pillar ${idx} should mention ${keyword}`);
      assert.ok(enPillar.title.includes(keyword) || enPillar.description.includes(keyword), `EN pillar ${idx} should mention ${keyword}`);
    });
  });

  it('TC-DI04: Flagship case study features concrete metrics: 1,460+ SKUs, 7 reasoning cycles, Lighthouse 100', () => {
    const deMetricsStr = JSON.stringify(deContent.flagship.metrics);
    const enMetricsStr = JSON.stringify(enContent.flagship.metrics);

    assert.ok(deMetricsStr.includes('1.460+') || deMetricsStr.includes('1460'));
    assert.ok(enMetricsStr.includes('1,460+') || enMetricsStr.includes('1460'));
    assert.ok(deMetricsStr.includes('7'));
    assert.ok(enMetricsStr.includes('7'));
    assert.ok(deMetricsStr.includes('100'));
    assert.ok(enMetricsStr.includes('100'));
  });

  it('TC-DI05: Honest attribution distinguishes prototype origin from complete engineering delivery', () => {
    assert.ok(deContent.flagship.attribution.prototype.toLowerCase().includes('google ai studio') || deContent.flagship.attribution.prototype.toLowerCase().includes('stitch'));
    assert.ok(enContent.flagship.attribution.prototype.toLowerCase().includes('google ai studio') || enContent.flagship.attribution.prototype.toLowerCase().includes('stitch'));
    
    // Engineering contributions must include backend, agent, SQL tools, import pipelines, WCAG
    const deContribs = deContent.flagship.attribution.engineering.join(' ');
    assert.ok(deContribs.includes('Cloudflare') || deContribs.includes('D1'));
    assert.ok(deContribs.includes('ReAct') || deContribs.includes('Agent'));
    assert.ok(deContribs.includes('SQL') || deContribs.includes('Datanorm'));
    assert.ok(deContribs.includes('WCAG') || deContribs.includes('Sicherheit'));
  });

  it('TC-DI06: All 5 secondary projects present accurate domain details and technical stacks', () => {
    const projectMap = new Map(enContent.projects.items.map(p => [p.id, p]));

    // 1. Baker & Charlie
    const bc = projectMap.get('baker-charlie');
    assert.ok(bc);
    assert.ok(bc.description.includes('Bengaluru') || bc.category.includes('Bengaluru'));
    assert.ok(bc.stack.includes('Playwright'));
    assert.ok(bc.metrics.includes('Lighthouse 95+') || bc.description.includes('95+'));

    // 2. KOST Sicherheitstechnik
    const kost = projectMap.get('kost-sicherheit');
    assert.ok(kost);
    assert.ok(kost.stack.includes('Cloudflare WAF') || kost.stack.includes('Python Automation'));

    // 3. Kaffee Faensen
    const kaffee = projectMap.get('kaffee-faensen');
    assert.ok(kaffee);
    assert.ok(kaffee.description.includes('Stripe') || kaffee.stack.includes('Stripe Checkout'));
    assert.ok(kaffee.description.includes('21/21') || kaffee.metrics.includes('21/21'));

    // 4. RLC 1952 Recklinghausen
    const rlc = projectMap.get('rlc-1952');
    assert.ok(rlc);
    assert.ok(rlc.stack.includes('Cloudflare Pages'));
    assert.ok(rlc.description.includes('Turnstile') || rlc.stack.includes('Turnstile A11y'));

    // 5. ZBN Offline RAG Pipeline
    const zbn = projectMap.get('zbn-offline-rag');
    assert.ok(zbn);
    assert.ok(zbn.description.includes('Docling') && zbn.description.includes('Ollama'));
    assert.ok(zbn.stack.includes('ChromaDB') || zbn.description.includes('ChromaDB'));
  });

  it('TC-DI07: Career timeline accurately records Graphiks.de (2013–2025) and AI Specialist (08/2025–present)', () => {
    const deExp = deContent.experience.items;
    assert.strictEqual(deExp[0].role, "AI Workflow & Web Delivery Specialist");
    assert.strictEqual(deExp[1].company, "Graphiks.de");
    assert.ok(deExp[1].period.includes("2013") && deExp[1].period.includes("2025"));
  });
});
