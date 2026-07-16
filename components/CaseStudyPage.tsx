import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import SignalField from './SignalField';
import { cases, labels, type Language } from './portfolioContent';

type Props = {
  path: string;
  language: Language;
  onLanguageChange: (language: Language) => void;
};

const CaseStudyPage: React.FC<Props> = ({ path, language, onLanguageChange }) => {
  const reduceMotion = useReducedMotion();
  const project = cases[language].find((item) => item.path === path);
  const t = labels[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = project ? `${project.title} | Maximilian Unverricht` : 'Case nicht gefunden | munverricht.org';
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (project) description?.setAttribute('content', project.short);
  }, [language, project]);

  if (!project) {
    return (
      <main className="case-missing frame">
        <span className="micro-label mono">[ 404 ]</span>
        <h1>{language === 'de' ? 'Dieser Case ist nicht verfügbar.' : 'This case is not available.'}</h1>
        <a className="button button-primary" href="/"><ArrowLeft aria-hidden="true" />{t.back}</a>
      </main>
    );
  }

  const preview = project.key === 'faensen' ? (
    <div className="case-preview-image"><img src={project.image} alt="Kaffee Faensen Website" /></div>
  ) : project.key === 'documents' ? (
    <div className="case-preview-ui document-preview" aria-label={language === 'de' ? 'Schematische Darstellung des lokalen Dokumenten-Workflows' : 'Schematic view of the local document workflow'}>
      <aside className="mono">EINGANG<br />EXTRAKTION<br />PRÜFUNG<br />AUSGABE</aside>
      <article><span className="mono">angebot_beispiel.pdf</span><h3>{language === 'de' ? 'Struktur erkannt' : 'Structure detected'}</h3><i /><i /><i /><i /></article>
      <pre>{'{\n  "status": "validated",\n  "output": "structured_json"\n}'}</pre>
    </div>
  ) : (
    <div className="case-preview-ui agent-preview" aria-label={language === 'de' ? 'Schematische Darstellung des B2B Fachassistenten' : 'Schematic view of the B2B assistant'}>
      <div className="preview-toolbar mono"><strong>asl <small>ademco</small></strong><span>{language === 'de' ? 'Produkt, Merkmal oder Anwendung suchen …' : 'Search product, specification, or application …'}</span></div>
      <aside className="mono">SUCHE<br />SPEZIFIKATIONEN<br />ZUBEHÖR<br />PROJEKTE</aside>
      <article><span className="micro-label mono">[ PRODUKTDATEN ]</span><h3>{language === 'de' ? 'Passende Daten im Kontext' : 'Relevant data in context'}</h3><div className="preview-tags"><b>Produkt</b><b>Spezifikation</b><b>Zubehör</b></div><i /><i /><i /></article>
      <section><span className="micro-label mono">[ FACHASSISTENT ]</span><p>{language === 'de' ? 'Antwort mit Prüfhinweis und klarer nächster Aktion.' : 'Answer with validation note and a clear next action.'}</p><button type="button">{language === 'de' ? 'Spezifikation prüfen' : 'Check specification'}<ArrowRight aria-hidden="true" /></button></section>
    </div>
  );

  return (
    <div className="case-shell">
      <header className="case-header frame">
        <a className="brand mono" href="/"><span aria-hidden="true">›_</span> munverricht.org</a>
        <a className="back-link mono" href="/"><ArrowLeft aria-hidden="true" />{t.back}</a>
        <button className="language-switch mono" onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}>
          <span className={language === 'de' ? 'active' : ''}>DE</span> / <span className={language === 'en' ? 'active' : ''}>EN</span>
        </button>
      </header>

      <main>
        <section className="case-hero frame">
          <SignalField />
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="micro-label mono">[ CASE {project.index} ] · {project.category}</span>
            <h1>{project.title}</h1>
            <p>{project.short}</p>
          </motion.div>
          <div className="case-status mono"><span className="status-dot" />{t.status}</div>
        </section>

        <section className="case-preview frame">
          <span className="micro-label mono">[ INTERFACE / PROOF OF WORK ]</span>
          {preview}
        </section>

        <section className="case-flow frame" aria-label={project.flow.join(' → ')}>
          <span className="micro-label mono">[ SYSTEM FLOW ]</span>
          <div>{project.flow.map((item, index) => <React.Fragment key={item}><span>{item}</span>{index < project.flow.length - 1 && <ArrowRight aria-hidden="true" />}</React.Fragment>)}</div>
        </section>

        <section className="case-narrative frame">
          {[
            [t.problem, project.problem],
            [t.approach, project.approach],
            [t.result, project.result],
          ].map(([heading, body], index) => (
            <motion.article key={heading} initial={reduceMotion ? false : { opacity: 1, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
              <span className="mono">0{index + 1}</span><div><h2>{heading}</h2><p>{body}</p></div>
            </motion.article>
          ))}
        </section>

        <section className="case-evidence frame">
          <div><span className="micro-label mono">[ {t.evidence.toUpperCase()} ]</span><h2>{language === 'de' ? 'Was im Repository nachvollziehbar ist.' : 'What can be traced in the repository.'}</h2></div>
          <ul>{project.proof.map((proof) => <li key={proof}><span className="status-dot" />{proof}</li>)}</ul>
        </section>

        <section className="case-next frame">
          <span className="micro-label mono">[ NEXT ]</span>
          <h2>{language === 'de' ? 'Mehr sehen oder direkt sprechen.' : 'See more or start a conversation.'}</h2>
          <div><a className="button button-secondary" href="/"><ArrowLeft aria-hidden="true" />{t.back}</a><a className="button button-primary" href="mailto:info@munverricht.org"><Mail aria-hidden="true" />info@munverricht.org</a></div>
        </section>
      </main>

      <footer className="footer frame"><span>Maximilian Unverricht</span><nav><a href="https://github.com/maexftw"><Github aria-hidden="true" />GitHub</a><a href="https://linkedin.com/in/maximilian-unverricht-590203392"><Linkedin aria-hidden="true" />LinkedIn</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></nav></footer>
    </div>
  );
};

export default CaseStudyPage;
