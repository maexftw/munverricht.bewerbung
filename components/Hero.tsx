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
  { name: 'HTML5', src: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'GitHub', src: 'https://cdn.simpleicons.org/github/FFFFFF' },
  { name: 'Cloudflare', src: 'https://cdn.simpleicons.org/cloudflare/F38020' },
  { name: 'Webflow', src: 'https://cdn.simpleicons.org/webflow/146EF5' },
  { name: 'Stripe', src: 'https://cdn.simpleicons.org/stripe/635BFF' },
];

const quickActionLabels = {
  de: { resume: 'Lebenslauf', email: 'E-Mail', phone: 'Telefon', open: 'öffnen' },
  en: { resume: 'Resume', email: 'Email', phone: 'Phone', open: 'open' },
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
          {language === 'de' ? 'RECRUITER PROFIL // FRONTEND DEVELOPER & WEB DELIVERY' : 'RECRUITER PROFILE // FRONTEND DEVELOPER & WEB DELIVERY'}
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
        {language === 'de'
          ? 'Ich bin Frontend Developer mit 12+ Jahren Praxiserfahrung in Webdesign und Marketing. Mein Schwerpunkt liegt auf Websites, Prototypen und klaren digitalen Strecken, die verständlich aufgebaut sind, sauber live gehen und im Alltag nutzbar bleiben.'
          : 'I am a frontend developer with 12+ years of hands-on experience in web design and marketing. My focus is on websites, prototypes, and clear digital journeys that are easy to understand, go live cleanly, and stay practical in day-to-day use.'}
      </p>

      <div className="w-full max-w-4xl rounded-xl border border-neutral-800/80 bg-[#0f1118]/80 px-5 py-4">
        <div className="mono text-[10px] tracking-[0.22em] uppercase text-blue-400/90 mb-3">
          <ASCIIText text="// HIRING_SNAPSHOT" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
            <p className="mono text-[10px] uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {language === 'de' ? 'Standort' : 'Location'}
            </p>
            <p className="text-sm text-neutral-200">Dortmund, NRW</p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
            <p className="mono text-[10px] uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
              <Languages className="w-3.5 h-3.5" aria-hidden="true" /> {language === 'de' ? 'Sprachen' : 'Languages'}
            </p>
            <p className="text-sm text-neutral-200">German, English</p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
            <p className="mono text-[10px] uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
              <BriefcaseBusiness className="w-3.5 h-3.5" aria-hidden="true" /> {language === 'de' ? 'Arbeitsmodell' : 'Work model'}
            </p>
            <p className="text-sm text-neutral-200">Remote / Hybrid</p>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-3">
            <p className="mono text-[10px] uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
              <Clock3 className="w-3.5 h-3.5" aria-hidden="true" /> {language === 'de' ? 'Verfügbarkeit' : 'Availability'}
            </p>
            <p className="text-sm text-neutral-200">{language === 'de' ? 'Kurzfristig verfügbar' : 'Available at short notice'}</p>
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
              aria-label={`${action.label} ${quickActionLabels[language].open}`}
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
            <Terminal className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> {language === 'de' ? '01 / 12+ JAHRE PRAXIS' : '01 / 12+ YEARS EXPERIENCE'}
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">
            {language === 'de'
              ? 'Erfahrung aus Agentur-, KMU- und eigenen Projekten. Ich kenne enge Deadlines, Abstimmung mit Kunden und Übergaben, die im Live-Betrieb funktionieren müssen.'
              : 'Experience across agency, SME, and self-directed work. I know tight deadlines, client communication, and handovers that need to hold up in production.'}
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <Activity className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> {language === 'de' ? '02 / AKTUELLER FOKUS' : '02 / CURRENT FOCUS'}
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">
            {language === 'de'
              ? 'Aktuell arbeite ich vor allem mit React, Vite, TypeScript und Cloudflare. Ich bin besonders stark in Frontend-Umsetzung, Prototyping, Content-Struktur und schnellen Iterationen bis zur live nutzbaren Seite.'
              : 'I currently work mainly with React, Vite, TypeScript, and Cloudflare. I am strongest in frontend delivery, prototyping, content structure, and fast iterations through to a usable live site.'}
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <Zap className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> {language === 'de' ? '03 / HIRING RELEVANZ' : '03 / HIRING RELEVANCE'}
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">
            {language === 'de'
              ? 'Ich bringe technische Umsetzung und Marketing-Praxis zusammen. Das hilft bei klarer Nutzerführung, verständlicher Kommunikation und Seiten, die nicht nur gebaut, sondern auch eingesetzt werden können.'
              : 'I combine technical execution with marketing practice. That helps with clear user guidance, understandable messaging, and sites that are not just built but actually usable in a business context.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
