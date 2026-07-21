import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useTheme as useAstryxTheme } from '@astryxdesign/core/theme';
import { beforeEach, describe, expect, it } from 'vitest';
import { ThemeProvider, useTheme } from '../ThemeContext';

const ThemeProbe = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <output data-testid="legacy-theme">{theme}</output>
      <button type="button" onClick={toggleTheme}>toggle</button>
    </>
  );
};

const AstryxProbe = () => {
  const { mode, tokens } = useAstryxTheme();
  return (
    <>
      <output data-testid="astryx-theme">{mode}</output>
      <output data-testid="astryx-accent">{tokens['--color-accent']}</output>
    </>
  );
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
  delete document.documentElement.dataset.theme;
});

describe('ThemeProvider', () => {
  it('defaults to dark when no preference is saved', async () => {
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);

    expect(screen.getByTestId('legacy-theme')).toHaveTextContent('dark');
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('dark'));
  });

  it('starts in a saved light preference', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);

    await waitFor(() => expect(screen.getByTestId('legacy-theme')).toHaveTextContent('light'));
  });

  it('persists toggles and updates the document theme', async () => {
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));

    await waitFor(() => {
      expect(localStorage.getItem('theme')).toBe('light');
      expect(document.documentElement.dataset.theme).toBe('light');
    });
  });

  it('keeps a forced light theme immutable', () => {
    render(<ThemeProvider forcedTheme="light"><ThemeProbe /></ThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByTestId('legacy-theme')).toHaveTextContent('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('does not apply the portfolio Astryx theme unless explicitly requested', () => {
    const { container } = render(
      <ThemeProvider forcedTheme="light">
        <div data-testid="legacy-route">legacy route</div>
      </ThemeProvider>,
    );

    expect(container.querySelector('[data-astryx-theme]')).toBeNull();
  });

  it('provides the active mode to Astryx components', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeProvider withAstryx><AstryxProbe /></ThemeProvider>);

    await waitFor(() => {
      expect(screen.getByTestId('astryx-theme')).toHaveTextContent('light');
      expect(screen.getByTestId('astryx-accent')).toHaveTextContent('#2563eb');
    });
  });
});
