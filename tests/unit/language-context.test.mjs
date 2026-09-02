/**
 * Unit Test: Bilingual State Engine & LocalStorage Persistence
 * Tests LanguageContext logic, persistence contracts, fallback handling, and HTML lang sync.
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { createMockLocalStorage } from '../helpers/test-utils.mjs';
import { deContent, enContent } from './dictionary-parity.test.mjs';

/**
 * Pure Model implementation of the LanguageContext engine matching PROJECT.md contracts
 */
export class LanguageEngine {
  constructor(storage = createMockLocalStorage()) {
    this.storage = storage;
    this.STORAGE_KEY = 'mu_lang_pref';
    this.subscribers = new Set();
    
    // Initialize from storage or default to 'de'
    const stored = this.storage.getItem(this.STORAGE_KEY);
    this.language = (stored === 'de' || stored === 'en') ? stored : 'de';
    this.updateHtmlLang(this.language);
  }

  get t() {
    return this.language === 'en' ? enContent : deContent;
  }

  setLanguage(lang) {
    if (lang !== 'de' && lang !== 'en') {
      lang = 'de'; // Graceful fallback
    }
    this.language = lang;
    this.storage.setItem(this.STORAGE_KEY, lang);
    this.updateHtmlLang(lang);
    this.notify();
  }

  toggleLanguage() {
    const nextLang = this.language === 'de' ? 'en' : 'de';
    this.setLanguage(nextLang);
  }

  updateHtmlLang(lang) {
    this.currentHtmlLang = lang;
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.setAttribute('lang', lang);
    }
  }

  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  notify() {
    for (const sub of this.subscribers) {
      sub(this.language, this.t);
    }
  }
}

describe('Unit Test: Language Engine & Persistence', () => {
  let mockStorage;
  let engine;

  beforeEach(() => {
    mockStorage = createMockLocalStorage();
    engine = new LanguageEngine(mockStorage);
  });

  it('TC-LC01: Defaults to German (de) when localStorage is empty', () => {
    assert.strictEqual(engine.language, 'de');
    assert.strictEqual(engine.currentHtmlLang, 'de');
    assert.strictEqual(engine.t.hero.name, "Maximilian Unverricht");
    assert.strictEqual(engine.t.nav.toggleLang, "EN");
  });

  it('TC-LC02: Switches language to English (en) and updates localStorage', () => {
    engine.setLanguage('en');
    assert.strictEqual(engine.language, 'en');
    assert.strictEqual(mockStorage.getItem('mu_lang_pref'), 'en');
    assert.strictEqual(engine.currentHtmlLang, 'en');
    assert.strictEqual(engine.t.nav.toggleLang, "DE");
    assert.strictEqual(engine.t.hero.primaryCta, "Get in touch");
  });

  it('TC-LC03: toggleLanguage flips between de and en synchronously', () => {
    assert.strictEqual(engine.language, 'de');
    engine.toggleLanguage();
    assert.strictEqual(engine.language, 'en');
    assert.strictEqual(mockStorage.getItem('mu_lang_pref'), 'en');
    
    engine.toggleLanguage();
    assert.strictEqual(engine.language, 'de');
    assert.strictEqual(mockStorage.getItem('mu_lang_pref'), 'de');
  });

  it('TC-LC04: Restores previously saved language from localStorage on initial boot', () => {
    const prefilledStorage = createMockLocalStorage({ mu_lang_pref: 'en' });
    const bootedEngine = new LanguageEngine(prefilledStorage);
    assert.strictEqual(bootedEngine.language, 'en');
    assert.strictEqual(bootedEngine.t.nav.about, "Profile");
  });

  it('TC-LC05: Gracefully handles corrupted or invalid storage value by falling back to de', () => {
    const invalidStorage = createMockLocalStorage({ mu_lang_pref: 'invalid_lang_code' });
    const safeEngine = new LanguageEngine(invalidStorage);
    assert.strictEqual(safeEngine.language, 'de');
    
    // Setting invalid language triggers fallback to 'de'
    safeEngine.setLanguage('xyz');
    assert.strictEqual(safeEngine.language, 'de');
    assert.strictEqual(invalidStorage.getItem('mu_lang_pref'), 'de');
  });

  it('TC-LC06: Notifies all active subscribers on language change', () => {
    let notifiedCount = 0;
    let receivedLang = null;

    const unsubscribe = engine.subscribe((lang) => {
      notifiedCount++;
      receivedLang = lang;
    });

    engine.toggleLanguage();
    assert.strictEqual(notifiedCount, 1);
    assert.strictEqual(receivedLang, 'en');

    engine.toggleLanguage();
    assert.strictEqual(notifiedCount, 2);
    assert.strictEqual(receivedLang, 'de');

    unsubscribe();
    engine.toggleLanguage();
    assert.strictEqual(notifiedCount, 2, 'Should not notify after unsubscribe');
  });
});
