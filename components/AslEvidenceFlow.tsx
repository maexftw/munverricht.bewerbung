import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Cloud, GitBranch, Layers, ShieldCheck, Terminal } from 'lucide-react';

type Language = 'de' | 'en';

type AslEvidenceFlowProps = {
  language: Language;
  compact?: boolean;
  className?: string;
};

const copy = {
  de: {
    label: 'ASCII_PROCESS_FLOW',
    steps: ['React/Vite Studio', 'Agent API', 'Produktdaten', 'LLM Route', 'Safe B2B Antwort'],
    stream: '->> 0101 -> ASL_QUERY -> DB_CONTEXT -> LLM_ROUTE -> GUARDED_REPLY -> 0011 ->>',
  },
  en: {
    label: 'ASCII_PROCESS_FLOW',
    steps: ['React/Vite Studio', 'Agent API', 'Product data', 'LLM route', 'Safe B2B answer'],
    stream: '->> 0101 -> ASL_QUERY -> DB_CONTEXT -> LLM_ROUTE -> GUARDED_REPLY -> 0011 ->>',
  },
} as const;

const flowIcons = [Terminal, Cloud, Layers, GitBranch, ShieldCheck];

const AslEvidenceFlow: React.FC<AslEvidenceFlowProps> = ({ language, compact = false, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = copy[language];

  return (
    <div className={`relative overflow-hidden rounded-[1.1rem] border border-blue-500/24 bg-slate-950/52 p-4 ${compact ? 'space-y-4' : 'space-y-5 sm:p-5'} ${className}`.trim()}>
      <div className="flex items-center justify-between gap-4">
        <p className="mono text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{t.label}</p>
        <CheckCircle2 className="h-4 w-4 text-green-400" aria-hidden="true" />
      </div>

      <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-5'}`}>
        {t.steps.map((step, index) => {
          const Icon = flowIcons[index] ?? Terminal;
          return (
            <div key={step} className="relative rounded-[0.85rem] border border-slate-800 bg-[#060a12]/82 p-3">
              <Icon className="mb-3 h-4 w-4 text-blue-300" aria-hidden="true" />
              <p className="mono text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-400">0{index + 1}</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-slate-100">{step}</p>
              {!compact && index < t.steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-blue-500 md:block" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>

      <div className="relative overflow-hidden border-y border-blue-500/16 py-2" aria-hidden="true">
        <motion.div
          className="mono whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300/72"
          animate={shouldReduceMotion ? undefined : { x: ['-8%', '4%', '-8%'] }}
          transition={shouldReduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: 'linear' }}
        >
          {t.stream} {t.stream}
        </motion.div>
      </div>
    </div>
  );
};

export default AslEvidenceFlow;
