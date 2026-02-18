import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, History } from 'lucide-react';
import ASCIIText from './ASCIIText';

const Evolution: React.FC = () => {
  return (
    <section id="evolution" className="space-y-16 py-12 scroll-mt-28">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="mono text-blue-500 text-[10px] tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
          <ASCIIText text="// CHRONOLOGICAL_DATABASE" />
        </h3>
        <h2 className="text-3xl font-bold uppercase tracking-[0.05em] mono">
          <ASCIIText text="Werdegang & Meilensteine" />
        </h2>
      </div>

      <div className="max-w-[65ch] mx-auto space-y-12">
        <ul className="relative pl-8 border-l border-neutral-800 space-y-16">
          {/* Game Dev Era */}
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center" aria-hidden="true">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-blue-500">2024 - HEUTE // AGENTIC_PIPELINES</span>
              <h4 className="text-xl font-bold text-white uppercase tracking-[0.05em]">AI Orchestrator & Vibe Coding</h4>
              <p className="text-neutral-200 text-sm leading-relaxed">
                Entwicklung lokaler RAG-Systeme für technische Gutachten (RAG Analysis). Bau der "Stitch-to-Tina" Pipeline: Automatische Überführung von AI-Code in CMS-basierte Kundenprojekte. Fokus auf Speed & Efficiency statt Boilerplate.
              </p>
            </div>
          </motion.li>

          {/* Agentic Era */}
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-700 rounded-full flex items-center justify-center" aria-hidden="true">
              <GitCommit className="w-3 h-3 text-neutral-500" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-neutral-600">2023 - 2024 // EXPERIMENTAL_TECH</span>
              <h4 className="text-xl font-bold text-neutral-300 uppercase tracking-[0.05em]">Creative Tech & Prototyping</h4>
              <p className="text-neutral-200 text-sm leading-relaxed">
                Tiefer Einstieg in LLMs und generative AI. Nutzung von Game-Engines (Unreal 5) für interaktive Erlebnisse. Experimente mit neuen Interfaces jenseits des klassischen Webs.
              </p>
            </div>
          </motion.li>

          {/* Legacy */}
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-800 rounded-full flex items-center justify-center" aria-hidden="true">
              <History className="w-3 h-3 text-neutral-700" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-neutral-600">2012 - 2023 // LEGACY_FOUNDATION</span>
              <h4 className="text-xl font-bold text-neutral-200 uppercase tracking-[0.05em]">Full-Stack & Marketing Roots</h4>
              <p className="text-neutral-300 text-sm leading-relaxed">
                10+ Jahre Erfahrung. WordPress Expert, Webflow Prototyping, zertifizierter Google Ads & Analytics Spezialist. Solides Fundament in klassischer Web-Entwicklung und digitalem Marketing.
              </p>
            </div>
          </motion.li>
        </ul>

      </div>
    </section>
  );
};

export default Evolution;
