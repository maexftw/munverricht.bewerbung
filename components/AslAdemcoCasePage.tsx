import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import ASCIIText from './ASCIIText';
import AslEvidenceFlow from './AslEvidenceFlow';
import PixelCanvas from './PixelCanvas';
import { ThemeProvider } from './ThemeContext';
import { themeClasses } from './themeClasses';

type Language = 'de' | 'en';

type AslAdemcoCasePageProps = {
  language: Language;
  onLanguageChange: (nextLanguage: Language) => void;
};

const copy = {
  de: {
    back: 'Zurück',
    languageToggle: 'EN',
    eyebrow: 'CASE STUDY // AI WORKFLOW & WEB DELIVERY',
    title: 'ASL Ademco B2B Fachassistent',
    titleLines: ['ASL Ademco', 'B2B', 'Fachassistent'],
    subtitle:
      'B2B-Fachassistent für ASL Ademco: Produktsuche, Spezifikationsprüfung, Zubehör- und Projektvorschläge für Fachpartner.',
    intro:
      'Dieser Case zeigt, wie aus einer beratungsintensiven B2B-Domäne ein nachvollziehbarer Web-Prototyp wird: Frontend-Studio, serverseitige Agent-API, Produktdaten, LLM-Integration, Guardrails, mobile Bedienbarkeit und dokumentierte QA.',
    roles: ['React/Vite Studio', 'Pages Functions API', 'Produktdatenbank', 'LLM-Integration', 'Guardrails', 'QA dokumentiert'],
    sections: [
      {
        title: 'Ausgangslage',
        body:
          'ASL-Ademco-Fragen sind selten einfache Produktsuchen. Fachpartner müssen Spezifikationen, Zubehör, Projektkontext und Einsatzbereiche schnell einordnen, ohne dass ein Chat falsche Sicherheit vorgibt.',
      },
      {
        title: 'Was gebaut wurde',
        body:
          'Ein React/Vite-Studio mit serverseitiger Agent-API, Produktdatenbank, LLM-Route, fachlichem Out-of-Scope-Guard, mobilen Panels, Empty States und B2B-Vorlagen für Errichter.',
      },
      {
        title: 'Was der Case beweist',
        body:
          'Ich kann AI nicht nur als Chatfenster einbauen. Ich kann Domänenlogik, UI-Zustände, Datenfluss, Guardrails und Handoff-Dokumentation so strukturieren, dass Recruiter oder technische Teams den Arbeitsweg nachvollziehen können.',
      },
    ],
    evidenceTitle: 'Evidence Mapping',
    evidenceIntro:
      'Die öffentlichen Claims bleiben bewusst vorsichtig: Handoff-Belege werden von Checks getrennt, die vor einem Public-Green-Claim neu laufen müssten.',
    evidence: [
      { label: 'Handoff-dokumentiert', item: 'B2B-Fachassistent für Produktsuche, Spezifikationsprüfung, Zubehör und Projektvorschläge.' },
      { label: 'Vor Public-Green-Claim neu prüfen', item: 'Build-, Regression-, Stress- und Accessibility-Prüfungen nicht als aktuellen Live-Status behaupten.' },
      { label: 'Keine Secrets / keine internen Admin-Details', item: 'Keine Tokens, lokalen Pfade, Datenbanknamen, Admin-Kommandos oder operative Log-Inhalte veröffentlichen.' },
    ],
    linksTitle: 'Repo-visible source of truth',
    designDoc: 'DESIGN.md',
    evidenceDoc: 'docs/design/asl-ademco-evidence-map.md',
    ctaTitle: 'Wenn du jemanden suchst, der AI-Prototypen in echte Web-Deliverables übersetzt:',
    ctaMail: 'Kontakt aufnehmen',
  },
  en: {
    back: 'Back',
    languageToggle: 'DE',
    eyebrow: 'CASE STUDY // AI WORKFLOW & WEB DELIVERY',
    title: 'ASL Ademco B2B Assistant',
    titleLines: ['ASL Ademco', 'B2B', 'Assistant'],
    subtitle:
      'B2B assistant for ASL Ademco: product search, specification checks, accessories, and project suggestions for trade partners.',
    intro:
      'This case shows how a consultation-heavy B2B domain becomes a traceable web prototype: frontend studio, server-side agent API, product data, LLM integration, guardrails, mobile usability, and documented QA.',
    roles: ['React/Vite Studio', 'Pages Functions API', 'Product database', 'LLM integration', 'Guardrails', 'QA documented'],
    sections: [
      {
        title: 'Starting point',
        body:
          'ASL Ademco questions are rarely simple product searches. Trade partners need to classify specifications, accessories, project context, and use cases quickly without a chat creating false confidence.',
      },
      {
        title: 'What was built',
        body:
          'A React/Vite studio with a server-side agent API, product database, LLM route, domain out-of-scope guard, mobile panels, empty states, and B2B templates for installers.',
      },
      {
        title: 'What the case proves',
        body:
          'I can do more than embed a chat window. I can structure domain logic, UI states, data flow, guardrails, and handoff documentation so recruiters or technical teams can follow the work.',
      },
    ],
    evidenceTitle: 'Evidence Mapping',
    evidenceIntro:
      'Public claims stay deliberately careful: handoff evidence is separated from checks that would need a fresh run before any public green-status claim.',
    evidence: [
      { label: 'Handoff documented', item: 'B2B assistant for product search, specification checks, accessories, and project suggestions.' },
      { label: 'Rerun before public green claim', item: 'Build, regression, stress, and accessibility checks are not claimed as current live status.' },
      { label: 'No secrets / no internal admin details', item: 'No tokens, local paths, database names, admin commands, or operational log contents are published.' },
    ],
    linksTitle: 'Repo-visible source of truth',
    designDoc: 'DESIGN.md',
    evidenceDoc: 'docs/design/asl-ademco-evidence-map.md',
    ctaTitle: 'If you need someone who turns AI prototypes into real web deliverables:',
    ctaMail: 'Get in touch',
  },
} as const;

