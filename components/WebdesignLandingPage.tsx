import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock3, Terminal, Zap, Shield, Globe, Cpu, ArrowRight, Mail, Phone } from 'lucide-react';
import ASCIIText from './ASCIIText';
import CookieConsent from './CookieConsent';
import PixelCanvas from './PixelCanvas';
import PricingAsciiBox from './PricingAsciiBox';
import WebdesignProjectShowcase from './WebdesignProjectShowcase';
import WebdesignAboutSection from './WebdesignAboutSection';
import WebdesignIntakeForm from './WebdesignIntakeForm';
import WebdesignLegalFooter from './WebdesignLegalFooter';
import { themeClasses } from './themeClasses';

const technicalSpecs = [
  {
    name: 'Saubere technische Basis',
    icon: Cpu,
    iconClassName: 'text-blue-600',
  },
  {
    name: 'Suchmaschinenfreundlich',
    icon: Zap,
    iconClassName: 'text-sky-500',
  },
  {
    name: 'DSGVO-konform',
    icon: Shield,
    iconClassName: 'text-indigo-500',
  },
  {
    name: 'Mobil optimiert',
    icon: Globe,
    iconClassName: 'text-cyan-600',
  },
  {
    name: 'Schnell geladen',
    icon: Activity,
    iconClassName: 'text-teal-600',
  },
];

const workflowSteps = [
  {
    id: '01',
    title: 'Ausgangslage klaeren',
    body: 'Sie sagen kurz, was Ihr Unternehmen braucht. Ich ordne das in eine klare Struktur ein, damit von Anfang an sichtbar wird, was die Website sagen und leisten soll.',
    icon: Clock3,
  },
  {
    id: '02',
    title: 'Verstaendlich umsetzen',
    body: 'Ich verbinde Text, Aufbau, Design und Technik so, dass Ihr Auftritt professionell wirkt, schnell verstanden wird und nicht nach Baukasten aussieht.',
    icon: Activity,
  },
  {
    id: '03',
    title: 'Live gehen mit Klarheit',
    body: 'Nach Ihrer Freigabe geht die Seite live. Der naechste Schritt bleibt klar: Sie wissen, wer die Umsetzung verantwortet und wo Sie mich direkt erreichen.',
    icon: Zap,
  },
];

const technicalSpecMetaClassName = 'mono text-[11px] uppercase tracking-[0.18em]';

const WebdesignLandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#eef3fb_0%,#edf4fb_52%,#f4f7fc_100%)] pt-16 font-sans text-[#0f172a] selection:bg-blue-100 selection:text-blue-900 sm:pt-18">
      <PixelCanvas colors={['#2563eb', '#3b82f6', '#38bdf8', '#6366f1', '#93c5fd']} density={0.2} gap={10} speed={26} ambient={true} noFocus={true} fixed={true} />

      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/50 bg-[linear-gradient(180deg,rgba(248,251,255,0.74),rgba(239,244,252,0.56))] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-[14px] sm:px-6">
        <a href="/" aria-label="Zur Startseite von munverricht.org" className="group flex items-center gap-0.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef3fb]">
          <ASCIIText text="munverricht" className="mono text-sm font-semibold lowercase tracking-tight text-slate-800" />
          <span className="mono text-sm font-semibold text-blue-600">.org</span>
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonSecondary} min-h-11 px-4 py-2.5 ${themeClasses.webMeta} text-blue-600`}>
            Kontakt
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>

      <div className="flex w-full flex-col items-center px-4 sm:px-5 lg:px-0">
        <main className="relative z-10 mx-auto w-full max-w-6xl space-y-14 py-5 pb-20 sm:space-y-18 sm:py-8 sm:pb-22 lg:space-y-20">
          <section id="hero" className="relative flex flex-col items-center justify-center pt-4 text-center sm:pt-8">
            <div className="absolute left-1/2 top-6 hidden h-40 w-40 -translate-x-[25rem] rounded-full bg-blue-200/40 blur-3xl lg:block" />
            <div className="absolute right-1/2 top-24 hidden h-56 w-56 translate-x-[27rem] rounded-full bg-cyan-200/30 blur-3xl lg:block" />

            <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="relative flex w-full flex-col items-center">
                <ASCIIText as="h2" text="WEBDESIGN & DELIVERY // DIREKT FUER HANDWERK, PRAXEN & KMU" className="mb-4 text-center mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600 sm:mb-5 sm:text-xs sm:tracking-[0.3em]" noWrap={false} enableHover={false} />
                <h1 className="mb-6 max-w-[13ch] text-balance text-[2.65rem] font-bold uppercase leading-[0.96] tracking-[0.028em] text-slate-900 sm:mb-8 sm:max-w-[15ch] sm:text-5xl md:text-7xl lg:text-[5.35rem]">
                  <ASCIIText as="span" text="KLARE FIRMENWEBSITE" className="text-slate-900" noWrap={false} enableHover={false} />{' '}
                  <ASCIIText as="span" text="DIREKT UMGESETZT" className="text-blue-600" noWrap={false} enableHover={false} />
                </h1>
              </motion.div>

              <motion.p initial={{ translateY: 10, opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative z-10 mb-7 max-w-[36ch] text-[1.02rem] font-medium leading-7 text-slate-600 sm:mb-10 sm:max-w-[60ch] sm:text-lg sm:leading-8">
                <ASCIIText
                  as="span"
                  noWrap={false}
                  enableHover={false}
                  text="Ihre Website soll professionell wirken, schnell verstanden werden und nicht nach Baukasten aussehen. Genau darauf ist diese Seite ausgelegt: direkte Zusammenarbeit, klare Texte und eine technisch saubere Umsetzung."
                />
              </motion.p>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="mb-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 px-3 text-center sm:mb-12 sm:gap-x-5 sm:px-0">
                <span className={`${themeClasses.webMeta} text-blue-600`}>Direkter Ansprechpartner</span>
                <span className="h-1 w-1 rounded-full bg-blue-300" />
                <span className={`${themeClasses.webMeta} text-slate-500`}>Projektstart ab 300 EUR</span>
                <span className="h-1 w-1 rounded-full bg-blue-300" />
                <span className={`${themeClasses.webMeta} text-slate-500`}>Keine laufende Vertragsbindung</span>
              </motion.div>

              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.28 }} className="mb-6 flex w-full max-w-3xl flex-col items-stretch justify-center gap-3 sm:mb-10 sm:flex-row sm:items-center sm:gap-4 sm:pt-1">
                <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} flex-1`}>
                  <Mail className="h-4 w-4 text-white" />
                  <span className={`${themeClasses.webMeta} font-bold text-white`}>Projekt schildern</span>
                </a>
                <a href="tel:+491633229892" className={themeClasses.webButtonSecondary}>
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>+49 163 3229892</span>
                </a>
              </motion.div>
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className={`relative z-10 mt-6 w-full max-w-4xl overflow-hidden rounded-[1.25rem] px-4 py-5 sm:mt-10 sm:rounded-[1.4rem] sm:px-6 sm:py-7 ${themeClasses.webPanel}`}>
              <PixelCanvas colors={['#dbeafe', '#93c5fd', '#60a5fa']} density={0.16} gap={8} speed={22} />

              <div className="relative z-10">
                <div className="mb-3 text-left mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                  <ASCIIText text="// KONDITIONEN_SNAPSHOT" />
                </div>
                <div className="grid grid-cols-1 items-start gap-4 text-left sm:gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                  <div className={`space-y-4 rounded-[1rem] px-4 py-4 sm:rounded-[1.15rem] sm:px-6 sm:py-6 ${themeClasses.webPanelSoft}`}>
                    <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                      <Terminal className="h-3.5 w-3.5" />
                      Vor der Anfrage einordnen
                    </div>
                    <div className="space-y-2">
                      <p className="text-[1.85rem] font-bold tracking-tight text-slate-900 sm:text-4xl">300-400 EUR als Orientierung</p>
                      <p className="max-w-[34ch] text-sm leading-relaxed text-slate-600 sm:text-base">
                        Fuer kompakte Firmenseiten dient dieser Rahmen als erste Einordnung. Entscheidend ist, dass Struktur, Text und Umsetzung sauber zusammenpassen.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 pt-0.5 sm:pt-1">
                    <div className={`rounded-[0.95rem] px-3.5 py-3 ${themeClasses.webCard}`}>
                      <div className="flex items-start gap-3">
                        <Globe className="mt-0.5 h-4 w-4 text-blue-500" />
                        <div>
                          <p className={`${technicalSpecMetaClassName} text-blue-600`}>Hosting</p>
                          <p className="text-sm font-semibold text-slate-900">technisch mitgedacht</p>
                        </div>
                      </div>
                    </div>
                    <div className={`rounded-[0.95rem] px-3.5 py-3 ${themeClasses.webCard}`}>
                      <div className="flex items-start gap-3">
                        <Activity className="mt-0.5 h-4 w-4 text-sky-500" />
                        <div>
                          <p className={`${technicalSpecMetaClassName} text-blue-600`}>Wartung</p>
                          <p className="text-sm font-semibold text-slate-900">kein Technikvertrag noetig</p>
                        </div>
                      </div>
                    </div>
                    <div className={`rounded-[0.95rem] px-3.5 py-3 ${themeClasses.webCard}`}>
                      <div className="flex items-start gap-3">
                        <Zap className="mt-0.5 h-4 w-4 text-indigo-500" />
                        <div>
                          <p className={`${technicalSpecMetaClassName} text-blue-600`}>Einordnung</p>
                          <p className="text-sm font-semibold text-slate-900">direkt und unverbindlich</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className={`relative z-10 mt-6 w-full max-w-4xl overflow-hidden rounded-[1.25rem] px-4 py-5 sm:mt-10 sm:rounded-[1.4rem] sm:px-6 sm:py-7 ${themeClasses.webPanel}`}>
              <PixelCanvas colors={['#dbeafe', '#bfdbfe', '#a5f3fc', '#c7d2fe']} density={0.14} gap={8} speed={18} />
              <div className="relative z-10">
                <div className="mb-3 text-left mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                  <ASCIIText text="// TECHNICAL_SPECS" />
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

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className={`relative z-10 mt-6 w-full max-w-4xl rounded-[1.25rem] px-4 py-5 sm:mt-10 sm:rounded-[1.4rem] sm:px-6 sm:py-7 ${themeClasses.webPanel}`}>
              <div className="mb-3 text-left mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                <ASCIIText text="// DIREKT_ANFRAGEN" />
              </div>
              <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] sm:gap-4">
                <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} rounded-[1rem] px-4 py-4`}>
                  <Mail className="h-4 w-4 text-white" />
                  <span className={`${themeClasses.webMeta} font-bold text-white`}>Rueckmeldung zum Projekt anfragen</span>
                </a>
                <a href="tel:+491633229892" className={`${themeClasses.webButtonSecondary} rounded-[1rem] px-4 py-4`}>
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>+49 163 3229892</span>
                </a>
              </div>
            </motion.div>

            <div className="relative z-10 mt-14 grid w-full grid-cols-1 gap-6 border-t border-blue-200/80 pt-8 text-left sm:mt-16 sm:gap-8 sm:pt-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)] lg:items-start">
              <div className="space-y-4 sm:space-y-5">
                {workflowSteps.map((step) => (
                  <div key={step.id} className={`rounded-[1.15rem] px-4 py-4 sm:px-5 sm:py-5 ${themeClasses.webCard}`}>
                    <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                      <step.icon aria-hidden="true" className="h-3.5 w-3.5" />
                      <ASCIIText text={`${step.id} / ${step.title.toUpperCase()}`} noWrap={false} />
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

      <CookieConsent language="de" />
    </div>
  );
};

export default WebdesignLandingPage;
