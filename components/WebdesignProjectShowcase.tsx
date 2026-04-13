import React, { useId, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
    image: '/screenshots/bockel-bartscher.png',
    eyebrow: 'Kanzlei & Vertrauen',
    strapline: 'Serioes im ersten Blick, klar im naechsten Schritt.',
    note: 'Die Seite setzt auf Ruhe, Weissraum und eine direkte Ansprache, damit Vertrauen entsteht, bevor Details erklaert werden muessen.',
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
    eyebrow: 'Marke & Shopgefuehl',
    strapline: 'Waerme, Herkunft und Produktnaehe in einem ruhigen Shopbild.',
    note: 'Das Erscheinungsbild traegt die Marke, ohne den Weg zum Produkt zu verdecken. Atmosphaere und Kaufimpuls bleiben gleichzeitig sichtbar.',
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
    strapline: 'Kompetenz sichtbar machen, ohne technisch kuehl zu wirken.',
    note: 'Die Oberflaeche ordnet Leistungen sauber, wirkt belastbar und laesst technische Inhalte verstaendlich erscheinen statt schwer zugaenglich.',
    accent: {
      glow: 'bg-emerald-100/80',
      tint: 'from-emerald-200/80 via-teal-100/30 to-transparent',
      badge: 'text-emerald-700',
    },
  },
];

const cardSpring = { stiffness: 170, damping: 20, mass: 0.55 };

const WebdesignProjectCard: React.FC<{ project: WebdesignProject; index: number }> = ({ project, index }) => {
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
  const shadowBlur = useTransform(lift, [0, 1], [42, 60]);
  const cardShadow = useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(37,99,235,0.16), 0 28px 60px rgba(15,23,42,0.14), inset 0 1px 0 rgba(255,255,255,0.88)`;
  const glare = useMotionTemplate`radial-gradient(circle at ${pointerX}% ${pointerY}%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.44) 16%, rgba(255,255,255,0.10) 32%, rgba(255,255,255,0) 58%)`;

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
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={resetCard}
        onFocus={resetCard}
        onBlur={resetCard}
        className="group block rounded-[1.5rem] touch-manipulation outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 [perspective:1100px] focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        style={{ outlineOffset: '3px' }}
      >
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY, boxShadow: cardShadow }}
          className={`relative h-full overflow-hidden rounded-[1.5rem] [transform-style:preserve-3d] ${themeClasses.webPanelSoft}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent.tint} opacity-55`} aria-hidden="true" />

          <motion.div
            style={{ x: badgeX, y: badgeY }}
            className={`absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3 ${themeClasses.webPill}`}
          >
            <span className="mono text-[10px] uppercase tracking-[0.26em] text-slate-500">Case {project.id}</span>
            <span className={`inline-flex items-center gap-1.5 mono text-[10px] font-semibold uppercase tracking-[0.22em] ${project.accent.badge}`}>
              Live
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </motion.div>

          <div className="relative z-10 px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
            <motion.div
              style={{ x: screenshotX, y: screenshotY, scale: screenshotScale }}
              className={`relative overflow-hidden rounded-[1.15rem] ${themeClasses.webCard}`}
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/80 px-4 py-2.5" aria-hidden="true">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
                </div>
                <div className="rounded-full border border-slate-200/80 bg-white px-3 py-1 mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
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
                  style={{ backgroundImage: glare }}
                  className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-75' : 'opacity-35'}`}
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            <motion.div
              style={{ x: infoX, y: infoY }}
              className={`mt-4 rounded-[1.1rem] p-4 sm:p-5 ${themeClasses.webCard}`}
            >
              <p className={`${themeClasses.webEyebrow} ${project.accent.badge}`}>{project.eyebrow}</p>
              <h3 id={cardTitleId} className="mt-2 text-balance text-[1.16rem] font-semibold leading-tight text-slate-900 sm:text-[1.3rem]">
                {project.title}
              </h3>
              <p className="mt-2 max-w-[31ch] text-[0.96rem] leading-6 text-slate-700">
                {project.strapline}
              </p>
              <p id={cardNoteId} className="mt-3 max-w-[35ch] text-sm leading-relaxed text-slate-600">
                {project.note}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </a>
    </motion.article>
  );
};

const WebdesignProjectShowcase: React.FC = () => {
  return (
    <section id="webdesign-project-showcase" className="relative scroll-mt-28 py-4 sm:py-8 lg:py-10">
      <div className="absolute left-[4%] top-12 hidden h-32 w-32 rounded-full bg-blue-200/45 blur-3xl lg:block" aria-hidden="true" />
      <div className="absolute right-[3%] top-20 hidden h-44 w-44 rounded-full bg-cyan-100/65 blur-3xl lg:block" aria-hidden="true" />

      <div className="relative z-10">
        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {projects.map((project, index) => (
            <WebdesignProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebdesignProjectShowcase;
