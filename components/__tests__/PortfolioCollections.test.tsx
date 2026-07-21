import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ContactShell from '../ContactShell';
import LegalInfo from '../LegalInfo';
import Projects from '../Projects';
import ScrollToTop from '../ScrollToTop';
import SkillMonitor from '../SkillMonitor';

describe('Astryx portfolio collections', () => {
  it('renders project cards with Astryx grid, cards, and tokens', () => {
    const { container } = render(<Projects language="de" />);

    expect(container.querySelector('.astryx-grid')).toBeInTheDocument();
    expect(container.querySelectorAll('.project-card-link')).toHaveLength(8);
    expect(container.querySelectorAll('.project-card-link[rel="noopener noreferrer"]')).toHaveLength(8);
    expect(container.querySelectorAll('.astryx-card')).toHaveLength(9);
    expect(container.querySelectorAll('.astryx-token').length).toBeGreaterThan(9);
  });

  it('renders skill groups with Astryx cards, tokens, and project-backed statuses', () => {
    const { container } = render(<SkillMonitor language="de" />);

    expect(container.querySelectorAll('.astryx-card')).toHaveLength(6);
    expect(container.querySelectorAll('.astryx-token').length).toBeGreaterThan(20);
    expect(container.querySelectorAll('.astryx-statusdot')).toHaveLength(6);
    expect(screen.getByText(/Google-Zertifizierungen von 2017 historisch/i)).toBeInTheDocument();
  });

  it('preserves direct contact and legal navigation through Astryx links', () => {
    const { container } = render(
      <>
        <ContactShell language="de" />
        <LegalInfo language="de" />
      </>,
    );

    expect(container.querySelectorAll('.astryx-link').length).toBeGreaterThanOrEqual(4);
    expect(screen.getByRole('link', { name: /info@munverricht.org/i })).toHaveAttribute(
      'href',
      'mailto:info@munverricht.org',
    );
    expect(screen.getByRole('link', { name: /\+49 163 3229892/i })).toHaveAttribute(
      'href',
      'tel:+491633229892',
    );
    expect(screen.getByRole('link', { name: 'Impressum' })).toHaveAttribute('href', '/impressum');
    expect(screen.getByRole('link', { name: 'Datenschutz' })).toHaveAttribute('href', '/datenschutz');
  });
});

describe('ScrollToTop', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 });
    window.scrollTo = vi.fn();
  });

  it('uses an Astryx icon button with the localized action', () => {
    const { container } = render(<ScrollToTop language="de" />);
    fireEvent.scroll(window);

    expect(container.querySelector('.astryx-button')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Zum Seitenanfang springen' }));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
