import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import {
  Activity,
  BriefcaseBusiness,
  Clock3,
  Github,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Terminal,
  Zap,
} from 'lucide-react';
import ASCIIText from './ASCIIText';
import { VSCodeIcon, GsapIcon } from './Icons';

const toolLogos = [
  { name: 'VS Code', Icon: VSCodeIcon },
  { name: 'React', src: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Tailwind', src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Vite', src: 'https://cdn.simpleicons.org/vite/646CFF' },
  { name: 'TypeScript', src: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'GSAP', Icon: GsapIcon },
  { name: 'Anime.js', src: 'https://animejs.com/favicon.svg' },
  { name: 'HTML5', src: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'GitHub', src: 'https://cdn.simpleicons.org/github/FFFFFF' },
  { name: 'Cloudflare', src: 'https://cdn.simpleicons.org/cloudflare/F38020' },
  { name: 'Webflow', src: 'https://cdn.simpleicons.org/webflow/146EF5' },
  { name: 'Stripe', src: 'https://cdn.simpleicons.org/stripe/635BFF' },
];

const recruiterQuickActions = [
  { label: 'Lebenslauf', href: 'Maximilian_Unverricht_Resume.html', icon: Terminal },
  { label: 'E-Mail', href: 'mailto:info@graphiks.de', icon: Mail },
  { label: 'Telefon', href: 'tel:+491633229892', icon: Phone },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/maximilian-unverricht-590203392', icon: Linkedin, external: true },
  { label: 'GitHub', href: 'https://github.com/maexftw', icon: Github, external: true },
];

const Hero: React.FC = () => {
  const headingBlockRef = useRef<HTMLDivElement | null>(null);
  const introTextRef = useRef<HTMLParagraphElement | null>(null);

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
          RECRUITER PROFIL // FRONTEND & MODERNE WEB-DELIVERY
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
        Ich bin <span className="text-white">Frontend & Modern Workflow Developer</span> mit 12+ Jahren Praxiserfahrung in Webdesign und Marketing.
        Für Hiring Teams bedeutet das: schnelle Umsetzung, saubere Übergaben und Websites, die nicht nur gut aussehen,
        sondern auch operativ und vertrieblich funktionieren.
      </p>

      <div className="w-full max-w-4xl rounded-xl border border-neutral-800/80 bg-[#0f1118]/80 px-5 py-4">
        <div className="mono text-[10px] tracking-[0.22em] uppercase text-blue-400/90 mb-3">
          <ASCIIText text="// HIRING_SNAPSHOT" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
            <p className="mono text-[10px] uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> Standort
            </p>
            <p className="text-sm text-neutral-200">Dortmund, NRW</p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
            <p className="mono text-[10px] uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
              <Languages className="w-3.5 h-3.5" aria-hidden="true" /> Sprachen
            </p>
            <p className="text-sm text-neutral-200">Deutsch, Englisch</p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
            <p className="mono text-[10px] uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
              <BriefcaseBusiness className="w-3.5 h-3.5" aria-hidden="true" /> Arbeitsmodell
            </p>
            <p className="text-sm text-neutral-200">Remote / Hybrid</p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
            <p className="mono text-[10px] uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
              <Clock3 className="w-3.5 h-3.5" aria-hidden="true" /> Verfügbarkeit
            </p>
            <p className="text-sm text-neutral-200">Kurzfristig verfügbar</p>
          </div>
        </div>
      </div>

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

      <div className="w-full max-w-4xl rounded-xl border border-blue-500/25 bg-[#0f1118]/75 px-5 py-4 mt-4">
        <div className="mono text-[10px] tracking-[0.22em] uppercase text-blue-400/90 mb-3">
          <ASCIIText text="// QUICK_RECRUITER_ACCESS" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {recruiterQuickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950/70 px-3 py-3 text-sm text-neutral-200 hover:border-blue-500/70 hover:text-white transition-colors"
              aria-label={`${action.label} öffnen`}
            >
              <action.icon className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span className="mono text-[11px] uppercase tracking-wider">{action.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-24 text-left border-t border-neutral-900 pt-12">
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <Terminal className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> 01 / 12+ JAHRE PRAXIS
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">Erfahrung aus Agentur-, KMU- und Self-Employed-Projekten. Ich kenne Delivery-Druck, Kundenkommunikation und saubere Live-Übergaben.</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <Activity className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> 02 / SCHNELLE UMSETZUNG
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">React, Vite, TypeScript sowie Cloudflare & Modern Workflows. Von Prototyp bis produktiver Seite mit Fokus auf Lesbarkeit, Performance und Conversion.</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <Zap className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> 03 / HIRING RELEVANZ
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">Ich verbinde technische Umsetzung mit Marketing-Logik: klare Nutzerführung, schnellere Iterationen und Inhalte, die Recruiter und Kunden sofort verstehen.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
