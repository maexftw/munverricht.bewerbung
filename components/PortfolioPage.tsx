import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, FileText, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import ASCIIText from './ASCIIText';
import SignalField from './SignalField';
import { additionalProjects, cases, labels, type CaseContent, type Language } from './portfolioContent';

type Props = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

const Header: React.FC<Props> = ({ language, onLanguageChange }) => {
  const t = labels[language];
  return (
    <header className="site-header frame">
      <a className="brand mono" href="/" aria-label="munverricht.org Startseite">
        <span aria-hidden="true">›_</span> munverricht.org
      </a>
      <nav aria-label="Hauptnavigation">
        <a href="#work">{t.nav[0]}</a>
        <a href="#about">{t.nav[1]}</a>
        <a href="#contact">{t.nav[2]}</a>
      </nav>
      <div className="header-actions">
        <button className="language-switch mono" onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')} aria-label={language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}>
          <span className={language === 'de' ? 'active' : ''}>DE</span> / <span className={language === 'en' ? 'active' : ''}>EN</span>
        </button>
        <a className="button button-primary header-resume" href="/Maximilian_Unverricht_Resume.html">
          {t.resume}<ArrowRight aria-hidden="true" />
        </a>
      </div>
    </header>
  );
};

const Flow: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="flow" aria-label={items.join(' zu ')}>
    {items.map((item, index) => (
      <React.Fragment key={item}>
        <span>{item}</span>
        {index < items.length - 1 && <ArrowRight aria-hidden="true" />}
      </React.Fragment>
    ))}
  </div>
);

const ProjectVisual: React.FC<{ project: CaseContent }> = ({ project }) => {
  if (project.image) {
    return <img className="project-image" src={project.image} alt={`${project.title} Website`} loading="lazy" />;
  }
  if (project.key === 'documents') {
    return (
      <div className="document-demo" aria-hidden="true">
        <div className="demo-sidebar mono">EINGANG<br />PRÜFUNG<br />STRUKTUR<br />AUSGABE</div>
        <div className="document-sheet">
          <span>angebot_beispiel.pdf</span>
          <strong>Struktur erkannt</strong>
          <i /><i /><i /><i />
        </div>
        <div className="output-block mono">{'{'}<br />&nbsp;&nbsp;&quot;status&quot;: &quot;geprüft&quot;,<br />&nbsp;&nbsp;&quot;output&quot;: &quot;json&quot;<br />{'}'}</div>
      </div>
    );
  }
  return (
    <div className="agent-demo" aria-hidden="true">
      <div className="demo-sidebar mono">SUCHE<br />PRODUKTE<br />SPEZIFIKATIONEN<br />ZUBEHÖR</div>
      <div className="agent-results">
        <div className="search-line">Produkt oder Spezifikation suchen</div>
        <div className="result-row"><span>Produktdaten</span><b>Kontext</b></div>
        <div className="result-row"><span>Zubehör</span><b>Prüfung</b></div>
        <div className="result-row"><span>Projektvorschlag</span><b>Routing</b></div>
      </div>
      <div className="agent-answer"><span className="mono">FACHASSISTENT</span><p>Sichere Antwort mit Quellen- und Prüfhinweis.</p></div>
    </div>
  );
};

