/**
 * WCAG 2.1 Relative Luminance & Contrast Ratio Engine
 * Authoritative W3C Formula: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */

/**
 * Parses a hex color string (#RGB, #RGBA, #RRGGBB, #RRGGBBAA) to [r, g, b] in range 0-255.
 * @param {string} hex 
 * @returns {[number, number, number]}
 */
export function parseHexColor(hex) {
  let cleaned = hex.trim().replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  } else if (cleaned.length === 4) {
    cleaned = cleaned.slice(0, 3).split('').map(c => c + c).join('');
  } else if (cleaned.length === 8) {
    cleaned = cleaned.slice(0, 6);
  }
  
  if (cleaned.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const num = parseInt(cleaned, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return [r, g, b];
}

/**
 * Calculates sRGB relative luminance.
 * @param {number} r 0-255
 * @param {number} g 0-255
 * @param {number} b 0-255
 * @returns {number} Relative luminance in range 0.0 to 1.0
 */
export function getRelativeLuminance(r, g, b) {
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const R = (rsRGB <= 0.04045) ? (rsRGB / 12.92) : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const G = (gsRGB <= 0.04045) ? (gsRGB / 12.92) : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const B = (bsRGB <= 0.04045) ? (bsRGB / 12.92) : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates WCAG 2.1 contrast ratio between two colors.
 * @param {string|[number, number, number]} color1 Hex or [r, g, b]
 * @param {string|[number, number, number]} color2 Hex or [r, g, b]
 * @returns {number} Contrast ratio (1.0 to 21.0)
 */
export function calculateContrastRatio(color1, color2) {
  const rgb1 = typeof color1 === 'string' ? parseHexColor(color1) : color1;
  const rgb2 = typeof color2 === 'string' ? parseHexColor(color2) : color2;

  const lum1 = getRelativeLuminance(...rgb1);
  const lum2 = getRelativeLuminance(...rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Evaluates compliance with WCAG 2.1 levels:
 * - AA Normal: >= 4.5:1
 * - AA Large: >= 3.0:1
 * - AAA Normal: >= 7.0:1
 * - AAA Large: >= 4.5:1
 * - UI Components: >= 3.0:1
 * @param {number} ratio 
 * @returns {{ aaNormal: boolean, aaLarge: boolean, aaaNormal: boolean, aaaLarge: boolean, uiComponent: boolean, ratio: number }}
 */
export function evaluateWcagCompliance(ratio) {
  return {
    ratio: Number(ratio.toFixed(2)),
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3.0,
    aaaNormal: ratio >= 7.0,
    aaaLarge: ratio >= 4.5,
    uiComponent: ratio >= 3.0
  };
}
