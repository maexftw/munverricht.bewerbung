import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, CreditCard, Monitor, MousePointer2, Settings, Workflow, Zap } from 'lucide-react';

const phases = [
  {
    id: 'PHASE_01',
    title: 'AI-Generation (Boilerplate)',
    text: 'Nutzung von Google AI Studio & Stitch, um in Sekunden 90% des Boilerplate-Codes für Layouts und Komponenten zu generieren.',
    tone: 'blue' as const,
  },
  {
    id: 'PHASE_02',
    title: 'Human Refinement (Logic)',
    text: 'Manuelle Verfeinerung der Logik, Sicherheit und UI-Nuancen in der IDE. Der Mensch steuert Architektur und Qualität.',
    tone: 'blue' as const,
  },
  {
    id: 'PHASE_03',
    title: 'Client Access (Visual Edit)',
    text: 'Deployment via Cloudflare. Integration von TinaCMS erlaubt dem Kunden visuelle Inhaltskontrolle, ohne den Kerncode zu beschädigen.',
    tone: 'green' as const,
  },
];

const ShowcaseB: React.FC = () => {
  return (
    <section className="space-y-16 py-12">
      <div className="flex flex-col items-end text-right space-y-4">
        <h3 className="mono text-blue-500 text-xs tracking-[0.3em] uppercase opacity-70" aria-hidden="true">// ARCHITECTURE_CASE_02</h3>
        <h2 className="text-4xl font-bold uppercase tracking-[0.05em]">AI-Accelerated Agency Workflow</h2>
        <p className="max-w-[65ch] text-neutral-200 text-sm leading-relaxed">
          Vibe-Coding trifft auf Client-Control. Ein Workflow, der Agenturen die Geschwindigkeit von KI-Generierung gibt, ohne die Wartbarkeit oder Kunden-Freiheit zu opfern.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {phases.map((phase, index) => {
          const isGreen = phase.tone === 'green';

          return (
            <motion.article
              key={phase.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`relative overflow-hidden rounded-lg border p-6 space-y-6 transition-colors ${
                isGreen ? 'bg-[#111111] border-neutral-900 hover:border-green-500/50' : 'bg-[#111111] border-neutral-900 hover:border-blue-500/50'
              }`}
            >
              <div className="absolute -top-14 -right-14 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl" aria-hidden="true" />

              <div className="flex justify-between items-center relative z-10">
                <span className="mono text-[9px] text-neutral-600 tracking-widest uppercase" aria-hidden="true">{phase.id}</span>
                {index === 0 && <Zap className="w-4 h-4 text-blue-500" aria-hidden="true" />}
                {index === 1 && <Code2 className="w-4 h-4 text-blue-500" aria-hidden="true" />}
                {index === 2 && <Monitor className="w-4 h-4 text-green-500" aria-hidden="true" />}
              </div>

              <h4 className="text-white font-bold uppercase tracking-[0.05em] relative z-10">{phase.title}</h4>

              <div className="h-24 bg-neutral-900 rounded border border-neutral-800 p-4 mono text-[8px] overflow-hidden relative" aria-hidden="true">
                {index === 0 && (
                  <>
                    <div className="absolute top-2 right-2 flex items-center gap-1 text-blue-500">
                      <span className="animate-pulse">●</span> VIBE_MODE
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-neutral-500">// AI Studio Gen</div>
                      <div>
                        <span className="text-blue-400">const</span> <span className="text-green-400">Layout</span> = compose({`{`}
                      </div>
                      <div className="pl-2">header: data.title,</div>
                      <div className="pl-2">pipeline: 'active',</div>
                      <div>{`}`})</div>
                    </div>
                  </>
                )}

                {index === 1 && (
                  <div className="h-full flex items-center justify-center border-2 border-dashed border-neutral-800 rounded">
                    <div className="flex flex-col items-center gap-2">
                      <Settings className="w-6 h-6 text-neutral-700 animate-spin-slow" />
                      <span className="mono text-[8px] text-neutral-600">ANTI-GRAVITY IDE_ACTIVE</span>
                    </div>
                  </div>
                )}

                {index === 2 && (
                  <div className="h-full bg-white rounded border border-neutral-200 flex flex-col items-center justify-center gap-2">
                    <div className="w-1/2 h-2 bg-neutral-200 rounded" />
                    <div className="w-3/4 h-4 bg-blue-500/20 rounded" />
                    <div className="flex items-center gap-1 text-blue-500 mono text-[7px] font-bold">
                      <MousePointer2 className="w-2 h-2" /> TINACMS_LAYER
                    </div>
                  </div>
                )}
              </div>

              <p className="text-neutral-200 text-xs leading-relaxed relative z-10">{phase.text}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="rounded-xl border border-blue-500/20 bg-gradient-to-br from-[#111111] via-[#0f1118] to-[#111111] p-8 md:p-10 space-y-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 h-52 w-52 bg-blue-500/10 blur-3xl rounded-full" aria-hidden="true" />

        <div className="relative space-y-3">
          <p className="mono text-[10px] uppercase tracking-[0.24em] text-blue-500">// CASE_03</p>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.04em]">Kaffee FÄNSEN Commerce Engine</h3>
            <a
              href="https://www.kaffee-faensen.de/shop/homepage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mono text-[10px] uppercase tracking-widest"
            >
              Live ansehen <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
          <p className="text-neutral-200 text-sm leading-relaxed max-w-[72ch]">
            Für den Shop entstand eine eigene vibecodete Commerce-Logik mit individueller Produkt-, Cart- und Checkout-Orchestrierung.
            Für Zahlungen ist Stripe sauber integriert.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="border border-neutral-800 bg-neutral-950/70 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 mono text-[10px] uppercase tracking-widest">
              <Workflow className="w-3.5 h-3.5" aria-hidden="true" />
              Custom Flow
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Eigene Shop-Logik statt Baukasten: volle Kontrolle über Produktdarstellung, Zustände und Conversion-Strecke.
            </p>
          </div>

          <div className="border border-neutral-800 bg-neutral-950/70 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 mono text-[10px] uppercase tracking-widest">
              <CreditCard className="w-3.5 h-3.5" aria-hidden="true" />
              Stripe Layer
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Zahlungsabwicklung über Stripe als robuster Finishing-Layer über dem eigenen Shop-Core.
            </p>
          </div>

          <div className="border border-neutral-800 bg-neutral-950/70 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 mono text-[10px] uppercase tracking-widest">
              <Monitor className="w-3.5 h-3.5" aria-hidden="true" />
              Agency Advantage
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Schnell erweiterbar, keine SaaS-Abhängigkeit, keine Limitierung durch vorgegebene Shop-Themes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseB;
