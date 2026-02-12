
import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, History } from 'lucide-react';

const Evolution: React.FC = () => {
  return (
    <section id="evolution" className="space-y-16 py-12">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="mono text-blue-500 text-[10px] tracking-[0.3em] uppercase opacity-70">// PROFESSIONAL_HISTORY</h3>
        <h2 className="text-3xl font-bold uppercase tracking-tight">Kompilierte Erfahrung</h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-12">
        <div className="relative pl-8 border-l border-neutral-800 space-y-16">
          {/* Current State */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-blue-500">2023 - PRESENT // MAIN_AGENTIC</span>
              <h4 className="text-xl font-bold text-white uppercase tracking-tight">Vibe Coding & AI Pipelines</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Fokus auf die Architektur autonomer Agenten-Systeme. Nutzung von AI Studio zur Code-Generierung und lokaler Inferenz (Qwen/Mistral) für hochspezialisierte Business-Logik.
              </p>
            </div>
          </motion.div>

          {/* Transition */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-700 rounded-full flex items-center justify-center">
                <GitCommit className="w-3 h-3 text-neutral-500" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-neutral-600">REFACTORING_PHASE</span>
              <h4 className="text-xl font-bold text-neutral-300 uppercase tracking-tight">Synthese der Skills</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Der Übergang von klassischen Buildersystemen (Webflow) zu agentic Coding. 12 Jahre Erfahrung im Web wurden nicht verworfen, sondern als Datengrundlage für moderne KI-Workflows kompiliert.
              </p>
            </div>
          </motion.div>

          {/* Legacy */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-800 rounded-full flex items-center justify-center">
                <History className="w-3 h-3 text-neutral-700" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-neutral-600">2012 - 2022 // LEGACY_FOUNDATION</span>
              <h4 className="text-xl font-bold text-neutral-500 uppercase tracking-tight">Full-Stack & Marketing Roots</h4>
              <p className="text-neutral-600 text-sm leading-relaxed">
                10 Jahre WordPress, 2 Jahre Webflow, zertifiziert in Google Ads & Analytics. Fundierte Basis im Business-Verständnis und in der klassischen Web-Entwicklung.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="pt-8 text-center">
          <p className="mono text-[11px] text-neutral-500 italic border-t border-neutral-900 pt-8">
            "Hier ist, wie ich arbeite: Erfahrung trifft auf radikale neue Effizienz."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Evolution;
