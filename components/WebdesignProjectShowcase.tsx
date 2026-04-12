import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { themeClasses } from './themeClasses';

type WebdesignProject = {
  id: string;
  title: string;
  href: string;
  image: string;
  eyebrow: string;
  strapline: string;
  note: string;
  accent?: {
    glow: string;
    tint: string;
    badge: string;
  };
};

const projects: WebdesignProject[] = [
  {
    id: '01',
    title: 'Bockel & Bartscher',
    href: 'https://www.bockel-bartscher.de/',
    image: '/screenshots/bockel-bartscher.png',
    eyebrow: 'Kanzlei & Vertrauen',
    strapline: 'Serioes im ersten Eindruck, klar beim Kontakt.',
    note: 'Viel Weissraum, ruhige Farben und eine direkte Ansprache helfen dabei, Vertrauen schnell aufzubauen.',
    accent: {
      glow: 'bg-blue-200/65',
      tint: 'from-blue-300/70 via-sky-200/24 to-transparent',
      badge: 'text-blue-600',
    },
  },
  {
    id: '02',
    title: 'Fitnesscenter Drensteinfurt',
    href: 'https://fitnesscenter-drensteinfurt.de/',
    image: '/screenshots/fitnesscenter-drensteinfurt.png',
    eyebrow: 'Lokal & direkt',
    strapline: 'Angebote sehen, Kontakt finden, Probetraining anfragen.',
    note: 'Wichtige Infos liegen sofort offen, damit die Seite Besucher schnell zum naechsten Schritt fuehrt.',
    accent: {
      glow: 'bg-cyan-200/70',
      tint: 'from-cyan-300/70 via-blue-200/24 to-transparent',
      badge: 'text-cyan-600',
    },
  },
  {
    id: '03',
    title: 'Kaffee Faensen',
    href: 'https://www.kaffee-faensen.de/shop/homepage',
    image: '/screenshots/kaffee-faensen.png',
    eyebrow: 'Marke & Shopgefuehl',
    strapline: 'Marke zeigen und Produkte schnell erreichbar machen.',
    note: 'Die Seite verbindet Stimmung und Verkauf, ohne den Weg zum Produkt unnoetig lang zu machen.',
    accent: {
      glow: 'bg-amber-100/80',
      tint: 'from-amber-200/85 via-orange-100/30 to-transparent',
      badge: 'text-amber-700',
    },
  },
  {
    id: '04',
    title: 'KOST Sicherheitstechnik',
    href: 'https://kost-sicherheitstechnik.de/',
    image: '/screenshots/kost-sicherheitstechnik.png',
    eyebrow: 'Technik & Klarheit',
    strapline: 'Leistungen klar zeigen und Kompetenz sofort sichtbar machen.',
    note: 'Die Inhalte sind sauber geordnet, damit auch technische Themen leicht verstaendlich bleiben.',
    accent: {
      glow: 'bg-emerald-100/80',
      tint: 'from-emerald-200/80 via-teal-100/30 to-transparent',
      badge: 'text-emerald-700',
    },
  },
];

