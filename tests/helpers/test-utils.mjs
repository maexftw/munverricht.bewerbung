/**
 * Test Utilities: Simulated Storage, DOM Landmarks, Responsive Layout & Touch Target Checker
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * Creates an in-memory mock localStorage implementation with full Storage API.
 */
export function createMockLocalStorage(initialData = {}) {
  const store = new Map(Object.entries(initialData));

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
    get length() {
      return store.size;
    },
    key(index) {
      return Array.from(store.keys())[index] || null;
    },
    _dump() {
      return Object.fromEntries(store.entries());
    }
  };
}

/**
 * Standard breakpoints defined in specifications
 */
export const BREAKPOINTS = {
  mobileSm: 320,
  mobile: 375,
  mobileLg: 414,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1440,
  ultraWide: 1920
};

/**
 * 4pt/8pt rhythm scale valid step values in pixels
 */
export const VALID_RHYTHM_STEPS = [0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256];

/**
 * Validates whether a pixel dimension aligns with the 4pt/8pt rhythm system.
 * Values >= 4px should generally be divisible by 4.
 * @param {number} px
 * @returns {boolean}
 */
export function isRhythmAligned(px) {
  if (px <= 2) return true; // 1px borders, 2px micro-offsets are valid
  return px % 4 === 0;
}

/**
 * Simulates element box metrics across viewports to detect horizontal overflow.
 * @param {Array<{ id: string, tag: string, width: string|number, maxWidth?: string|number, padding?: number, margin?: number }>} elements 
 * @param {number} viewportWidth 
 * @returns {{ overflowDetected: boolean, maxContentWidth: number, violatingElements: any[] }}
 */
export function simulateViewportOverflow(elements, viewportWidth) {
  let maxContentWidth = 0;
  const violatingElements = [];

  for (const el of elements) {
    let computedWidth = 0;
    if (typeof el.width === 'number') {
      computedWidth = el.width;
    } else if (typeof el.width === 'string') {
      if (el.width.endsWith('%')) {
        const pct = parseFloat(el.width) / 100;
        computedWidth = viewportWidth * pct;
      } else if (el.width.endsWith('px')) {
        computedWidth = parseFloat(el.width);
      } else if (el.width === '100vw') {
        computedWidth = viewportWidth;
      } else if (el.width === 'max-content' || el.width === 'auto') {
        computedWidth = el.estimatedWidth || viewportWidth;
      }
    }

    if (el.maxWidth) {
      let maxW = typeof el.maxWidth === 'number' ? el.maxWidth : parseFloat(el.maxWidth);
      if (computedWidth > maxW) computedWidth = maxW;
    }

    const totalWidth = computedWidth + (el.margin || 0);

    if (totalWidth > viewportWidth + 0.1) { // 0.1px floating point tolerance
      violatingElements.push({
        id: el.id || el.tag,
        computedWidth: totalWidth,
        viewportWidth,
        overflowPx: Number((totalWidth - viewportWidth).toFixed(2))
      });
    }

    if (totalWidth > maxContentWidth) {
      maxContentWidth = totalWidth;
    }
  }

  return {
    overflowDetected: violatingElements.length > 0,
    maxContentWidth,
    violatingElements
  };
}

/**
 * Validates interactive touch target dimensions against minimum 44x44px.
 * @param {number} width 
 * @param {number} height 
 * @returns {{ valid: boolean, width: number, height: number, deficit: { width: number, height: number } }}
 */
export function validateTouchTarget(width, height) {
  const MIN_SIZE = 44;
  const valid = width >= MIN_SIZE && height >= MIN_SIZE;
  return {
    valid,
    width,
    height,
    deficit: {
      width: Math.max(0, MIN_SIZE - width),
      height: Math.max(0, MIN_SIZE - height)
    }
  };
}

/**
 * Scans a code or markdown string for forbidden AI slop design patterns.
 * @param {string} code 
 * @returns {{ hasSlop: boolean, violations: string[] }}
 */
export function auditForAntiSlopViolations(code) {
  const violations = [];

  // 1. Purple/violet glow meshes or generic neon orbs
  if (/(?:from-purple-|to-violet-|bg-purple-900\/|shadow-purple-|shadow-violet-)/i.test(code)) {
    violations.push('Forbidden purple/violet glow mesh gradient detected');
  }

  // 2. Pill badge spam (excessive rounded-full on everything)
  const pillMatches = code.match(/rounded-full/g);
  if (pillMatches && pillMatches.length > 6) {
    violations.push(`Excessive rounded-full pill usage detected (${pillMatches.length} occurrences)`);
  }

  // 3. Random mixed-family serif italics inside sans headlines
  if (/(?:font-serif\s+italic.*font-sans|font-sans.*font-serif\s+italic)/i.test(code)) {
    violations.push('Forbidden mixed-family serif italic in sans headline detected');
  }

  return {
    hasSlop: violations.length > 0,
    violations
  };
}
