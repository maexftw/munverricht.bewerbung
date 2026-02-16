import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Zap, Activity } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center space-y-8 pt-20">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full" aria-hidden="true" />
        <h2 className="mono text-blue-500 text-xs tracking-[0.4em] uppercase mb-4">
          CREATIVE TECHNOLOGIST // GAME DEVELOPER // AGENTIC PIONEER
        </h2>
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-[0.05em] leading-tight">
          MAXIMILIAN <span className="text-blue-500">UNVERRICHT</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-[65ch] text-neutral-200 text-lg font-medium leading-relaxed"
      >
        Architekt autonomer Pipelines & Indie Game Developer. Ich verbinde <span className="text-white">High-End Engineering</span> mit <span className="text-white">künstlerischer Vision</span>. Spezialisiert auf lokale KI-Infrastruktur und immersive interaktive Erlebnisse.
      </motion.p>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative shadow-[0_0_30px_rgba(59,130,246,0.15)] px-8 py-4 bg-neutral-900 border border-neutral-800 hover:border-blue-500 transition-all duration-300 rounded shadow-lg"
          aria-label="Zum Abschnitt Systemarchitektur scrollen"
        >
          <span className="relative flex items-center mono font-bold uppercase tracking-[0.05em] text-xs">
            Show System Architecture <Zap className="ml-2 w-3 h-3 text-blue-500" aria-hidden="true" />
          </span>
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-24 text-left border-t border-neutral-900 pt-12">
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <Terminal className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> 01 / CORE ARCHITECTURE
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">Agentic Workflow via Google AI Studio & Stitch. Lokale Entwicklung in der Anti-Gravity IDE.</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <Activity className="w-3.5 h-3.5 mr-2" aria-hidden="true" /> 02 / PERFORMANCE
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">Statische, wartungsarme Deployments. Maximale Geschwindigkeit bei minimalen Betriebskosten.</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-blue-500 mono text-[10px] tracking-[0.05em]">
            <div className="w-3 h-3 rounded-full border border-blue-500 flex items-center justify-center mr-2" aria-hidden="true">
              <div className="w-1 h-1 bg-blue-500 rounded-full" />
            </div> 03 / SOVEREIGNTY
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">Fokus auf lokale Inferenz (Zero-Cloud). Datensouveränität durch Private LLM Hosting.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
