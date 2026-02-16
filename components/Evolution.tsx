import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, History } from 'lucide-react';
import ASCIIText from './ASCIIText';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

interface EvolutionItem {
  period?: string;
  title?: string;
  tagline?: string;
  description?: any;
}

interface EvolutionProps {
  data?: EvolutionItem[];
}

const defaultEvolution: EvolutionItem[] = [
  {
    period: "2024 - HEUTE",
    title: "AI Orchestrator & Vibe Coding",
    tagline: "AGENTIC_PIPELINES",
    description: "Entwicklung lokaler RAG-Systeme für technische Gutachten (RAC Analysis). Bau der \"Stitch-to-Tina\" Pipeline: Automatische Überführung von AI-Code in CMS-basierte Kundenprojekte. Fokus auf Speed & Efficiency statt Boilerplate."
  },
  {
    period: "2023 - 2024",
    title: "Creative Tech & Prototyping",
    tagline: "EXPERIMENTAL_TECH",
    description: "Tiefer Einstieg in LLMs und generative AI. Nutzung von Game-Engines (Unreal 5) für interaktive Erlebnisse. Experimente mit neuen Interfaces jenseits des klassischen Webs."
  },
  {
    period: "2012 - 2023",
    title: "Full-Stack & Marketing Roots",
    tagline: "LEGACY_FOUNDATION",
    description: "10+ Jahre Erfahrung. WordPress Expert, Webflow Prototyping, zertifizierter Google Ads & Analytics Spezialist. Solides Fundament in klassischer Web-Entwicklung und digitalem Marketing."
  }
];

const Evolution: React.FC<EvolutionProps> = ({ data }) => {
  const items = data || defaultEvolution;

  return (
    <section id="evolution" className="space-y-16 py-12">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="mono text-blue-500 text-[10px] tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
          <ASCIIText text="// CHRONOLOGICAL_DATABASE" />
        </h3>
        <h2 className="text-3xl font-bold uppercase tracking-[0.05em]">
          <ASCIIText text="Werdegang & Meilensteine" />
        </h2>
      </div>

      <div className="max-w-[65ch] mx-auto space-y-12">
        <ul className="relative pl-8 border-l border-neutral-800 space-y-16">
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center" aria-hidden="true">
                {index === 0 ? (
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                ) : (
                  index === 1 ? <GitCommit className="w-3 h-3 text-neutral-500" /> : <History className="w-3 h-3 text-neutral-700" />
                )}
              </div>
              <div className="space-y-2">
                <span className="mono text-[10px] text-blue-500">{item.period} // {item.tagline}</span>
                <h4 className="text-xl font-bold text-white uppercase tracking-[0.05em]">{item.title}</h4>
                <div className="text-neutral-200 text-sm leading-relaxed">
                  {typeof item.description === 'string' ? (
                    <p>{item.description}</p>
                  ) : (
                    <TinaMarkdown content={item.description} />
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="pt-8 text-center">
          <p className="mono text-[11px] text-neutral-500 italic border-t border-neutral-900 pt-8" aria-hidden="true">
            "Hier ist, wie ich arbeite: Erfahrung trifft auf radikale neue Effizienz."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Evolution;
