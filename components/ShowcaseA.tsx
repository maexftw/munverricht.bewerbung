import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, CheckCircle, ShieldCheck } from 'lucide-react';
import ASCIIText from './ASCIIText';

type Language = 'de' | 'en';

type ShowcaseAProps = {
  language: Language;
};

const BACKGROUND_TEXT = Array(50)
  .fill('LOCAL_DOCUMENT_WORKFLOW_PDF_INPUT_VALIDATION_TRANSLATION_JSON_OUTPUT ')
  .join(' ');

const ShowcaseA: React.FC<ShowcaseAProps> = ({ language }) => {
  return (
    <section id="showcase-a" className="space-y-16">
      <div className="space-y-4">
        <h3 className="mono text-blue-500 text-xs tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
          <ASCIIText text="// ENGINEERING_USE_CASE_01" />
        </h3>
        <h2 className="text-4xl font-bold uppercase tracking-[0.05em] mono">
          <ASCIIText text="ZBN Offline Document Workflow" />
        </h2>
        <p className="max-w-[65ch] text-neutral-200 text-sm leading-relaxed">
          {language === 'de'
            ? 'Konkretes Beispiel für die Art von lokaler LLM-Arbeit, auf die ich mich spezialisiert habe: Analyse, Übersetzung und Prüfung technischer Dokumente in einem bewusst lokalen Workflow. Entwickelt für sensible Inhalte, bei denen Verarbeitung, Kontrolle und Iteration nah an der eigentlichen Arbeitsumgebung bleiben sollen.'
            : 'A concrete example of the kind of local LLM work I specialize in: analysing, translating, and checking technical documents inside a deliberately local workflow. Built for sensitive material where processing, control, and iteration are meant to stay close to the actual working environment.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 bg-[#111111] border border-neutral-900 rounded-lg p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mono text-[8px] leading-tight select-none" aria-hidden="true">
            {BACKGROUND_TEXT}
          </div>

          <div className="relative space-y-12">
            <div className="flex flex-col space-y-8" aria-hidden="true">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded border border-neutral-800 bg-neutral-900 flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-neutral-400" />
                </div>
                <div className="h-px flex-1 bg-neutral-800" />
                <div className="mono text-[10px] text-neutral-500 text-right w-24">01_INGEST</div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded border border-blue-500 bg-blue-500/10 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <Cpu className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded p-3 mono text-[9px] text-blue-400">
                  <div className="flex justify-between mb-1">
                    <span>LOCAL_DOCUMENT_PROCESSING</span>
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

              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded border border-green-500/50 bg-green-500/5 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="h-px flex-1 bg-neutral-800" />
                <div className="mono text-[10px] text-green-500 text-right w-24">03_VERIFY</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              <div className="mono text-[8px] text-neutral-600 uppercase">Input: Engineering PDF</div>
              <div className="mono text-[8px] text-blue-500 uppercase">{language === 'de' ? 'RTX 5090 Inferenz' : 'RTX 5090 Inference'}</div>
              <div className="mono text-[8px] text-green-600 uppercase">{language === 'de' ? 'Validiertes JSON' : 'Validated JSON'}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8 self-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="mono text-[10px] text-blue-500 uppercase font-bold tracking-widest">
                <ASCIIText text=">> Ingest & Extraction" />
              </h4>
              <p className="text-neutral-200 text-sm leading-relaxed">
                {language === 'de'
                  ? 'Docling und PyMuPDF lesen Tabellen, Textblöcke und Werte aus komplexen PDFs aus und bereiten sie für die weitere Verarbeitung vor.'
                  : 'Docling and PyMuPDF extract tables, text blocks, and values from complex PDFs and prepare them for the next processing step.'}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="mono text-[10px] text-blue-500 uppercase font-bold tracking-widest">
                <ASCIIText text=">> Context-aware translation" />
              </h4>
              <p className="text-neutral-200 text-sm leading-relaxed">
                {language === 'de'
                  ? 'Die Übersetzung läuft nicht blind Wort für Wort, sondern mit Dokumentkontext, damit Fachbegriffe und technische Zusammenhänge verständlich bleiben.'
                  : 'The translation does not run word by word in isolation. It uses document context so technical terms and relationships stay understandable.'}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="mono text-[10px] text-blue-500 uppercase font-bold tracking-widest">
                <ASCIIText text=">> Validation layer" />
              </h4>
              <p className="text-neutral-200 text-sm leading-relaxed">
                {language === 'de'
                  ? 'Eine Python-Validierung prüft Zahlenwerte und formale Muster gegen das Ausgangsdokument. Das reduziert Fehler und macht Abweichungen sichtbar.'
                  : 'A Python validation layer checks numeric values and formal patterns against the source document. That helps reduce errors and makes mismatches visible.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-3 rounded">
            <ShieldCheck className="w-5 h-5 text-green-500" aria-hidden="true" />
            <div className="mono text-[10px] text-neutral-500">
              STATUS: <span className="text-green-500">LOCAL PROCESSING / VALIDATION INCLUDED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseA;
