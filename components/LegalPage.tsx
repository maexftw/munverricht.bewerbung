import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { legalPageCopy, legalRouteLabels, type LegalLanguage, type LegalPageKind } from './legalContent';

type Props = { page: LegalPageKind; language: LegalLanguage; onLanguageChange: (language: LegalLanguage) => void };

const LegalPage: React.FC<Props> = ({ page, language, onLanguageChange }) => {
  const copy = legalPageCopy[language];
  const labels = legalRouteLabels[language];
  const title = copy.title[page];
  const sections = page === 'impressum' ? copy.imprintSections : copy.privacySections;

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `${title} | munverricht.org`;
  }, [language, title]);

  return (
    <div className="legal-shell">
      <header className="case-header frame">
        <a className="brand mono" href="/"><span aria-hidden="true">›_</span> munverricht.org</a>
        <a className="back-link mono" href="/"><ArrowLeft aria-hidden="true" />{labels.backHome}</a>
        <button className="language-switch mono" onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}>{language === 'de' ? 'EN' : 'DE'}</button>
      </header>
      <main className="legal-main frame">
        <span className="micro-label mono">[ LEGAL ] · {copy.summary[page]}</span>
        <h1>{title}</h1>
        <p className="legal-intro">{copy.intro[page]}</p>
        <div className="legal-grid">{sections.map((section, index) => <article key={section.heading}><span className="mono">0{index + 1}</span><div><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="preline">{paragraph}</p>)}</div></article>)}</div>
        <p className="legal-note">{copy.note}</p>
        <nav className="legal-tabs"><a className={page === 'impressum' ? 'active' : ''} href="/impressum">{labels.legalNotice}</a><a className={page === 'datenschutz' ? 'active' : ''} href="/datenschutz">{labels.privacy}</a></nav>
      </main>
    </div>
  );
};

export default LegalPage;
