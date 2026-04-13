import React, { useId, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { themeClasses } from './themeClasses';

type ShowcaseProject = {
  id: string;
  title: string;
  href: string;
  image: string;
  eyebrow: string;
  note: string;
  accent: string;
  accentText: string;
};

const showcaseProjects: ShowcaseProject[] = [
  {
    id: '01',
    title: 'Bockel & Bartscher',
    href: 'https://www.bockel-bartscher.de/',
    image: '/screenshots/bockel-bartscher.png',
    eyebrow: 'Kanzlei & Vertrauen',
    note: 'Ruhige Hierarchie, seriöser erster Eindruck, klare Kontaktführung.',
    accent: 'from-blue-300/80 via-sky-200/35 to-transparent',
    accentText: 'text-blue-600',
  },
  {
    id: '02',
    title: 'Fitnesscenter Drensteinfurt',
    href: 'https://fitnesscenter-drensteinfurt.de/',
    image: '/screenshots/fitnesscenter-drensteinfurt.png',
    eyebrow: 'Lokal & direkt',
    note: 'Leistung, Einstieg und Mobilansicht schnell erfassbar inszeniert.',
    accent: 'from-cyan-300/80 via-blue-200/35 to-transparent',
    accentText: 'text-cyan-600',
  },
  {
    id: '03',
    title: 'Kaffee Faensen',
    href: 'https://www.kaffee-faensen.de/shop/homepage',
    image: '/screenshots/kaffee-faensen.png',
    eyebrow: 'Marke & Shopgefühl',
    note: 'Produktatmosphäre und Orientierung bleiben auch im Bild sofort lesbar.',
    accent: 'from-amber-200/80 via-orange-200/35 to-transparent',
    accentText: 'text-amber-700',
  },
  {
    id: '04',
    title: 'KOST Sicherheitstechnik',
    href: 'https://kost-sicherheitstechnik.de/',
    image: '/screenshots/kost-sicherheitstechnik.png',
    eyebrow: 'Technik & Klarheit',
    note: 'Sachliche Oberfläche mit starker Struktur und glaubwürdiger Präsenz.',
    accent: 'from-emerald-200/80 via-teal-100/30 to-transparent',
    accentText: 'text-emerald-700',
  },
];

const spring = { stiffness: 140, damping: 18, mass: 0.5 };

const WebdesignShowcaseCard: React.FC<{ project: ShowcaseProject; index: number }> = ({ project, index }) => {
  const cardId = useId();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isActive, setIsActive] = useState(false);

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(32);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const depthRaw = useMotionValue(0);
  const driftXRaw = useMotionValue(0);
  const driftYRaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, spring);
  const rotateY = useSpring(rotateYRaw, spring);
  const depth = useSpring(depthRaw, { stiffness: 120, damping: 16, mass: 0.55 });
  const driftX = useSpring(driftXRaw, { stiffness: 120, damping: 18, mass: 0.45 });
  const driftY = useSpring(driftYRaw, { stiffness: 120, damping: 18, mass: 0.45 });

  const imageScale = useTransform(depth, [0, 1], [1, 1.08]);
  const imageY = useTransform(driftY, [-12, 12], [6, -6]);
  const captionY = useTransform(driftY, [-12, 12], [10, -10]);
  const headerY = useTransform(driftY, [-12, 12], [6, -6]);
  const shadowBlur = useTransform(depth, [0, 1], [28, 46]);
  const shadowLift = useTransform(depth, [0, 1], [14, 24]);

  const glare = useMotionTemplate`radial-gradient(circle at ${pointerX}% ${pointerY}%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.34) 18%, rgba(255,255,255,0.08) 34%, rgba(255,255,255,0) 58%)`;
  const frameShadow = useMotionTemplate`0 ${shadowLift}px ${shadowBlur}px rgba(37,99,235,0.16), 0 22px 52px rgba(15,23,42,0.14), inset 0 1px 0 rgba(255,255,255,0.82)`;

  const resetMotion = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    depthRaw.set(0);
    driftXRaw.set(0);
    driftYRaw.set(0);
    pointerX.set(50);
    pointerY.set(32);
    setIsActive(false);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const ratioX = x / bounds.width;
    const ratioY = y / bounds.height;
    const centeredX = ratioX - 0.5;
    const centeredY = ratioY - 0.5;

    rotateXRaw.set(centeredY * -10);
    rotateYRaw.set(centeredX * 12);
    depthRaw.set(1);
    driftXRaw.set(centeredX * 10);
    driftYRaw.set(centeredY * 8);
    pointerX.set(ratioX * 100);
    pointerY.set(ratioY * 100);
    setIsActive(true);
  };

  const cardLabelId = `${cardId}-title`;
  const cardNoteId = `${cardId}-note`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <a
        ref={cardRef}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-labelledby={cardLabelId}
        aria-describedby={cardNoteId}
        aria-label={`${project.title} im neuen Tab öffnen`}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetMotion}
        onFocus={resetMotion}
        onBlur={resetMotion}
        className="relative block aspect-[11/14] rounded-[1.55rem] outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 [perspective:1200px] focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef3fb]"
      >
        <motion.div
          style={{ rotateX, rotateY, boxShadow: frameShadow }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          className={`relative h-full overflow-hidden rounded-[1.55rem] [transform-style:preserve-3d] ${themeClasses.webPanelSoft}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-60`} aria-hidden="true" />

          <motion.div
            style={{ x: driftX, y: imageY, scale: imageScale, z: 0 }}
            className="absolute inset-[0.65rem] overflow-hidden rounded-[1.15rem] border border-white/60 bg-white [transform:translateZ(0)]"
          >
            <img
              src={project.image}
              alt={`${project.title} Screenshot der realen Website`}
              width={1320}
              height={1680}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.02)_0%,rgba(248,250,252,0)_18%,rgba(15,23,42,0.05)_60%,rgba(15,23,42,0.56)_100%)]" aria-hidden="true" />
            <motion.div
              style={{ backgroundImage: glare }}
              className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'opacity-80' : 'opacity-40'}`}
              aria-hidden="true"
            />
          </motion.div>

          <motion.div
            style={{ x: useTransform(driftX, (value) => value * -0.45), y: headerY, z: 50 }}
            className={`absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-3 ${themeClasses.webPill}`}
          >
            <span className="mono text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">Case {project.id}</span>
            <span className={`inline-flex items-center gap-1.5 ${themeClasses.webMeta} ${project.accentText}`}>
              Live view
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </motion.div>

          <motion.div
            style={{ x: useTransform(driftX, (value) => value * -0.72), y: captionY, z: 72 }}
            className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5"
          >
            <div className={`rounded-[1.1rem] p-4 sm:p-5 ${themeClasses.webCard}`}>
              <p className={`${themeClasses.webEyebrow} ${project.accentText}`}>{project.eyebrow}</p>
              <h3 id={cardLabelId} className="mt-2 text-balance text-[1.15rem] font-semibold leading-tight text-slate-900 sm:text-[1.28rem]">
                {project.title}
              </h3>
              <p id={cardNoteId} className="mt-2 max-w-[28ch] text-sm leading-relaxed text-slate-600">
                {project.note}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </a>
    </motion.article>
  );
};

const WebdesignShowcase: React.FC = () => {
  return (
    <section id="webdesign-showcase" className="relative scroll-mt-28 py-10 sm:py-16 lg:py-18">
      <div className="absolute left-[6%] top-10 hidden h-32 w-32 rounded-full bg-blue-200/40 blur-3xl lg:block" aria-hidden="true" />
      <div className="absolute right-[4%] top-24 hidden h-40 w-40 rounded-full bg-cyan-100/60 blur-3xl lg:block" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-[1.4rem] px-5 py-6 sm:px-7 sm:py-8 md:px-9 ${themeClasses.webPanel}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_42%)]" aria-hidden="true" />
        <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:items-start xl:gap-10">
          <div className="space-y-5 text-left">
            <div className="space-y-3">
              <p className={themeClasses.webEyebrow}>
                <ASCIIText text="// SELECTED_WEBDESIGN_CASES" noWrap={false} enableHover={false} />
              </p>
              <h2 className="max-w-[13ch] text-balance text-3xl font-bold uppercase tracking-[0.035em] text-slate-900 sm:text-4xl md:text-[2.95rem] md:leading-[0.98]">
                Wirkung zuerst. Die Technik bleibt im Hintergrund.
              </h2>
            </div>

            <p className="max-w-[36ch] text-base leading-7 text-slate-600 sm:text-[1.02rem] sm:leading-7">
              Vier reale Projekte, als ruhige Glasflächen inszeniert: weniger erklären, mehr sofort sehen, wie Markenbild, Struktur und Vertrauen auf der fertigen Seite zusammenkommen.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className={`rounded-[1rem] px-4 py-4 sm:px-5 ${themeClasses.webCard}`}>
                <p className={themeClasses.webEyebrow}>Ruhige Präsentation</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Reale Website-Captures stehen im Vordergrund. Bewegung und Lichteffekte unterstützen nur noch die Orientierung.
                </p>
              </div>
              <div className={`rounded-[1rem] px-4 py-4 sm:px-5 ${themeClasses.webCard}`}>
                <p className={themeClasses.webEyebrow}>Lebendige Interaktion</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Tiefenwirkung, Lichtreflexe und subtile Bewegung unterstützen den Eindruck, statt das Layout zu überladen.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {showcaseProjects.map((project, index) => (
              <WebdesignShowcaseCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WebdesignShowcase;
