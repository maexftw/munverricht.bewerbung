import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { themeClasses } from './themeClasses';

const WebdesignClosingSection: React.FC = () => {
  return (
    <section id="webdesign-closing" className="relative scroll-mt-28 py-12 sm:py-16 lg:py-20">
      <div className={`relative overflow-hidden rounded-[1.7rem] px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10 ${themeClasses.webPanel}`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_32%)]" aria-hidden="true" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="space-y-5">
            <p className={themeClasses.webEyebrow}>
              <ASCIIText text="// LETZTER_SCHRITT" noWrap={false} enableHover={false} revealOnMount={false} />
            </p>
            <h2 className="max-w-[12ch] text-balance text-[2.45rem] font-bold uppercase leading-[0.95] tracking-[0.03em] text-slate-900 sm:text-5xl lg:text-[4rem]">
              Lassen Sie uns starten.
            </h2>
            <p className="max-w-[40ch] text-base leading-7 text-slate-600 sm:text-[1.04rem] sm:leading-8">
              Sie erhalten von mir kein draengendes Verkaufsgespraech, sondern eine ehrliche Einschaetzung und einen
              realistischen Rahmen fuer Ihr Projekt.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
              <span className={`${themeClasses.webMeta} text-blue-600`}>Antwort direkt von mir</span>
              <span className="h-1 w-1 rounded-full bg-blue-300" />
              <span className={`${themeClasses.webMeta} text-slate-500`}>Kein Sales-Team</span>
              <span className="h-1 w-1 rounded-full bg-blue-300" />
              <span className={`${themeClasses.webMeta} text-slate-500`}>Dortmund / Remote</span>
            </div>
          </div>

          <div className="grid gap-3 sm:min-w-[19rem]">
            <a href="mailto:info@graphiks.de" className={themeClasses.webButtonPrimary}>
              <Mail aria-hidden="true" className="h-4 w-4 text-white" />
              <span className={`${themeClasses.webMeta} font-bold text-white`}>Jetzt unverbindlich per Mail anfragen</span>
            </a>
            <a href="tel:+491633229892" className={themeClasses.webButtonSecondary}>
              <Phone aria-hidden="true" className="h-4 w-4 text-blue-600" />
              <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>+49 163 3229892</span>
            </a>
          </div>
        </div>
      </div>

      <div className={`mt-6 grid gap-4 rounded-[1.35rem] px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center ${themeClasses.webPanelSoft}`}>
        <div className="space-y-2">
          <p className={`${themeClasses.webMeta} text-blue-600`}>Impressum & Datenschutz</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm leading-relaxed text-slate-600">
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" className="h-4 w-4 text-blue-500" />
              Echeloh 48, 44149 Dortmund
            </span>
            <span>Maximilian Unverricht</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href="/#impressum" className={themeClasses.webButtonSecondary}>
            <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>Impressum</span>
          </a>
          <a href="/#datenschutz" className={themeClasses.webButtonSecondary}>
            <span className={`${themeClasses.webMeta} font-bold text-slate-800`}>Datenschutz</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebdesignClosingSection;
