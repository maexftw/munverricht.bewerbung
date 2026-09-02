/**
 * Schema & Parity Validator for Bilingual Dictionaries & Content Contracts
 */

/**
 * Recursively extracts all key paths from an object.
 * e.g. { a: { b: 1, c: [ { d: 2 } ] } } -> ['a.b', 'a.c[0].d']
 * @param {any} obj 
 * @param {string} prefix 
 * @returns {string[]}
 */
export function extractKeyPaths(obj, prefix = '') {
  if (obj === null || typeof obj !== 'object') {
    return [prefix];
  }

  const paths = [];
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      paths.push(`${prefix}[]`);
    } else {
      obj.forEach((item, index) => {
        const itemPaths = extractKeyPaths(item, `${prefix}[${index}]`);
        paths.push(...itemPaths);
      });
    }
  } else {
    for (const key of Object.keys(obj)) {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      const childPaths = extractKeyPaths(obj[key], nextPrefix);
      paths.push(...childPaths);
    }
  }
  return paths;
}

/**
 * Compares two dictionaries for 100% key symmetry and returns discrepancies.
 * @param {object} dict1 Master/DE dictionary
 * @param {object} dict2 Target/EN dictionary
 * @returns {{ symmetric: boolean, missingInDict2: string[], extraInDict2: string[], typeMismatches: string[] }}
 */
export function compareDictionarySymmetry(dict1, dict2) {
  const missingInDict2 = [];
  const extraInDict2 = [];
  const typeMismatches = [];

  function checkRecursive(o1, o2, path = '') {
    if (o1 === null || o2 === null || typeof o1 !== 'object' || typeof o2 !== 'object') {
      if (typeof o1 !== typeof o2) {
        typeMismatches.push(`${path} (expected ${typeof o1}, got ${typeof o2})`);
      }
      return;
    }

    if (Array.isArray(o1) !== Array.isArray(o2)) {
      typeMismatches.push(`${path} (array mismatch)`);
      return;
    }

    if (Array.isArray(o1)) {
      if (o1.length !== o2.length) {
        typeMismatches.push(`${path} length mismatch: DE has ${o1.length} items, EN has ${o2.length} items`);
      }
      const maxLen = Math.max(o1.length, o2.length);
      for (let i = 0; i < maxLen; i++) {
        const itemPath = `${path}[${i}]`;
        if (i >= o1.length) {
          extraInDict2.push(itemPath);
        } else if (i >= o2.length) {
          missingInDict2.push(itemPath);
        } else {
          checkRecursive(o1[i], o2[i], itemPath);
        }
      }
      return;
    }

    const keys1 = new Set(Object.keys(o1));
    const keys2 = new Set(Object.keys(o2));

    for (const k of keys1) {
      const currentPath = path ? `${path}.${k}` : k;
      if (!keys2.has(k)) {
        missingInDict2.push(currentPath);
      } else {
        checkRecursive(o1[k], o2[k], currentPath);
      }
    }

    for (const k of keys2) {
      const currentPath = path ? `${path}.${k}` : k;
      if (!keys1.has(k)) {
        extraInDict2.push(currentPath);
      }
    }
  }

  checkRecursive(dict1, dict2);

  return {
    symmetric: missingInDict2.length === 0 && extraInDict2.length === 0 && typeMismatches.length === 0,
    missingInDict2,
    extraInDict2,
    typeMismatches
  };
}

