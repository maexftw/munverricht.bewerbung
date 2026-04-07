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
import { motion } from 'framer-motion';
import ASCIIText from './ASCIIText';
import { VSCodeIcon, GsapIcon } from './Icons';

type Language = 'de' | 'en';

type HeroProps = {
  language: Language;
};

const toolLogos = [
  { name: 'VS Code', Icon: VSCodeIcon },
  { name: 'React', src: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Tailwind', src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Vite', src: 'https://cdn.simpleicons.org/vite/646CFF' },
  { name: 'TypeScript', src: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'GSAP', Icon: GsapIcon },
  { name: 'Anime.js', src: 'https://animejs.com/favicon.svg' },
  { name: 'Cloudflare', src: 'https://cdn.simpleicons.org/cloudflare/F38020' },
];

const quickActionLabels = {
  de: { resume: 'Lebenslauf', email: 'E-Mail', phone: 'Telefon', open: 'öffnen' },
  en: { resume: 'Resume', email: 'Email', phone: 'Phone', open: 'open' },
};

const fieldNotes = {
  de: [
    {
      label: 'Standort',
      value: 'Dortmund, NRW',
      icon: MapPin,
    },
    {
      label: 'Sprachen',
      value: 'Deutsch, Englisch',
      icon: Languages,
    },
    {
      label: 'Arbeitsmodell',
      value: 'Remote / Hybrid',
      icon: BriefcaseBusiness,
    },
    {
      label: 'Verfügbarkeit',
      value: 'Kurzfristig verfügbar',
      icon: Clock3,
    },
  ],
  en: [
    {
      label: 'Location',
      value: 'Dortmund, NRW',
      icon: MapPin,
    },
    {
      label: 'Languages',
      value: 'German, English',
      icon: Languages,
    },
    {
      label: 'Work model',
      value: 'Remote / Hybrid',
      icon: BriefcaseBusiness,
    },
    {
      label: 'Availability',
      value: 'Available at short notice',
      icon: Clock3,
    },
  ],
};

