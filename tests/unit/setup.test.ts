import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../../src/App';

describe('Application Assembly & Component Rendering (TS)', () => {
  it('renders application with all core sections without crashing', () => {
    render(React.createElement(App));
    expect(screen.getAllByText('Maximilian Unverricht').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AI Workflow & Web Delivery Specialist').length).toBeGreaterThan(0);
    expect(screen.getByText('Über mich')).toBeInTheDocument();
  });

  it('renders interactive elements with touch-target utility', () => {
    render(React.createElement(App));
    const buttons = screen.getAllByRole('button');
    const touchTargetButtons = buttons.filter((b) => b.className.includes('touch-target'));
    expect(touchTargetButtons.length).toBeGreaterThan(0);
  });
});
