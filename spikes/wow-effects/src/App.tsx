import React, { Suspense, lazy, useEffect, useState } from 'react';

const ShaderHero = lazy(() => import('./experiments/ShaderHero').then((module) => ({ default: module.ShaderHero })));
const SystemLandscape = lazy(() => import('./experiments/SystemLandscape').then((module) => ({ default: module.SystemLandscape })));
const KineticType = lazy(() => import('./experiments/KineticType').then((module) => ({ default: module.KineticType })));

type ExperimentId = 'shader' | 'systems' | 'type';
type MotionMode = 'system' | 'full' | 'reduce';

type Experiment = {
  id: ExperimentId;
  index: string;
  label: string;
  framework: string;
  title: string;
  description: string;
  interaction: string;
};

const experiments: Experiment[] = [
  {
    id: 'shader',
    index: '01',
    label: 'Shader Hero',
    framework: 'R3F + GLSL',
    title: 'Luminous code membrane',
    description: 'Ein prozedurales Lichtfeld reagiert auf den Cursor und erzeugt räumliche Tiefe ohne 3D-Assets.',
    interaction: 'Bewegen: Lichtfeld verformen · Klicken: Impuls senden',
  },
  {
    id: 'systems',
    index: '02',
    label: 'System Landscape',
    framework: 'R3F + Drei',
    title: 'Projects as a living system',
    description: 'Portfolio-Projekte werden als vernetztes räumliches System statt als dekoratives 3D-Objekt inszeniert.',
    interaction: 'Bewegen: Perspektive · Node wählen: System fokussieren',
  },
  {
    id: 'type',
    index: '03',
    label: 'Kinetic Type',
    framework: 'p5.js Canvas',
    title: 'Language becomes material',
    description: 'Echte Begriffe aus dem Portfolio lösen sich unter dem Cursor in ein physikalisches Zeichenfeld auf.',
    interaction: 'Bewegen: Zeichen verdrängen · Gedrückt halten: Feld anziehen',
  },
];

const getInitialExperiment = (): ExperimentId => {
  const requested = new URLSearchParams(window.location.search).get('experiment');
  return experiments.some((experiment) => experiment.id === requested) ? requested as ExperimentId : 'shader';
};

const getInitialMotionMode = (): MotionMode => {
  const requested = new URLSearchParams(window.location.search).get('motion');
  return requested === 'full' || requested === 'reduce' ? requested : 'system';
};

const useReducedMotion = (mode: MotionMode) => {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (mode !== 'system') {
      setReduced(mode === 'reduce');
      return;
    }

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [mode]);

  return reduced;
};

const App: React.FC = () => {
  const [activeId, setActiveId] = useState<ExperimentId>(getInitialExperiment);
  const [motionMode, setMotionMode] = useState<MotionMode>(getInitialMotionMode);
  const reducedMotion = useReducedMotion(motionMode);
  const active = experiments.find((experiment) => experiment.id === activeId) ?? experiments[0];

  const selectExperiment = (id: ExperimentId) => {
    setActiveId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('experiment', id);
    window.history.replaceState({}, '', url);
  };

  const toggleMotion = () => {
    const nextMode: MotionMode = reducedMotion ? 'full' : motionMode === 'full' ? 'system' : 'full';
    setMotionMode(nextMode);
    const url = new URL(window.location.href);
    url.searchParams.set('motion', nextMode);
    window.history.replaceState({}, '', url);
  };

  return (
    <main className="lab-shell">
      <div className="lab-atmosphere" aria-hidden="true" />

      <header className="lab-header">
        <a className="lab-brand" href="/" aria-label="Zurück zum Portfolio">
          <span className="lab-brand-mark">MU</span>
          <span>
            <strong>WOW EFFECTS LAB</strong>
            <small>Code-first interaction experiments</small>
          </span>
        </a>
        <div className="lab-header-actions">
          <button type="button" className="lab-motion-toggle" onClick={toggleMotion}>
            {reducedMotion ? 'ENABLE MOTION' : motionMode === 'full' ? 'MOTION: FORCED ON' : 'MOTION: SYSTEM'}
          </button>
          <span className="lab-status"><i /> LIVE PROTOTYPE</span>
        </div>
      </header>

      <nav className="lab-tabs" aria-label="Experimente">
        {experiments.map((experiment) => (
          <button
            key={experiment.id}
            type="button"
            className={experiment.id === activeId ? 'is-active' : ''}
            onClick={() => selectExperiment(experiment.id)}
            aria-pressed={experiment.id === activeId}
          >
            <span>{experiment.index}</span>
            {experiment.label}
            <small>{experiment.framework}</small>
          </button>
        ))}
      </nav>

      <section className="lab-stage" aria-live="polite">
        <Suspense fallback={<div className="lab-loading">INITIALIZING EXPERIENCE LAYER…</div>}>
          {activeId === 'shader' && <ShaderHero reducedMotion={reducedMotion} />}
          {activeId === 'systems' && <SystemLandscape reducedMotion={reducedMotion} />}
          {activeId === 'type' && <KineticType reducedMotion={reducedMotion} />}
        </Suspense>

        <div className="lab-copy">
          <span className="lab-kicker">EXPERIMENT_{active.index} · {active.framework}</span>
          <h1>{active.title}</h1>
          <p>{active.description}</p>
          <span className="lab-hint">{reducedMotion ? 'Reduced Motion aktiv · statische Komposition' : active.interaction}</span>
        </div>

        <div className="lab-metrics" aria-label="Bewertungskriterien">
          <span><b>60</b> FPS TARGET</span>
          <span><b>0</b> EXTERNAL ASSETS</span>
          <span><b>AI</b> REPRODUCIBLE</span>
        </div>
      </section>

      <footer className="lab-footer">
        <span>ASTRYX = SYSTEM LAYER</span>
        <span>WEBGL / CANVAS = EXPERIENCE LAYER</span>
        <span>{reducedMotion ? 'MOTION REDUCED' : 'POINTER ACTIVE'}</span>
      </footer>
    </main>
  );
};

export default App;
