
import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, History } from 'lucide-react';

const Evolution: React.FC = () => {
  return (
    <section id="evolution" className="space-y-16 py-12">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="mono text-blue-500 text-[10px] tracking-[0.3em] uppercase opacity-70">// CHRONOLOGICAL_DATABASE</h3>
        <h2 className="text-3xl font-bold uppercase tracking-tight">Werdegang & Meilensteine</h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-12">
        <ul className="relative pl-8 border-l border-neutral-800 space-y-16">
          {/* Game Dev Era */}
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-blue-500">2025 - HEUTE // INDIE_GAME_DEV</span>
              <h4 className="text-xl font-bold text-white uppercase tracking-tight">Game Development & Interactive Media</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Entwicklung eines eigenen Videospiels (Unreal Engine 5 / Godot). Fokus auf immersive Storytelling-Mechaniken, High-Fidelity Assets und komplexe C++ Logik. Übertragung von Web-Technologien in die Game-Engine.
              </p>
            </div>
          </motion.li>

          {/* Agentic Era */}
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-700 rounded-full flex items-center justify-center">
              <GitCommit className="w-3 h-3 text-neutral-500" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-neutral-600">2023 - 2025 // AGENTIC_PIPELINES</span>
              <h4 className="text-xl font-bold text-neutral-300 uppercase tracking-tight">AI Engineering & ZBN Pipeline</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Entwicklung lokaler RAG-Systeme für technische Gutachten (ZBN). Bau der "Stitch-to-Tina" Pipeline: Automatische Überführung von AI-Code in CMS-basierte Kundenprojekte. 100% lokale Inferenz auf High-End Hardware.
              </p>
            </div>
          </motion.li>

          {/* Legacy */}
          <motion.li
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-800 rounded-full flex items-center justify-center">
              <History className="w-3 h-3 text-neutral-700" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-neutral-600">2012 - 2023 // LEGACY_FOUNDATION</span>
              <h4 className="text-xl font-bold text-neutral-500 uppercase tracking-tight">Full-Stack & Marketing Roots</h4>
              <p className="text-neutral-600 text-sm leading-relaxed">
                10+ Jahre Erfahrung. WordPress Expert, Webflow Prototyping, zertifizierter Google Ads & Analytics Spezialist. Solides Fundament in klassischer Web-Entwicklung und digitalem Marketing.
              </p>
            </div>
          </motion.li>
        </ul>

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
