import React, { useEffect, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Activity, Clock3, Terminal, Zap, Shield, Globe, Cpu, ArrowRight, Mail, Phone, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
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
    title: 'ohne Technik-Extra',
    body: 'Der Onlinegang ist mitgedacht und nicht an ein Zusatzpaket gekoppelt.',
    icon: Globe,
    iconClassName: 'text-blue-500',
  },
  {
    label: 'Abstimmung',
    title: 'ein Ansprechpartner',
    body: 'Sie sprechen direkt mit der Person, die plant, textet und baut.',
    icon: Activity,
    iconClassName: 'text-sky-500',
  },
  {
    label: 'Pflege',
    title: 'Texte und Bilder später änderbar',
    body: 'Typische Inhalte können später ohne neues Projekt weitergeführt werden.',
    icon: Zap,
    iconClassName: 'text-indigo-500',
  },
  {
    label: 'Freigabe',
    title: 'vorher klar sehen',
    body: 'Sie wissen vor dem Livegang, was online geht und wie es wirkt.',
    icon: Shield,
    iconClassName: 'text-teal-600',
  },
];

const workflowIntroPoints = ['Klare Ausgangslage', 'Direkte Verantwortung', 'Später weiterpflegbar'];
const workflowSignalClassName =
  'inline-flex min-h-[44px] items-center rounded-full border border-blue-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,248,253,0.78))] px-4 py-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.92)]';

const workflowSteps = [
  {
    id: '01',
    title: 'Ausgangslage klären',
    body: 'Sie zeigen, was heute unklar, austauschbar oder schwer kontaktierbar wirkt. Ich übersetze das in eine verständliche Struktur mit klarem nächsten Schritt.',
    icon: Clock3,
  },
  {
    id: '02',
    title: 'Klaren Auftritt bauen',
    body: 'Ich formuliere Angebot, Seitenaufbau und Kontaktweg so, dass Besucher schneller verstehen, wer Sie sind, was Sie anbieten und wie sie Sie erreichen.',
    icon: Activity,
  },
  {
    id: '03',
    title: 'Freigeben und weiterführen',
    body: 'Vor dem Livegang sehen Sie, was online geht. Danach bleibt der Kontakt direkt und typische Inhalte lassen sich ohne unnötige Abhängigkeit weiterführen.',
    icon: Zap,
  },
];

const webdesignNavItems = [
  { id: 'hero', label: 'Start' },
  { id: 'webdesign-project-showcase', label: 'Projekte' },
  { id: 'about-me', label: 'Über mich' },
  { id: 'project-intake', label: 'Anfrage' },
] as const;

