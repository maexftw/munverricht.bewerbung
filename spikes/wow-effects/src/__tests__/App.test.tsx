import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../App';

vi.mock('../experiments/ShaderHero', () => ({
  ShaderHero: () => <div data-testid="shader-experiment" />,
}));

vi.mock('../experiments/SystemLandscape', () => ({
  SystemLandscape: () => <div data-testid="systems-experiment" />,
}));

vi.mock('../experiments/KineticType', () => ({
  KineticType: () => <div data-testid="type-experiment" />,
}));

describe('Wow Effects Lab', () => {
  it('switches between isolated experiments without mounting all render loops', async () => {
    render(<App />);

    expect(await screen.findByTestId('shader-experiment')).toBeInTheDocument();
    expect(screen.queryByTestId('systems-experiment')).not.toBeInTheDocument();
    expect(screen.queryByTestId('type-experiment')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /System Landscape/i }));
    expect(await screen.findByTestId('systems-experiment')).toBeInTheDocument();
    expect(screen.queryByTestId('shader-experiment')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Kinetic Type/i }));
    expect(await screen.findByTestId('type-experiment')).toBeInTheDocument();
    expect(screen.queryByTestId('systems-experiment')).not.toBeInTheDocument();
  });

  it('exposes framework labels and a route back to the portfolio', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'Zurück zum Portfolio' })).toHaveAttribute('href', '/');
    expect(screen.getByText('R3F + GLSL')).toBeInTheDocument();
    expect(screen.getByText('R3F + Drei')).toBeInTheDocument();
    expect(screen.getByText('p5.js Canvas')).toBeInTheDocument();
  });
});
