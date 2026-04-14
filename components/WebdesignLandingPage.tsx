import React, { useEffect, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Activity, Clock3, Terminal, Zap, Shield, Globe, Cpu, ArrowRight, Mail, Phone } from 'lucide-react';
import ASCIIText from './ASCIIText';
import PixelCanvas from './PixelCanvas';
import PricingAsciiBox from './PricingAsciiBox';
import WebdesignProjectShowcase from './WebdesignProjectShowcase';
import WebdesignAboutSection from './WebdesignAboutSection';
import WebdesignIntakeForm from './WebdesignIntakeForm';
import WebdesignLegalFooter from './WebdesignLegalFooter';
import { themeClasses } from './themeClasses';

const technicalSpecs = [
  {
    name: 'Schnelle Ladezeiten',
    icon: Cpu,
    iconClassName: 'text-blue-600',
  },
  {
    name: 'Saubere Struktur',
    icon: Zap,
    iconClassName: 'text-sky-500',
  },
  {
    name: 'DSGVO-freundlich',
    icon: Shield,
    iconClassName: 'text-indigo-500',
  },
  {
    name: 'Mobil gut lesbar',
    icon: Globe,
    iconClassName: 'text-cyan-600',
  },
  {
    name: 'Direkter Kontakt',
    icon: Activity,
    iconClassName: 'text-teal-600',
  },
];

const offerHighlights = [
  {
    label: 'Hosting',
    title: 'inklusive',
    body: 'Onlinegang ohne Zusatzpaket.',
    icon: Globe,
    iconClassName: 'text-blue-500',
  },
  {
    label: 'Abstimmung',
    title: 'direkt mit mir',
    body: 'Kurze Wege, klare Absprachen.',
    icon: Activity,
    iconClassName: 'text-sky-500',
  },
  {
    label: 'Ziel',
    title: 'klar und vertrauenswürdig',
    body: 'Damit Besucher schneller anfragen.',
    icon: Zap,
    iconClassName: 'text-indigo-500',
  },
  {
    label: 'Freigabe',
    title: 'einmal abstimmen',
    body: 'Danach geht die Seite live.',
    icon: Shield,
    iconClassName: 'text-teal-600',
  },
];

const workflowIntroPoints = ['Direkt abstimmen', 'Festpreis statt Paketlogik', 'Online ohne Agenturprozess'];
const workflowSignalClassName =
  'inline-flex min-h-[44px] items-center rounded-full border border-blue-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,248,253,0.78))] px-4 py-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.92)]';

const workflowSteps = [
  {
    id: '01',
    title: 'Kurz abstimmen',
    body: 'Sie sagen kurz, was Ihr Unternehmen anbietet und was die Website leisten soll. Ich Ã¼bersetze das in eine klare Struktur, ohne Fachsprache und ohne endlose Abstimmung.',
    icon: Clock3,
  },
  {
    id: '02',
    title: 'Ich baue die Website',
    body: 'Ich erstelle Text, Aufbau, Design und mobile Darstellung so, dass Besucher schnell verstehen, worum es geht und wie sie Kontakt aufnehmen kÃ¶nnen.',
    icon: Activity,
  },
  {
    id: '03',
    title: 'Freigeben und online gehen',
    body: 'Nach Ihrer Freigabe geht die Seite online. Sie zahlen einmalig und haben einen festen Ansprechpartner statt Abo, Vertrieb oder versteckter Zusatzpakete.',
    icon: Zap,
  },
];

const webdesignNavItems = [
  { id: 'hero', label: 'Start' },
  { id: 'webdesign-project-showcase', label: 'Projekte' },
  { id: 'about-me', label: 'Ãœber mich' },
  { id: 'project-intake', label: 'Anfrage' },
] as const;

const technicalSpecMetaClassName = 'mono text-[11px] uppercase tracking-[0.18em]';
const defaultMeta = {
  title: 'Webdesign fÃƒÂ¼r Handwerker, Praxen & KMU | Maximilian Unverricht',
  description: 'Klare Firmenwebsite fÃƒÂ¼r Handwerker, Praxen und KMU: Festpreis statt Abo, direkter Kontakt statt Agenturprozess und eine Website, die Vertrauen aufbaut und Anfragen erleichtert.',
};
const webdesignMeta = {
  title: 'Webdesign fÃ¼r Handwerker, Praxen & KMU | Maximilian Unverricht',
  description: 'Klare Firmenwebsite fÃ¼r Handwerker, Praxen und KMU: Festpreis statt Abo, direkter Kontakt statt Agenturprozess und eine Website, die Vertrauen aufbaut und Anfragen erleichtert.',
};

