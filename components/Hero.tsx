import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import {
  Activity,
  Bot,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import ASCIIText from './ASCIIText';
import { VSCodeIcon, GsapIcon } from './Icons';

const toolLogos = [
  { name: 'VS Code', Icon: VSCodeIcon },
  { name: 'Cline', Icon: Bot },
  { name: 'Roo Code', src: 'https://raw.githubusercontent.com/RooCodeInc/Roo-Code/main/assets/logo.png' },
  { name: 'Google Stitch', Icon: Sparkles },
  { name: 'React', src: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Tailwind', src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Vite', src: 'https://cdn.simpleicons.org/vite/646CFF' },
  { name: 'TypeScript', src: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'GSAP', Icon: GsapIcon },
  { name: 'Anime.js', src: 'https://animejs.com/favicon.svg' },
  { name: 'HTML5', src: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'GitHub', src: 'https://cdn.simpleicons.org/github/FFFFFF' },
  { name: 'Cloudflare', src: 'https://cdn.simpleicons.org/cloudflare/F38020' },
  { name: 'WordPress', src: 'https://cdn.simpleicons.org/wordpress/21759B' },
  { name: 'Webflow', src: 'https://cdn.simpleicons.org/webflow/146EF5' },
  { name: 'Stripe', src: 'https://cdn.simpleicons.org/stripe/635BFF' },
];

const scrollToId = (id: string) => {
  const target = document.getElementById(id) ?? document.querySelector(`#${id}`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

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
    <section id="hero" className="relative scroll-mt-28 flex flex-col items-center justify-center text-center space-y-8 pt-20">
      <div
        ref={headingBlockRef}
        className="relative"
        style={{ transform: 'scale(0.95)', opacity: 0 }}
      >
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full" aria-hidden="true" />
        <h2 className="mono text-blue-500 text-xs tracking-[0.4em] uppercase mb-4">
          MODERN WORKFLOW & WEB DELIVERY // PROFESSIONAL EXECUTION
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
        Ich entwickle <span className="text-white">performante Websites und moderne Workflows</span> mit klarem Fokus auf Business-Impact: schnellere Umsetzung, saubere Übergaben und messbare Ergebnisse.
      </p>

      <div className="w-full max-w-4xl rounded-xl border border-neutral-800/80 bg-[#0f1118]/80 px-5 py-4">
        <div className="mono text-[10px] tracking-[0.22em] uppercase text-blue-400/90 mb-3">
          <ASCIIText text="// TOOLING_STACK" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6">
          {toolLogos.map((tool) => (
            <div key={tool.name} className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-800 bg-neutral-950/60 hover:border-blue-500/60 transition-colors">
              {tool.Icon ? (
                <tool.Icon className="h-4 w-4 md:h-5 md:w-5 text-neutral-300 group-hover:text-blue-500 transition-colors" aria-hidden="true" />
              ) : (
                <img
                  src={tool.src}
                  alt={tool.name}
                  className="h-4 w-4 md:h-5 md:w-5 object-contain"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <span className="mono text-[10px] md:text-[11px] text-neutral-300 group-hover:text-blue-300 transition-colors">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={ctaGroupRef}
        className="flex flex-wrap gap-4 justify-center mt-8"
        style={{ transform: 'translateY(10px)', opacity: 0 }}
      >
        <button
          onClick={() => scrollToId('contact-shell')}
          className="group relative shadow-[0_0_30px_rgba(59,130,246,0.3)] px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 rounded shadow-lg font-bold uppercase tracking-wider text-sm flex items-center"
          aria-label="Kontakt aufnehmen"
        >
          Contact Me <Terminal className="ml-2 w-4 h-4" aria-hidden="true" />
        </button>

        <button
          onClick={() => scrollToId('projects')}
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
            <Terminal className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> 01 / MODERN WORKFLOWS
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">Effiziente Entwicklung über multiple IDEs (VS Code, Roo Code, Cline) und Advanced Pipelines. Dynamische Workflows statt starrer Prozesse.</p>
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
