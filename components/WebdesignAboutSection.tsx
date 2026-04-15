import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { themeClasses } from './themeClasses';

const workingPrinciples = [
  'Direkter Ansprechpartner statt Vertriebsschleife',
  '12+ Jahre Erfahrung mit Websites, Inhalten und digitaler Umsetzung',
  'Struktur, Text und Umsetzung in einer Hand',
];

const WebdesignAboutSection: React.FC = () => {
  return (
    <section id="about-me" className="relative scroll-mt-28 py-12 sm:py-16 lg:py-20">
      <div className="absolute left-[3%] top-10 hidden h-36 w-36 rounded-full bg-blue-200/45 blur-3xl lg:block" aria-hidden="true" />
      <div className="absolute right-[5%] bottom-8 hidden h-40 w-40 rounded-full bg-cyan-100/70 blur-3xl lg:block" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-[1.45rem] px-4 py-5 sm:px-6 sm:py-7 md:px-8 ${themeClasses.webPanel}`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.46),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(147,197,253,0.22),transparent_28%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-center xl:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 xl:order-1"
          >
            <div className="relative mx-auto max-w-[30rem]">
              <figure className={`relative overflow-hidden rounded-[1.4rem] p-3 sm:p-4 ${themeClasses.webPanelSoft}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.48),transparent_40%)]" aria-hidden="true" />
                <div className="relative aspect-[5/6] overflow-hidden rounded-[1.1rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(226,232,240,0.34))]">
                  <img
                    src="/about/maximilian-unverricht-about.jpg"
                    alt="Maximilian Unverricht mit Hund im Schnee als persoenliches Foto fuer die About-Me-Section"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </figure>

              <div className="mt-4 px-1 text-left">
                <p className={themeClasses.webEyebrow}>Maximilian Unverricht</p>
                <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-slate-600 sm:text-[0.96rem]">
                  Dortmund, remote und direkt in der Umsetzung. Keine Zwischenstation zwischen Idee, Text und Livegang.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 space-y-6 xl:order-2"
          >
            <div className="space-y-4 text-left">
              <p className={themeClasses.webEyebrow}>
                <ASCIIText text="// ABOUT_THE_BUILDER" noWrap={false} enableHover={false} />
              </p>
              <h2 className="max-w-[14ch] text-balance text-[2.15rem] font-bold uppercase tracking-[0.03em] text-slate-900 sm:text-[2.6rem] sm:leading-[0.96]">
                Sie arbeiten direkt mit dem, der die Seite auch baut.
              </h2>
              <div className="max-w-[62ch] space-y-4 text-[1rem] leading-7 text-slate-600 sm:text-[1.04rem] sm:leading-8">
                <p>
                  Ich bin Maximilian Unverricht. Seit mehr als 12 Jahren arbeite ich an Websites, Inhalten und digitalen Auftritten fuer Unternehmen, die online vor allem eines brauchen: einen serioesen ersten Eindruck, klare Orientierung und eine Seite, die technisch sauber funktioniert.
                </p>
                <p>
                  Auf dieser Unterseite geht es deshalb nicht um Selbstdarstellung, sondern um Verstaendlichkeit und Verantwortung. Sie muessen nicht zwischen Text, Gestaltung und Technik vermitteln, weil diese Punkte bei mir direkt zusammenlaufen.
                </p>
              </div>
            </div>

            <div className={`rounded-[1.15rem] p-5 sm:p-6 ${themeClasses.webCard}`}>
              <p className={themeClasses.webEyebrow}>Worauf es in der Praxis ankommt</p>
              <p className="mt-3 max-w-[50ch] text-[1.02rem] font-medium leading-7 text-slate-800 sm:text-[1.08rem] sm:leading-8">
                Eine Firmenwebsite soll im Alltag entlasten: klar in der Aussage, ruhig im Eindruck und sauber in der Umsetzung.
              </p>
            </div>

            <ul className={`space-y-3 rounded-[1.15rem] p-5 sm:p-6 ${themeClasses.webPanelSoft}`} aria-label="Arbeitsprinzipien fuer die Zusammenarbeit">
              {workingPrinciples.map((principle) => (
                <li key={principle} className="flex items-start gap-3">
                  <span className="mt-[0.45rem] h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" aria-hidden="true" />
                  <span className="text-[0.98rem] font-medium leading-7 text-slate-700 sm:text-[1.02rem]">
                    {principle}
                  </span>
                </li>
              ))}
            </ul>

            <div className={`flex flex-col gap-4 rounded-[1.15rem] p-5 sm:p-6 ${themeClasses.webCard}`}>
              <div className="space-y-2">
                <p className={themeClasses.webEyebrow}>Wenn Sie eine Firmenwebsite brauchen, die Vertrauen aufbaut</p>
                <p className="max-w-[48ch] text-sm leading-relaxed text-slate-600 sm:text-[0.96rem]">
                  Dann ist direkter Austausch kein Detail, sondern ein Sicherheitsfaktor. Fragen landen bei der Person, die Struktur, Text und Umsetzung auch wirklich verantwortet.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} sm:flex-1`}>
                  <Mail className="h-4 w-4 text-white" />
                  <span className={`${themeClasses.webMeta} font-bold text-white`}>Direkte Rueckmeldung anfragen</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </a>
                <a href="tel:+491633229892" className={`${themeClasses.webButtonSecondary} sm:flex-1`}>
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>+49 163 3229892</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default WebdesignAboutSection;