const upsertMetaTag = (selector: string, attributes: Record<string, string>, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
  return element;
};

const WebdesignLandingPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<(typeof webdesignNavItems)[number]['id']>('hero');

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitleMeta = document.head.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescriptionMeta = document.head.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const previousDescription = descriptionMeta?.getAttribute('content') ?? defaultMeta.description;
    const previousOgTitle = ogTitleMeta?.getAttribute('content') ?? defaultMeta.title;
    const previousOgDescription = ogDescriptionMeta?.getAttribute('content') ?? defaultMeta.description;

    document.title = webdesignMeta.title;
    upsertMetaTag('meta[name="description"]', { name: 'description' }, webdesignMeta.description);
    upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, webdesignMeta.title);
    upsertMetaTag('meta[property="og:description"]', { property: 'og:description' }, webdesignMeta.description);

    return () => {
      document.title = previousTitle || defaultMeta.title;
      upsertMetaTag('meta[name="description"]', { name: 'description' }, previousDescription);
      upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, previousOgTitle);
      upsertMetaTag('meta[property="og:description"]', { property: 'og:description' }, previousOgDescription);
    };
  }, []);

  useEffect(() => {
    const sections = webdesignNavItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id as (typeof webdesignNavItems)[number]['id']);
        }
      },
      {
        rootMargin: '-32% 0px -48% 0px',
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#eef3fb_0%,#edf4fb_52%,#f4f7fc_100%)] pt-24 font-sans text-[#0f172a] selection:bg-blue-100 selection:text-blue-900 sm:pt-28">
        {!shouldReduceMotion && (
          <PixelCanvas colors={['#2563eb', '#3b82f6', '#38bdf8', '#6366f1', '#93c5fd']} density={0.2} gap={10} speed={26} ambient={true} noFocus={true} fixed={true} />
        )}

        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/50 bg-[linear-gradient(180deg,rgba(248,251,255,0.82),rgba(239,244,252,0.68))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-[16px] sm:px-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <a href="/" aria-label="Zur Startseite von munverricht.org" className="group flex min-h-[44px] items-center gap-0.5 rounded-full px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef3fb]">
                <ASCIIText text="munverricht" className="mono text-sm font-semibold lowercase tracking-tight text-slate-800" revealOnMount={false} />
                <span className="mono text-sm font-semibold text-blue-600">.org</span>
              </a>

              <div className="hidden lg:flex items-center rounded-full border border-white/70 bg-white/60 p-1 shadow-[0_10px_24px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.86)]">
                {webdesignNavItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={`inline-flex min-h-[40px] items-center rounded-full px-4 py-2 mono text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.22)]'
                          : 'text-slate-600 hover:bg-white/80 hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonSecondary} min-h-11 px-4 py-2.5 ${themeClasses.webMeta} shrink-0 text-blue-600`}>
                Kontakt
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {webdesignNavItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`inline-flex min-h-[38px] shrink-0 items-center rounded-full border px-3.5 py-2 mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                      isActive
                        ? 'border-blue-600 bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)]'
                        : 'border-white/70 bg-white/66 text-slate-600 hover:border-blue-200 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="flex w-full flex-col items-center px-4 sm:px-5 lg:px-0">
          <main className="relative z-10 mx-auto w-full max-w-6xl space-y-14 py-5 pb-20 sm:space-y-18 sm:py-8 sm:pb-22 lg:space-y-20">
            <section id="hero" className="relative flex flex-col items-center justify-center pt-1 text-center sm:pt-6">
              <div className="absolute left-1/2 top-6 hidden h-40 w-40 -translate-x-[25rem] rounded-full bg-blue-200/40 blur-3xl lg:block" />
              <div className="absolute right-1/2 top-24 hidden h-56 w-56 translate-x-[27rem] rounded-full bg-cyan-200/30 blur-3xl lg:block" />

              <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="relative flex w-full flex-col items-center">
                  <p className="mb-4 text-center mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600 sm:mb-5 sm:text-xs sm:tracking-[0.3em]">
                    <ASCIIText as="span" text="WEBDESIGN // FÃœR HANDWERKER, PRAXEN & KLEINE UNTERNEHMEN" noWrap={false} enableHover={false} revealOnMount={false} />
                  </p>
                  <h1 className="mb-5 text-[clamp(2.85rem,14vw,5.35rem)] font-bold uppercase leading-[0.88] tracking-[0.02em] text-slate-900 sm:mb-8 sm:text-5xl md:text-7xl lg:text-[5.35rem]">
                    <span className="block">
                      <ASCIIText as="span" text="KLARE" className="text-slate-900" noWrap={false} enableHover={false} revealOnMount={false} />
                    </span>
                    <span className="block min-[430px]:whitespace-nowrap">
                      <ASCIIText as="span" text="FIRMENWEBSITE" className="text-slate-900" noWrap={false} enableHover={false} revealOnMount={false} />
                    </span>
                    <span className="block min-[430px]:whitespace-nowrap text-blue-600">
                      <ASCIIText as="span" text="AB 300 EUR" className="text-blue-600" noWrap={false} enableHover={false} revealOnMount={false} />
                    </span>
                  </h1>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.18 }} className="mb-4 flex w-full max-w-sm sm:hidden">
                  <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} w-full`}>
                    <Mail className="h-4 w-4 text-white" />
                    <span className={`${themeClasses.webMeta} font-bold text-white`}>ErsteinschÃ¤tzung anfragen</span>
                  </a>
                </motion.div>

                <motion.p initial={{ translateY: 10, opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative z-10 mb-5 max-w-[32ch] text-[0.98rem] font-medium leading-7 text-slate-600 sm:mb-10 sm:max-w-[60ch] sm:text-lg sm:leading-8">
                  <ASCIIText
                    as="span"
                    noWrap={false}
                    enableHover={false}
                    revealOnMount={false}
                    text="Eine einfache Website zum Festpreis. Ohne Abo, ohne Agenturprozess und ohne Umwege. Ich baue Ihre Seite so, dass sie seriÃ¶s wirkt, Vertrauen schafft und Anfragen leichter macht."
                  />
                </motion.p>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.28 }} className="mb-4 hidden w-full max-w-3xl flex-col items-stretch justify-center gap-3 sm:mb-7 sm:flex sm:flex-row sm:items-center sm:gap-4 sm:pt-1">
                  <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} flex-1`}>
                    <Mail className="h-4 w-4 text-white" />
                    <span className={`${themeClasses.webMeta} font-bold text-white`}>Kostenlose ErsteinschÃ¤tzung anfragen</span>
                  </a>
                  <a href="tel:+491633229892" className={themeClasses.webButtonSecondary}>
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>+49 163 3229892</span>
                  </a>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mb-8 hidden flex-wrap items-center justify-center gap-x-4 gap-y-2.5 px-3 text-center min-[480px]:flex sm:mb-12 sm:gap-x-5 sm:px-0"
                >
                  <span className={`${themeClasses.webMeta} text-blue-600`}>Klare Firmenwebsite ab 300 EUR</span>
                  <span className="h-1 w-1 rounded-full bg-blue-300" />
                  <span className={`${themeClasses.webMeta} text-slate-500`}>Kein Abo</span>
                  <span className="h-1 w-1 rounded-full bg-blue-300" />
                  <span className={`${themeClasses.webMeta} text-slate-500`}>Direkter Ansprechpartner</span>
                </motion.div>
              </div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className={`relative z-10 mt-5 w-full max-w-4xl overflow-hidden rounded-[1.25rem] px-4 py-5 sm:mt-10 sm:rounded-[1.4rem] sm:px-6 sm:py-7 ${themeClasses.webPanel}`}>
                {!shouldReduceMotion && (
                  <PixelCanvas colors={['#dbeafe', '#93c5fd', '#60a5fa']} density={0.16} gap={8} speed={22} />
                )}

                <div className="relative z-10">
                  <div className="grid grid-cols-1 items-start gap-4 text-left sm:gap-5 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
                    <div className={`flex h-full flex-col justify-between space-y-4 rounded-[1rem] px-4 py-4 sm:rounded-[1.15rem] sm:px-6 sm:py-6 ${themeClasses.webPanelSoft}`}>
                      <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                        <Terminal className="h-3.5 w-3.5" />
                        Klare Firmenwebsite
                      </div>
                      <div className="space-y-2">
                        <p className="text-[1.85rem] font-bold tracking-tight text-slate-900 sm:text-4xl">ab 300 EUR</p>
                        <p className="max-w-[34ch] text-sm leading-relaxed text-slate-600 sm:text-base">
                          Festpreis statt Agenturpaket. Ohne Abo, ohne Umwege und mit direktem Ansprechpartner.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 pt-0.5 sm:grid-cols-2 sm:pt-1 lg:auto-rows-fr lg:grid-cols-2">
                      {offerHighlights.map((highlight) => (
                        <div key={highlight.label} className={`rounded-[0.95rem] px-3.5 py-3.5 ${themeClasses.webCard}`}>
                          <div className="flex items-start gap-3">
                            <highlight.icon className={`mt-0.5 h-4 w-4 ${highlight.iconClassName}`} />
                            <div className="space-y-1.5">
                              <p className={`${technicalSpecMetaClassName} text-blue-600`}>{highlight.label}</p>
                              <p className="text-sm font-semibold leading-5 text-slate-900">{highlight.title}</p>
                              <p className="max-w-[24ch] text-[0.88rem] leading-5 text-slate-600">{highlight.body}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className={`relative z-10 mt-5 w-full max-w-4xl overflow-hidden rounded-[1.25rem] px-4 py-5 sm:mt-10 sm:rounded-[1.4rem] sm:px-6 sm:py-7 ${themeClasses.webPanel}`}>
                {!shouldReduceMotion && (
                  <PixelCanvas colors={['#dbeafe', '#bfdbfe', '#a5f3fc', '#c7d2fe']} density={0.14} gap={8} speed={18} />
                )}
                <div className="relative z-10">
                  <div className="mb-3 text-left mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                    <ASCIIText text="// WICHTIG_FÃœR_IHRE_WEBSITE" revealOnMount={false} />
                  </div>
                  <ul className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-x-4 sm:gap-y-3 md:gap-x-5" aria-label="Technische Merkmale der angebotenen Webdesign-Leistung">
                    {technicalSpecs.map((tech) => (
                      <li key={tech.name} className={`${themeClasses.webPill} pointer-events-none flex items-center gap-2`}>
                        <tech.icon aria-hidden="true" className={`h-4 w-4 md:h-5 md:w-5 ${tech.iconClassName}`} />
                        <span className="mono text-[10px] text-slate-700 sm:text-[11px]">{tech.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <div className="relative z-10 mt-12 grid w-full grid-cols-1 gap-6 border-t border-blue-200/80 pt-8 text-left sm:mt-16 sm:gap-8 sm:pt-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)] lg:items-start">
                <div className="space-y-4 lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,0.88fr)_minmax(20rem,1.12fr)] lg:items-end lg:gap-8 lg:space-y-0">
                  <div className="space-y-3">
                    <p className={themeClasses.webEyebrow}>
                      <ASCIIText text="// SO_LÃ„UFT_DAS_PROJEKT" noWrap={false} enableHover={false} revealOnMount={false} />
                    </p>
                    <h2 className="max-w-[15ch] text-balance text-[1.85rem] font-bold uppercase tracking-[0.03em] text-slate-900 sm:text-[2.2rem] sm:leading-[0.96]">
                      Von der Anfrage bis online in drei klaren Schritten.
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <p className="max-w-[60ch] text-[0.98rem] leading-7 text-slate-600 sm:text-[1rem] sm:leading-8">
                      Kein langer Agenturablauf, sondern ein kurzer, nachvollziehbarer Prozess. Sie wissen frÃ¼h, was gebaut wird, was es kostet und wann die Seite live gehen kann.
                    </p>
                    <ul className="flex flex-wrap gap-2.5" aria-label="Projektvorteile im Ablauf">
                      {workflowIntroPoints.map((point) => (
                        <li key={point} className={`${workflowSignalClassName} text-slate-700`}>
                          <span className="mono text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {workflowSteps.map((step) => (
                    <div key={step.id} className={`rounded-[1.15rem] px-4 py-4 sm:px-5 sm:py-5 ${themeClasses.webCard}`}>
                      <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                        <step.icon aria-hidden="true" className="h-3.5 w-3.5" />
                        <ASCIIText text={`${step.id} / ${step.title.toUpperCase()}`} noWrap={false} revealOnMount={false} />
                      </div>
                      <p className="mt-3 max-w-[60ch] text-[0.98rem] leading-7 text-slate-600 sm:text-[1rem] sm:leading-8">
                        {step.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div className={`relative self-start w-full min-h-[280px] overflow-hidden rounded-[1.15rem] sm:min-h-[320px] sm:rounded-[1.3rem] ${themeClasses.webPanelSoft}`}>
                  <PricingAsciiBox />
                </div>
              </div>
            </section>

            <WebdesignProjectShowcase />
            <WebdesignAboutSection />
            <WebdesignIntakeForm />
            <WebdesignLegalFooter />
          </main>
        </div>
      </div>
    </MotionConfig>
  );
};

export default WebdesignLandingPage;