/**
 * Validates a TranslationDictionary against the PROJECT.md schema specification.
 * @param {object} dict
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateTranslationDictionarySchema(dict) {
  const errors = [];

  function assertString(val, path, minLength = 1) {
    if (typeof val !== 'string' || val.trim().length < minLength) {
      errors.push(`${path} must be a non-empty string`);
    }
  }

  function assertArray(val, path, minLength = 1) {
    if (!Array.isArray(val) || val.length < minLength) {
      errors.push(`${path} must be an array with at least ${minLength} item(s)`);
    }
  }

  if (!dict || typeof dict !== 'object') {
    return { valid: false, errors: ['Dictionary must be a valid non-null object'] };
  }

  // 1. Meta
  if (!dict.meta) errors.push('meta section is required');
  else {
    assertString(dict.meta.title, 'meta.title');
    assertString(dict.meta.description, 'meta.description');
    assertString(dict.meta.ogTitle, 'meta.ogTitle');
  }

  // 2. Nav
  if (!dict.nav) errors.push('nav section is required');
  else {
    const navKeys = ['about', 'skills', 'flagship', 'projects', 'experience', 'contact', 'toggleLang'];
    for (const k of navKeys) {
      assertString(dict.nav[k], `nav.${k}`);
    }
  }

  // 3. Hero
  if (!dict.hero) errors.push('hero section is required');
  else {
    assertString(dict.hero.greeting, 'hero.greeting');
    assertString(dict.hero.name, 'hero.name');
    assertString(dict.hero.title, 'hero.title');
    assertString(dict.hero.location, 'hero.location');
    assertString(dict.hero.tagline, 'hero.tagline');
    assertString(dict.hero.primaryCta, 'hero.primaryCta');
    assertString(dict.hero.secondaryCta, 'hero.secondaryCta');
  }

  // 4. About
  if (!dict.about) errors.push('about section is required');
  else {
    assertString(dict.about.title, 'about.title');
    assertString(dict.about.subtitle, 'about.subtitle');
    assertArray(dict.about.paragraphs, 'about.paragraphs', 2);
    if (Array.isArray(dict.about.paragraphs)) {
      dict.about.paragraphs.forEach((p, i) => assertString(p, `about.paragraphs[${i}]`, 20));
    }
    assertArray(dict.about.highlights, 'about.highlights', 2);
    if (Array.isArray(dict.about.highlights)) {
      dict.about.highlights.forEach((h, i) => {
        assertString(h.label, `about.highlights[${i}].label`);
        assertString(h.value, `about.highlights[${i}].value`);
      });
    }
  }

  // 5. Skills
  if (!dict.skills) errors.push('skills section is required');
  else {
    assertString(dict.skills.title, 'skills.title');
    assertString(dict.skills.subtitle, 'skills.subtitle');
    assertArray(dict.skills.categories, 'skills.categories', 4);
    if (Array.isArray(dict.skills.categories)) {
      dict.skills.categories.forEach((cat, i) => {
        assertString(cat.name, `skills.categories[${i}].name`);
        assertArray(cat.items, `skills.categories[${i}].items`, 3);
      });
    }
  }

  // 6. Flagship
  if (!dict.flagship) errors.push('flagship section is required');
  else {
    assertString(dict.flagship.badge, 'flagship.badge');
    assertString(dict.flagship.title, 'flagship.title');
    assertString(dict.flagship.client, 'flagship.client');
    assertString(dict.flagship.subtitle, 'flagship.subtitle');
    assertString(dict.flagship.summary, 'flagship.summary', 20);
    assertString(dict.flagship.problemTitle, 'flagship.problemTitle');
    assertString(dict.flagship.problem, 'flagship.problem', 20);
    assertString(dict.flagship.pillarsTitle, 'flagship.pillarsTitle');
    assertArray(dict.flagship.pillars, 'flagship.pillars', 5);
    if (Array.isArray(dict.flagship.pillars)) {
      dict.flagship.pillars.forEach((p, i) => {
        assertString(p.title, `flagship.pillars[${i}].title`);
        assertString(p.description, `flagship.pillars[${i}].description`, 15);
        assertString(p.tech, `flagship.pillars[${i}].tech`);
      });
    }
    assertString(dict.flagship.metricsTitle, 'flagship.metricsTitle');
    assertArray(dict.flagship.metrics, 'flagship.metrics', 3);
    if (Array.isArray(dict.flagship.metrics)) {
      dict.flagship.metrics.forEach((m, i) => {
        assertString(m.label, `flagship.metrics[${i}].label`);
        assertString(m.value, `flagship.metrics[${i}].value`);
        assertString(m.detail, `flagship.metrics[${i}].detail`);
      });
    }
    assertString(dict.flagship.attributionTitle, 'flagship.attributionTitle');
    if (!dict.flagship.attribution) errors.push('flagship.attribution is required');
    else {
      assertString(dict.flagship.attribution.prototype, 'flagship.attribution.prototype');
      assertArray(dict.flagship.attribution.engineering, 'flagship.attribution.engineering', 3);
    }
  }

  // 7. Projects
  if (!dict.projects) errors.push('projects section is required');
  else {
    assertString(dict.projects.title, 'projects.title');
    assertString(dict.projects.subtitle, 'projects.subtitle');
    assertArray(dict.projects.items, 'projects.items', 4);
    if (Array.isArray(dict.projects.items)) {
      dict.projects.items.forEach((p, i) => {
        assertString(p.id, `projects.items[${i}].id`);
        assertString(p.title, `projects.items[${i}].title`);
        assertString(p.category, `projects.items[${i}].category`);
        assertString(p.description, `projects.items[${i}].description`, 15);
        assertArray(p.stack, `projects.items[${i}].stack`, 2);
      });
    }
  }

  // 8. Experience
  if (!dict.experience) errors.push('experience section is required');
  else {
    assertString(dict.experience.title, 'experience.title');
    assertString(dict.experience.subtitle, 'experience.subtitle');
    assertArray(dict.experience.items, 'experience.items', 2);
    if (Array.isArray(dict.experience.items)) {
      dict.experience.items.forEach((exp, i) => {
        assertString(exp.period, `experience.items[${i}].period`);
        assertString(exp.role, `experience.items[${i}].role`);
        assertString(exp.company, `experience.items[${i}].company`);
        assertString(exp.location, `experience.items[${i}].location`);
        assertString(exp.description, `experience.items[${i}].description`);
        assertArray(exp.achievements, `experience.items[${i}].achievements`, 2);
        assertArray(exp.stack, `experience.items[${i}].stack`, 2);
      });
    }
  }

  // 9. Contact
  if (!dict.contact) errors.push('contact section is required');
  else {
    assertString(dict.contact.title, 'contact.title');
    assertString(dict.contact.subtitle, 'contact.subtitle');
    assertString(dict.contact.email, 'contact.email');
    assertString(dict.contact.phone, 'contact.phone');
    assertString(dict.contact.location, 'contact.location');
    assertString(dict.contact.ctaButton, 'contact.ctaButton');
    assertString(dict.contact.copiedNotice, 'contact.copiedNotice');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
