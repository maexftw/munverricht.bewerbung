import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('Application Assembly & Component Rendering', () => {
  it('renders application with all core sections without crashing', () => {
    render(<App />);
    expect(screen.getAllByText('Maximilian Unverricht').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AI Workflow & Web Delivery Specialist').length).toBeGreaterThan(0);
    expect(screen.getByText('Über mich')).toBeInTheDocument();
    expect(screen.getByText('Skills & Tech Stack')).toBeInTheDocument();
    expect(screen.getByText('ASL Ademco B2B — AI-gestützter Produktberater & Planning Studio')).toBeInTheDocument();
  });

  it('renders interactive elements with touch-target utility', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    const touchTargetButtons = buttons.filter((b) => b.className.includes('touch-target'));
    expect(touchTargetButtons.length).toBeGreaterThan(0);
  });
});
