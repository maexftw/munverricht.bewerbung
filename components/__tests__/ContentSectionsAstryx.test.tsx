import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Evolution from '../Evolution';
import Hero from '../Hero';
import ShowcaseA from '../ShowcaseA';
import ShowcaseB from '../ShowcaseB';

vi.mock('animejs', () => ({
  animate: vi.fn(() => ({ cancel: vi.fn() })),
}));

describe('Astryx content sections', () => {
  it('uses Astryx layout, typography, cards, grids, and tokens in Hero without changing its public actions', () => {
    const { container } = render(<Hero language="en" />);

    expect(container.querySelector('section#hero')).toBeInTheDocument();
    expect(container.querySelectorAll('.astryx-stack').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.astryx-heading').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.astryx-text').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.astryx-card')).toHaveLength(7);
    expect(container.querySelectorAll('.astryx-grid').length).toBeGreaterThanOrEqual(3);
    expect(container.querySelectorAll('.astryx-token')).toHaveLength(12);
    expect(screen.getByText('// HIRING_SNAPSHOT')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Projects open/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /GitHub open/i })).toHaveAttribute('href', 'https://github.com/maexftw');
  });

  it('uses Astryx primitives for the career timeline while preserving its semantic list and bilingual claims', () => {
    const { container, rerender } = render(<Evolution language="de" />);

    expect(container.querySelector('section#evolution')).toBeInTheDocument();
    expect(container.querySelectorAll('ul > li')).toHaveLength(3);
    expect(container.querySelectorAll('.astryx-card')).toHaveLength(3);
    expect(container.querySelectorAll('.astryx-token')).toHaveLength(3);
    expect(container.querySelectorAll('.astryx-statusdot')).toHaveLength(3);
    expect(screen.getByText(/Seit 2013 arbeite ich mit Google Ads beziehungsweise AdWords und Analytics/)).toBeInTheDocument();

    rerender(<Evolution language="en" />);
    expect(screen.getByText(/I have worked with Google Ads or AdWords and Analytics since 2013/)).toBeInTheDocument();
  });

  it('wraps the RLC workflow in Astryx layout and status primitives without replacing its animated diagram', () => {
    const { container } = render(<ShowcaseA language="en" />);

    expect(container.querySelector('section#showcase-a')).toBeInTheDocument();
    expect(container.querySelectorAll('.astryx-grid').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll('.astryx-card').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelector('.astryx-statusdot')).toBeInTheDocument();
    expect(screen.getByText('PYTHON_CONTENT_SYNC')).toBeInTheDocument();
    expect(screen.getByText('03_VERIFY')).toBeInTheDocument();
    expect(screen.getByText(/LIVE \/ BUILD & RELEASE CHECKED/)).toBeInTheDocument();
  });

  it('uses Astryx cards, grid, tokens, and link for the agency and commerce cases while preserving the live URL', () => {
    const { container } = render(<ShowcaseB language="de" />);

    expect(container.querySelector('section#showcase-b')).toBeInTheDocument();
    expect(container.querySelectorAll('.astryx-grid').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll('.astryx-card')).toHaveLength(7);
    expect(container.querySelectorAll('.astryx-token')).toHaveLength(3);
    expect(container.querySelector('.astryx-link')).toBeInTheDocument();
    expect(screen.getByText('PHASE_01')).toBeInTheDocument();
    expect(screen.getByText('MANUAL_REVIEW')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Live ansehen/i })).toHaveAttribute(
      'href',
      'https://www.kaffee-faensen.de/shop/homepage',
    );
  });
});
