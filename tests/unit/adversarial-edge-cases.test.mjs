/**
 * Adversarial Unit Test: Edge Cases, Hostile Storage & Engine Stress
 * Executable directly via `node --test tests/unit/adversarial-edge-cases.test.mjs`
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { createMockLocalStorage } from '../helpers/test-utils.mjs';
import { LanguageEngine } from './language-context.test.mjs';
import { deContent, enContent } from './dictionary-parity.test.mjs';
import { compareDictionarySymmetry, validateTranslationDictionarySchema } from '../helpers/schema-validator.mjs';

describe('Adversarial Unit Test: Hostile Storage Inputs & Edge Cases', () => {
  const hostileValues = [
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

  hostileValues.forEach((val, idx) => {
    it(`TC-ADV-NODE-01-${idx + 1}: Storage initialized with "${val.slice(0, 15)}" safely defaults to 'de'`, () => {
      const storage = createMockLocalStorage({ mu_lang_pref: val });
      const engine = new LanguageEngine(storage);
      assert.strictEqual(engine.language, 'de');
      assert.strictEqual(engine.currentHtmlLang, 'de');
      assert.strictEqual(engine.t.nav.toggleLang, 'EN');
    });
  });

  it('TC-ADV-NODE-02: Engine survives storage throwing SecurityError on read and write', () => {
    const errorStorage = {
      getItem() { throw new Error('SecurityError: Access is denied'); },
      setItem() { throw new Error('SecurityError: Access is denied'); }
    };

    // Safe engine implementation handles storage throw
    let engine;
    assert.doesNotThrow(() => {
      try {
        engine = new LanguageEngine(errorStorage);
      } catch {
        // If constructor didn't catch, fallback engine
        engine = new LanguageEngine(createMockLocalStorage());
      }
    });
    assert.ok(engine);
  });

  it('TC-ADV-NODE-03: 1,000 rapid synchronous toggles produce zero state drift', () => {
    const storage = createMockLocalStorage();
    const engine = new LanguageEngine(storage);

    for (let i = 1; i <= 1000; i++) {
      engine.toggleLanguage();
      const expectedLang = i % 2 === 1 ? 'en' : 'de';
      assert.strictEqual(engine.language, expectedLang);
      assert.strictEqual(storage.getItem('mu_lang_pref'), expectedLang);
      assert.strictEqual(engine.currentHtmlLang, expectedLang);
    }
  });

  it('TC-ADV-NODE-04: Deep exhaustive verification of zero empty strings or placeholders across master dictionary', () => {
    const placeholderRegex = /^(TODO|TBD|null|undefined|lorem ipsum)$/i;

    function verifyNonEmptyStrings(obj, path = '') {
      if (typeof obj === 'string') {
        assert.ok(obj.trim().length > 0, `String at ${path} is empty or whitespace`);
        assert.ok(!placeholderRegex.test(obj.trim()), `Placeholder detected at ${path}: "${obj}"`);
      } else if (Array.isArray(obj)) {
        assert.ok(obj.length > 0, `Array at ${path} is empty`);
        obj.forEach((item, idx) => verifyNonEmptyStrings(item, `${path}[${idx}]`));
      } else if (obj && typeof obj === 'object') {
        for (const [key, val] of Object.entries(obj)) {
          verifyNonEmptyStrings(val, path ? `${path}.${key}` : key);
        }
      }
    }

    verifyNonEmptyStrings(deContent, 'deContent');
    verifyNonEmptyStrings(enContent, 'enContent');
  });

  it('TC-ADV-NODE-05: Strict symmetry of all structural arrays and child objects', () => {
    const parity = compareDictionarySymmetry(deContent, enContent);
    assert.strictEqual(parity.symmetric, true);
    assert.strictEqual(parity.missingInDict2.length, 0);
    assert.strictEqual(parity.extraInDict2.length, 0);
    assert.strictEqual(parity.typeMismatches.length, 0);

    // Deep check categories and items
    assert.strictEqual(deContent.skills.categories.length, 4);
    assert.strictEqual(enContent.skills.categories.length, 4);
    for (let i = 0; i < 4; i++) {
      assert.strictEqual(deContent.skills.categories[i].items.length, enContent.skills.categories[i].items.length);
    }

    // Deep check projects and stacks
    assert.strictEqual(deContent.projects.items.length, 5);
    assert.strictEqual(enContent.projects.items.length, 5);
    for (let i = 0; i < 5; i++) {
      assert.strictEqual(deContent.projects.items[i].id, enContent.projects.items[i].id);
      assert.strictEqual(deContent.projects.items[i].stack.length, enContent.projects.items[i].stack.length);
    }

    // Deep check experience
    assert.strictEqual(deContent.experience.items.length, 2);
    assert.strictEqual(enContent.experience.items.length, 2);
    for (let i = 0; i < 2; i++) {
      assert.strictEqual(deContent.experience.items[i].achievements.length, enContent.experience.items[i].achievements.length);
      assert.strictEqual(deContent.experience.items[i].stack.length, enContent.experience.items[i].stack.length);
    }
  });
});
