import React, { Suspense, lazy, useEffect, useState } from 'react';
import { resolveHeroExperienceMode } from './heroExperiencePolicy';

const HeroShaderScene = lazy(() => import('./HeroShaderScene'));

type HeroExperienceProps = {
  reducedMotion: boolean;
};

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const available = Boolean(context);
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    return available;
  } catch {
    return false;
  }
};

const getSaveDataPreference = () => {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(connection?.saveData);
};

const HeroExperience: React.FC<HeroExperienceProps> = ({ reducedMotion }) => {
  const [mode, setMode] = useState<'static' | 'shader'>('static');

  useEffect(() => {
    const updateMode = () => {
      const saveData = getSaveDataPreference();
      const viewportWidth = window.innerWidth;

      if (reducedMotion || saveData || viewportWidth < 900) {
        setMode('static');
        return;
      }

      setMode(resolveHeroExperienceMode({
        reducedMotion: false,
        saveData: false,
        viewportWidth,
        webglAvailable: hasWebGL(),
      }));
    };

    updateMode();
    window.addEventListener('resize', updateMode);
    return () => window.removeEventListener('resize', updateMode);
  }, [reducedMotion]);

  return (
    <div
      data-testid="hero-experience"
      aria-hidden="true"
      className="hero-experience pointer-events-none"
    >
      <div data-hero-poster className="hero-experience-poster" />
      {mode === 'shader' && (
        <div className="hero-experience-webgl">
          <Suspense fallback={null}>
            <HeroShaderScene />
          </Suspense>
        </div>
      )}
      <div data-code-material className="hero-code-material">
        <span>const build = evidence =&gt; preview</span>
        <span>guard(input) ?? handoff(review)</span>
        <span>{"deploy({ target: 'cloudflare', mode: 'preview' })"}</span>
        <span>test → inspect → refine → release</span>
      </div>
      <div className="hero-experience-scrim" />
    </div>
  );
};

export default HeroExperience;
