import React from 'react';
import ASCIIText from './ASCIIText';
import type { LegalLanguage } from './legalContent';

type LegalInfoProps = {
  language: LegalLanguage;
};

const LegalInfo: React.FC<LegalInfoProps> = ({ language }) => {
  const copy =
    language === 'de'
      ? {
          eyebrow: '// LEGAL',
          title: 'Impressum & Datenschutz',
          intro: 'Rechtliche Informationen zu diesem Angebot.',
          cards: [
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
          ],
        }
      : {
          eyebrow: '// LEGAL',
          title: 'Legal Notice & Privacy',
          intro: 'Legal information for this website.',
          cards: [
            {
              kind: 'impressum',
              title: 'Legal notice',
              body: 'Provider details, contact information, and legal notice.',
              cta: 'Legal notice',
            },
            {
              kind: 'datenschutz',
              title: 'Privacy',
              body: 'Information about data processing on this website.',
              cta: 'Privacy',
            },
          ],
        };

  return (
    <section className="space-y-8 border-t border-neutral-900 pt-12" aria-label={language === 'de' ? 'Rechtliche Informationen' : 'Legal information'}>
      <div className="space-y-3">
        <h3 className="mono text-xs uppercase tracking-[0.24em] text-blue-500">
          <ASCIIText text={copy.eyebrow} />
        </h3>
        <h2 className="mono text-2xl font-bold uppercase tracking-[0.05em]">
          <ASCIIText text={copy.title} />
        </h2>
        <p className="max-w-[62ch] text-sm leading-relaxed text-neutral-400">{copy.intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {copy.cards.map((card) => (
          <article key={card.kind} className="space-y-4 rounded-lg border border-neutral-800 bg-[#111111] p-6">
            <div className="space-y-2">
              <h3 className="mono text-sm uppercase tracking-[0.15em] text-blue-300">{card.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-200">{card.body}</p>
            </div>
            <a
              href={`/${card.kind}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-neutral-700 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-100 transition-colors hover:border-blue-500 hover:text-blue-300"
            >
              {card.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LegalInfo;
