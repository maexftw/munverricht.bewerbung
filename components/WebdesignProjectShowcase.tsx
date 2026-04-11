import React, { useId, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
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

type ShowcaseVariant = {
  id: 'A' | 'B' | 'C';
  label: string;
  title: string;
  description: string;
  chip: string;
};

const projects: WebdesignProject[] = [
  {
    id: '01',
    title: 'Bockel & Bartscher',
    href: 'https://www.bockel-bartscher.de/',
    image: '/screenshots/bockel-bartscher.png',
    eyebrow: 'Kanzlei & Vertrauen',
    strapline: 'Seriös im ersten Blick, klar im nächsten Schritt.',
    note: 'Die Seite setzt auf Ruhe, Weißraum und eine direkte Ansprache, damit Vertrauen entsteht, bevor Details erklärt werden müssen.',
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
    strapline: 'Mehr Energie, weniger Umwege bis zum Probetraining.',
    note: 'Angebote, Einstieg und Kontakt liegen sofort offen, damit die Seite wie ein klarer Besuchsaufruf funktioniert statt wie ein Flyer im Web.',
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
    eyebrow: 'Marke & Shopgefühl',
    strapline: 'Wärme, Herkunft und Produktnähe in einem ruhigen Shopbild.',
    note: 'Das Erscheinungsbild trägt die Marke, ohne den Weg zum Produkt zu verdecken. Atmosphäre und Kaufimpuls bleiben gleichzeitig sichtbar.',
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
    strapline: 'Kompetenz sichtbar machen, ohne technisch kühl zu wirken.',
    note: 'Die Oberfläche ordnet Leistungen sauber, wirkt belastbar und lässt technische Inhalte verständlich erscheinen statt schwer zugänglich.',
    accent: {
      glow: 'bg-emerald-100/80',
      tint: 'from-emerald-200/80 via-teal-100/30 to-transparent',
      badge: 'text-emerald-700',
    },
  },
];

const showcaseVariants: ShowcaseVariant[] = [
  {
    id: 'A',
    label: 'Portfolio',
    title: 'Vom Entwurf zum Live-Start',
    description:
      'Handfeste Resultate statt leerer Layouts. Jedes dieser Projekte wurde mit dem Fokus auf maximale Ladegeschwindigkeit, perfekte mobile Darstellung und rechtliche Sicherheit umgesetzt – bereit für den echten Einsatz.',
    chip: 'Ausgewählte Projekte',
  },
];

const cardSpring = { stiffness: 170, damping: 20, mass: 0.55 };

const WebdesignProjectCard: React.FC<{
  project: WebdesignProject;
  index: number;
  variant: ShowcaseVariant['id'];
}> = ({ project, index, variant }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const cardTitleId = useId();
  const cardNoteId = `${cardTitleId}-note`;

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const driftXRaw = useMotionValue(0);
  const driftYRaw = useMotionValue(0);
  const liftRaw = useMotionValue(0);

  const tiltX = useSpring(tiltXRaw, cardSpring);
  const tiltY = useSpring(tiltYRaw, cardSpring);
  const driftX = useSpring(driftXRaw, { stiffness: 140, damping: 18, mass: 0.45 });
  const driftY = useSpring(driftYRaw, { stiffness: 140, damping: 18, mass: 0.45 });
  const lift = useSpring(liftRaw, { stiffness: 135, damping: 18, mass: 0.5 });

  const screenshotScale = useTransform(lift, [0, 1], [1, 1.03]);
  const screenshotX = useTransform(driftX, [-14, 14], [-6, 6]);
  const screenshotY = useTransform(driftY, [-12, 12], [4, -4]);
  const infoX = useTransform(driftX, (value) => value * -0.5);
  const infoY = useTransform(driftY, (value) => value * -0.55);
  const badgeX = useTransform(driftX, (value) => value * -0.2);
  const badgeY = useTransform(driftY, (value) => value * -0.18);
  const shadowX = useTransform(tiltY, [-14, 14], [8, -8]);
  const shadowY = useTransform(tiltX, [-14, 14], [20, 30]);
  const shadowBlur = useTransform(lift, [0, 1], [42, 65]);
  const liftZ = useTransform(lift, [0, 1], [0, 50]);
  const cardShadow =
    variant === 'B'
      ? useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(180,83,9,0.18), 0 28px 70px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,250,240,0.62)`
      : variant === 'C'
        ? useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(5,150,105,0.16), 0 24px 56px rgba(15,23,42,0.15), inset 0 1px 0 rgba(255,255,255,0.86)`
        : useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(37,99,235,0.16), 0 28px 60px rgba(15,23,42,0.14), inset 0 1px 0 rgba(255,255,255,0.88)`;
  const glare = useMotionTemplate`radial-gradient(circle at ${pointerX}% ${pointerY}%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.44) 16%, rgba(255,255,255,0.10) 32%, rgba(255,255,255,0) 58%)`;

  const focusOffset = variant === 'B' ? '#f5ede1' : variant === 'C' ? '#f2f4ee' : '#eef3fb';
  const cardSurfaceClassName =
    variant === 'B'
      ? 'border border-stone-300/90 bg-[linear-gradient(180deg,rgba(248,243,234,0.96),rgba(238,229,214,0.88))] shadow-[0_22px_44px_rgba(28,25,23,0.12),inset_0_1px_0_rgba(255,250,240,0.8)]'
      : variant === 'C'
        ? 'border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,252,0.94),rgba(240,245,237,0.88))] shadow-[0_20px_40px_rgba(15,23,42,0.09),inset_0_1px_0_rgba(255,255,255,0.86)]'
        : themeClasses.webPanelSoft;
  const imageFrameClassName =
    variant === 'B'
      ? 'relative overflow-hidden rounded-[0.55rem] border border-stone-900/10 bg-[#f8f3ea]'
      : variant === 'C'
        ? 'relative overflow-hidden rounded-[1.35rem] border border-emerald-950/8 bg-white'
        : `relative overflow-hidden rounded-[1.15rem] ${themeClasses.webCard}`;
  const infoPanelClassName =
    variant === 'B'
      ? 'mt-4 rounded-[0.7rem] border border-stone-900/10 bg-[#fcf8f1] p-4 sm:p-5'
      : variant === 'C'
        ? 'mt-4 rounded-[1.35rem] border border-white/80 bg-[rgba(255,255,252,0.9)] p-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] sm:p-5'
        : `mt-4 rounded-[1.1rem] p-4 sm:p-5 ${themeClasses.webCard}`;
  const badgeClassName =
    variant === 'B'
      ? 'absolute left-4 top-4 z-10 flex items-center justify-between gap-3 border border-stone-900/10 bg-[#fffaf1]/90 px-3 py-2'
      : variant === 'C'
        ? 'absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3 rounded-full border border-white/80 bg-[rgba(250,252,247,0.92)] px-3 py-2 shadow-[0_10px_20px_rgba(15,23,42,0.05)]'
        : `absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3 ${themeClasses.webPill}`;
  const titleClassName =
    variant === 'B'
      ? 'mt-2 text-balance font-bold uppercase tracking-[0.025em] text-[1.24rem] leading-[1] text-stone-900 sm:text-[1.45rem]'
      : variant === 'C'
        ? 'mt-2 text-balance text-[1.18rem] font-semibold leading-[1.02] text-slate-900 sm:text-[1.36rem]'
        : 'mt-2 text-balance text-[1.16rem] font-semibold leading-tight text-slate-900 sm:text-[1.3rem]';
  const straplineClassName =
    variant === 'B'
      ? 'mt-2 max-w-[28ch] text-[0.96rem] leading-6 text-stone-800'
      : variant === 'C'
        ? 'mt-2 max-w-[30ch] text-[0.98rem] leading-6 text-slate-800'
        : 'mt-2 max-w-[31ch] text-[0.96rem] leading-6 text-slate-700';
  const noteClassName =
    variant === 'B'
      ? 'mt-3 max-w-[34ch] text-sm leading-relaxed text-stone-600'
      : variant === 'C'
        ? 'mt-3 max-w-[35ch] text-sm leading-relaxed text-slate-600'
        : 'mt-3 max-w-[35ch] text-sm leading-relaxed text-slate-600';
  const browserBarClassName =
    variant === 'B'
      ? 'flex items-center justify-between gap-3 border-b border-stone-900/10 bg-[#efe5d3] px-4 py-3'
      : variant === 'C'
        ? 'flex items-center justify-between gap-3 border-b border-emerald-950/10 bg-[#f3f7ef] px-4 py-2.5'
        : 'flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/80 px-4 py-2.5';
  const previewLabelClassName =
    variant === 'B'
      ? 'border border-stone-900/10 bg-[#f9f4ea] text-stone-500'
      : variant === 'C'
        ? 'border border-emerald-900/10 bg-white text-emerald-800/70'
        : 'border border-slate-200/80 bg-white text-slate-400';

  const articleClassName =
    variant === 'B'
      ? 'relative sm:odd:translate-y-10'
      : variant === 'C'
        ? 'relative'
        : 'relative';
  const linkClassName =
    variant === 'B'
      ? 'group block rounded-[0.85rem] touch-manipulation outline-none transition-transform duration-200 ease-out hover:-translate-y-1 [perspective:1100px] focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2'
      : variant === 'C'
        ? 'group block rounded-[1.6rem] touch-manipulation outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 [perspective:1100px] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2'
        : 'group block rounded-[1.5rem] touch-manipulation outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 [perspective:1100px] focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2';
  const accentTintClassName =
    variant === 'B'
      ? 'bg-[linear-gradient(135deg,rgba(245,158,11,0.16),rgba(120,53,15,0.03)_40%,transparent_70%)]'
      : variant === 'C'
        ? 'bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(132,204,22,0.06)_42%,transparent_75%)]'
        : `bg-gradient-to-br ${project.accent?.tint ?? 'from-blue-300/70 via-sky-200/24 to-transparent'} opacity-55`;

  const resetCard = () => {
    tiltXRaw.set(0);
    tiltYRaw.set(0);
    driftXRaw.set(0);
    driftYRaw.set(0);
    liftRaw.set(0);
    pointerX.set(50);
    pointerY.set(50);
    setIsHovering(false);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const ratioX = relativeX / bounds.width;
    const ratioY = relativeY / bounds.height;
    const centerX = ratioX - 0.5;
    const centerY = ratioY - 0.5;

    tiltXRaw.set((0.5 - ratioY) * 10);
    tiltYRaw.set((ratioX - 0.5) * 10);
    driftXRaw.set(centerX * 9);
    driftYRaw.set(centerY * 7);
    liftRaw.set(1);
    pointerX.set(ratioX * 100);
    pointerY.set(ratioY * 100);
    setIsHovering(true);
  };

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={articleClassName}
    >
      <div className={`pointer-events-none absolute -top-6 right-4 h-20 w-20 rounded-full blur-3xl ${project.accent?.glow ?? 'bg-blue-200/60'}`} aria-hidden="true" />

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-labelledby={cardTitleId}
        aria-describedby={cardNoteId}
        aria-label={`${project.title} im neuen Tab öffnen`}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={resetCard}
        onFocus={resetCard}
        onBlur={resetCard}
        className={linkClassName}
        style={{ outlineOffset: '3px' }}
      >
        <motion.div
          style={shouldReduceMotion ? undefined : { 
            rotateX: tiltX, 
            rotateY: tiltY, 
            z: liftZ,
            boxShadow: cardShadow 
          }}
          className={`relative h-full overflow-hidden [transform-style:preserve-3d] ${variant === 'B' ? 'rounded-[0.85rem]' : 'rounded-[1.5rem]'} ${cardSurfaceClassName}`}
        >
          <div className={`absolute inset-0 ${accentTintClassName}`} aria-hidden="true" />

          <motion.div
            style={shouldReduceMotion ? undefined : { x: badgeX, y: badgeY }}
            className={badgeClassName}
          >
            <span className="mono text-[10px] uppercase tracking-[0.26em] text-slate-500">Case {project.id}</span>
            <span className={`inline-flex items-center gap-1.5 mono text-[10px] font-semibold uppercase tracking-[0.22em] ${project.accent?.badge ?? 'text-blue-600'}`}>
              Live
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </motion.div>

          <div className="relative z-10 px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
            <motion.div
              style={shouldReduceMotion ? undefined : { 
                x: screenshotX, 
                y: screenshotY, 
                z: 40, 
                scale: screenshotScale 
              }}
              className={imageFrameClassName}
            >
              <div className={browserBarClassName} aria-hidden="true">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
                </div>
                <div className={`rounded-full px-3 py-1 mono text-[10px] uppercase tracking-[0.22em] ${previewLabelClassName}`}>
                  Desktop Preview
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
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.02)_0%,rgba(248,250,252,0)_30%,rgba(15,23,42,0.05)_100%)]" aria-hidden="true" />
                <motion.div
                  style={shouldReduceMotion ? undefined : { backgroundImage: glare }}
                  className={`absolute inset-0 transition-opacity duration-300 ${isHovering && !shouldReduceMotion ? 'opacity-75' : 'opacity-35'}`}
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            <motion.div
              style={shouldReduceMotion ? undefined : { x: infoX, y: infoY }}
              className={infoPanelClassName}
            >
              <p className={`${themeClasses.webEyebrow} ${project.accent?.badge ?? 'text-blue-600'}`}>{project.eyebrow}</p>
              <h3 id={cardTitleId} className={titleClassName}>
                {project.title}
              </h3>
              <p className={straplineClassName}>
                {project.strapline}
              </p>
              <p id={cardNoteId} className={noteClassName}>
                {project.note}
              </p>

              {variant === 'C' ? (
                <div className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
                  <span className="rounded-full border border-emerald-900/10 bg-[#edf5eb] px-3 py-1 mono text-[10px] uppercase tracking-[0.22em] text-emerald-700">
                    Klarer Einstieg
                  </span>
                  <span className="rounded-full border border-slate-900/8 bg-white px-3 py-1 mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                    Reale Website
                  </span>
                </div>
              ) : null}
            </motion.div>
          </div>
        </motion.div>
      </a>
    </motion.article>
  );
};

const ShowcaseVariantSection: React.FC<{
  variant: ShowcaseVariant;
  index: number;
}> = ({ variant, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const isVariantA = variant.id === 'A';

  const sectionClassName =
    variant.id === 'B'
      ? 'relative overflow-hidden rounded-[1.4rem] border border-stone-300/80 bg-[linear-gradient(180deg,rgba(247,239,227,0.98),rgba(236,226,207,0.95))] px-5 py-6 shadow-[0_20px_50px_rgba(28,25,23,0.1)] sm:px-7 sm:py-8 md:px-9'
      : variant.id === 'C'
        ? 'relative overflow-hidden rounded-[1.6rem] border border-white/70 bg-[linear-gradient(180deg,rgba(250,251,245,0.95),rgba(238,244,234,0.9))] px-5 py-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:px-7 sm:py-8 md:px-9'
        : `relative overflow-hidden rounded-[1.5rem] px-5 py-6 sm:px-7 sm:py-8 md:px-9 ${themeClasses.webPanel}`;
  const headingClassName =
    variant.id === 'B'
      ? 'max-w-[12ch] text-balance text-[2.15rem] font-black uppercase tracking-[0.02em] leading-[0.92] text-stone-900 sm:text-[2.8rem]'
      : variant.id === 'C'
        ? 'max-w-[14ch] text-balance text-3xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-[2.7rem] sm:leading-[0.96]'
        : 'max-w-[13ch] text-balance text-3xl font-bold uppercase tracking-[0.035em] text-slate-900 sm:text-4xl md:text-[3rem] md:leading-[0.98]';
  const bodyClassName =
    variant.id === 'B'
      ? 'max-w-[38ch] text-[1rem] leading-7 text-stone-700'
      : variant.id === 'C'
        ? 'max-w-[40ch] text-base leading-7 text-slate-700'
        : 'max-w-[44ch] text-base leading-7 text-slate-600 sm:text-[1.02rem] sm:leading-7';
  const sideColumnClassName =
    variant.id === 'B'
      ? 'min-w-0 space-y-6 text-left xl:pr-8'
      : isVariantA
        ? 'mx-auto flex min-w-0 max-w-4xl flex-col items-center space-y-5 text-center'
        : 'min-w-0 space-y-5 text-left xl:sticky xl:top-28';
  const gridClassName =
    variant.id === 'A'
      ? 'grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6'
      : variant.id === 'B'
        ? 'grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6'
        : 'grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 sm:gap-6';
  const pillClassName =
    variant.id === 'B'
      ? 'inline-flex items-center gap-2 border border-stone-900/10 bg-[#fff8ec] px-3 py-2'
      : variant.id === 'C'
        ? 'inline-flex items-center gap-2 rounded-full border border-white/80 bg-[rgba(252,253,248,0.92)] px-3 py-2 shadow-[0_10px_20px_rgba(15,23,42,0.04)]'
        : `inline-flex items-center gap-2 ${themeClasses.webPill}`;
  const metaPanelClassName =
    variant.id === 'B'
      ? 'grid gap-3 border-l border-stone-900/10 pl-4'
      : variant.id === 'C'
        ? 'grid gap-3 sm:grid-cols-2 xl:grid-cols-1'
        : 'grid gap-3 sm:grid-cols-2 xl:grid-cols-1';
  const introShellClassName = isVariantA
    ? `relative overflow-hidden rounded-[1.3rem] px-4 py-5 sm:px-6 sm:py-6 ${themeClasses.webPanelSoft}`
    : '';
  const introMetaCardClassName = isVariantA
    ? `rounded-[1rem] px-4 py-4 sm:px-5 ${themeClasses.webCard}`
    : '';

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={sectionClassName}
      aria-labelledby={`showcase-variant-${variant.id}`}
    >
      <div
        className={
          variant.id === 'B'
            ? 'pointer-events-none absolute inset-x-0 top-0 h-20 bg-[repeating-linear-gradient(90deg,rgba(120,53,15,0.06)_0,rgba(120,53,15,0.06)_1px,transparent_1px,transparent_24px)]'
            : variant.id === 'C'
              ? 'pointer-events-none absolute right-8 top-8 h-28 w-28 rounded-full border border-emerald-300/40 bg-[rgba(255,255,255,0.32)] blur-2xl'
              : 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_42%)]'
        }
        aria-hidden="true"
      />

      <div className={`relative z-10 ${isVariantA ? 'space-y-6 sm:space-y-8' : `grid gap-8 ${variant.id === 'B' ? 'xl:grid-cols-[minmax(16rem,0.58fr)_minmax(0,1.42fr)] xl:items-start xl:gap-12' : 'xl:grid-cols-[minmax(17rem,0.68fr)_minmax(0,1.32fr)] xl:items-start xl:gap-10'}`}`}>
        <div className={sideColumnClassName}>
          {isVariantA ? (
            <div className={introShellClassName}>
              <div className="pointer-events-none absolute inset-x-[14%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.36),transparent)]" aria-hidden="true" />
              <div className="relative z-10 space-y-5 sm:space-y-6">
                  <p className={themeClasses.webEyebrow}>
                    <ASCIIText text={`// ${variant.chip.toUpperCase().replace(/ /g, '_')}`} noWrap={false} enableHover={false} />
                  </p>

                <div className="mx-auto max-w-3xl space-y-4">
                  <h2 id={`showcase-variant-${variant.id}`} className={`${headingClassName} mx-auto max-w-[15ch] text-center`}>
                    {variant.title}
                  </h2>
                  <p className={`${bodyClassName} mx-auto text-center`}>
                    {variant.description}
                  </p>
                </div>

                <div className="grid gap-3 text-left sm:grid-cols-2">
                  <div className={introMetaCardClassName}>
                    <p className={themeClasses.webEyebrow}>Reale Performance</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      Keine Demo-Daten: Alle Cases sind optimiert für den produktiven Einsatz und echtes Ranking.
                    </p>
                  </div>
                  <div className={introMetaCardClassName}>
                    <p className={themeClasses.webEyebrow}>Direkte Umsetzung</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      Von der ersten Struktur bis zum kostenlosen Hosting übernehme ich den kompletten Prozess.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <p className={themeClasses.webEyebrow}>
                    <ASCIIText text={`// ${variant.chip.toUpperCase().replace(/ /g, '_')}`} noWrap={false} enableHover={false} />
                  </p>
                  <span className={pillClassName}>
                    <span className="mono text-[11px] uppercase tracking-[0.22em] text-slate-500">{variant.label}</span>
                  </span>
                </div>

                <h2 id={`showcase-variant-${variant.id}`} className={headingClassName}>
                  {variant.title}
                </h2>
              </div>

              <p className={bodyClassName}>{variant.description}</p>

              <div className={metaPanelClassName}>
                <div className={variant.id === 'B' ? '' : `rounded-[1rem] px-4 py-4 sm:px-5 ${variant.id === 'C' ? 'border border-white/80 bg-[rgba(255,255,255,0.78)]' : themeClasses.webCard}`}>
                  <p className={themeClasses.webEyebrow}>Vier reale Projekte</p>
                  <p className={variant.id === 'B' ? 'mt-2 text-sm leading-relaxed text-stone-600' : 'mt-2 text-sm leading-relaxed text-slate-600'}>
                    Inhalt und Projektlinks bleiben identisch, damit nur die Inszenierung verglichen wird.
                  </p>
                </div>
                <div className={variant.id === 'B' ? '' : `rounded-[1rem] px-4 py-4 sm:px-5 ${variant.id === 'C' ? 'border border-white/80 bg-[rgba(255,255,255,0.78)]' : themeClasses.webCard}`}>
                  <p className={themeClasses.webEyebrow}>Direkter Vergleich</p>
                  <p className={variant.id === 'B' ? 'mt-2 text-sm leading-relaxed text-stone-600' : 'mt-2 text-sm leading-relaxed text-slate-600'}>
                    Drei Richtungen, ein Inhalt: Editorial, assertiv und framing-orientiert direkt untereinander.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={gridClassName}>
          {projects.map((project, projectIndex) => (
            <WebdesignProjectCard key={`${variant.id}-${project.id}`} project={project} index={projectIndex} variant={variant.id} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const WebdesignProjectShowcase: React.FC = () => {
  return (
    <section id="webdesign-project-showcase" className="relative scroll-mt-28 py-12 sm:py-16 lg:py-20">
      <div className="absolute left-[5%] top-14 hidden h-24 w-24 rounded-full bg-blue-100/28 blur-[84px] lg:block" aria-hidden="true" />
      <div className="absolute right-[4%] top-20 hidden h-32 w-32 rounded-full bg-sky-100/22 blur-[96px] lg:block" aria-hidden="true" />

      <div className="relative z-10 space-y-8 lg:space-y-10">
        {showcaseVariants.map((variant, index) => (
          <ShowcaseVariantSection key={variant.id} variant={variant} index={index} />
        ))}
      </div>
    </section>
  );
};

export default WebdesignProjectShowcase;