const AslAdemcoCasePage: React.FC<AslAdemcoCasePageProps> = ({ language, onLanguageChange }) => {
  const t = copy[language];

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionMeta?.getAttribute('content') ?? '';

    document.title = `${t.title} | munverricht.org`;
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', t.subtitle);
    } else {
      const nextDescription = document.createElement('meta');
      nextDescription.setAttribute('name', 'description');
      nextDescription.setAttribute('content', t.subtitle);
      document.head.appendChild(nextDescription);
    }

    return () => {
      document.title = previousTitle;
      const currentDescription = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
      currentDescription?.setAttribute('content', previousDescription);
    };
  }, [t.subtitle, t.title]);

  return (
    <ThemeProvider>
      <div className={`relative min-h-screen overflow-hidden ${themeClasses.pageShell}`}>
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(29,78,216,0.14)_0%,transparent_48%)]" />
        <div className="scanline" />
        <div className="crt-overlay" />

        <header className="relative z-20 border-b border-blue-500/15 bg-[#05070b]/82 backdrop-blur-[18px]">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <a href="/" className="inline-flex items-center gap-2 mono text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4 text-blue-400" aria-hidden="true" />
              {t.back}
            </a>
            <a href="/" className="mono text-sm font-semibold lowercase tracking-tight text-white">
              munverricht<span className="text-blue-500">.org</span>
            </a>
            <button
              type="button"
              onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded border border-slate-700 bg-slate-950/80 px-3 py-2 mono text-xs font-bold uppercase tracking-wider text-slate-100 transition-colors hover:border-blue-400"
              aria-label={language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
            >
              {t.languageToggle}
            </button>
          </div>
        </header>

        <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
          <section className="relative overflow-hidden rounded-[1.6rem] border border-blue-500/24 bg-[linear-gradient(135deg,rgba(15,23,42,0.94),rgba(8,13,23,0.9)_48%,rgba(29,78,216,0.18))] p-5 shadow-[0_28px_80px_rgba(2,6,23,0.42),inset_0_1px_0_rgba(148,163,184,0.16)] sm:p-8 lg:p-10">
            <PixelCanvas colors={['#1d4ed8', '#38bdf8', '#0f172a']} density={0.1} gap={14} className="opacity-[0.16]" />
            <div className="relative z-10 max-w-4xl space-y-6">
              <p className="max-w-full mono text-[10px] font-semibold uppercase leading-5 tracking-[0.16em] text-cyan-200 sm:text-[11px] sm:tracking-[0.28em]">
                <ASCIIText text={t.eyebrow} noWrap={false} />
              </p>
              <h1 aria-label={t.title} className="max-w-full text-[2.25rem] font-bold uppercase leading-[0.96] tracking-normal text-white sm:text-6xl lg:text-7xl">
                {t.titleLines.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="max-w-[70ch] text-lg font-medium leading-8 text-blue-50/86 sm:text-xl sm:leading-9">{t.subtitle}</p>
              <p className="max-w-[76ch] text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{t.intro}</p>
              <div className="flex flex-wrap gap-2.5">
                {t.roles.map((role) => (
                  <span key={role} className="rounded-full border border-blue-300/20 bg-slate-950/50 px-3 py-2 mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100/90">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-5 lg:grid-cols-3">
            {t.sections.map((section, index) => (
              <article key={section.title} className="rounded-[1.2rem] border border-slate-800 bg-[#0f1724]/86 p-5 shadow-[inset_0_1px_0_rgba(148,163,184,0.08)] sm:p-6">
                <p className="mb-3 mono text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-400">0{index + 1}</p>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">{section.body}</p>
              </article>
            ))}
          </section>

          <AslEvidenceFlow language={language} className="mt-10" />

          <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
            <div className="rounded-[1.2rem] border border-slate-800 bg-[#101827]/88 p-5 sm:p-6">
              <p className="mono text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-400">{t.linksTitle}</p>
              <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                <p><span className="text-cyan-200">{t.designDoc}</span> defines the visual source of truth.</p>
                <p><span className="text-cyan-200">{t.evidenceDoc}</span> maps public claims to existing evidence and rerun gates.</p>
              </div>
            </div>

            <div className="rounded-[1.2rem] border border-slate-800 bg-[#101827]/88 p-5 sm:p-6">
              <p className="mono text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-400">{t.evidenceTitle}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{t.evidenceIntro}</p>
              <div className="mt-5 grid gap-3">
                {t.evidence.map((item) => (
                  <div key={`${item.label}-${item.item}`} className="rounded-[0.9rem] border border-slate-800 bg-slate-950/52 p-4">
                    <p className="mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[1.3rem] border border-blue-500/24 bg-[linear-gradient(135deg,rgba(29,78,216,0.22),rgba(15,23,42,0.9))] p-5 text-center sm:p-7">
            <h2 className="mx-auto max-w-[56ch] text-2xl font-bold text-white sm:text-3xl">{t.ctaTitle}</h2>
            <a href="mailto:info@munverricht.org" className="mt-6 inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-blue-300/40 bg-blue-600 px-5 py-3 mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500">
              {t.ctaMail}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AslAdemcoCasePage;
