import { describe, it, expect } from 'vitest';
import { de } from '../../src/data/locales/de';
import { en } from '../../src/data/locales/en';
import { compareDictionarySymmetry, validateTranslationDictionarySchema } from '../helpers/schema-validator.mjs';

describe('Locales Data & Parity (Vitest TypeScript Direct Test)', () => {
  it('TC-LOC01: de.ts satisfies complete TranslationDictionary schema', () => {
    const res = validateTranslationDictionarySchema(de);
    expect(res.valid).toBe(true);
    expect(res.errors).toEqual([]);
  });

  it('TC-LOC02: en.ts satisfies complete TranslationDictionary schema', () => {
    const res = validateTranslationDictionarySchema(en);
    expect(res.valid).toBe(true);
    expect(res.errors).toEqual([]);
  });

  it('TC-LOC03: de.ts and en.ts have 100% key symmetry with zero missing or extra keys', () => {
    const parity = compareDictionarySymmetry(de, en);
    expect(parity.symmetric).toBe(true);
    expect(parity.missingInDict2).toEqual([]);
    expect(parity.extraInDict2).toEqual([]);
    expect(parity.typeMismatches).toEqual([]);
  });

  it('TC-LOC04: verifies ASL Ademco Flagship case study contains 5 pillars and honest attribution', () => {
    expect(de.flagship.pillars).toHaveLength(5);
    expect(en.flagship.pillars).toHaveLength(5);
    expect(de.flagship.metrics.length).toBeGreaterThanOrEqual(3);
    expect(en.flagship.metrics.length).toBeGreaterThanOrEqual(3);

    expect(de.flagship.attribution.prototype).toMatch(/Google AI Studio|Stitch/i);
    expect(en.flagship.attribution.prototype).toMatch(/Google AI Studio|Stitch/i);
    expect(de.flagship.attribution.engineering.length).toBeGreaterThanOrEqual(3);
    expect(en.flagship.attribution.engineering.length).toBeGreaterThanOrEqual(3);
  });

  it('TC-LOC05: verifies all 5 secondary projects and experience timeline entries', () => {
    expect(de.projects.items).toHaveLength(5);
    expect(en.projects.items).toHaveLength(5);
    
    const expectedIds = ['baker-charlie', 'kost-sicherheit', 'kaffee-faensen', 'rlc-1952', 'zbn-offline-rag'];
    expect(de.projects.items.map(p => p.id)).toEqual(expectedIds);
    expect(en.projects.items.map(p => p.id)).toEqual(expectedIds);

    expect(de.experience.items).toHaveLength(2);
    expect(en.experience.items).toHaveLength(2);
    expect(de.experience.items[1]?.company).toBe('Graphiks.de');
    expect(en.experience.items[1]?.company).toBe('Graphiks.de');
  });
});
