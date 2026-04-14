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
          Impressum & Datenschutz
        </h2>
        <p className="max-w-[60ch] text-[0.98rem] leading-7 text-slate-600 sm:text-[1rem] sm:leading-8">
          Rechtliche Informationen zu dieser Website.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {[
          {
            kind: 'impressum',
            title: 'Impressum',
            body: 'Anbieter, Kontakt und rechtliche Angaben.',
            cta: 'Impressum',
          },
          {
            kind: 'datenschutz',
            title: 'Datenschutz',
            body: 'Informationen zur Datenverarbeitung auf dieser Website.',
            cta: 'Datenschutz',
          },
        ].map((card) => (
          <article key={card.kind} className={`rounded-[1.2rem] p-5 sm:p-6 ${themeClasses.webCard}`}>
            <p className={themeClasses.webEyebrow}>{card.title}</p>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-[0.96rem]">
              <p>{card.body}</p>
            </div>
            <a
              href={`/${card.kind}`}
              className="mt-5 inline-flex min-h-[44px] items-center rounded-full border border-blue-200/80 bg-white/80 px-4 py-2.5 mono text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700 transition-colors hover:border-blue-300 hover:text-blue-600"
            >
              {card.cta}
            </a>
          </article>
        ))}
      </div>

      <footer className={`border-t border-blue-100/80 pt-6 pb-2 text-center mono text-[10px] leading-relaxed sm:text-xs ${themeClasses.textSoft}`}>
        <p className="break-words">© 2026 MAXIMILIAN UNVERRICHT // FRONTEND & WEB DELIVERY</p>
      </footer>
    </section>
  );
};

export default WebdesignLegalFooter;
