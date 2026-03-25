import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, CreditCard, Monitor, MousePointer2, Settings, Workflow, Zap } from 'lucide-react';
import ASCIIText from './ASCIIText';

type Language = 'de' | 'en';

type ShowcaseBProps = {
  language: Language;
};

const phaseContent = {
  de: [
    {
      id: 'PHASE_01',
      title: 'Entwurf & erster Code',
      text: 'Aus Briefing, Referenzen und Seitenstruktur entsteht ein erster umsetzbarer Stand für Layouts, Komponenten und Content-Blöcke.',
      tone: 'blue' as const,
    },
    {
      id: 'PHASE_02',
      title: 'Review & Verfeinerung',
      text: 'Danach folgen manuelle Überarbeitung in der IDE, inhaltliche Schärfung, technische Korrekturen und saubere Übergänge für den Live-Betrieb.',
      tone: 'blue' as const,
    },
    {
      id: 'PHASE_03',
      title: 'Deployment & Kundenpflege',
      text: 'Nach dem Deployment über Cloudflare können passende Editierstrecken wie TinaCMS eingebunden werden, wenn Inhalte später ohne Code gepflegt werden sollen.',
      tone: 'green' as const,
    },
  ],
  en: [
    {
      id: 'PHASE_01',
      title: 'Draft & first code pass',
      text: 'A first workable version for layouts, components, and content blocks is built from the brief, references, and page structure.',
      tone: 'blue' as const,
    },
    {
      id: 'PHASE_02',
      title: 'Review & refinement',
      text: 'Then comes manual work in the IDE: content sharpening, technical fixes, and cleaner handoff quality for live use.',
      tone: 'blue' as const,
    },
    {
      id: 'PHASE_03',
      title: 'Deployment & client editing',
      text: 'After deployment through Cloudflare, an editing layer like TinaCMS can be added when ongoing content updates should happen without code changes.',
      tone: 'green' as const,
    },
  ],
};

const ShowcaseB: React.FC<ShowcaseBProps> = ({ language }) => {
  return (
    <section id="showcase-b" className="space-y-16 py-12 scroll-mt-28">
      <div className="flex flex-col items-end text-right space-y-4">
        <h3 className="mono text-blue-500 text-xs tracking-[0.3em] uppercase opacity-70" aria-hidden="true"><ASCIIText text="// WORKFLOW_USE_CASE_02" /></h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.05em] mono"><ASCIIText text="Agency workflow: draft, refine, deploy" /></h2>
        <p className="max-w-[65ch] text-neutral-200 text-sm leading-relaxed">
          {language === 'de'
            ? 'Kein Buzzword-Case, sondern ein konkreter Ablauf: schnell einen ersten Stand erzeugen, danach manuell verbessern und am Ende sauber für Kunden oder Redakteure übergeben.'
            : 'Not a buzzword case but a practical sequence: get to a first version quickly, refine it manually, then hand it over cleanly for clients or editors.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {phaseContent[language].map((phase, index) => {
          const isGreen = phase.tone === 'green';

          return (
            <motion.article
              key={phase.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`relative overflow-hidden rounded-lg border p-6 space-y-6 transition-colors ${isGreen ? 'bg-[#111111] border-neutral-900 hover:border-green-500/50' : 'bg-[#111111] border-neutral-900 hover:border-blue-500/50'}`}
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
                      <span className="animate-pulse">●</span> DRAFT_MODE
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-neutral-500">// First pass</div>
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
                       <span className="mono text-[8px] text-neutral-600">MANUAL_REVIEW</span>
                    </div>
                  </div>
                )}

                {index === 2 && (
                  <div className="h-full bg-white rounded border border-neutral-200 flex flex-col items-center justify-center gap-2">
                    <div className="w-1/2 h-2 bg-neutral-200 rounded" />
                    <div className="w-3/4 h-4 bg-blue-500/20 rounded" />
                    <div className="flex items-center gap-1 text-blue-500 mono text-[7px] font-bold">
                       <MousePointer2 className="w-2 h-2" /> EDITING_LAYER
                    </div>
                  </div>
                )}
              </div>

              <p className="text-neutral-200 text-xs leading-relaxed relative z-10">{phase.text}</p>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.45 }}
        whileHover={{ scale: 1.01 }}
        className="group rounded-xl border border-blue-500/20 bg-gradient-to-br from-[#111111] via-[#0f1118] to-[#111111] p-8 md:p-10 space-y-8 overflow-hidden relative transition-all duration-300 hover:border-blue-500/60 hover:shadow-[0_0_35px_rgba(59,130,246,0.16)]"
      >
        <div className="absolute top-0 right-0 h-52 w-52 bg-blue-500/10 blur-3xl rounded-full" aria-hidden="true" />

        <div className="relative space-y-3">
          <p className="mono text-[10px] uppercase tracking-[0.24em] text-blue-500">// CASE_03</p>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.04em] mono"><ASCIIText text="Kaffee Faensen Commerce Engine" /></h3>
            <a
              href="https://www.kaffee-faensen.de/shop/homepage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mono text-[10px] uppercase tracking-widest"
            >
              {language === 'de' ? 'Live ansehen' : 'View live'} <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
          <p className="text-neutral-200 text-sm leading-relaxed max-w-[72ch]">
            {language === 'de'
              ? 'Für den Shop wurde keine Standardvorlage übernommen, sondern eine eigene Commerce-Strecke aufgebaut. Produkte, Warenkorb und Checkout folgen den realen Anforderungen des Projekts; Stripe übernimmt die Zahlungsabwicklung.'
              : 'The shop does not rely on a standard template. A custom commerce flow was built around the actual project requirements, with Stripe handling payments.'}
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="border border-neutral-800 bg-neutral-950/70 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 mono text-[10px] uppercase tracking-widest">
              <Workflow className="w-3.5 h-3.5" aria-hidden="true" />
              {language === 'de' ? 'Eigene Shop-Logik' : 'Custom shop flow'}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {language === 'de'
                ? 'Eigene Logik statt starrem Baukasten. So lassen sich Produktdarstellung, Zustände und Checkout-Verhalten passender umsetzen.'
                : 'Custom logic instead of a rigid builder. That makes product presentation, state handling, and checkout behaviour easier to shape.'}
            </p>
          </div>

          <div className="border border-neutral-800 bg-neutral-950/70 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 mono text-[10px] uppercase tracking-widest">
              <CreditCard className="w-3.5 h-3.5" aria-hidden="true" />
              {language === 'de' ? 'Stripe-Anbindung' : 'Stripe integration'}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {language === 'de'
                ? 'Stripe ist als Zahlungsstrecke angebunden, ohne die restliche Shop-Logik an ein komplettes Standardsystem zu binden.'
                : 'Stripe handles payments without forcing the rest of the shop flow into a full off-the-shelf system.'}
            </p>
          </div>

          <div className="border border-neutral-800 bg-neutral-950/70 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 mono text-[10px] uppercase tracking-widest">
              <Monitor className="w-3.5 h-3.5" aria-hidden="true" />
              {language === 'de' ? 'Operativer Nutzen' : 'Operational value'}
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {language === 'de'
                ? 'Hilfreich, wenn ein Projekt mehr Kontrolle braucht als ein vorgegebenes Theme oder ein Standardshop liefern kann.'
                : 'Useful when a project needs more control than a preset theme or standard shop setup can provide.'}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ShowcaseB;
