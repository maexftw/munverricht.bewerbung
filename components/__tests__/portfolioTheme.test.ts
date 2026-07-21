import { resolveThemeTokens } from '@astryxdesign/core/theme/tokens';
import { describe, expect, it } from 'vitest';
import { portfolioTheme } from '../astryx/portfolioTheme';

describe('portfolioTheme', () => {
  it('maps the dark portfolio palette to Astryx semantic tokens', () => {
    const tokens = resolveThemeTokens(portfolioTheme, { mode: 'dark' });

    expect(tokens['--color-background-body']).toBe('#05070d');
    expect(tokens['--color-accent']).toBe('#60a5fa');
    expect(tokens['--color-text-primary']).toBe('#edf2ff');
  });

  it('maps the light portfolio palette to Astryx semantic tokens', () => {
    const tokens = resolveThemeTokens(portfolioTheme, { mode: 'light' });

    expect(tokens['--color-background-body']).toBe('#eef3fb');
    expect(tokens['--color-accent']).toBe('#2563eb');
  });

  it('uses JetBrains Mono for code typography', () => {
    const tokens = resolveThemeTokens(portfolioTheme, { mode: 'dark' });

    expect(tokens['--font-family-code']).toContain('JetBrains Mono');
  });
});
