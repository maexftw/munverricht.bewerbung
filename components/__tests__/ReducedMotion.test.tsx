import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CodeAmbientBackground from '../CodeAmbientBackground';
import Evolution from '../Evolution';
import PixelCanvas from '../PixelCanvas';
import ScrollToTop from '../ScrollToTop';
import ShowcaseA from '../ShowcaseA';
import ShowcaseB from '../ShowcaseB';

const motionPreference = vi.hoisted(() => ({ reduced: false }));

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    useReducedMotion: () => motionPreference.reduced,
  };
});

const setReducedMotion = (matches: boolean) => {
  motionPreference.reduced = matches;
  vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

afterEach(() => setReducedMotion(false));

describe('reduced-motion canvas behavior', () => {
  it('does not initialize either continuous canvas animation', () => {
    setReducedMotion(true);
    const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext');
    getContext.mockClear();

    render(
      <div>
        <CodeAmbientBackground />
        <PixelCanvas ambient />
      </div>,
    );

    expect(getContext).not.toHaveBeenCalled();
    getContext.mockRestore();
  });

  it('freezes decorative loops and disables smooth imperative scrolling', () => {
    setReducedMotion(true);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 });
    window.scrollTo = vi.fn();

    const { container } = render(
      <>
        <ShowcaseA language="de" />
        <Evolution language="de" />
        <ShowcaseB language="de" />
        <ScrollToTop language="de" />
      </>,
    );

    expect(container.querySelector('#showcase-a .bg-blue-500.h-full.rounded-full')).toHaveStyle({ width: '85%' });
    expect(container.querySelectorAll('.motion-safe\\:animate-pulse')).toHaveLength(2);
    expect(container.querySelectorAll('.motion-safe\\:animate-spin-slow')).toHaveLength(1);

    fireEvent.scroll(window);
    fireEvent.click(screen.getByRole('button', { name: 'Zum Seitenanfang springen' }));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });
});
