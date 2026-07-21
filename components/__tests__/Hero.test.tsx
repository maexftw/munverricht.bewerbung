import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Hero from '../Hero';

vi.mock('animejs', () => ({
  animate: vi.fn(() => ({ cancel: vi.fn() })),
}));

describe('Hero', () => {
  it('exposes the German recruiter snapshot', () => {
    render(<Hero language="de" />);

    expect(screen.getByText('// HIRING_SNAPSHOT')).toBeInTheDocument();
    expect(screen.getByText('// QUICK_RECRUITER_ACCESS')).toBeInTheDocument();
  });

  it('exposes the English recruiter profile and projects action', () => {
    render(<Hero language="en" />);

    expect(screen.getByText(/RECRUITER PROFILE/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Projects open/i })).toHaveAttribute('href', '#projects');
  });

  it('preserves recruiter contact and profile URLs', () => {
    render(<Hero language="en" />);

    expect(screen.getByRole('link', { name: /Resume open/i })).toHaveAttribute('href', 'Maximilian_Unverricht_Resume_2026.html');
    expect(screen.getByRole('link', { name: /Email open/i })).toHaveAttribute('href', 'mailto:info@munverricht.org');
    const phoneHref = screen.getByRole('link', { name: /Phone open/i }).getAttribute('href');
    expect(phoneHref).toMatch(/^tel:/);
    expect(phoneHref).toMatch(/9892$/);
    expect(screen.getByRole('link', { name: /LinkedIn open/i })).toHaveAttribute('href', 'https://linkedin.com/in/maximilian-unverricht-590203392');
    expect(screen.getByRole('link', { name: /GitHub open/i })).toHaveAttribute('href', 'https://github.com/maexftw');
  });
});
