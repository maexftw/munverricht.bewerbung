import React, { useId, useState } from 'react';
import { motion } from 'framer-motion';
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
  accent: {
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
    image: '/screenshots/bockel-bartscher.webp',
    eyebrow: 'Kanzlei / Vertrauen zuerst',
    strapline: 'Aus fachlicher Information wurde ein ruhiger erster Eindruck mit klarer Kontaktfuehrung.',
    note: 'Leistungen, Haltung und Kontakt sind so geordnet, dass die Kanzlei zuerst serioes wirkt und dann verstaendlich wird.',
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
    image: '/screenshots/fitnesscenter-drensteinfurt.webp',
    eyebrow: 'Lokal / Einstieg ohne Suchen',
    strapline: 'Aus vielen Eindruecken wurde ein direkter Weg zur Anfrage oder zum Probetraining.',
    note: 'Angebot, Einstieg und Kontakt sind so sortiert, dass Besucher nicht erst suchen muessen, bevor sie handeln koennen.',
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
    image: '/screenshots/kaffee-faensen.webp',
    eyebrow: 'Marke / Produkt klar fuehren',
    strapline: 'Die Marke bleibt spuerbar, ohne Produkt und Kaufweg zu ueberdecken.',
    note: 'Atmosphaere, Sortiment und naechster Schritt bleiben gleichzeitig sichtbar, statt sich gegenseitig wegzudruecken.',
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
    image: '/screenshots/kost-sicherheitstechnik.webp',
    eyebrow: 'Technik / Kompetenz verstaendlich',
    strapline: 'Technische Leistungen werden klar, ohne an Seriositaet zu verlieren.',
    note: 'Die Seite ordnet Themen so, dass Kompetenz sichtbar bleibt und der Kontaktweg nicht unter technischen Details verschwindet.',
    accent: {
      glow: 'bg-emerald-100/80',
      tint: 'from-emerald-200/80 via-teal-100/30 to-transparent',
      badge: 'text-emerald-700',
    },
  },
];

const showcasePoints = ['4 reale Live-Projekte', 'Problem -> Loesung -> Ergebnis', 'Angebot und Kontakt klarer'];

const WebdesignProjectCard: React.FC<{ project: WebdesignProject; index: number }> = ({ project, index }) => {
  const [isHovering, setIsHovering] = useState(false);
  const cardTitleId = useId();
  const cardNoteId = `${cardTitleId}-note`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className={`pointer-events-none absolute -top-6 right-4 h-20 w-20 rounded-full blur-3xl ${project.accent.glow}`} aria-hidden="true" />

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-labelledby={cardTitleId}
        aria-describedby={cardNoteId}
        aria-label={`${project.title} im neuen Tab oeffnen`}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
        onFocus={() => setIsHovering(false)}
        onBlur={() => setIsHovering(false)}
        className="group block rounded-[1.35rem] touch-manipulation outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        style={{ outlineOffset: '3px' }}
      >
        <div className={`relative h-full overflow-hidden rounded-[1.35rem] ${themeClasses.webPanelSoft}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent.tint} opacity-35`} aria-hidden="true" />

          <div className="relative z-10 flex items-center justify-between gap-3 border-b border-slate-200/75 px-4 py-3 sm:px-5">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-slate-500">Case {project.id}</span>
            <span className={`inline-flex items-center gap-1.5 mono text-[10px] font-semibold uppercase tracking-[0.18em] ${project.accent.badge}`}>
              Live
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>

          <div className="relative z-10 px-4 pt-4 sm:px-5">
            <div className="relative overflow-hidden rounded-[1rem] border border-slate-200/75 bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/75 bg-slate-50/85 px-3 py-2 sm:px-4 sm:py-2.5" aria-hidden="true">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
                </div>
                <div className="hidden mono text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:block">Desktop Preview</div>
              </div>

              <div className="relative aspect-[16/9] overflow-hidden bg-white sm:aspect-[16/10]">
                <img
                  src={project.image}
                  alt={`${project.title} Screenshot der Website`}
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover object-top transition-transform duration-300 ${isHovering ? 'scale-[1.01]' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.02)_0%,rgba(248,250,252,0)_36%,rgba(15,23,42,0.04)_100%)]" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="relative z-10 space-y-3 px-4 py-4 sm:px-5 sm:py-5">
            <p className={`${themeClasses.webEyebrow} ${project.accent.badge}`}>{project.eyebrow}</p>
            <h3 id={cardTitleId} className="max-w-[24ch] text-balance text-[1.16rem] font-semibold leading-tight text-slate-900 sm:text-[1.3rem]">
              {project.title}
            </h3>
            <p className="max-w-[31ch] text-[0.95rem] leading-6 text-slate-700 sm:text-[0.96rem]">{project.strapline}</p>
            <p id={cardNoteId} className="max-w-[36ch] text-sm leading-relaxed text-slate-600">
              {project.note}
            </p>
          </div>
        </div>
      </a>
    </motion.article>
  );
};

const WebdesignProjectShowcase: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="webdesign-project-showcase" className="relative scroll-mt-24 py-10 sm:scroll-mt-36 sm:py-12 lg:py-10">
      <div className="absolute left-[4%] top-12 hidden h-32 w-32 rounded-full bg-blue-200/45 blur-3xl lg:block" aria-hidden="true" />
      <div className="absolute right-[3%] top-20 hidden h-44 w-44 rounded-full bg-cyan-100/65 blur-3xl lg:block" aria-hidden="true" />

      <div className="relative z-10 space-y-7 sm:space-y-8 lg:space-y-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,1.05fr)] lg:items-end lg:gap-6">
          <div className="space-y-3 text-left">
            <p className={themeClasses.webEyebrow}>
              <ASCIIText text="// AUSGEWAEHLTE_PROJEKTE" noWrap={false} enableHover={false} revealOnMount={false} />
            </p>
            <h2 className="max-w-[15ch] text-balance text-[1.9rem] font-bold uppercase tracking-[0.03em] text-slate-900 sm:max-w-[16ch] sm:text-[2.25rem] sm:leading-[0.96] lg:max-w-[17ch] lg:text-[2.45rem]">
              Reale Projekte, die Angebot und Kontakt klarer machen.
            </h2>
          </div>

          <div className="space-y-4 text-left">
            <p className="max-w-[60ch] text-[0.98rem] leading-7 text-slate-600 sm:text-[1rem] sm:leading-8">
              Diese Beispiele zeigen keine Designuebungen, sondern wie aus unklaren oder ueberladenen Seiten verstaendliche Firmenauftritte werden.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2.5" aria-label="Einordnung der Projektbeispiele">
              {showcasePoints.map((point) => (
                <li key={point} className="inline-flex items-center gap-2 text-sm text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                  <span className="mono text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-[11px]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {projects.map((project, index) => (
            <div key={project.id} className={index >= 2 && !isExpanded ? 'hidden sm:block' : ''}>
              <WebdesignProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        {projects.length > 2 && (
          <div className="sm:hidden">
            <button type="button" onClick={() => setIsExpanded((current) => !current)} className={`${themeClasses.webButtonSecondary} w-full`}>
              <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>
                {isExpanded ? 'Weniger Projekte anzeigen' : 'Weitere Projekte anzeigen'}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WebdesignProjectShowcase;
