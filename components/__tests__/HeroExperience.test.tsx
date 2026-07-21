import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeroExperience from '../HeroExperience';
import { resolveHeroExperienceMode } from '../heroExperiencePolicy';

describe('HeroExperience capability policy', () => {
  it('keeps reduced-motion and save-data visitors on the static composition', () => {
    expect(resolveHeroExperienceMode({ reducedMotion: true, saveData: false, viewportWidth: 1440, webglAvailable: true })).toBe('static');
    expect(resolveHeroExperienceMode({ reducedMotion: false, saveData: true, viewportWidth: 1440, webglAvailable: true })).toBe('static');
  });

  it('uses a deliberate static mobile tier and rejects unavailable WebGL', () => {
    expect(resolveHeroExperienceMode({ reducedMotion: false, saveData: false, viewportWidth: 390, webglAvailable: true })).toBe('static');
    expect(resolveHeroExperienceMode({ reducedMotion: false, saveData: false, viewportWidth: 1440, webglAvailable: false })).toBe('static');
  });

  it('enables the lazy shader only for an eligible full-motion desktop', () => {
    expect(resolveHeroExperienceMode({ reducedMotion: false, saveData: false, viewportWidth: 1440, webglAvailable: true })).toBe('shader');
  });
});

describe('HeroExperience static layer', () => {
  it('always renders an inert poster and never requests WebGL in reduced motion', () => {
    const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext');
    getContext.mockClear();

    const { container } = render(<HeroExperience reducedMotion />);

    const experience = screen.getByTestId('hero-experience');
    expect(experience).toHaveAttribute('aria-hidden', 'true');
    expect(experience).toHaveClass('pointer-events-none');
    expect(container.querySelector('[data-hero-poster]')).toBeInTheDocument();
    expect(container.querySelector('[data-code-material]')).toHaveTextContent('const build = evidence => preview');
    expect(container.querySelector('canvas')).toBeNull();
    expect(getContext).not.toHaveBeenCalled();

    getContext.mockRestore();
  });
});
