import React from 'react';
import ASCIIText from './ASCIIText';
import { themeClasses } from './themeClasses';

const WebdesignLegalFooter: React.FC = () => {
  return (
    <section className="space-y-5 border-t border-blue-100/80 pt-8" aria-label="Rechtliche Informationen">
      <div className="space-y-3 text-left">
        <p className={themeClasses.webEyebrow}>
          <ASCIIText text="// LEGAL" noWrap={false} enableHover={false} />
        </p>
        <h2 className="max-w-[16ch] text-balance text-[2rem] font-bold uppercase tracking-[0.03em] text-slate-900 sm:text-[2.35rem] sm:leading-[0.98]">
          Impressum & Datenschutz
        </h2>
        <p className="max-w-[60ch] text-[0.98rem] leading-7 text-slate-600 sm:text-[1rem] sm:leading-8">
          Impressum und Datenschutz gehoeren sichtbar zu einem serioesen Auftritt und sind hier direkt erreichbar.
        </p>
      </div>

      <div className="grid items-start gap-4 border-t border-blue-100/80 pt-4 lg:grid-cols-2">
        {[
          {
            kind: 'impressum',
            title: 'Impressum',
            body: 'Anbieter, Kontakt und rechtliche Angaben direkt erreichbar.',
            cta: 'Impressum',
          },
          {
            kind: 'datenschutz',
            title: 'Datenschutz',
            body: 'Wie Daten auf dieser Website verarbeitet werden.',
            cta: 'Datenschutz',
          },
        ].map((card) => (
          <article key={card.kind} className="border-b border-blue-100/80 pb-4 text-left last:border-b-0 lg:pb-3">
            <p className={themeClasses.webEyebrow}>{card.title}</p>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 sm:text-[0.96rem]">
              <p className="max-w-[40ch]">{card.body}</p>
            </div>
            <a
              href={`/${card.kind}`}
              className="mt-4 inline-flex min-h-[42px] items-center rounded-full border border-slate-200/80 bg-white/78 px-4 py-2.5 mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-600"
            >
              {card.cta}
            </a>
          </article>
        ))}
      </div>

      <footer className={`border-t border-blue-100/80 pt-5 pb-2 text-center mono text-[10px] leading-relaxed sm:text-xs ${themeClasses.textSoft}`}>
        <p className="break-words">(c) 2026 MAXIMILIAN UNVERRICHT // FRONTEND & WEB DELIVERY</p>
      </footer>
    </section>
  );
};

export default WebdesignLegalFooter;
