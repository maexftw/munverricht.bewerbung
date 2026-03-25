import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, History } from 'lucide-react';
import ASCIIText from './ASCIIText';

type Language = 'de' | 'en';

type EvolutionProps = {
  language: Language;
};

const Evolution: React.FC<EvolutionProps> = ({ language }) => {
  return (
    <section id="evolution" className="space-y-16 py-12 scroll-mt-28">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="mono text-blue-500 text-[10px] tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
          <ASCIIText text="// CHRONOLOGICAL_DATABASE" />
        </h3>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.05em] mono">
          <ASCIIText text={language === 'de' ? 'Werdegang & Aufbau der Praxis' : 'Career Path & Practical Foundation'} />
        </h2>
      </div>

      <div className="max-w-[65ch] mx-auto space-y-12">
        <ul className="relative pl-8 border-l border-neutral-800 space-y-16">
          <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center" aria-hidden="true">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-blue-500">2024 - {language === 'de' ? 'HEUTE' : 'TODAY'} // LOCAL MODELS, VS CODE & DELIVERY</span>
              <h4 className="text-xl font-bold text-white uppercase tracking-[0.05em]">Lokale LLM-Workflows, VS Code & umsetzbare Ergebnisse</h4>
              <p className="text-neutral-200 text-sm leading-relaxed">
                {language === 'de'
                  ? 'Arbeit an React/Vite-basierten Websites, Prototypen und lokalen LLM-Workflows direkt in VS Code. Der Schwerpunkt liegt darauf, lokale Modelle sinnvoll für Coding, strukturierte Generierung, Überarbeitung und Implementierung einzusetzen, sodass aus Ideen belastbare Oberflächen, Dokumente und produktionsnahe Ergebnisse werden.'
                  : 'Working on React/Vite-based websites, prototypes, and local LLM workflows directly inside VS Code. The focus is on using local models in a practical way for coding, structured generation, refinement, and implementation so ideas become reliable interfaces, documents, and production-adjacent outcomes.'}
              </p>
            </div>
          </motion.li>

          <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-700 rounded-full flex items-center justify-center" aria-hidden="true">
              <GitCommit className="w-3 h-3 text-neutral-500" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-neutral-600">2023 - 2024 // TRANSITION INTO NEW TOOLS</span>
              <h4 className="text-xl font-bold text-neutral-300 uppercase tracking-[0.05em]">Übergang zu lokalen Modellen und editorbasierten Workflows</h4>
              <p className="text-neutral-200 text-sm leading-relaxed">
                {language === 'de'
                  ? 'Vertiefung in neue Entwicklungswerkzeuge, Automatisierung und erste lokale Modell-Setups. In dieser Phase habe ich sehr praktisch herausgearbeitet, welche agentischen Abläufe in VS Code echte Arbeit beschleunigen und welche nur gut klingen.'
                  : 'Deeper work with newer development tools, automation, and early local model setups. This phase was a very practical process of identifying which agentic workflows in VS Code genuinely speed up delivery and which ones only sound impressive.'}
              </p>
            </div>
          </motion.li>

          <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-800 rounded-full flex items-center justify-center" aria-hidden="true">
              <History className="w-3 h-3 text-neutral-700" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-neutral-600">2012 - 2023 // WEB, CMS & MARKETING FOUNDATION</span>
              <h4 className="text-xl font-bold text-neutral-200 uppercase tracking-[0.05em]">Web-Projekte, CMS-Alltag und Marketing-Praxis</h4>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {language === 'de'
                  ? 'Mehr als ein Jahrzehnt praktische Arbeit an Kundenwebsites, Content-Strukturen, WordPress/Webflow-Projekten und Marketing-nahen Anforderungen. Daraus kommt mein Blick für klare Inhalte, saubere Launches und nachvollziehbare Nutzerführung.'
                  : 'More than a decade of practical work on client websites, content structures, WordPress/Webflow projects, and marketing-adjacent requirements. That is where my focus on clear content, clean launches, and understandable user guidance comes from.'}
              </p>
            </div>
          </motion.li>
        </ul>
      </div>
    </section>
  );
};

export default Evolution;
