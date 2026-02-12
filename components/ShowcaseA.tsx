
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, CheckCircle, ShieldCheck, Database, Server } from 'lucide-react';

const ShowcaseA: React.FC = () => {
  return (
    <section id="architecture" className="space-y-16">
      <div className="space-y-4">
        <h3 className="mono text-blue-500 text-xs tracking-[0.3em] uppercase opacity-70">// ARCHITECTURE_CASE_01</h3>
        <h2 className="text-4xl font-bold uppercase tracking-tight">Zero-Cloud Engineering Pipeline</h2>
        <p className="max-w-2xl text-neutral-500 text-sm leading-relaxed">
          Für Ingenieurbüros und Statiker entwickelte Lösung zur automatisierten Verarbeitung technischer Dokumente. Der Fokus liegt auf absoluter Datensouveränität durch lokale KI-Inferenz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Technical Diagram View */}
        <div className="lg:col-span-7 bg-neutral-950 border border-neutral-900 rounded-lg p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mono text-[8px] leading-tight select-none">
            {Array(50).fill("DATA_INGESTION_MODULE_SECURE_BY_DESIGN_LOCAL_ONLY_QWEN_32B_RTX5090 ").join(" ")}
          </div>
          
          <div className="relative space-y-12">
            {/* Steps Visual */}
            <div className="flex flex-col space-y-8">
              {/* Step 1: Ingest */}
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded border border-neutral-800 bg-neutral-900 flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-neutral-400" />
                </div>
                <div className="h-px flex-1 bg-neutral-800" />
                <div className="mono text-[10px] text-neutral-500 text-right w-24">01_INGEST</div>
              </div>

              {/* Step 2: Processing (Central Hub) */}
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded border border-blue-500 bg-blue-500/10 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <Cpu className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded p-3 mono text-[9px] text-blue-400">
                  <div className="flex justify-between mb-1">
                    <span>LOCAL_INFERENCE_QWEN_32B</span>
                    <span>ACTIVE</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-1 rounded-full">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                        className="bg-blue-500 h-full rounded-full" 
                    />
                  </div>
                </div>
                <div className="mono text-[10px] text-blue-500 text-right w-24">02_PROCESS</div>
              </div>

              {/* Step 3: Verify & Output */}
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded border border-green-500/50 bg-green-500/5 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="h-px flex-1 bg-neutral-800" />
                <div className="mono text-[10px] text-green-500 text-right w-24">03_VERIFY</div>
              </div>
            </div>

            {/* Labels Area */}
            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
                <div className="mono text-[8px] text-neutral-600 uppercase">Input: Engineering PDF</div>
                <div className="mono text-[8px] text-blue-500 uppercase">RTX 5090 Inferenz</div>
                <div className="mono text-[8px] text-green-600 uppercase">Validiertes JSON</div>
            </div>
          </div>
        </div>

        {/* Right: Technical Description */}
        <div className="lg:col-span-5 space-y-8 self-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="mono text-[10px] text-blue-500 uppercase font-bold tracking-widest">>> Ingest & Extraction</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Nutzung von <strong>Docling</strong> und <strong>PyMuPDF</strong> für die präzise Extraktion von Tabellen und statischen Werten aus komplexen technischen Dokumentationen.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="mono text-[10px] text-blue-500 uppercase font-bold tracking-widest">>> Context-Aware Translation</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Keine Standard-Translation. Lokale <strong>Qwen-32B</strong> Modelle interpretieren den Kontext der Statik, um Fachbegriffe verlustfrei zu transformieren.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="mono text-[10px] text-blue-500 uppercase font-bold tracking-widest">>> Hallucination Check</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Eine integrierte <strong>Python-Validierungsebene</strong> prüft via Regex und mathematischen Checks, ob alle Zahlenwerte im Output mit dem Original übereinstimmen.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-3 rounded">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <div className="mono text-[10px] text-neutral-500">
               STATUS: <span className="text-green-500">100% SECURE / ZERO_CLOUD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseA;
