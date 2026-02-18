import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { Terminal, Zap, Activity } from 'lucide-react';

const Hero: React.FC = () => {
  const headingBlockRef = useRef<HTMLDivElement | null>(null);
  const introTextRef = useRef<HTMLParagraphElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const runningAnimations = [];

    if (headingBlockRef.current) {
      runningAnimations.push(
        animate(headingBlockRef.current, {
          scale: [0.95, 1],
          opacity: [0, 1],
          duration: 800,
          ease: 'outQuad',
        }),
      );
    }

    if (introTextRef.current) {
      runningAnimations.push(
        animate(introTextRef.current, {
          translateY: [10, 0],
          opacity: [0, 1],
          delay: 200,
          duration: 700,
          ease: 'outQuad',
        }),
      );
    }

    if (ctaGroupRef.current) {
      runningAnimations.push(
        animate(ctaGroupRef.current, {
          translateY: [10, 0],
          opacity: [0, 1],
          delay: 400,
          duration: 700,
          ease: 'outQuad',
        }),
      );
    }

    return () => {
      runningAnimations.forEach((animation) => {
        animation.cancel();
      });
    };
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center space-y-8 pt-20">
      <div
        ref={headingBlockRef}
        className="relative"
        style={{ transform: 'scale(0.95)', opacity: 0 }}
      >
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full" aria-hidden="true" />
        <h2 className="mono text-blue-500 text-xs tracking-[0.4em] uppercase mb-4">
          AI WORKFLOW & WEB DELIVERY // PROFESSIONAL EXECUTION
        </h2>
        <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-[0.05em] leading-tight text-white mb-2">
          MAXIMILIAN <span className="text-blue-500">UNVERRICHT</span>
        </h1>
      </div>

      <p
        ref={introTextRef}
        className="max-w-[70ch] text-neutral-200 text-xl font-medium leading-relaxed"
        style={{ transform: 'translateY(10px)', opacity: 0 }}
      >
        Ich entwickle <span className="text-white">performante Websites und AI-gestützte Workflows</span> mit klarem Fokus auf Business-Impact: schnellere Umsetzung, saubere Übergaben und messbare Ergebnisse.
      </p>

      <div
        ref={ctaGroupRef}
        className="flex flex-wrap gap-4 justify-center mt-8"
        style={{ transform: 'translateY(10px)', opacity: 0 }}
      >
        <button
          onClick={() => document.getElementById('contact-shell')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative shadow-[0_0_30px_rgba(59,130,246,0.3)] px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 rounded shadow-lg font-bold uppercase tracking-wider text-sm flex items-center"
          aria-label="Kontakt aufnehmen"
        >
          Contact Me <Terminal className="ml-2 w-4 h-4" aria-hidden="true" />
        </button>

        <button
          onClick={() => document.getElementById('showcase-a')?.scrollIntoView({ behavior: 'smooth' })}
          className="group px-8 py-4 bg-neutral-900 border border-neutral-700 hover:border-blue-500 text-neutral-300 hover:text-white transition-all duration-300 rounded font-bold uppercase tracking-wider text-sm flex items-center"
          aria-label="Projekte ansehen"
        >
          View Projects <Activity className="ml-2 w-4 h-4 text-blue-500" aria-hidden="true" />
        </button>

        <a
          href="Maximilian_Unverricht_Resume.html"
          className="group px-8 py-4 bg-neutral-900 border border-neutral-700 hover:border-blue-500 text-neutral-300 hover:text-white transition-all duration-300 rounded font-bold uppercase tracking-wider text-sm flex items-center"
          aria-label="Lebenslauf herunterladen"
        >
          Download CV <span className="ml-2 text-blue-500">↓</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-24 text-left border-t border-neutral-900 pt-12">
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <Terminal className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> 01 / AI WORKFLOWS
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">Agentic Development mit Google AI Studio & Stitch. Schnelle Iterationen, präzise Resultate.</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <Activity className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> 02 / MODERN WEB
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">React, Vite, TypeScript. Performance-optimiert und barrierefrei für moderne Anforderungen.</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <Zap className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> 03 / MARKETING MINDSET
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">10 Jahre Erfahrung als selbstständiger Webdesigner. Fokus auf Conversion und User Experience.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
