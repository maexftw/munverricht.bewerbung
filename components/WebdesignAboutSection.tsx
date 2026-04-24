import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { themeClasses } from './themeClasses';

const workingPrinciples = [
  'Direkter Kontakt ohne Vertrieb oder Projektmanager',
  'Planung, Text und Umsetzung aus einer Hand',
  '12+ Jahre Praxis in Webdesign und Marketing',
  'Typische Inhalte spaeter selbst weiterpflegbar',
];

const WebdesignAboutSection: React.FC = () => {
  return (
    <section id="about-me" className="relative scroll-mt-24 py-10 sm:scroll-mt-36 sm:py-12 lg:py-12">
      <div className="absolute left-[3%] top-10 hidden h-36 w-36 rounded-full bg-blue-200/45 blur-3xl lg:block" aria-hidden="true" />
      <div className="absolute right-[5%] bottom-8 hidden h-40 w-40 rounded-full bg-cyan-100/70 blur-3xl lg:block" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-[1.45rem] px-4 py-5 sm:px-6 sm:py-6 md:px-7 lg:px-8 ${themeClasses.webPanel}`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.46),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(147,197,253,0.22),transparent_28%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 grid gap-6 xl:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] xl:items-start xl:gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 space-y-5 xl:order-2"
          >
            <div className="space-y-4 text-left">
              <p className={themeClasses.webEyebrow}>
                <ASCIIText text="// DIREKTER_ANSPRECHPARTNER" noWrap={false} enableHover={false} />
              </p>
              <h2 className="max-w-[18ch] text-balance text-[1.95rem] font-bold uppercase tracking-[0.03em] text-slate-900 sm:text-[2.2rem] sm:leading-[0.96] lg:text-[2.35rem]">
                Direkter Kontakt von der ersten Frage bis zum Livegang.
              </h2>
              <div className="max-w-[58ch] space-y-3 text-[0.98rem] leading-7 text-slate-600 sm:text-[1rem] sm:leading-8">
                <p>
                  Sie sprechen vom ersten Gespraech bis zur fertigen Website mit derselben Person. Das spart Abstimmung, klaert Verantwortung und beschleunigt Entscheidungen.
                </p>
                <p>
                  Ich arbeite aus Dortmund und bin per E-Mail und Telefon direkt erreichbar. So bleiben Angebot, Inhalte und Umsetzung in einer klaren Linie.
                </p>
              </div>
            </div>

            <div className={`space-y-4 rounded-[1.15rem] p-5 sm:p-6 ${themeClasses.webCard}`}>
              <div className="space-y-2">
                <p className={themeClasses.webEyebrow}>Das heisst konkret</p>
                <p className="max-w-[46ch] text-[1rem] font-medium leading-7 text-slate-800 sm:text-[1.04rem] sm:leading-8">
                  Eine Firmenwebsite muss nicht alles sagen. Sie muss schnell zeigen, was Sie anbieten, warum man Ihnen vertrauen kann und wie Inhalte danach einfach weitergefuehrt werden.
                </p>
              </div>

              <ul className="space-y-3 border-t border-blue-100/80 pt-4" aria-label="Arbeitsprinzipien fuer die Zusammenarbeit">
                {workingPrinciples.map((principle) => (
                  <li key={principle} className="flex items-start gap-3">
                    <span className="mt-[0.45rem] h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" aria-hidden="true" />
                    <span className="text-[0.98rem] font-medium leading-7 text-slate-700 sm:text-[1.02rem]">{principle}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2.5 border-t border-blue-100/80 pt-4 sm:flex-row sm:gap-3">
                <a href="mailto:info@graphiks.de" className={`${themeClasses.webButtonPrimary} w-full sm:flex-1`}>
                  <Mail className="h-4 w-4 text-white" />
                  <span className={`${themeClasses.webMeta} font-bold text-white`}>Projekt anfragen</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </a>
                <a href="tel:+491633229892" className={`${themeClasses.webButtonSecondary} min-h-[46px] justify-start px-4 py-3 text-left sm:min-h-[52px] sm:flex-1 sm:justify-center`}>
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>Direkt anrufen</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 xl:order-1"
          >
            <div className="relative mx-auto max-w-[18rem] sm:max-w-[22rem] md:max-w-[26rem] xl:max-w-[28rem]">
              <figure className={`relative overflow-hidden rounded-[1.25rem] p-3 ${themeClasses.webPanelSoft}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.48),transparent_40%)]" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(226,232,240,0.34))] sm:aspect-[5/6]">
                  <img
                    src="/about/maximilian-unverricht-about.jpg"
                    alt="Maximilian Unverricht, Webdesigner aus Dortmund"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </figure>

              <div className="mt-4 px-1 text-left">
                <p className={themeClasses.webEyebrow}>Maximilian Unverricht</p>
                <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-slate-600 sm:text-[0.96rem]">
                  Dortmund. Direkt erreichbar. Ohne Vertriebsstufe.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default WebdesignAboutSection;
