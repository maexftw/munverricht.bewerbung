import React from 'react';
import ASCIIText from './ASCIIText';

const LegalInfo: React.FC = () => {
  return (
    <section className="space-y-8 pt-12 border-t border-neutral-900" aria-label="Rechtliche Informationen">
      <div className="space-y-3">
        <h3 className="mono text-blue-500 text-xs tracking-[0.24em] uppercase">
          <ASCIIText text="// LEGAL" />
        </h3>
        <h2 className="text-2xl font-bold uppercase tracking-[0.05em] mono">
          <ASCIIText text="Impressum & Datenschutz" />
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article id="impressum" className="rounded-lg border border-neutral-800 bg-[#111111] p-6 space-y-3 scroll-mt-28">
          <h3 className="mono text-sm uppercase tracking-[0.15em] text-blue-300">Impressum</h3>
          <p className="text-sm text-neutral-200 leading-relaxed">
            Angaben gemäß § 5 TMG.
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            <strong>Maximilian Unverricht</strong><br />
            Echeloh 48<br />
            44149 Dortmund
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            E-Mail: <a href="mailto:info@graphiks.de" className="text-blue-400 hover:text-blue-300">info@graphiks.de</a><br />
            Telefon: <a href="tel:+491633229892" className="text-blue-400 hover:text-blue-300">+49 163 3229892</a>
          </p>
        </article>

        <article id="datenschutz" className="rounded-lg border border-neutral-800 bg-[#111111] p-6 space-y-3 scroll-mt-28">
          <h3 className="mono text-sm uppercase tracking-[0.15em] text-blue-300">Datenschutz</h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Verantwortlich: Maximilian Unverricht, Echeloh 48, 44149 Dortmund.
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Diese Website wird auf Cloudflare gehostet. Dabei können technisch notwendige Verbindungsdaten
            (z. B. IP-Adresse, Zeitstempel, User-Agent) zur sicheren Auslieferung und Missbrauchserkennung
            verarbeitet werden.
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Optional gesetzte Analyse- oder Komfort-Cookies erfolgen nur nach deiner Auswahl im Cookie-Banner.
            Du kannst deine Entscheidung jederzeit ändern, indem du den Local Storage Eintrag im Browser löschst.
          </p>
        </article>
      </div>
    </section>
  );
};

export default LegalInfo;
