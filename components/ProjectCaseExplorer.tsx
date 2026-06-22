import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Filter, MonitorUp, Sparkles } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { Badge, Card, CardLink, Section } from './ui';
import { getProjectCases, projectSignals, type Language, type ProjectCase, type ProjectSignal } from './projectCaseData';

const labels = {
  de: {
    eyebrow: '// PROJECT_CASE_OS',
    title: 'Projektbelege, nicht Projektkacheln.',
    intro: 'Konkrete Live-Arbeiten: Ausgangslage, Bauentscheidung und nutzbares Ergebnis — schneller lesbar als eine normale Galerie.',
    constraint: 'Constraint',
    build: 'Build',
    output: 'Output',
    featured: 'Featured Proof',
    more: 'Weitere Live-Arbeiten',
    filterLabel: 'Projektfilter',
    open: 'öffnen',
    newTab: 'öffnet in neuem Tab',
    note: 'Ponytail: keine Fake-Metriken. Nur belegbare Live-Projekte und die Arbeitsentscheidung dahinter.',
  },
  en: {
    eyebrow: '// PROJECT_CASE_OS',
    title: 'Project proof, not project tiles.',
    intro: 'Concrete live work: starting constraint, build decision, and usable output — faster to read than a normal gallery.',
    constraint: 'Constraint',
    build: 'Build',
    output: 'Output',
    featured: 'Featured Proof',
    more: 'More live work',
    filterLabel: 'Project filters',
    open: 'open',
    newTab: 'opens in new tab',
    note: 'Ponytail: no fake metrics. Only verifiable live projects and the build decision behind them.',
  },
} satisfies Record<Language, Record<string, string>>;

const signalAccent: Record<ProjectSignal, string> = {
  commerce: 'text-violet-300 border-violet-500/30 bg-violet-500/10',
  'local-business': 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  prototype: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  delivery: 'text-blue-300 border-blue-500/30 bg-blue-500/10',
};

const signalLabel = (signal: ProjectSignal, language: Language) =>
  projectSignals.find((item) => item.id === signal)?.label[language] ?? signal;

const CaseText: React.FC<{ label: string; children: string }> = ({ label, children }) => (
  <p>
    <span className="text-blue-400">{label}:</span> {children}
  </p>
);

const FeaturedCaseCard: React.FC<{ project: ProjectCase; language: Language; index: number }> = ({ project, language, index }) => {
  const copy = labels[language];

  return (
    <CardLink
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full p-5 transition-transform hover:-translate-y-0.5 hover:border-blue-500/60 hover:shadow-[0_0_28px_rgba(59,130,246,0.16)] sm:p-6"
    >
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="mono text-[10px] uppercase tracking-[0.22em] text-blue-400">{copy.featured} / 0{index + 1}</p>
            <h3 className="text-xl font-bold uppercase tracking-[0.035em] text-white mono sm:text-2xl">
              {project.title}
              <span className="sr-only"> — {copy.newTab}</span>
            </h3>
          </div>
          <span className={`rounded-md border p-2 ${signalAccent[project.signal]}`} aria-hidden="true">
            <MonitorUp className="h-4 w-4" />
          </span>
        </div>

        <div className="grid gap-3 text-sm leading-relaxed text-neutral-300">
          <CaseText label={copy.constraint}>{project.constraint[language]}</CaseText>
          <CaseText label={copy.build}>{project.build[language]}</CaseText>
          <CaseText label={copy.output}>{project.output[language]}</CaseText>
        </div>

        <div className="mt-auto space-y-4 border-t border-neutral-800/80 pt-4">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Badge key={item} tone="proof" icon={<CheckCircle2 className="h-3 w-3" aria-hidden="true" />}>
                {item}
              </Badge>
            ))}
          </div>
          <span className="inline-flex items-center gap-2 mono text-[10px] uppercase tracking-[0.2em] text-blue-300 group-hover:text-blue-200">
            {project.proofLabel[language]}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </CardLink>
  );
};

