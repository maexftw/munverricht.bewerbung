import React from 'react';
import ASCIIText from './ASCIIText';
import { themeClasses } from './themeClasses';

const WebdesignLegalFooter: React.FC = () => {
  return (
    <section className="space-y-8 border-t border-blue-100/80 pt-12" aria-label="Rechtliche Informationen">
      <div className="space-y-3 text-left">
        <p className={themeClasses.webEyebrow}>
          <ASCIIText text="// LEGAL" noWrap={false} enableHover={false} />
        </p>
        <h2 className="max-w-[16ch] text-balance text-[2rem] font-bold uppercase tracking-[0.03em] text-slate-900 sm:text-[2.35rem] sm:leading-[0.98]">
          Impressum und Datenschutz fuer diese Seite.
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <article id="impressum" className={`rounded-[1.2rem] p-5 sm:p-6 ${themeClasses.webCard} scroll-mt-28`}>
          <p className={themeClasses.webEyebrow}>Impressum</p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-[0.96rem]">
            <p>Angaben gemaess § 5 TMG.</p>
            <p>
              <strong className="text-slate-900">Maximilian Unverricht</strong>
              <br />
              Echeloh 48
              <br />
              44149 Dortmund
            </p>
            <p>
              E-Mail: <a href="mailto:info@graphiks.de" className="font-semibold text-blue-600 hover:text-blue-500">info@graphiks.de</a>
              <br />
              Telefon: <a href="tel:+491633229892" className="font-semibold text-blue-600 hover:text-blue-500">+49 163 3229892</a>
            </p>
          </div>
        </article>

        <article id="datenschutz" className={`rounded-[1.2rem] p-5 sm:p-6 ${themeClasses.webCard} scroll-mt-28`}>
          <p className={themeClasses.webEyebrow}>Datenschutz</p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-[0.96rem]">
            <p>Verantwortlich: Maximilian Unverricht, Echeloh 48, 44149 Dortmund.</p>
            <p>
              Diese Website wird auf Cloudflare gehostet. Dabei koennen technisch notwendige Verbindungsdaten wie IP-Adresse, Zeitstempel oder User-Agent zur sicheren Auslieferung und Missbrauchserkennung verarbeitet werden.
            </p>
            <p>
              Optionale Analyse- oder Komfort-Cookies werden nur nach Auswahl im Cookie-Banner gesetzt. Die Entscheidung kann spaeter ueber den Browser bzw. den gespeicherten Local-Storage-Eintrag veraendert werden.
            </p>
          </div>
        </article>
      </div>

      <footer className={`pt-6 pb-2 text-center mono text-[10px] sm:text-xs leading-relaxed ${themeClasses.textSoft} border-t border-blue-100/80`}>
        <p className="break-words">© 2026 MAXIMILIAN UNVERRICHT // FRONTEND & WEB DELIVERY</p>
      </footer>
    </section>
  );
};

export default WebdesignLegalFooter;
