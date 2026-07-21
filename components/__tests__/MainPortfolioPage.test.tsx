import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MainPortfolioPage from '../MainPortfolioPage';

vi.mock('../TerminalBoot', () => ({ default: () => null }));
vi.mock('animejs', () => ({
  animate: vi.fn(() => ({ cancel: vi.fn() })),
  createTimeline: vi.fn(() => ({ add: vi.fn().mockReturnThis(), pause: vi.fn() })),
  stagger: vi.fn(() => 0),
}));

describe('MainPortfolioPage', () => {
  it('mounts the ambient canvas and main content layers', () => {
    const { container } = render(<MainPortfolioPage language="de" onLanguageChange={vi.fn()} />);

    expect(container.querySelector('.astryx-app-shell')).toBeInTheDocument();
    expect(container.querySelector('#code-ambient-canvas-container')).toBeInTheDocument();
    expect(container.querySelector('#main-content')).toBeInTheDocument();
  });

  it('keeps one non-interactive atmosphere beneath the content layer', () => {
    const { container } = render(<MainPortfolioPage language="de" onLanguageChange={vi.fn()} />);
    const atmosphere = container.querySelector('[data-portfolio-atmosphere]');
    const content = container.querySelector('#main-content');

    expect(atmosphere).toHaveAttribute('aria-hidden', 'true');
    expect(atmosphere).toHaveClass('pointer-events-none');
    expect(atmosphere?.querySelectorAll('#code-ambient-canvas-container')).toHaveLength(1);
    expect(atmosphere?.querySelectorAll('.scanline')).toHaveLength(1);
    expect(atmosphere?.querySelectorAll('.crt-overlay')).toHaveLength(1);
    expect(atmosphere?.compareDocumentPosition(content as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(content).toHaveClass('z-10');
  });

  it('renders exactly one controlled mobile dialog and trigger', () => {
    const { container } = render(<MainPortfolioPage language="de" onLanguageChange={vi.fn()} />);

    expect(container.querySelectorAll('dialog')).toHaveLength(1);
    expect(container.querySelectorAll('button[aria-label="Menü öffnen"]')).toHaveLength(1);
  });
});
