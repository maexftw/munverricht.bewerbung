import React, { useEffect } from 'react';
import { legalPageCopy, legalRouteLabels, type LegalLanguage, type LegalPageKind } from './legalContent';

type LegalPageProps = {
  page: LegalPageKind;
  language: LegalLanguage;
  onLanguageChange: (nextLanguage: LegalLanguage) => void;
};

const upsertMetaTag = (selector: string, attributes: Record<string, string>, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const LegalPage: React.FC<LegalPageProps> = ({ page, language, onLanguageChange }) => {
  const copy = legalPageCopy[language];
  const labels = legalRouteLabels[language];
  const title = copy.title[page];
  const intro = copy.intro[page];
  const summary = copy.summary[page];
  const sections = page === 'impressum' ? copy.imprintSections : copy.privacySections;

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionMeta?.getAttribute('content') ?? '';

    document.title = `${title} | Maximilian Unverricht`;
    upsertMetaTag('meta[name="description"]', { name: 'description' }, `${title} | ${summary}`);

    return () => {
      document.title = previousTitle || 'Webdesign für Handwerker, Praxen & KMU | Maximilian Unverricht';
      if (previousDescription) {
        upsertMetaTag('meta[name="description"]', { name: 'description' }, previousDescription);
      }
    };
  }, [summary, title]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef3fb_0%,#f7faff_48%,#ffffff_100%)] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-blue-100/80 bg-white/78 backdrop-blur-[18px]">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="/" className="mono text-sm font-semibold uppercase tracking-[0.2em] text-slate-800">
            munverricht.org
          </a>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <a
              href="/impressum"
              className={`inline-flex min-h-[40px] items-center rounded-full border px-3.5 py-2 mono text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                page === 'impressum'
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-blue-100 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              {labels.legalNotice}
            </a>
            <a
              href="/datenschutz"
              className={`inline-flex min-h-[40px] items-center rounded-full border px-3.5 py-2 mono text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                page === 'datenschutz'
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-blue-100 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              {labels.privacy}
            </a>
            <button
              type="button"
              onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}
              className="inline-flex min-h-[40px] items-center rounded-full border border-blue-100 bg-white px-3.5 py-2 mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-600"
            >
              {language === 'de' ? 'EN' : 'DE'}
            </button>
            <a
              href="/webdesign"
              className="inline-flex min-h-[40px] items-center rounded-full border border-blue-100 bg-white px-3.5 py-2 mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-600"
            >
              {labels.webdesign}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <section className="space-y-5">
          <p className="mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">{summary}</p>
          <h1 className="max-w-[18ch] text-[2.35rem] font-bold uppercase leading-[0.94] tracking-[0.02em] sm:text-[3.2rem]">
            {title}
          </h1>
          <p className="max-w-[64ch] text-[1rem] leading-7 text-slate-600 sm:text-[1.05rem] sm:leading-8">{intro}</p>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.heading}
              className="rounded-[1.2rem] border border-blue-100/80 bg-white/88 p-5 shadow-[0_18px_38px_rgba(15,23,42,0.06)] backdrop-blur-[14px] sm:p-6"
            >
              <h2 className="mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">{section.heading}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 sm:text-[0.98rem] sm:leading-8">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[1.2rem] border border-blue-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,248,253,0.76))] p-5 shadow-[0_18px_38px_rgba(15,23,42,0.05)] sm:p-6">
          <p className="mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600">
            {language === 'de' ? 'Ergänzende Angaben' : 'Additional information'}
          </p>
          <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-600 sm:text-[0.98rem] sm:leading-8">{copy.note}</p>
        </section>

        <section className="mt-10 flex flex-wrap gap-3 border-t border-blue-100/80 pt-8">
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center rounded-full border border-blue-100 bg-white px-4 py-2.5 mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-600"
          >
            {labels.backHome}
          </a>
          <a
            href="/webdesign"
            className="inline-flex min-h-[44px] items-center rounded-full border border-blue-100 bg-white px-4 py-2.5 mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition-colors hover:border-blue-200 hover:text-blue-600"
          >
            {labels.webdesign}
          </a>
        </section>
      </main>
    </div>
  );
};

export default LegalPage;
