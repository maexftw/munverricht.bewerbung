export function parseHexColor(hex: string): [number, number, number];
export function getRelativeLuminance(r: number, g: number, b: number): number;
export function calculateContrastRatio(color1: string | [number, number, number], color2: string | [number, number, number]): number;
export function evaluateWcagCompliance(ratio: number): {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
  uiComponent: boolean;
};