const Hero: React.FC<HeroProps> = ({ language }) => {
  const headingBlockRef = useRef<HTMLDivElement | null>(null);
  const introTextRef = useRef<HTMLParagraphElement | null>(null);

  const recruiterQuickActions = [
    { label: quickActionLabels[language].resume, href: 'Maximilian_Unverricht_Resume.html', icon: Terminal },
    { label: quickActionLabels[language].email, href: 'mailto:info@graphiks.de', icon: Mail },
    { label: quickActionLabels[language].phone, href: 'tel:+491633229892', icon: Phone },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/maximilian-unverricht-590203392', icon: Linkedin, external: true },
    { label: 'GitHub', href: 'https://github.com/maexftw', icon: Github, external: true },
  ];

  useEffect(() => {
    const runningAnimations = [];

    if (headingBlockRef.current) {
      runningAnimations.push(
        animate(headingBlockRef.current, {
          translateY: [18, 0],
          opacity: [0, 1],
          duration: 950,
          ease: 'outQuad',
        }),
      );
    }

    if (introTextRef.current) {
      runningAnimations.push(
        animate(introTextRef.current, {
          translateY: [18, 0],
          opacity: [0, 1],
          delay: 120,
          duration: 800,
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
    <section id="hero" className="relative scroll-mt-28 pt-14 sm:pt-16">
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden border-b border-[color:var(--border-subtle)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent-color)_10%,var(--bg-color))_0%,var(--bg-color)_58%,color-mix(in_srgb,var(--bg-color)_86%,black)_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(circle_at_16%_22%,rgba(255,255,255,0.07),transparent_24%),radial-gradient(circle_at_74%_20%,rgba(96,165,250,0.18),transparent_26%),linear-gradient(120deg,transparent_0%,rgba(191,219,254,0.05)_24%,transparent_48%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(5,7,13,0.96),transparent)]" />

        <div className="relative mx-auto grid min-h-[100svh] max-w-6xl gap-12 px-4 pb-14 pt-20 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] lg:items-center lg:px-8 lg:pb-16">
          <div className="space-y-8">
            <div
              ref={headingBlockRef}
              className="space-y-5"
              style={{ transform: 'translateY(18px)', opacity: 0 }}
            >
              <p className="mono text-[11px] uppercase tracking-[0.36em] text-[color:var(--accent-soft)]">
                {language === 'de' ? 'RECRUITER PROFILE // FRONTEND, DELIVERY, LOCAL AI WORKFLOWS' : 'RECRUITER PROFILE // FRONTEND, DELIVERY, LOCAL AI WORKFLOWS'}
              </p>
              <h1 className="max-w-[10ch] text-5xl font-semibold leading-[0.88] tracking-[-0.075em] text-[color:var(--text-primary)] sm:text-6xl lg:text-[6rem]">
                MAXIMILIAN UNVERRICHT
              </h1>
              <p
                ref={introTextRef}
                className="max-w-[34rem] text-base leading-7 text-[color:var(--text-secondary)] sm:text-lg"
                style={{ transform: 'translateY(18px)', opacity: 0 }}
              >
                {language === 'de'
                  ? 'Ich verbinde Frontend-Umsetzung, Webdesign-Praxis und lokale LLM-Workflows in VS Code. Das Ergebnis sind keine abstrakten AI-Demos, sondern produktionsnahe Oberflächen, strukturierte Inhalte und echte Web-Deliverables.'
                  : 'I combine frontend delivery, web design practice, and local LLM workflows inside VS Code. The result is not abstract AI demos, but production-adjacent interfaces, structured content, and usable web deliverables.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:info@graphiks.de"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent-fill)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-contrast)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {language === 'de' ? 'Direkt kontaktieren' : 'Contact directly'}
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/webdesign"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface-1)]/45 px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] backdrop-blur-sm transition-colors hover:border-[color:var(--accent-border-strong)]"
              >
                {language === 'de' ? 'Webdesign-Unterseite' : 'Web design page'}
              </a>
            </div>

            <div className="grid gap-5 border-t border-[color:var(--border-subtle)] pt-7 sm:grid-cols-2 xl:grid-cols-4">
              {fieldNotes[language].map((note) => (
                <div key={note.label} className="space-y-3">
                  <p className="mono text-[10px] uppercase tracking-[0.26em] text-[color:var(--accent-soft)] flex items-center gap-2">
                    <note.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {note.label}
                  </p>
                  <p className="text-sm leading-6 text-[color:var(--text-secondary)]">{note.value}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.82, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative [perspective:1400px]"
          >
            <div className="relative [transform-style:preserve-3d]">
              <div className="pointer-events-none absolute inset-0 translate-x-6 translate-y-8 rounded-[2.4rem] border border-[color:var(--accent-border)] bg-[linear-gradient(140deg,rgba(37,99,235,0.12),rgba(15,23,42,0.04))] blur-[2px] [transform:translateZ(-90px)]" />
              <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.22),transparent_60%)] blur-3xl [transform:translateZ(-120px)]" />

              <div className="rounded-[2.4rem] border border-[color:var(--accent-border)] bg-[color:var(--surface-1)]/82 p-6 shadow-[0_30px_100px_rgba(4,8,18,0.34)] backdrop-blur-xl [transform:rotateX(9deg)_rotateY(-12deg)] [transform-style:preserve-3d] sm:p-7">
                <div className="grid gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[color:var(--border-subtle)] pb-4">
                      <div>
                        <p className="mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--accent-soft)]">Core stack</p>
                        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">VS Code, React, Vite, TypeScript, lokale Modelle</p>
                      </div>
                      <div className="h-12 w-12 rounded-full border border-[color:var(--accent-border)] bg-[radial-gradient(circle,rgba(96,165,250,0.3),transparent_70%)]" />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {toolLogos.map((tool) => (
                        <div key={tool.name} className="flex items-center gap-3 border-b border-[color:var(--border-subtle)] py-3 sm:border-b-0 sm:py-2">
                          {tool.Icon ? (
                            <tool.Icon className="h-4 w-4 text-[color:var(--text-secondary)]" aria-hidden="true" />
                          ) : (
                            <img
                              src={tool.src}
                              alt={tool.name}
                              className="h-4 w-4 object-contain"
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                          <span className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 border-t border-[color:var(--border-subtle)] pt-6 sm:grid-cols-2 lg:grid-cols-5">
                    {recruiterQuickActions.map((action) => (
                      <a
                        key={action.label}
                        href={action.href}
                        target={action.external ? '_blank' : undefined}
                        rel={action.external ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)]/42 px-4 py-3 text-sm text-[color:var(--text-secondary)] transition-colors hover:border-[color:var(--accent-border-strong)] hover:text-[color:var(--text-primary)]"
                        aria-label={`${action.label} ${quickActionLabels[language].open}`}
                      >
                        <action.icon className="h-4 w-4 text-[color:var(--accent-color)]" aria-hidden="true" />
                        <span className="mono text-[10px] uppercase tracking-[0.18em]">{action.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 border-t border-[color:var(--border-subtle)] pt-12 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center text-[color:var(--accent-color)] mono text-[10px] tracking-[0.2em] uppercase">
            <Terminal className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            {language === 'de' ? '12+ Jahre Praxis' : '12+ Years Practice'}
          </div>
          <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
            {language === 'de'
              ? 'Agentur-, KMU- und Projektpraxis mit engem Kundenkontakt, echten Deadlines und Launches, die im Alltag funktionieren müssen.'
              : 'Agency, SME, and project work with real client coordination, real deadlines, and launches that need to hold up in everyday use.'}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center text-[color:var(--accent-color)] mono text-[10px] tracking-[0.2em] uppercase">
            <Activity className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            {language === 'de' ? 'Heutiger Fokus' : 'Current Focus'}
          </div>
          <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
            {language === 'de'
              ? 'React, Vite, TypeScript und lokale Modell-Workflows in VS Code. Plattform-Erfahrung ist da, aber das eigentliche Profil liegt im produktiven Editor- und Delivery-Setup.'
              : 'React, Vite, TypeScript, and local model workflows in VS Code. Platform exposure exists, but the real profile sits in editor-first delivery and implementation.'}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center text-[color:var(--accent-color)] mono text-[10px] tracking-[0.2em] uppercase">
            <Zap className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
            {language === 'de' ? 'Warum das relevant ist' : 'Why This Matters'}
          </div>
          <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
            {language === 'de'
              ? 'Ich kombiniere Umsetzung, Designverständnis und KI-gestützte Arbeitsstrecken so, dass daraus reale Interfaces und belastbare Ergebnisse entstehen, nicht nur Präsentationsfolie.'
              : 'I combine implementation, design awareness, and AI-assisted workflows in a way that leads to real interfaces and reliable outcomes, not just presentation material.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