const FeaturedCase: React.FC<{ project: CaseContent; language: Language; active?: boolean }> = ({ project, language, active }) => {
  const t = labels[language];
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className={`project-window frame ${active ? 'project-window-active' : ''}`}
      initial={reduceMotion ? false : { opacity: 1, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="window-bar mono"><span><i /> <i /> <i /></span><span>{project.title}</span><span>— □ ×</span></div>
      <div className="project-window-body">
        <div className="project-copy">
          <span className="micro-label mono">[{project.index}] {project.category}</span>
          <h3>{project.title}</h3>
          <p>{project.short}</p>
          <a className="text-link" href={project.path}>{t.openCase}<ArrowRight aria-hidden="true" /></a>
        </div>
        <ProjectVisual project={project} />
      </div>
      <Flow items={project.flow} />
    </motion.article>
  );
};

const PortfolioPage: React.FC<Props> = ({ language, onLanguageChange }) => {
  const t = labels[language];
  const selectedCases = cases[language];
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Maximilian Unverricht | AI Workflow & Web Delivery';
    document.documentElement.lang = language;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    description?.setAttribute('content', t.intro);
  }, [language, t.intro]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Zum Inhalt</a>
      <Header language={language} onLanguageChange={onLanguageChange} />
      <main id="main">
        <section className="hero frame">
          <SignalField />
          <div className="hero-copy">
            <div className="build-notes mono" aria-hidden="true"><span>[ BUILD ]<small>compose<br />develop<br />iterate</small></span><span>[ QA ]<small>test<br />validate<br />assure</small></span></div>
            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              {t.hero.split('. ').map((part, index) => <span key={part} className={index > 0 ? 'accent-line' : ''}>{part}{index < t.hero.split('. ').length - 1 ? '.' : ''}</span>)}
            </motion.h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/case/asl-ademco-agent">{t.caseCta}<ArrowRight aria-hidden="true" /></a>
              <a className="button button-secondary" href="mailto:info@munverricht.org">{t.contactCta}<ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
          <motion.figure className="portrait-window" initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={reduceMotion ? undefined : { opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.6 }}>
            <div className="window-bar mono"><span>PROJECT_IDENT: MU-01</span><span>— □ ×</span></div>
            <img src="/about/maximilian-unverricht-about.jpg" alt="Maximilian Unverricht mit seinem Hund in einer Winterlandschaft" />
            <figcaption className="mono"><span className="status-dot" /> Dortmund · Remote / Hybrid</figcaption>
          </motion.figure>
        </section>

        <section id="work" className="content-section frame">
          <div className="section-rail mono"><span>[ 01 / 04 ]</span><span>·</span><ASCIIText text={language === 'de' ? 'AUSGEWÄHLTE ARBEIT' : 'SELECTED WORK'} enableHover /></div>
          <h2>{t.workTitle}</h2>
          <div className="featured-stack">
            <FeaturedCase project={selectedCases[0]} language={language} active />
            <div className="two-column-cases">
              <FeaturedCase project={selectedCases[1]} language={language} />
              <FeaturedCase project={selectedCases[2]} language={language} active />
            </div>
          </div>
        </section>

        <section className="content-section frame">
          <div className="section-rail mono"><span>[ 02 / 04 ]</span><span>·</span><span>WEB DELIVERY</span></div>
          <h2>{t.moreWork}</h2>
          <div className="project-index">
            {additionalProjects.map((project, index) => (
              <a key={project.title} href={project.url} target="_blank" rel="noopener noreferrer" className="project-index-row">
                <span className="project-number mono">0{index + 1}</span>
                <span><strong>{project.title}</strong><small>{project.type}</small></span>
                {project.image ? <img src={project.image} alt="" loading="lazy" /> : <span className="ascii-placeholder mono" aria-hidden="true">+--[ WEB ]--+<br />| BUILD OK |<br />+----------+</span>}
                <span className="text-link">{t.openProject}<ArrowUpRight aria-hidden="true" /></span>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="about-section frame">
          <div className="section-rail mono"><span>[ 03 / 04 ]</span><span>·</span><span>ABOUT</span></div>
          <div className="about-grid">
            <div>
              <h2>{t.aboutTitle}</h2>
              <div className="timeline mono">
                <span>01</span><p>2012–2023 · Web, CMS & Marketing</p>
                <span>02</span><p>2023–2024 · Neue Tools & lokale Modelle</p>
                <span>03</span><p>{language === 'de' ? 'Seit 2024 · React, AI-Workflows & Delivery' : 'Since 2024 · React, AI workflows & delivery'}</p>
              </div>
              <p className="about-copy">{t.about}</p>
            </div>
            <div className="portrait-crop"><img src="/about/maximilian-unverricht-about.jpg" alt="Maximilian Unverricht" loading="lazy" /><span className="mono">[ HUMAN IN THE LOOP ]</span></div>
          </div>
        </section>

        <section id="contact" className="contact-section frame">
          <div className="section-rail mono"><span>[ 04 / 04 ]</span><span>·</span><span>CONTACT</span></div>
          <h2>{t.contactTitle}</h2>
          <div className="contact-links">
            <a href="mailto:info@munverricht.org"><Mail aria-hidden="true" /><span>info@munverricht.org</span><ArrowRight aria-hidden="true" /></a>
            <a href="tel:+491633229892"><Phone aria-hidden="true" /><span>+49 163 3229892</span><ArrowRight aria-hidden="true" /></a>
            <a href="https://linkedin.com/in/maximilian-unverricht-590203392" target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" /><span>LinkedIn</span><ArrowUpRight aria-hidden="true" /></a>
            <a href="https://github.com/maexftw" target="_blank" rel="noopener noreferrer"><Github aria-hidden="true" /><span>GitHub</span><ArrowUpRight aria-hidden="true" /></a>
          </div>
        </section>
      </main>
      <footer className="footer frame">
        <span>Maximilian Unverricht</span>
        <span className="footer-location"><MapPin aria-hidden="true" /> Dortmund</span>
        <nav><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></nav>
      </footer>
    </div>
  );
};

export default PortfolioPage;
