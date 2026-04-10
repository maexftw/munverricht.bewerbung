import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock3, Terminal, Zap, Shield, Globe, Cpu, ArrowRight, Mail, Phone } from 'lucide-react';
import ASCIIText from './ASCIIText';
import PixelCanvas from './PixelCanvas';
import PricingAsciiBox from './PricingAsciiBox';
import WebdesignProjectShowcase from './WebdesignProjectShowcase';
import { themeClasses } from './themeClasses';

const technicalSpecs = [
  {
    name: 'Technisch Überlegen',
    icon: Cpu,
    iconClassName: 'text-blue-600'
  },
  {
    name: 'SEO Optimiert',
    icon: Zap,
    iconClassName: 'text-sky-500'
  },
  {
    name: 'DSGVO Sicher',
    icon: Shield,
    iconClassName: 'text-indigo-500'
  },
  {
    name: 'Responsive Design',
    icon: Globe,
    iconClassName: 'text-cyan-600'
  },
  {
    name: 'High-Speed Ranking',
    icon: Activity,
    iconClassName: 'text-teal-600'
  }
];

const technicalSpecMetaClassName = 'mono text-[11px] uppercase tracking-[0.18em]';

const WebdesignLandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#eef3fb_0%,#edf4fb_52%,#f4f7fc_100%)] pt-16 font-sans text-[#0f172a] selection:bg-blue-100 selection:text-blue-900 sm:pt-18">
      
      {/* Ambient Fullscreen Background */}
      <PixelCanvas colors={['#2563eb', '#3b82f6', '#38bdf8', '#6366f1', '#93c5fd']} density={0.2} gap={10} speed={26} ambient={true} noFocus={true} fixed={true} />

      {/* Navigation matching original style */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/50 bg-[linear-gradient(180deg,rgba(248,251,255,0.74),rgba(239,244,252,0.56))] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-[14px] sm:px-6">
        <a href="/" aria-label="Zur Startseite von munverricht.org" className="group flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef3fb]">
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

      <div className="flex flex-col items-center w-full px-4 sm:px-5 lg:px-0">
        <main className="relative z-10 mx-auto w-full max-w-6xl space-y-14 py-5 pb-20 sm:space-y-18 sm:py-8 sm:pb-22 lg:space-y-20">
          
          {/* HERO SECTION */}
          <section id="hero" className="relative flex flex-col items-center justify-center pt-4 text-center sm:pt-8">
            <div className="absolute left-1/2 top-6 hidden h-40 w-40 -translate-x-[25rem] rounded-full bg-blue-200/40 blur-3xl lg:block" />
            <div className="absolute right-1/2 top-24 hidden h-56 w-56 translate-x-[27rem] rounded-full bg-cyan-200/30 blur-3xl lg:block" />

            <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative flex w-full flex-col items-center">
                  <ASCIIText as="h2" text="WEBDESIGN & DELIVERY // FÜR HANDWERKER, PRAXEN & KMU" className="mb-4 text-center mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600 sm:mb-5 sm:text-xs sm:tracking-[0.3em]" noWrap={false} enableHover={false} />
                  <h1 className="mb-6 max-w-[11ch] text-balance text-[2.65rem] font-bold uppercase leading-[0.96] tracking-[0.028em] text-slate-900 sm:mb-8 sm:max-w-[12ch] sm:text-5xl md:text-7xl lg:text-[5.35rem]">
                    <ASCIIText as="span" text="PROFI-WEBSEITE" className="text-slate-900" noWrap={false} enableHover={false} />
                    {' '}
                    <ASCIIText as="span" text="AB 300 €" className="text-blue-600" noWrap={false} enableHover={false} />
                  </h1>
                </motion.div>

                <motion.p initial={{ translateY: 10, opacity: 0 }} animate={{ translateY: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative z-10 mb-7 max-w-[34ch] text-[1.02rem] font-medium leading-7 text-slate-600 sm:mb-10 sm:max-w-[60ch] sm:text-lg sm:leading-8">
                  <ASCIIText
                    as="span"
                    noWrap={false}
                    enableHover={false}
                    text="Klare Firmenwebsite statt Agentur-Gerede. Einmal zahlen, online gehen und erreichbar sein. Ich baue Ihre Seite, hoste sie kostenlos und halte sie technisch sauber – schnell, modern und DSGVO-konform."
                  />
                </motion.p>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="mb-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 px-3 text-center sm:mb-12 sm:gap-x-5 sm:px-0">
                  <span className={`${themeClasses.webMeta} text-blue-600`}>Ab 300 € einmalig</span>
                  <span className="h-1 w-1 rounded-full bg-blue-300" />
                  <span className={`${themeClasses.webMeta} text-slate-500`}>Kein Abo</span>
                  <span className="h-1 w-1 rounded-full bg-blue-300" />
                  <span className={`${themeClasses.webMeta} text-slate-500`}>Hosting inklusive</span>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.28 }} className="mb-6 flex w-full max-w-3xl flex-col items-stretch justify-center gap-3 sm:mb-10 sm:flex-row sm:items-center sm:gap-4 sm:pt-1">
                  <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} flex-1`}>
                    <Mail className="h-4 w-4 text-white" />
                    <span className={`${themeClasses.webMeta} font-bold text-white`}>Kostenlose Ersteinschätzung anfragen</span>
                  </a>
                  <a href="tel:+491633229892" className={themeClasses.webButtonSecondary}>
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>+49 163 3229892</span>
                  </a>
                </motion.div>
            </div>

            {/* "HIRING SNAPSHOT" EQUIVALENT: OFFER SNAPSHOT */}
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
                      Ihr Angebot auf einen Blick
                    </div>
                    <div className="space-y-2">
                      <p className="text-[1.85rem] font-bold tracking-tight text-slate-900 sm:text-4xl">300–400 € einmalig</p>
                      <p className="max-w-[34ch] text-sm leading-relaxed text-slate-600 sm:text-base">
                        Sie bekommen eine seriöse Unternehmensseite ohne Abo, ohne langfristige Bindung und ohne laufende Technik-Kosten.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 pt-0.5 sm:pt-1">
                    <div className={`rounded-[0.95rem] px-3.5 py-3 ${themeClasses.webCard}`}>
                      <div className="flex items-start gap-3">
                        <Globe className="mt-0.5 h-4 w-4 text-blue-500" />
                        <div>
                          <p className={`${technicalSpecMetaClassName} text-blue-600`}>Hosting</p>
                          <p className="text-sm font-semibold text-slate-900">dauerhaft inklusive</p>
                        </div>
                      </div>
                    </div>
                    <div className={`rounded-[0.95rem] px-3.5 py-3 ${themeClasses.webCard}`}>
                      <div className="flex items-start gap-3">
                        <Activity className="mt-0.5 h-4 w-4 text-sky-500" />
                        <div>
                          <p className={`${technicalSpecMetaClassName} text-blue-600`}>Wartung</p>
                          <p className="text-sm font-semibold text-slate-900">ohne monatliche Zusatzkosten</p>
                        </div>
                      </div>
                    </div>
                    <div className={`rounded-[0.95rem] px-3.5 py-3 ${themeClasses.webCard}`}>
                      <div className="flex items-start gap-3">
                        <Zap className="mt-0.5 h-4 w-4 text-indigo-500" />
                        <div>
                          <p className={`${technicalSpecMetaClassName} text-blue-600`}>Entwurf</p>
                          <p className="text-sm font-semibold text-slate-900">vorab unverbindlich</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* "TOOLING STACK" EQUIVALENT: TECHNICAL SPECS */}
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
            
            {/* "QUICK RECRUITER ACCESS" EQUIVALENT: CTA ROW */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className={`relative z-10 mt-6 w-full max-w-4xl rounded-[1.25rem] px-4 py-5 sm:mt-10 sm:rounded-[1.4rem] sm:px-6 sm:py-7 ${themeClasses.webPanel}`}>
              <div className="mb-3 text-left mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                  <ASCIIText text="// DIREKT_ANFRAGEN" />
              </div>
              <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] sm:gap-4">
                  <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} rounded-[1rem] px-4 py-4`}>
                      <Mail className="w-4 h-4 text-white" />
                      <span className={`${themeClasses.webMeta} font-bold text-white`}>Kostenlose Ersteinschätzung anfragen</span>
                  </a>
                  <a href="tel:+491633229892" className={`${themeClasses.webButtonSecondary} rounded-[1rem] px-4 py-4`}>
                     <Phone className="w-4 h-4 text-blue-600" />
                     <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>+49 163 3229892</span>
                  </a>
              </div>
            </motion.div>

            {/* THE VALIDATOR 3000 BOX & TEXT BLOCKS */}
            <div className="relative z-10 mt-14 grid w-full grid-cols-1 gap-6 border-t border-blue-200/80 pt-8 text-left sm:mt-16 sm:gap-8 sm:pt-10 lg:grid-cols-3">
              <div className="space-y-8 sm:space-y-10 lg:col-span-2">
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                    <Clock3 aria-hidden="true" className="h-3.5 w-3.5" /> <ASCIIText text="01 / EIN KURZES GESPRÄCH" noWrap={false} />
                  </div>
                  <p className="max-w-[60ch] text-base font-medium leading-7 text-slate-700 sm:text-lg sm:leading-8">
                    Sie sagen kurz, was Ihr Unternehmen braucht. Ich übersetze das in eine klare Seitenstruktur – ohne Fachbegriffe und ohne komplizierte Fragebögen.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                    <Activity aria-hidden="true" className="h-3.5 w-3.5" /> <ASCIIText text="02 / ICH BAUE DIE SEITE" noWrap={false} />
                  </div>
                  <p className="max-w-[60ch] text-base font-medium leading-7 text-slate-700 sm:text-lg sm:leading-8">
                    Ich baue Texte, Struktur, Design und mobile Ansicht so, dass Ihre Seite seriös wirkt, schnell lädt und für Kunden sofort verständlich ist.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 text-blue-600 ${themeClasses.webMeta}`}>
                    <Zap aria-hidden="true" className="h-3.5 w-3.5" /> <ASCIIText text="03 / LIVE GEHEN & FERTIG" noWrap={false} />
                  </div>
                  <p className="max-w-[60ch] text-base font-medium leading-7 text-slate-700 sm:text-lg sm:leading-8">
                    Nach der Freigabe geht Ihre Seite live. Sie zahlen einmalig und haben keine laufenden Servicekosten oder versteckten Vertragsmodelle.
                  </p>
                </div>
              </div>

              {/* Eye-Catcher integration into the standard grid */}
              <div className={`relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[1.15rem] sm:min-h-[340px] sm:rounded-[1.3rem] lg:col-span-1 ${themeClasses.webPanelSoft}`}>
                <PixelCanvas colors={['#93c5fd', '#60a5fa']} density={0.1} gap={8} />
                <PricingAsciiBox />
              </div>
            </div>

          </section>

          <WebdesignProjectShowcase />
        </main>
      </div>
    </div>
  );
};

export default WebdesignLandingPage;
