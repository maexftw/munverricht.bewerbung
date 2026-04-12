import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Clock3, Terminal, Zap, Shield, Globe, Cpu, ArrowRight, Mail, Phone } from 'lucide-react';
import ASCIIText from './ASCIIText';
import PixelCanvas from './PixelCanvas';
import ArchitectureExhibition from './ArchitectureExhibition';
import WebdesignAboutSection from './WebdesignAboutSection';
import WebdesignFaqSection from './WebdesignFaqSection';
import WebdesignClosingSection from './WebdesignClosingSection';
import WebdesignProjectShowcase from './WebdesignProjectShowcase';
import { themeClasses } from './themeClasses';

const technicalSpecs = [
  {
    name: 'Schnell geladen',
    icon: Cpu,
    iconClassName: 'text-blue-600'
  },
  {
    name: 'Bei Google auffindbar',
    icon: Zap,
    iconClassName: 'text-sky-500'
  },
  {
    name: 'DSGVO-konform',
    icon: Shield,
    iconClassName: 'text-indigo-500'
  },
  {
    name: 'Mobil & Desktop klar lesbar',
    icon: Globe,
    iconClassName: 'text-cyan-600'
  },
  {
    name: 'Leicht zu pflegen',
    icon: Activity,
    iconClassName: 'text-teal-600'
  }
];

const processSteps = [
  {
    id: '01',
    label: 'DIALOG',
    icon: Clock3,
    iconClassName: 'text-blue-600',
    accentClassName: 'from-blue-500/18 via-blue-200/12 to-transparent',
    description:
      'Sie sagen mir kurz, was Sie anbieten und wen Sie erreichen wollen. Ich erstelle daraus ein klares Konzept, ganz ohne Fachbegriffe.'
  },
  {
    id: '02',
    label: 'KONZEPT',
    icon: Activity,
    iconClassName: 'text-sky-500',
    accentClassName: 'from-sky-500/16 via-sky-200/10 to-transparent',
    description:
      'Sie erhalten einen klickbaren, unverbindlichen Entwurf. Wir klaeren Aufbau, Texte und Design, bevor die eigentliche Website gebaut wird.'
  },
  {
    id: '03',
    label: 'UMSETZUNG',
    icon: Zap,
    iconClassName: 'text-white',
    accentClassName: 'from-blue-500/18 via-emerald-200/10 to-transparent',
    description:
      'Wenn alles passt, setze ich die Seite sauber im Code um und veroeffentliche sie. Sind alle Inhalte da, sind Sie oft schon in 2 bis 14 Tagen online.',
    isFinal: true
  }
];

const technicalSpecMetaClassName = 'mono text-[11px] uppercase tracking-[0.18em]';

const WebdesignLandingPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-x-hidden pt-16 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 sm:pt-18">
      <a
        href="#webdesign-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded focus:bg-[color:var(--accent-fill)] focus:px-4 focus:py-2 focus:text-[color:var(--accent-contrast)] focus:outline-none focus:ring-2 focus:ring-[color:var(--focus-ring)] focus:ring-offset-2 focus:ring-offset-[#eef3fb] mono text-xs font-bold uppercase tracking-widest"
      >
        Zum Hauptinhalt springen
      </a>

      <nav className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-6 ${themeClasses.webNavShell}`}>
        <a href="/" aria-label="Zur Startseite von munverricht.org" className="group inline-flex min-h-11 items-center gap-2 rounded-full px-2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef3fb] sm:px-2.5">
          <ASCIIText text="munverricht" className="mono text-sm font-semibold lowercase tracking-tight text-slate-800" revealOnMount={false} />
          <span className="mono text-sm font-semibold text-blue-600">.org</span>
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonSecondary} min-h-11 px-4 py-2.5 ${themeClasses.webMeta} text-blue-600`}>
            Kontakt
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>

      <div className="flex flex-col items-center w-full px-4 sm:px-5 lg:px-0">
        <main id="webdesign-main-content" tabIndex={-1} className="relative z-10 mx-auto w-full max-w-6xl space-y-14 py-5 pb-20 sm:space-y-18 sm:py-8 sm:pb-22 lg:space-y-20">
          <section id="hero" className="relative flex flex-col items-center justify-center pt-4 text-center sm:pt-8">
            <div className="absolute left-1/2 top-8 hidden h-32 w-32 -translate-x-[24rem] rounded-full bg-blue-100/35 blur-[88px] lg:block" />
            <div className="absolute right-1/2 top-24 hidden h-44 w-44 translate-x-[25rem] rounded-full bg-sky-100/24 blur-[108px] lg:block" />

            <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0.95, opacity: 0 }}
                animate={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: 'easeOut' }}
                className="relative flex w-full flex-col items-center"
              >
                <ASCIIText as="h2" text="WEBDESIGN FÜR HANDWERKER, PRAXEN & KMU" className="mb-4 text-center mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600 sm:mb-5 sm:text-xs sm:tracking-[0.3em]" noWrap={false} enableHover={false} revealOnMount={false} />
                <h1 className="mb-6 max-w-[11ch] text-balance text-[2.65rem] font-bold uppercase leading-[0.96] tracking-[0.028em] text-slate-900 sm:mb-8 sm:max-w-[12ch] sm:text-5xl md:text-7xl lg:text-[5.35rem]">
                  <ASCIIText as="span" text="PROFI-WEBSEITE" className="text-slate-900" noWrap={false} enableHover={false} revealOnMount={false} />
                  {' '}
                  <ASCIIText as="span" text="AB 300 €" className="text-blue-600" noWrap={false} enableHover={false} revealOnMount={false} />
                </h1>
              </motion.div>

              <motion.p
                initial={shouldReduceMotion ? false : { translateY: 10, opacity: 0 }}
                animate={shouldReduceMotion ? undefined : { translateY: 0, opacity: 1 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.7, delay: 0.2 }}
                className="relative z-10 mb-7 max-w-[34ch] text-[1.02rem] font-medium leading-7 text-slate-600 sm:mb-10 sm:max-w-[60ch] sm:text-lg sm:leading-8"
              >
                <ASCIIText
                  as="span"
                  noWrap={false}
                  enableHover={false}
                  revealOnMount={false}
                  text="Sie brauchen eine serioese Unternehmensseite, haben aber keine Zeit fuer lange Frageboegen und wollen nicht in teuren Agentur-Abos feststecken? Ich baue Ihre Seite, veroeffentliche sie und halte sie technisch sauber. Einmal zahlen, online gehen und fuer Ihre Kunden erreichbar sein."
                />
              </motion.p>

              <motion.div
                initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
                animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.25 }}
                className="mb-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 px-3 text-center sm:mb-12 sm:gap-x-5 sm:px-0"
              >
                <span className={`${themeClasses.webMeta} text-blue-600`}>Ab 300 € einmalig</span>
                <span className="h-1 w-1 rounded-full bg-blue-300" />
                <span className={`${themeClasses.webMeta} text-slate-500`}>Kein Abo</span>
                <span className="h-1 w-1 rounded-full bg-blue-300" />
                <span className={`${themeClasses.webMeta} text-slate-500`}>Keine Folgekosten</span>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
                animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.28 }}
                className="mb-6 flex w-full max-w-3xl flex-col items-stretch justify-center gap-3 sm:mb-10 sm:flex-row sm:items-center sm:gap-4 sm:pt-1"
              >
                <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} flex-1`}>
                  <Mail aria-hidden="true" className="h-4 w-4 text-white" />
                  <span className={`${themeClasses.webMeta} font-bold text-white`}>Jetzt unverbindlich per Mail anfragen</span>
                </a>
                <a href="tel:+491633229892" className={themeClasses.webButtonSecondary}>
                  <Phone aria-hidden="true" className="h-4 w-4 text-blue-600" />
                  <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>+49 163 3229892</span>
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
              animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.3 }}
              className={`relative z-10 mt-6 w-full max-w-4xl overflow-hidden rounded-[1.25rem] px-4 py-5 sm:mt-10 sm:rounded-[1.4rem] sm:px-6 sm:py-7 ${themeClasses.webPanel}`}
            >
              <PixelCanvas colors={['#e9f1fb', '#c7dcf6', '#7ca7dc']} gap={5} speed={28} className="opacity-[0.26]" />
              <div className="relative z-10">
                <div className="mb-3 text-left mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                  <ASCIIText text="// IHRE_VORTEILE" enableHover={false} revealOnMount={false} />
                </div>
                <div className="grid grid-cols-1 items-start gap-4 text-left sm:gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                  <div className="space-y-4 border-l border-blue-200/80 pl-4 sm:pl-6">
                    <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                      <Terminal aria-hidden="true" className="h-3.5 w-3.5" />
                      Ihre Vorteile auf einen Blick
                    </div>
                    <div className="space-y-2">
                      <p className="text-[1.85rem] font-bold tracking-tight text-slate-900 sm:text-4xl">Ab 300 € einmalig</p>
                      <p className="max-w-[34ch] text-sm leading-relaxed text-slate-600 sm:text-base">
                        Sie bekommen eine serioese Unternehmensseite ohne Abo, ohne langfristige Bindung und ohne laufende Technik-Kosten.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 border-t border-white/60 pt-3 sm:pt-1 sm:border-t-0">
                    <div className={`rounded-[0.95rem] px-3.5 py-3 ${themeClasses.webSurfaceSubtle}`}>
                      <div className="flex items-start gap-3">
                        <Globe aria-hidden="true" className="mt-0.5 h-4 w-4 text-blue-500" />
                        <div>
                          <p className={`${technicalSpecMetaClassName} text-blue-600`}>Hosting</p>
                          <p className="text-sm font-semibold text-slate-900">dauerhaft inklusive</p>
                        </div>
                      </div>
                    </div>
                    <div className={`rounded-[0.95rem] px-3.5 py-3 ${themeClasses.webSurfaceSubtle}`}>
                      <div className="flex items-start gap-3">
                        <Activity aria-hidden="true" className="mt-0.5 h-4 w-4 text-sky-500" />
                        <div>
                          <p className={`${technicalSpecMetaClassName} text-blue-600`}>Wartung</p>
                          <p className="text-sm font-semibold text-slate-900">keine monatlichen Wartungsvertraege</p>
                        </div>
                      </div>
                    </div>
                    <div className={`rounded-[0.95rem] px-3.5 py-3 ${themeClasses.webSurfaceSubtle}`}>
                      <div className="flex items-start gap-3">
                        <Zap aria-hidden="true" className="mt-0.5 h-4 w-4 text-indigo-500" />
                        <div>
                          <p className={`${technicalSpecMetaClassName} text-blue-600`}>Entwurf</p>
                          <p className="text-sm font-semibold text-slate-900">klickbar und unverbindlich</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
              animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.4 }}
              className={`relative z-10 mt-8 w-full max-w-4xl border-y py-5 sm:mt-10 sm:py-6 ${themeClasses.webSectionRule}`}
            >
              <div className="grid grid-cols-1 items-start gap-4 text-left sm:gap-5 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
                <div className="space-y-2">
                  <div className="text-left mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                    <ASCIIText text="// TECHNIK_CHECK" enableHover={false} revealOnMount={false} />
                  </div>
                  <p className="max-w-[22ch] text-sm leading-relaxed text-slate-600 sm:text-[15px] sm:leading-7">
                    Sofort einsatzbereit: schnell geladen, DSGVO-konform und mobil optimiert.
                  </p>
                </div>
                <ul className="flex flex-wrap items-center gap-2.5 sm:gap-x-4 sm:gap-y-3 md:gap-x-5" aria-label="Technische Merkmale der angebotenen Webdesign-Leistung">
                  {technicalSpecs.map((tech) => (
                    <li key={tech.name} className={themeClasses.webChip}>
                      <tech.icon aria-hidden="true" className={`h-4 w-4 md:h-5 md:w-5 ${tech.iconClassName}`} />
                      <span className="mono text-[10px] text-slate-700 sm:text-[11px]">{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
              animate={shouldReduceMotion ? undefined : { y: 0, opacity: 1 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.5 }}
              className={`relative z-10 mt-6 w-full max-w-4xl overflow-hidden rounded-[1.35rem] px-4 py-5 sm:mt-10 sm:px-6 sm:py-6 ${themeClasses.webPanelSoft}`}
            >
              <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-[linear-gradient(180deg,rgba(59,130,246,0.5),rgba(16,185,129,0.28))]" aria-hidden="true" />
              <div className="relative z-10 pl-2 sm:pl-3">
                <div className="mb-3 text-left mono text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  <ASCIIText text="// UNKOMPLIZIERT_STARTEN" enableHover={false} revealOnMount={false} />
                </div>
                <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:gap-4">
                  <p className="max-w-[32ch] text-sm leading-relaxed text-slate-700 sm:text-[15px] sm:leading-7">
                    Sie erhalten von mir kein draengendes Verkaufsgespraech, sondern eine ehrliche Einschaetzung und einen realistischen Rahmen fuer Ihr Projekt.
                  </p>
                  <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} rounded-[1rem] px-4 py-4`}>
                    <Mail aria-hidden="true" className="h-4 w-4 text-white" />
                    <span className={`${themeClasses.webMeta} font-bold text-white`}>Kostenlosen Entwurf per Mail anfragen</span>
                  </a>
                  <a href="tel:+491633229892" className={`${themeClasses.webButtonSecondary} rounded-[1rem] px-4 py-4`}>
                    <Phone aria-hidden="true" className="h-4 w-4 text-blue-600" />
                    <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>+49 163 3229892</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="relative z-10 mt-14 grid w-full grid-cols-1 gap-6 border-t border-blue-200/80 pt-8 text-left sm:mt-16 sm:gap-8 sm:pt-10 lg:grid-cols-3">
              <div className={`relative overflow-hidden rounded-[1.25rem] px-5 py-6 sm:rounded-[1.4rem] sm:px-7 sm:py-8 lg:col-span-2 ${themeClasses.webPanel}`}>
                <PixelCanvas colors={['#eef2ff', '#d8ddf6', '#9aa6d6']} gap={5} speed={28} noFocus className="opacity-[0.24]" />

                <div className="relative z-10">
                  <div className="mb-8 text-left mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                    <ASCIIText text="// DER_ABLAUF" enableHover={false} revealOnMount={false} />
                  </div>

                  <div className="relative grid grid-cols-1 gap-3.5 sm:gap-4.5">
                    <div className="absolute bottom-8 left-[1.35rem] top-6 hidden w-px bg-[linear-gradient(180deg,rgba(59,130,246,0.16)_0%,rgba(59,130,246,0.1)_42%,rgba(59,130,246,0.2)_100%)] sm:block" aria-hidden="true" />
                    {processSteps.map((step) => {
                      const StepIcon = step.icon;

                      return (
                        <div
                          key={step.id}
                          className={`group relative overflow-hidden rounded-[1.15rem] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out ${step.isFinal
                            ? `${themeClasses.webSurfaceStrong} px-4 py-4 shadow-[0_14px_30px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-5 sm:py-5`
                            : 'border border-white/72 bg-white/56 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.84)] sm:px-5 sm:py-5'
                            }`}
                        >
                          <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${step.accentClassName}`} aria-hidden="true" />
                          <div className="relative grid grid-cols-[auto_1fr] gap-4 sm:gap-5">
                            <div className="relative flex flex-col items-center">
                              <div className={`flex h-11 w-11 items-center justify-center rounded-full ${step.isFinal
                                ? 'bg-blue-600 text-white shadow-[0_8px_18px_rgba(37,99,235,0.14)]'
                                : `${themeClasses.webIconBubble}`
                                }`}>
                                <StepIcon aria-hidden="true" className={`h-4 w-4 ${step.iconClassName}`} />
                              </div>
                              {!step.isFinal ? (
                                <div className="mt-2 hidden h-full min-h-8 w-px bg-[linear-gradient(180deg,rgba(59,130,246,0.24),rgba(59,130,246,0.04))] sm:block" aria-hidden="true" />
                              ) : null}
                            </div>
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                                <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                                  <ASCIIText text={`${step.id} / ${step.label}`} enableHover={false} revealOnMount={false} />
                                </div>
                                <span className="inline-flex rounded-full border border-blue-100/80 bg-white/68 px-2.5 py-1 mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
                                  {step.isFinal ? 'Launch-ready' : 'Nächster Schritt'}
                                </span>
                              </div>
                              <p className="max-w-[44ch] text-base leading-7 text-slate-700 sm:text-[17px] sm:leading-8">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="hidden h-full min-h-[320px] lg:col-span-1 lg:block">
                <ArchitectureExhibition />
              </div>
            </div>
          </section>

          <WebdesignAboutSection />
          <WebdesignProjectShowcase />
          <WebdesignFaqSection />
          <WebdesignClosingSection />
        </main>
      </div>
    </div>
  );
};

export default WebdesignLandingPage;
