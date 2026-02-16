import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code2, Monitor, MousePointer2, Settings } from 'lucide-react';
import ASCIIText from './ASCIIText';

const ShowcaseB: React.FC = () => {
  return (
    <section className="space-y-16 py-12">
      <div className="flex flex-col items-end text-right space-y-4">
        <h3 className="mono text-blue-500 text-xs tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
            <ASCIIText text="// ARCHITECTURE_CASE_02" />
        </h3>
        <h2 className="text-4xl font-bold uppercase tracking-[0.05em] mono">
            <ASCIIText text="AI-Accelerated Agency Workflow" />
        </h2>
        <p className="max-w-[65ch] text-neutral-200 text-sm leading-relaxed">
          Vibe-Coding trifft auf Client-Control. Ein Workflow, der Agenturen die Geschwindigkeit von KI-Generierung gibt, ohne die Wartbarkeit oder Kunden-Freiheit zu opfern.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Phase 1: Generation */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-[#111111] border border-neutral-900 rounded-lg p-6 space-y-6 relative group hover:border-blue-500/50 transition-colors"
        >
          <div className="flex justify-between items-center">
            <span className="mono text-[9px] text-neutral-600 tracking-widest uppercase" aria-hidden="true">PHASE_01</span>
            <Zap className="w-4 h-4 text-blue-500" aria-hidden="true" />
          </div>
          <h4 className="text-white font-bold uppercase tracking-[0.05em]">
              <ASCIIText text="AI-Generation (Boilerplate)" />
          </h4>
          <div className="h-24 bg-neutral-900 rounded border border-neutral-800 p-4 mono text-[8px] overflow-hidden relative" aria-hidden="true">
            <div className="absolute top-2 right-2 flex items-center gap-1 text-blue-500">
              <span className="animate-pulse">●</span> VIBE_MODE
            </div>
            <div className="space-y-0.5">
              <div className="text-neutral-500">// AI Studio Gen</div>
              <div>
                <span className="text-blue-400">const</span> <span className="text-green-400">Layout</span> = () ={">"} {'{'}
              </div>
              <div className="pl-2">
                <span className="text-blue-400">return</span> (
              </div>
              <div className="pl-4">
                {"<"}<span className="text-green-400">div</span> <span className="text-blue-300">className</span>=<span className="text-yellow-500">"grid grid-cols-12 gap-4"</span>{">"}
              </div>
              <div className="pl-6">
                {"<"}<span className="text-green-400">Section</span> <span className="text-blue-300">header</span>={'{'}<span className="text-neutral-300">data.title</span>{'}'} {"/>"}
              </div>
              <div className="pl-6">
                {"<"}<span className="text-green-400">Pipeline</span> <span className="text-blue-300">status</span>=<span className="text-yellow-500">"active"</span> {"/>"}
              </div>
              <div className="pl-4">{"</"}<span className="text-green-400">div</span>{">"}</div>
              <div className="pl-2">)</div>
              <div>{'}'}</div>
            </div>
          </div>
          <p className="text-neutral-200 text-xs leading-relaxed">
            Nutzung von <strong>Google AI Studio & Stitch</strong>, um in Sekunden 90% des Boilerplate-Codes für Layouts und Komponenten zu generieren.
          </p>
        </motion.div>

        {/* Phase 2: Refinement */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#111111] border border-neutral-900 rounded-lg p-6 space-y-6 relative hover:border-blue-500/50 transition-colors"
        >
          <div className="flex justify-between items-center">
            <span className="mono text-[9px] text-neutral-600 tracking-widest uppercase" aria-hidden="true">PHASE_02</span>
            <Code2 className="w-4 h-4 text-blue-500" aria-hidden="true" />
          </div>
          <h4 className="text-white font-bold uppercase tracking-[0.05em]">
              <ASCIIText text="Human Refinement (Logic)" />
          </h4>
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-neutral-800 rounded" aria-hidden="true">
            <div className="flex flex-col items-center gap-2">
                <Settings className="w-6 h-6 text-neutral-700 animate-spin-slow" />
                <span className="mono text-[8px] text-neutral-600">ANTI-GRAVITY IDE_ACTIVE</span>
            </div>
          </div>
          <p className="text-neutral-200 text-xs leading-relaxed">
            Manuelle Verfeinerung der Logik, Sicherheit und UI-Nuancen in der IDE. Der Mensch steuert die Architektur, die KI liefert die Bausteine.
          </p>
        </motion.div>

        {/* Phase 3: Delivery */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#111111] border border-neutral-900 rounded-lg p-6 space-y-6 relative hover:border-green-500/50 transition-colors"
        >
          <div className="flex justify-between items-center">
            <span className="mono text-[9px] text-neutral-600 tracking-widest uppercase" aria-hidden="true">PHASE_03</span>
            <Monitor className="w-4 h-4 text-green-500" aria-hidden="true" />
          </div>
          <h4 className="text-white font-bold uppercase tracking-[0.05em]">
              <ASCIIText text="Client Access (Visual Edit)" />
          </h4>
          <div className="h-24 bg-white rounded border border-neutral-200 flex flex-col items-center justify-center gap-2" aria-hidden="true">
             <div className="w-1/2 h-2 bg-neutral-200 rounded" />
             <div className="w-3/4 h-4 bg-blue-500/20 rounded" />
             <div className="flex items-center gap-1 text-blue-500 mono text-[7px] font-bold">
                <MousePointer2 className="w-2 h-2" /> TINACMS_LAYER
             </div>
          </div>
          <p className="text-neutral-200 text-xs leading-relaxed">
            Deployment via <strong>Cloudflare</strong>. Integration von <strong>TinaCMS</strong> erlaubt dem Kunden volle visuelle Kontrolle, ohne den Code zu beschädigen.
          </p>
        </motion.div>
      </div>

      <div className="text-center bg-neutral-900/50 border border-neutral-800 p-8 rounded-lg">
         <p className="text-neutral-200 text-sm max-w-[65ch] mx-auto italic leading-relaxed">
          "Maximale Geschwindigkeit von KI kombiniert mit der unantastbaren Qualität eines handgeschriebenen Systems. Null laufende SaaS-Kosten für Pagebuilder-Abos."
         </p>
      </div>
    </section>
  );
};

export default ShowcaseB;