const technicalSpecMetaClassName = 'mono text-[11px] uppercase tracking-[0.18em]';
const defaultMeta = {
  title: 'Webdesign für Handwerker, Praxen & KMU | graphiks.de',
  description: 'Klare Firmenwebsite für Handwerker, Praxen und KMU: direkter Ansprechpartner, reale Projektbeispiele und Inhalte, die später weitergeführt werden können.',
};
const webdesignMeta = {
  title: 'Webdesign für Handwerker, Praxen & KMU | graphiks.de',
  description: 'Klare Firmenwebsite für Handwerker, Praxen und KMU: direkter Ansprechpartner, reale Projektbeispiele und Inhalte, die später weitergeführt werden können.',
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<(typeof workflowSteps)[number]['id']>(workflowSteps[0].id);

  const handleAnchorClick = () => {
    setIsMobileMenuOpen(false);
  };

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
    const updateActiveSection = () => {
      const navHeight = document.querySelector('nav')?.getBoundingClientRect().height ?? 0;
      const viewportAnchor = window.scrollY + navHeight + Math.min(window.innerHeight * 0.18, 140);

      let nextActive = webdesignNavItems[0].id;
      for (const item of webdesignNavItems) {
        const section = document.getElementById(item.id);
        if (!section) continue;
        if (section.offsetTop <= viewportAnchor) {
          nextActive = item.id;
        }
      }

      setActiveSection((current) => (current === nextActive ? current : nextActive));
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeMenuOnResize);
    return () => window.removeEventListener('resize', closeMenuOnResize);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#eef3fb_0%,#edf4fb_52%,#f4f7fc_100%)] pt-24 font-sans text-[#0f172a] selection:bg-blue-100 selection:text-blue-900 sm:pt-36 lg:pt-28">
        {!shouldReduceMotion && (
          <PixelCanvas colors={['#2563eb', '#3b82f6', '#38bdf8', '#6366f1', '#93c5fd']} density={0.2} gap={10} speed={26} ambient={true} noFocus={true} fixed={true} />
        )}

        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/50 bg-[linear-gradient(180deg,rgba(248,251,255,0.86),rgba(239,244,252,0.72))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-[16px] sm:px-5 lg:px-6">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2.5 sm:gap-3">
            <div className="flex items-center justify-between gap-2.5 sm:gap-3">
              <a href="/" aria-label="Zur Startseite von graphiks.de" className="group flex min-h-[40px] items-center gap-0.5 rounded-full px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef3fb] sm:min-h-[44px] sm:px-2">
                <ASCIIText text="graphiks" className="mono text-[13px] font-semibold lowercase tracking-tight text-slate-800 sm:text-sm" revealOnMount={false} />
                <span className="mono text-[13px] font-semibold text-blue-600 sm:text-sm">.de</span>
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

              <div className="flex items-center gap-2">
                <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonSecondary} min-h-[40px] shrink-0 gap-2 px-3 py-2 text-blue-600 sm:min-h-11 sm:px-4 sm:py-2.5`}>
                  <Mail className="h-3.5 w-3.5 text-blue-600" />
                  <span className={`${themeClasses.webMeta} text-blue-600`}>Kontakt</span>
                  <ArrowRight className="hidden h-3.5 w-3.5 sm:block" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((current) => !current)}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-nav-panel"
                  aria-label={isMobileMenuOpen ? 'Menue schliessen' : 'Menue oeffnen'}
                  className={`${themeClasses.webButtonSecondary} min-h-[40px] px-3 py-2 sm:hidden`}
                >
                  {isMobileMenuOpen ? <X className="h-4 w-4 text-slate-800" /> : <Menu className="h-4 w-4 text-slate-800" />}
                </button>
              </div>
            </div>

            <div className="hidden sm:grid sm:grid-cols-4 sm:gap-2 lg:hidden">
              {webdesignNavItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleAnchorClick}
                    aria-current={isActive ? 'location' : undefined}
                    className={`inline-flex min-h-[40px] items-center justify-center rounded-[1rem] border px-3 py-2 text-center mono text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-200 ${
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

            {isMobileMenuOpen && (
              <div id="mobile-nav-panel" className={`rounded-[1.3rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(243,247,252,0.86))] p-3 shadow-[0_18px_38px_rgba(15,23,42,0.10)] sm:hidden ${themeClasses.webPanelSoft}`}>
                <div className="grid gap-2">
                  {webdesignNavItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={handleAnchorClick}
                        aria-current={isActive ? 'location' : undefined}
                        className={`inline-flex min-h-[42px] items-center justify-between rounded-[1rem] border px-3 py-2.5 ${
                          isActive
                            ? 'border-blue-600 bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.20)]'
                            : 'border-white/70 bg-white/80 text-slate-700'
                        }`}
                      >
                        <span className="mono text-[10px] font-semibold uppercase tracking-[0.18em]">{item.label}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    );
                  })}
                </div>
                <div className="mt-3 grid gap-2 border-t border-blue-100/80 pt-3">
                  <a href="mailto:info@graphiks.de" onClick={handleAnchorClick} className={`${themeClasses.webButtonPrimary} w-full`}>
                    <Mail className="h-4 w-4 text-white" />
                    <span className={`${themeClasses.webMeta} font-bold text-white`}>E-Mail schreiben</span>
                  </a>
                  <a href="tel:+491633229892" onClick={handleAnchorClick} className={`${themeClasses.webButtonSecondary} w-full`}>
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>Anrufen</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex w-full flex-col items-center px-4 sm:px-5 lg:px-0">
          <main className="relative z-10 mx-auto w-full max-w-6xl space-y-10 py-4 pb-18 sm:space-y-18 sm:py-8 sm:pb-22 lg:space-y-16">
            <section id="hero" className="relative scroll-mt-24 flex flex-col items-center justify-center pt-2 text-center sm:scroll-mt-36 sm:pt-6">
              <div className="absolute left-1/2 top-6 hidden h-40 w-40 -translate-x-[25rem] rounded-full bg-blue-200/40 blur-3xl lg:block" />
              <div className="absolute right-1/2 top-24 hidden h-56 w-56 translate-x-[27rem] rounded-full bg-cyan-200/30 blur-3xl lg:block" />

              <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="relative flex w-full flex-col items-center">
                  <p className="mb-3 max-w-[24ch] text-center mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-600 sm:mb-5 sm:max-w-none sm:text-xs sm:tracking-[0.3em]">
                  <ASCIIText as="span" text="WEBDESIGN // FÜR HANDWERKER, PRAXEN & KLEINE UNTERNEHMEN" noWrap={false} />
                  </p>
                  <h1 className="mb-4 max-w-[12ch] break-normal [overflow-wrap:normal] text-[clamp(1.6rem,9.5vw,5.35rem)] font-bold uppercase leading-[0.92] tracking-[0.01em] text-slate-900 min-[390px]:max-w-[14ch] sm:mb-8 sm:max-w-none sm:text-5xl md:text-7xl lg:text-[5.35rem]">
                    <span className="block sm:hidden">KLARE</span>
                    <span className="hidden sm:block">
                      <ASCIIText as="span" text="KLARE" className="text-slate-900" noWrap={false} />
                    </span>
                    <span className="block sm:hidden">FIRMENWEBSITE</span>
                    <span className="hidden sm:block">
                      <ASCIIText as="span" text="FIRMENWEBSITE" className="text-slate-900" noWrap={false} />
                    </span>
                    <span className="block text-blue-600 sm:hidden">FÜR KMU</span>
                    <span className="hidden text-blue-600 sm:block">
                      <ASCIIText as="span" text="FÜR KMU" className="text-blue-600" noWrap={false} />
                    </span>
                  </h1>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.18 }} className="mb-3 flex w-full max-w-sm flex-col gap-2.5 sm:hidden">
                  <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} w-full`}>
                    <Mail className="h-4 w-4 text-white" />
                    <span className={`${themeClasses.webMeta} font-bold text-white`}>Erstgespräch anfragen</span>
                  </a>
                  <a href="tel:+491633229892" className={`${themeClasses.webButtonSecondary} w-full`}>
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>+49 163 3229892</span>
                  </a>
                </motion.div>

                <motion.p initial={{ translateY: 10, opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative z-10 mb-4 max-w-[30ch] text-[0.98rem] font-medium leading-7 text-slate-600 sm:mb-8 sm:max-w-[60ch] sm:text-lg sm:leading-8 lg:mb-7">
                  <ASCIIText
                    as="span"
                    noWrap={false}
                    enableHover={false}
                    revealOnMount={false}
                    text="Wenn eine Website unklar oder billig wirkt, kostet das Vertrauen vor der ersten Anfrage. Ich baue Firmenwebsites, die Angebot und Kontakt schnell verständlich machen und mit direktem Ansprechpartner, Telefonnummer und echten Referenzen seriös einzuordnen sind."
                  />
                </motion.p>

                <motion.ul
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.24 }}
                  className="grid w-full max-w-sm grid-cols-1 gap-2.5 text-left sm:hidden"
                  aria-label="Kernvorteile"
                >
                  <li className={`flex min-h-[44px] items-center gap-2.5 rounded-[1rem] px-3.5 py-3 ${themeClasses.webCard}`}>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium leading-6 text-slate-700">Direkter Ansprechpartner per Telefon oder E-Mail.</span>
                  </li>
                  <li className={`flex min-h-[44px] items-center gap-2.5 rounded-[1rem] px-3.5 py-3 ${themeClasses.webCard}`}>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium leading-6 text-slate-700">Reale Projektbeispiele und spätere Pflege ohne Umwege.</span>
                  </li>
                </motion.ul>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.28 }} className="mb-4 hidden w-full max-w-3xl flex-col items-stretch justify-center gap-3 sm:mb-6 sm:flex sm:flex-row sm:items-center sm:gap-4 sm:pt-1 lg:mb-5">
                  <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} flex-1`}>
                    <Mail className="h-4 w-4 text-white" />
                    <span className={`${themeClasses.webMeta} font-bold text-white`}>Erstgespräch anfragen</span>
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
                  className="mb-8 hidden flex-wrap items-center justify-center gap-x-4 gap-y-2.5 px-3 text-center min-[480px]:flex sm:mb-9 sm:gap-x-5 sm:px-0 lg:mb-8"
                >
                  <span className={`${themeClasses.webMeta} text-blue-600`}>Telefon & E-Mail direkt</span>
                  <span className="h-1 w-1 rounded-full bg-blue-300" />
                  <span className={`${themeClasses.webMeta} text-slate-500`}>Dortmund & direkte Zusammenarbeit</span>
                  <span className="h-1 w-1 rounded-full bg-blue-300" />
                  <span className={`${themeClasses.webMeta} text-slate-500`}>Reale Projektbeispiele</span>
                </motion.div>
              </div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className={`relative z-10 mt-5 hidden w-full max-w-4xl overflow-hidden rounded-[1.25rem] px-4 py-5 sm:mt-8 sm:block sm:rounded-[1.4rem] sm:px-6 sm:py-6 lg:mt-7 ${themeClasses.webPanel}`}>
                {!shouldReduceMotion && (
                  <PixelCanvas colors={['#dbeafe', '#93c5fd', '#60a5fa']} density={0.16} gap={8} speed={22} />
                )}

                <div className="relative z-10">
                  <div className="grid grid-cols-1 items-start gap-4 text-left sm:gap-5 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
                    <div className={`flex h-full flex-col items-start justify-start gap-6 rounded-[1rem] px-4 py-4 sm:rounded-[1.15rem] sm:px-6 sm:py-6 sm:gap-7 ${themeClasses.webPanelSoft}`}>
                      <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                        <Terminal className="h-3.5 w-3.5" />
                        Klare Firmenwebsite
                      </div>
                      <div className="space-y-3">
                        <p className="text-[1.85rem] font-bold tracking-tight text-slate-900 sm:text-4xl">ab 300 EUR</p>
                        <p className="max-w-[34ch] text-sm leading-relaxed text-slate-600 sm:text-base">
                          Der Preis ist eine Orientierung für kompakte Seiten. Wichtiger ist, dass Sie wissen, wer zuständig ist, was online geht und wie Inhalte später weitergeführt werden können.
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
                              <p className="text-[0.9rem] leading-6 text-slate-600">{highlight.body}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className={`relative z-10 mt-5 hidden w-full max-w-4xl overflow-hidden rounded-[1.25rem] px-4 py-5 sm:mt-8 sm:block sm:rounded-[1.4rem] sm:px-6 sm:py-6 lg:mt-7 ${themeClasses.webPanel}`}>
                {!shouldReduceMotion && (
                  <PixelCanvas colors={['#dbeafe', '#bfdbfe', '#a5f3fc', '#c7d2fe']} density={0.14} gap={8} speed={18} />
                )}
                <div className="relative z-10">
                  <div className="mb-3 text-left mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                    <span>// WICHTIG FÜR IHRE WEBSITE</span>
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

              <div className="relative z-10 mt-10 hidden w-full grid-cols-1 gap-5 border-t border-blue-200/80 pt-6 text-left sm:mt-12 sm:grid sm:gap-6 sm:pt-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)] lg:items-start">
                <div className="space-y-4 lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,0.88fr)_minmax(20rem,1.12fr)] lg:items-end lg:gap-6 lg:space-y-0">
                  <div className="space-y-3">
                    <p className={themeClasses.webEyebrow}>
                      <span>// SO LÄUFT DAS PROJEKT</span>
                    </p>
                    <h2 className="max-w-[15ch] text-balance text-[1.85rem] font-bold uppercase tracking-[0.03em] text-slate-900 sm:text-[2.2rem] sm:leading-[0.96]">
                      So wird aus einer unklaren Website ein klarer Auftritt.
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <p className="max-w-[60ch] text-[0.98rem] leading-7 text-slate-600 sm:text-[1rem] sm:leading-8">
                      Kein Agenturprozess zum Selbstzweck. Entscheidend ist, dass früh klar wird, was verbessert werden muss, wer es umsetzt und was später eigenständig weitergeführt werden kann.
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

                <div className="space-y-3 sm:space-y-4">
                  {workflowSteps.map((step) => (
                    <div key={step.id} className={`rounded-[1.15rem] px-4 py-4 sm:px-5 sm:py-4 ${themeClasses.webCard}`}>
                      <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                        <step.icon aria-hidden="true" className="h-3.5 w-3.5" />
                        <ASCIIText text={`${step.id} / ${step.title.toUpperCase()}`} noWrap={false} revealOnMount={false} />
                      </div>
                      <p className="mt-2.5 max-w-[60ch] text-[0.98rem] leading-7 text-slate-600 sm:text-[1rem] sm:leading-7">
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

            <section className="relative scroll-mt-24 sm:hidden">
              <div className={`rounded-[1.35rem] p-4 ${themeClasses.webPanel}`}>
                <div className="space-y-4">
                  <div className="space-y-2 text-left">
                    <p className={themeClasses.webEyebrow}>// ANGEBOT_IM_UEBERBLICK</p>
                    <h2 className="max-w-[12ch] text-[1.6rem] font-bold uppercase leading-[0.95] tracking-[0.02em] text-slate-900">
                      Preis als Orientierung. Klarheit im Auftritt.
                    </h2>
                  </div>

                  <div className={`rounded-[1.1rem] p-4 ${themeClasses.webPanelSoft}`}>
                    <div className="flex items-center gap-2 text-blue-600">
                      <Terminal className="h-3.5 w-3.5" />
                      <span className={themeClasses.webMeta}>Klare Firmenwebsite</span>
                    </div>
                    <p className="mt-3 text-[1.9rem] font-bold tracking-tight text-slate-900">ab 300 EUR</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Der Preis ist eine Orientierung für kompakte Seiten. Wichtiger ist, dass klar ist, wer umsetzt, wie der Kontakt funktioniert und was später weitergeführt werden kann.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 min-[390px]:grid-cols-2">
                    {offerHighlights.map((highlight) => (
                      <div key={highlight.label} className={`rounded-[1rem] px-3.5 py-3.5 ${themeClasses.webCard}`}>
                        <div className="flex items-start gap-3">
                          <highlight.icon className={`mt-0.5 h-4 w-4 ${highlight.iconClassName}`} />
                          <div className="space-y-1">
                            <p className={`${technicalSpecMetaClassName} text-blue-600`}>{highlight.label}</p>
                            <p className="text-sm font-semibold leading-5 text-slate-900">{highlight.title}</p>
                            <p className="text-[0.86rem] leading-5 text-slate-600">{highlight.body}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`rounded-[1.1rem] p-4 ${themeClasses.webCard}`}>
                    <p className={`${themeClasses.webEyebrow} mb-3`}>// WICHTIG_FUER_IHRE_WEBSITE</p>
                    <ul className="grid grid-cols-1 gap-2.5 min-[390px]:grid-cols-2" aria-label="Technische Merkmale der angebotenen Webdesign-Leistung">
                      {technicalSpecs.map((tech) => (
                        <li key={tech.name} className="flex items-center gap-2.5 rounded-[0.95rem] border border-white/70 bg-white/70 px-3 py-3">
                          <tech.icon aria-hidden="true" className={`h-4 w-4 shrink-0 ${tech.iconClassName}`} />
                          <span className="text-sm leading-5 text-slate-700">{tech.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <WebdesignProjectShowcase />
            <WebdesignAboutSection />
            <section className="relative scroll-mt-24 sm:hidden">
              <div className={`rounded-[1.35rem] p-4 ${themeClasses.webPanel}`}>
                <div className="space-y-4">
                  <div className="space-y-2 text-left">
                    <p className={themeClasses.webEyebrow}>// SO_LAEUFT_DAS_PROJEKT</p>
                    <h2 className="max-w-[14ch] text-[1.6rem] font-bold uppercase leading-[0.95] tracking-[0.02em] text-slate-900">
                      So wird aus einer unklaren Website ein klarer Auftritt.
                    </h2>
                    <p className="text-[0.96rem] leading-7 text-slate-600">
                      Kurzer, nachvollziehbarer Ablauf statt langer Agenturstrecke.
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-2" aria-label="Projektvorteile im Ablauf">
                    {workflowIntroPoints.map((point) => (
                      <li key={point} className={`${workflowSignalClassName} min-h-[40px] px-3 py-2`}>
                        <span className="mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2.5">
                    {workflowSteps.map((step) => {
                      const isOpen = activeWorkflowStep === step.id;
                      return (
                        <div key={step.id} className={`overflow-hidden rounded-[1rem] ${themeClasses.webCard}`}>
                          <button
                            type="button"
                            onClick={() => setActiveWorkflowStep(step.id)}
                            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                            aria-expanded={isOpen}
                          >
                            <div>
                              <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                                <step.icon aria-hidden="true" className="h-3.5 w-3.5" />
                                <span>{step.id}</span>
                              </div>
                              <p className="mt-1 text-sm font-semibold text-slate-900">{step.title}</p>
                            </div>
                            {isOpen ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                          </button>
                          {isOpen && (
                            <div className="border-t border-blue-100/80 px-4 py-3">
                              <p className="text-sm leading-6 text-slate-600">{step.body}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
            <WebdesignIntakeForm />
            <WebdesignLegalFooter />
          </main>
        </div>
      </div>
    </MotionConfig>
  );
};

export default WebdesignLandingPage;