const CompactCaseCard: React.FC<{ project: ProjectCase; language: Language }> = ({ project, language }) => {
  const copy = labels[language];

  return (
    <CardLink
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full p-5 hover:border-blue-500/40"
    >
      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <span className={`inline-flex rounded border px-2 py-1 mono text-[9px] uppercase tracking-[0.18em] ${signalAccent[project.signal]}`}>
              {signalLabel(project.signal, language)}
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-[0.04em] text-white">
              {project.title}
              <span className="sr-only"> — {copy.newTab}</span>
            </h3>
          </div>
          <ArrowUpRight className="h-4 w-4 text-neutral-600 transition-colors group-hover:text-blue-400" aria-hidden="true" />
        </div>
        <p className="text-xs leading-relaxed text-neutral-300">{project.output[language]}</p>
        <div className="flex flex-wrap gap-2 border-t border-neutral-800/80 pt-3">
          {project.stack.slice(0, 3).map((item) => (
            <Badge key={item} tone="muted">{item}</Badge>
          ))}
        </div>
      </div>
    </CardLink>
  );
};

const ProjectCaseExplorer: React.FC<{ language: Language }> = ({ language }) => {
  const [activeSignal, setActiveSignal] = useState<ProjectSignal | 'all'>('all');
  const visibleCases = getProjectCases(activeSignal);
  const featuredCases = visibleCases.filter((project) => project.featured);
  const compactCases = visibleCases.filter((project) => !project.featured);
  const copy = labels[language];

  return (
    <Section id="projects" spacing="md" className="border-t border-neutral-900 scroll-mt-28">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end">
        <div className="space-y-4 text-center lg:text-left">
          <h3 className="mono text-blue-500 text-xs uppercase tracking-[0.3em] opacity-70" aria-hidden="true">
            <ASCIIText text={copy.eyebrow} noWrap={false} />
          </h3>
          <h2 className="mx-auto max-w-[18ch] text-3xl font-bold uppercase tracking-[0.04em] text-white mono sm:text-4xl lg:mx-0">
            <ASCIIText text={copy.title} noWrap={false} />
          </h2>
        </div>
        <p className="mx-auto max-w-[68ch] text-center text-sm leading-relaxed text-neutral-300 lg:mx-0 lg:text-left">
          {copy.intro}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 lg:justify-start" role="group" aria-label={copy.filterLabel}>
        {projectSignals.map((signal) => {
          const isActive = activeSignal === signal.id;

          return (
            <button
              key={signal.id}
              type="button"
              onClick={() => setActiveSignal(signal.id)}
              aria-pressed={isActive}
              className={`inline-flex min-h-10 items-center gap-2 rounded-md border px-3 py-2 mono text-[10px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                isActive
                  ? 'border-blue-500/70 bg-blue-500/15 text-blue-100'
                  : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-blue-500/40 hover:text-neutral-100'
              }`}
            >
              <Filter className="h-3.5 w-3.5" aria-hidden="true" />
              {signal.label[language]}
            </button>
          );
        })}
      </div>

      {featuredCases.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredCases.map((project, index) => (
            <FeaturedCaseCard key={project.id} project={project} language={language} index={index} />
          ))}
        </div>
      )}

      {compactCases.length > 0 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4 border-t border-neutral-900 pt-6">
            <p className="mono text-[10px] uppercase tracking-[0.24em] text-neutral-500">// {copy.more}</p>
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-blue-500">{compactCases.length} Cases</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {compactCases.map((project) => (
              <CompactCaseCard key={project.id} project={project} language={language} />
            ))}
          </div>
        </div>
      )}

      <Card className="p-4 text-center text-sm leading-relaxed text-neutral-300">
        <Sparkles className="mx-auto mb-2 h-4 w-4 text-blue-400" aria-hidden="true" />
        {copy.note}
      </Card>
    </Section>
  );
};

export default ProjectCaseExplorer;
