import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Navigation from '../Navigation';
import { ThemeProvider } from '../ThemeContext';

const renderNavigation = (language: 'de' | 'en' = 'de') => {
  const onLanguageChange = vi.fn();
  const result = render(
    <ThemeProvider>
      <Navigation language={language} onLanguageChange={onLanguageChange} />
    </ThemeProvider>,
  );
  return { ...result, onLanguageChange };
};

describe('Navigation', () => {
  it('uses Astryx navigation surfaces for desktop and mobile', () => {
    const { container } = renderNavigation();

    expect(container.querySelector('.astryx-top-nav')).toBeInTheDocument();
    expect(container.querySelector('.astryx-mobile-nav')).toBeInTheDocument();
  });

  it('preserves the five section anchors and resume link', () => {
    renderNavigation();

    expect(screen.getAllByRole('link', { name: 'Start' })[0]).toHaveAttribute('href', '#hero');
    expect(screen.getAllByRole('link', { name: 'Über mich' })[0]).toHaveAttribute('href', '#evolution');
    expect(screen.getAllByRole('link', { name: 'Projekte' })[0]).toHaveAttribute('href', '#projects');
    expect(screen.getAllByRole('link', { name: 'Skills' })[0]).toHaveAttribute('href', '#skill-monitor');
    expect(screen.getAllByRole('link', { name: 'Kontakt' })[0]).toHaveAttribute('href', '#contact-shell');
    expect(screen.getAllByRole('link', { name: /Lebenslauf/i })[0]).toHaveAttribute(
      'href',
      'Maximilian_Unverricht_Resume_2026.html',
    );
  });

  it('keeps the language and theme controls actionable', () => {
    const { onLanguageChange } = renderNavigation();

    fireEvent.click(screen.getByRole('button', { name: 'Switch to English' }));
    expect(onLanguageChange).toHaveBeenCalledWith('en');

    fireEvent.click(screen.getByRole('button', { name: 'Zu hellem Modus wechseln' }));
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
