import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import {
  Activity,
  BriefcaseBusiness,
  Clock3,
  Globe,
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
import { VSCodeIcon } from './Icons';

type Language = 'de' | 'en';

type HeroProps = {
  language: Language;
};

const simpleIconUrl = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`;

const toolLogos = [
  { name: 'VS Code', Icon: VSCodeIcon, badgeClassName: 'bg-sky-500/12 text-sky-300 border-sky-500/25' },
  { name: 'React', logoSrc: simpleIconUrl('react', '61DAFB'), badgeClassName: 'bg-cyan-500/12 border-cyan-500/25' },
  { name: 'Tailwind', logoSrc: simpleIconUrl('tailwindcss', '06B6D4'), badgeClassName: 'bg-teal-500/12 border-teal-500/25' },
  { name: 'Vite', logoSrc: simpleIconUrl('vite', '646CFF'), badgeClassName: 'bg-violet-500/12 border-violet-500/25' },
  { name: 'TypeScript', logoSrc: simpleIconUrl('typescript', '3178C6'), badgeClassName: 'bg-blue-500/12 border-blue-500/25' },
  { name: 'GSAP', logoSrc: simpleIconUrl('gsap', '88CE02'), badgeClassName: 'bg-emerald-500/12 border-emerald-500/25' },
  { name: 'Anime.js', logoSrc: simpleIconUrl('animedotjs', 'F7A8B8'), badgeClassName: 'bg-fuchsia-500/12 border-fuchsia-500/25' },
  { name: 'HTML5', logoSrc: simpleIconUrl('html5', 'E34F26'), badgeClassName: 'bg-orange-500/12 border-orange-500/25' },
  { name: 'GitHub', logoSrc: simpleIconUrl('github', 'FFFFFF'), badgeClassName: 'bg-slate-500/12 border-slate-500/25' },
  { name: 'Cloudflare', logoSrc: simpleIconUrl('cloudflare', 'F38020'), badgeClassName: 'bg-amber-500/12 border-amber-500/25' },
  { name: 'Webflow', logoSrc: simpleIconUrl('webflow', '4353FF'), badgeClassName: 'bg-indigo-500/12 border-indigo-500/25' },
  { name: 'Stripe', logoSrc: simpleIconUrl('stripe', '635BFF'), badgeClassName: 'bg-purple-500/12 border-purple-500/25' },
];

const quickActionLabels = {
  de: { resume: 'Lebenslauf', email: 'E-Mail', phone: 'Telefon', open: 'öffnen' },
  en: { resume: 'Resume', email: 'Email', phone: 'Phone', open: 'open' },
};

const webdesignQuickActionLabels: Record<Language, string> = {
  de: 'Webdesign',
  en: 'Web Design',
};

const Hero: React.FC<HeroProps> = ({ language }) => {
  const headingBlockRef = useRef<HTMLDivElement | null>(null);
  const introTextRef = useRef<HTMLParagraphElement | null>(null);

  const recruiterQuickActions = [
    { label: quickActionLabels[language].resume, href: 'Maximilian_Unverricht_Resume.html', icon: Terminal },
    { label: webdesignQuickActionLabels[language], href: '/webdesign', icon: Globe },
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
    <section id="hero" className="relative scroll-mt-28 w-full flex flex-col items-center pt-24 space-y-12 kinetic-grid">
      <div
        ref={headingBlockRef}
        className="w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left"
        style={{ transform: 'scale(0.95)', opacity: 0 }}
      >
        <div className="lg:col-span-8 flex flex-col items-start">
          <div className="inline-block px-3 py-1 mb-6 bg-[#2a2a2a]/60 border border-[#424754]/30 rounded">
            <span className="font-label text-xs text-[#adc6ff] uppercase tracking-[0.3em]">System.initialize()</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-[#e2e2e2] tracking-tighter leading-[0.95] mb-6">
            LOGIC <br/>
            <span className="text-[#adc6ff] text-glow">DRIVEN</span> <br/>
            EXCELLENCE
          </h1>

          <p
            ref={introTextRef}
            className="text-lg md:text-xl text-[#c2c6d6] leading-relaxed max-w-xl mb-8 font-body"
            style={{ transform: 'translateY(10px)', opacity: 0 }}
          >
            {language === 'de'
              ? 'Ich bin Frontend Developer mit 12+ Jahren Praxiserfahrung in Webdesign. Meine besondere Stärke liegt heute in lokalen LLM-Workflows in VS Code: Modelle lokal aufsetzen, agentisch fürs Coden nutzen und daraus Prototypen, strukturierte Inhalte und real nutzbare Ergebnisse bauen.'
              : 'I am a frontend developer with 12+ years of hands-on experience in web design. My distinctive strength today is local LLM workflows inside VS Code: setting up local models, using them for agentic coding, and turning that into prototypes, structured output, and real deliverables.'}
          </p>

          <div className="flex flex-wrap gap-4 font-headline">
            <a href="#projects" className="bg-gradient-to-r from-[#adc6ff] to-[#4d8eff] text-[#002e6a] hover:shadow-[0_0_20px_rgba(173,198,255,0.4)] px-8 py-4 rounded font-bold uppercase tracking-widest text-xs flex items-center gap-2.5 transition-all hover:-translate-y-1 active:translate-y-0 duration-300">
              {language === 'de' ? 'Projekte ansehen' : 'Explore Projects'}
              <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
            </a>
            <a href="#contact-shell" className="bg-[#2a2a2a]/80 text-[#adc6ff] border border-[#adc6ff]/10 hover:bg-[#353535] hover:border-[#adc6ff]/30 px-8 py-4 rounded font-bold uppercase tracking-widest text-xs transition-all hover:-translate-y-1 active:translate-y-0 duration-300">
              {language === 'de' ? 'Kontakt' : 'Contact'}
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:block">
          <div className="relative group overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#adc6ff]/20 to-[#7bd0ff]/20 blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative glass-card aspect-square rounded-xl p-6 flex flex-col justify-between border border-[#424754]/30 overflow-hidden">
              {/* Scanning Line */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="scan-line w-full opacity-35"></div>
              </div>
              
              {/* Header Status */}
              <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                  <span className="font-label text-[10px] text-[#adc6ff] tracking-[0.2em] font-bold">SYSTEM_MONITOR.v2</span>
                  <span className="font-label text-[8px] text-[#8c909f] font-bold">ID: 0x882_ALPHA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse"></div>
                  <span className="font-label text-[10px] text-[#adc6ff] font-bold">ACTIVE</span>
                </div>
              </div>

              {/* Middle: Data Streams */}
              <div className="flex-grow flex flex-col justify-center gap-6 z-10">
                <div className="space-y-4">
                  <div className="relative h-1.5 bg-[#353535] rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-[#adc6ff]/40 w-full data-stream"></div>
                    <div className="h-full bg-[#adc6ff] w-[75%] relative"></div>
                  </div>
                  <div className="relative h-1.5 bg-[#353535] rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-[#7bd0ff]/40 w-full data-stream" style={{ animationDelay: '-1.5s' }}></div>
                    <div className="h-full bg-[#7bd0ff] w-[45%] relative"></div>
                  </div>
                  <div className="relative h-1.5 bg-[#353535] rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-[#adc6ff]/40 w-full data-stream" style={{ animationDelay: '-0.7s' }}></div>
                    <div className="h-full bg-[#adc6ff] w-[90%] relative"></div>
                  </div>
                </div>

                {/* Small Terminal Readout */}
                <div className="bg-[#131313]/85 p-3 rounded border border-[#424754]/30 font-label text-[9px] text-[#8c909f] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#adc6ff]">&gt; EXECUTING_NODES:</span>
                    <span className="flicker-text text-[#e2e2e2]">4,192</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#adc6ff]">&gt; LATENCY_MS:</span>
                    <span className="flicker-text text-[#e2e2e2]" style={{ animationDelay: '1s' }}>0.004</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#adc6ff]">&gt; UPTIME_CYCLES:</span>
                    <span className="flicker-text text-[#e2e2e2]" style={{ animationDelay: '2s' }}>99.982</span>
                  </div>
                </div>
              </div>

              {/* Footer Checksum */}
              <div className="flex justify-between items-end z-10">
                <div className="flex flex-col">
                  <span className="font-label text-[8px] text-[#adc6ff]/60 uppercase tracking-widest font-bold">Checksum</span>
                  <div className="text-3xl font-headline font-bold text-[#e2e2e2] tracking-tighter flicker-text">
                    00101
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label text-[8px] text-[#8c909f] uppercase tracking-widest font-bold">Hex_Map</span>
                  <div className="font-label text-[10px] text-[#adc6ff] tabular-nums font-bold">0x4A : FF : C1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl rounded-xl border border-[#424754]/25 glass-card px-5 py-4">
        <div className="font-label text-[10px] tracking-[0.22em] uppercase text-[#adc6ff]/90 mb-3">
          <ASCIIText text="// HIRING_SNAPSHOT" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          <div className="rounded-lg border border-[#424754]/20 bg-[#131313]/60 p-3">
            <p className="font-label text-[10px] uppercase tracking-wider text-[#adc6ff] mb-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {language === 'de' ? 'Standort' : 'Location'}
            </p>
            <p className="text-sm text-[#e2e2e2] font-body">Dortmund, NRW</p>
          </div>
          <div className="rounded-lg border border-[#424754]/20 bg-[#131313]/60 p-3">
            <p className="font-label text-[10px] uppercase tracking-wider text-[#adc6ff] mb-2 flex items-center gap-2">
              <Languages className="w-3.5 h-3.5" aria-hidden="true" /> {language === 'de' ? 'Sprachen' : 'Languages'}
            </p>
            <p className="text-sm text-[#e2e2e2] font-body">German, English</p>
          </div>
          <div className="rounded-lg border border-[#424754]/20 bg-[#131313]/60 p-3">
            <p className="font-label text-[10px] uppercase tracking-wider text-[#adc6ff] mb-2 flex items-center gap-2">
              <BriefcaseBusiness className="w-3.5 h-3.5" aria-hidden="true" /> {language === 'de' ? 'Arbeitsmodell' : 'Work model'}
            </p>
            <p className="text-sm text-[#e2e2e2] font-body">Remote / Hybrid</p>
          </div>
          <div className="rounded-lg border border-[#424754]/20 bg-[#131313]/60 p-3">
            <p className="font-label text-[10px] uppercase tracking-wider text-[#adc6ff] mb-2 flex items-center gap-2">
              <Clock3 className="w-3.5 h-3.5" aria-hidden="true" /> {language === 'de' ? 'Verfügbarkeit' : 'Availability'}
            </p>
            <p className="text-sm text-[#e2e2e2] font-body">{language === 'de' ? 'Kurzfristig verfügbar' : 'Available at short notice'}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl rounded-xl border border-[#424754]/25 glass-card px-5 py-4">
        <div className="font-label text-[10px] tracking-[0.22em] uppercase text-[#adc6ff]/90 mb-3">
          <ASCIIText text="// TOOLING_STACK" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6">
          {toolLogos.map((tool) => (
            <div key={tool.name} className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-[#424754]/20 bg-[#131313]/60 hover:border-[#adc6ff]/60 transition-colors">
              {tool.Icon ? (
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${tool.badgeClassName}`}>
                  <tool.Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              ) : (
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${tool.badgeClassName}`}>
                  <img
                    src={tool.logoSrc}
                    alt=""
                    className="h-4 w-4 object-contain"
                    width="16"
                    height="16"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    aria-hidden="true"
                  />
                </span>
              )}
              <span className="font-label text-[10px] md:text-[11px] text-[#c2c6d6] group-hover:text-[#adc6ff] transition-colors">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl rounded-xl border border-[#adc6ff]/20 glass-card px-5 py-4 mt-4">
        <div className="font-label text-[10px] tracking-[0.22em] uppercase text-[#adc6ff]/90 mb-3">
          <ASCIIText text="// QUICK_RECRUITER_ACCESS" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {recruiterQuickActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#424754]/25 bg-[#131313]/80 px-3 py-3 text-sm text-[#e2e2e2] hover:border-[#adc6ff]/70 hover:text-white transition-colors"
              aria-label={`${action.label} ${quickActionLabels[language].open}`}
            >
              <action.icon className="w-4 h-4 text-[#adc6ff]" aria-hidden="true" />
              <span className="font-label text-[11px] uppercase tracking-wider">{action.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-24 text-left border-t border-[#424754]/20 pt-12">
        <div className="space-y-3">
          <div className="flex items-center text-[#adc6ff] font-label text-[10px] tracking-[0.05em] font-bold">
            <Terminal className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> {language === 'de' ? '01 / 12+ JAHRE PRAXIS' : '01 / 12+ YEARS EXPERIENCE'}
          </div>
          <p className="text-sm text-[#c2c6d6] leading-relaxed font-body">
            {language === 'de'
              ? 'Erfahrung aus Agentur-, KMU- und eigenen Projekten. Ich kenne enge Deadlines, Abstimmung mit Kunden und Übergaben, die im Live-Betrieb funktionieren müssen.'
              : 'Experience across agency, SME, and self-directed work. I know tight deadlines, client communication, and handovers that need to hold up in production.'}
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-[#adc6ff] font-label text-[10px] tracking-[0.05em] font-bold">
            <Activity className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> {language === 'de' ? '02 / AKTUELLER FOKUS' : '02 / CURRENT FOCUS'}
          </div>
          <p className="text-sm text-[#c2c6d6] leading-relaxed font-body">
            {language === 'de'
              ? 'Aktuell arbeite ich vor allem in VS Code mit React, Vite, TypeScript und lokalen LLM-Setups. Cloud-Erfahrung mit Google Cloud, AWS und Azure ist vorhanden, mein eigentlicher Schwerpunkt liegt aber klar auf lokaler Modellnutzung für agentisches Coden, Prototyping, strukturierte Generierung, Überarbeitung und Umsetzung.'
              : 'I currently work mainly in VS Code with React, Vite, TypeScript, and local LLM setups. I do have exposure to Google Cloud, AWS, and Azure, but my real specialization is clearly local model usage for agentic coding, prototyping, structured generation, refinement, and implementation.'}
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-[#adc6ff] font-label text-[10px] tracking-[0.05em] font-bold">
            <Zap className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> {language === 'de' ? '03 / HIRING RELEVANZ' : '03 / HIRING RELEVANCE'}
          </div>
          <p className="text-sm text-[#c2c6d6] leading-relaxed font-body">
            {language === 'de'
              ? 'Ich verbinde technische Umsetzung, Editor-Workflows und Marketing-Praxis. Dadurch entstehen keine abstrakten AI-Demos, sondern nachvollziehbare Arbeitsstrecken in VS Code, die zu testbaren Interfaces, belastbaren Inhalten und einsatzfähigen Ergebnissen führen.'
              : 'I combine technical execution, editor-based workflows, and marketing practice. The result is not abstract AI demo work, but practical VS Code workflows that lead to testable interfaces, reliable content, and usable outcomes.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
