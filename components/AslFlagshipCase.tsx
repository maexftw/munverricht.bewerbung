import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Cloud, GitBranch, Layers, Search, ShieldCheck } from 'lucide-react';
import ASCIIText from './ASCIIText';
import PixelCanvas from './PixelCanvas';

type Language = 'de' | 'en';

type AslFlagshipCaseProps = {
  language: Language;
};

const copy = {
  de: {
    eyebrow: '// FLAGSHIP_CASE',
    title: 'ASL Ademco Vertical Agent',
    subtitle:
      'Eine partnerfähige AI-Demo für Security-Tech-Fragen: Anfrage einordnen, Produktkorridore zeigen, Fallbacks absichern und alles browser- und buildbar halten.',
    problemLabel: 'Problem',
    problem:
      'Sicherheitsprodukte sind beratungsintensiv. Partner brauchen schnelle Orientierung zu Kompatibilität, Einsatzbereich und nächsten Prüfpunkten, ohne dass ein normaler Endkunden-Shop falsche Sicherheit vorgibt.',
    solutionLabel: 'Lösung',
    solution:
      'Separate ASL-Demo-Strecke mit Partner-Modus, sicheren Antwortkorridoren, Katalog-/RAG-Kontext, UI-Fallbacks und Eval-/Test-Hooks.',
    resultLabel: 'Ergebnis',
    result:
      'Ein prüfbarer Produktprototyp, der zeigt, wie ich AI-Workflows in echte Web-Deliverables übersetze: Frontend, Domain-Framing, QA und Cloudflare-Delivery.',
    cta: 'Case ansehen',
    proof: ['Partner Mode', 'Catalog/RAG', 'Eval Hooks', 'Cloudflare', 'Responsive QA'],
  },
  en: {
    eyebrow: '// FLAGSHIP_CASE',
    title: 'ASL Ademco Vertical Agent',
    subtitle:
      'A partner-facing AI demo for security-tech questions: classify the request, show product corridors, guard fallbacks, and keep the result browser- and build-verifiable.',
    problemLabel: 'Problem',
    problem:
      'Security products need context-heavy consultation. Partners need quick orientation around compatibility, use case, and next checks without a normal end-customer shop pretending to know too much.',
    solutionLabel: 'Solution',
    solution:
      'A separate ASL demo surface with partner mode, safe answer corridors, catalog/RAG context, UI fallbacks, and eval/test hooks.',
    resultLabel: 'Result',
    result:
      'A verifiable product prototype showing how I turn AI workflows into real web deliverables: frontend, domain framing, QA, and Cloudflare delivery.',
    cta: 'View case',
    proof: ['Partner Mode', 'Catalog/RAG', 'Eval Hooks', 'Cloudflare', 'Responsive QA'],
  },
} as const;

const proofIcons = [ShieldCheck, Search, GitBranch, Cloud, CheckCircle2];

const AslFlagshipCase: React.FC<AslFlagshipCaseProps> = ({ language }) => {
  const t = copy[language];

  return (
    <section id="asl-case" className="scroll-mt-28 border-t border-blue-500/20 pt-16 sm:pt-20">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[1.5rem] border border-blue-500/25 bg-[linear-gradient(135deg,rgba(15,23,42,0.94),rgba(8,13,23,0.88)_48%,rgba(29,78,216,0.16))] p-5 shadow-[0_28px_80px_rgba(2,6,23,0.42),inset_0_1px_0_rgba(148,163,184,0.16)] sm:p-7 lg:p-9"
      >
        <PixelCanvas colors={['#1d4ed8', '#38bdf8', '#0f172a']} density={0.12} gap={12} className="opacity-[0.18]" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/14 blur-[90px]" aria-hidden="true" />
        <div className="absolute -bottom-28 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-[100px]" aria-hidden="true" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-2 mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              <ASCIIText text={t.eyebrow} />
            </div>

            <div className="space-y-4">
              <h2 className="max-w-[10ch] text-[2.6rem] font-bold uppercase leading-[0.95] tracking-[0.02em] text-white sm:text-5xl lg:text-6xl">
                {t.title}
              </h2>
              <p className="max-w-[58ch] text-base font-medium leading-8 text-blue-50/84 sm:text-lg">
                {t.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {t.proof.map((item, index) => {
                const Icon = proofIcons[index] ?? Layers;
                return (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-slate-950/45 px-3 py-2 mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100/90">
                    <Icon className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                    {item}
                  </span>
                );
              })}
            </div>

            <a
              href="/case/asl-ademco-agent"
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full border border-blue-300/40 bg-blue-600 px-5 py-3 mono text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_16px_36px_rgba(37,99,235,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070b]"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-4">
            {[
              { label: t.problemLabel, body: t.problem },
              { label: t.solutionLabel, body: t.solution },
              { label: t.resultLabel, body: t.result },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.1rem] border border-slate-700/70 bg-slate-950/52 p-4 shadow-[inset_0_1px_0_rgba(148,163,184,0.08)] sm:p-5">
                <p className="mb-2 mono text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300">{item.label}</p>
                <p className="text-sm leading-7 text-slate-200/88">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    </section>
  );
};

export default AslFlagshipCase;