const WebdesignProjectCard: React.FC<{ project: WebdesignProject; index: number }> = ({ project, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className={`pointer-events-none absolute -top-6 right-4 h-20 w-20 rounded-full blur-3xl ${project.accent?.glow ?? 'bg-blue-200/60'}`} aria-hidden="true" />

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} im neuen Tab öffnen`}
        className="group block rounded-[1.5rem] touch-manipulation outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        style={{ outlineOffset: '3px' }}
      >
        <div className={`relative h-full overflow-hidden rounded-[1.5rem] ${themeClasses.webPanelSoft}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent?.tint ?? 'from-blue-300/70 via-sky-200/24 to-transparent'} opacity-55`} aria-hidden="true" />

          <div className={`absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3 ${themeClasses.webPill}`}>
            <span className="mono text-[10px] uppercase tracking-[0.26em] text-slate-500">Case {project.id}</span>
            <span className={`inline-flex items-center gap-1.5 ${themeClasses.webMeta} ${project.accent?.badge ?? 'text-blue-600'}`}>
              Live
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>

          <div className="relative z-10 px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
            <div className={`relative overflow-hidden rounded-[1.15rem] ${themeClasses.webCard}`}>
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/80 px-4 py-2.5" aria-hidden="true">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
                </div>
                <div className="rounded-full border border-slate-200/80 bg-white px-3 py-1 mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                  Live Ansicht
                </div>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <img
                  src={project.image}
                  alt={`${project.title} Screenshot der Website`}
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.02)_0%,rgba(248,250,252,0)_30%,rgba(15,23,42,0.05)_100%)]" aria-hidden="true" />
              </div>
            </div>

            <div className={`mt-4 rounded-[1.1rem] p-4 sm:p-5 ${themeClasses.webCard}`}>
              <p className={`${themeClasses.webEyebrow} ${project.accent?.badge ?? 'text-blue-600'}`}>{project.eyebrow}</p>
              <h3 className="mt-2 text-balance text-[1.16rem] font-semibold leading-tight text-slate-900 sm:text-[1.3rem]">
                {project.title}
              </h3>
              <p className="mt-2 max-w-[31ch] text-[0.96rem] leading-6 text-slate-700">
                {project.strapline}
              </p>
              <p className="mt-3 max-w-[35ch] text-sm leading-relaxed text-slate-600">
                {project.note}
              </p>
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
};

const WebdesignProjectShowcase: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="webdesign-project-showcase" className="relative scroll-mt-28 py-12 sm:py-16 lg:py-20">
      <div className="absolute left-[5%] top-14 hidden h-24 w-24 rounded-full bg-blue-100/28 blur-[84px] lg:block" aria-hidden="true" />
      <div className="absolute right-[4%] top-20 hidden h-32 w-32 rounded-full bg-sky-100/22 blur-[96px] lg:block" aria-hidden="true" />

      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.14 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-[1.5rem] px-5 py-6 sm:px-7 sm:py-8 md:px-9 ${themeClasses.webPanel}`}
        aria-labelledby="webdesign-showcase-title"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_42%)]" aria-hidden="true" />

        <div className="relative z-10 space-y-6 sm:space-y-8">
          <div className={`relative overflow-hidden rounded-[1.3rem] px-4 py-5 sm:px-6 sm:py-6 ${themeClasses.webPanelSoft}`}>
            <div className="pointer-events-none absolute inset-x-[14%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.36),transparent)]" aria-hidden="true" />
            <div className="relative z-10 space-y-5 sm:space-y-6">
              <p className={themeClasses.webEyebrow}>
                <ASCIIText text="// AUSGEWÄHLTE_PROJEKTE" noWrap={false} enableHover={false} revealOnMount={false} />
              </p>

              <div className="mx-auto max-w-3xl space-y-4 text-center">
                <h2 id="webdesign-showcase-title" className="mx-auto max-w-[15ch] text-balance text-3xl font-bold uppercase tracking-[0.035em] text-slate-900 sm:text-4xl md:text-[3rem] md:leading-[0.98]">
                  Vom Entwurf zum Live-Start
                </h2>
                <p className="mx-auto max-w-[44ch] text-base leading-7 text-slate-600 sm:text-[1.02rem] sm:leading-7">
                  Bei mir gibt es keine Platzhalter oder Design-Dummys, sondern echte Websites fuer den Unternehmensalltag.
                </p>
              </div>

              <div className="grid gap-3 text-left sm:grid-cols-2">
                <div className={`rounded-[1rem] px-4 py-4 sm:px-5 ${themeClasses.webCard}`}>
                  <p className={themeClasses.webEyebrow}>Reale Performance</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Alle gezeigten Seiten laufen live und sind fuer den echten Einsatz gebaut.
                  </p>
                </div>
                <div className={`rounded-[1rem] px-4 py-4 sm:px-5 ${themeClasses.webCard}`}>
                  <p className={themeClasses.webEyebrow}>Direkte Umsetzung</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    Ich uebernehme Konzept, Umsetzung, Veroeffentlichung und Hosting in einem durchgaengigen Ablauf.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {projects.map((project, projectIndex) => (
              <WebdesignProjectCard key={project.id} project={project} index={projectIndex} />
            ))}
          </div>
        </div>
      </motion.section>
    </section>
  );
};

export default WebdesignProjectShowcase;
