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
    <section id="showcase-a" className="space-y-16 py-12 border-t border-[#424754]/20 scroll-mt-28">
      <div className="space-y-4 px-6">
        <div className="inline-block px-3 py-1 bg-[#2a2a2a]/60 border border-[#424754]/30 rounded">
          <span className="font-label text-xs text-[#adc6ff] uppercase tracking-[0.3em] font-bold">Engineering_Use_Case_01</span>
        </div>
        <h2 className="text-4xl font-headline font-bold text-[#e2e2e2] tracking-tighter">
          ZBN Offline Document Workflow
        </h2>
        <p className="max-w-[65ch] text-[#c2c6d6] text-base leading-relaxed font-body">
          {language === 'de'
            ? 'Konkretes Beispiel für die Art von lokaler LLM-Arbeit, auf die ich mich spezialisiert habe: Analyse, Übersetzung und Prüfung technischer Dokumente in einem bewusst lokalen Workflow. Entwickelt für sensible Inhalte, bei denen Verarbeitung, Kontrolle und Iteration nah an der eigentlichen Arbeitsumgebung bleiben sollen.'
            : 'A concrete example of the kind of local LLM work I specialize in: analysing, translating, and checking technical documents inside a deliberately local workflow. Built for sensitive material where processing, control, and iteration are meant to stay close to the actual working environment.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 max-w-6xl mx-auto items-center">
        <div className="lg:col-span-7 glass-card p-8 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none font-label text-[8px] leading-tight select-none" aria-hidden="true">
            {BACKGROUND_TEXT}
          </div>

          <div className="relative space-y-12">
            <div className="flex flex-col space-y-8" aria-hidden="true">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded border border-[#424754]/40 bg-[#131313]/60 flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-[#8c909f]" />
                </div>
                <div className="h-px flex-1 bg-[#424754]/25" />
                <div className="font-label text-[10px] text-[#8c909f] text-right w-24">01_INGEST</div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded border border-[#adc6ff] bg-[#adc6ff]/10 flex items-center justify-center shadow-[0_0_20px_rgba(173,198,255,0.2)] animate-pulse">
                  <Cpu className="w-5 h-5 text-[#adc6ff]" />
                </div>
                <div className="flex-1 bg-[#adc6ff]/5 border border-[#adc6ff]/20 rounded p-4 font-label text-[9px] text-[#adc6ff]">
                  <div className="flex justify-between mb-1.5 font-bold">
                    <span>LOCAL_DOCUMENT_PROCESSING</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#adc6ff] animate-ping" />
                      ACTIVE
                    </span>
                  </div>
                  <div className="w-full bg-[#131313]/80 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                      className="bg-[#adc6ff] h-full rounded-full"
                    />
                  </div>
                </div>
                <div className="font-label text-[10px] text-[#adc6ff] text-right w-24">02_PROCESS</div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded border border-[#adc6ff]/35 bg-[#adc6ff]/5 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#adc6ff]/80" />
                </div>
                <div className="h-px flex-1 bg-[#424754]/25" />
                <div className="font-label text-[10px] text-[#adc6ff]/80 text-right w-24">03_VERIFY</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              <div className="font-label text-[8px] text-[#8c909f] uppercase font-bold">Input: Engineering PDF</div>
              <div className="font-label text-[8px] text-[#adc6ff] uppercase font-bold">{language === 'de' ? 'RTX 5090 Inferenz' : 'RTX 5090 Inference'}</div>
              <div className="font-label text-[8px] text-[#adc6ff]/80 uppercase font-bold">{language === 'de' ? 'Validiertes JSON' : 'Validated JSON'}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-label text-xs text-[#adc6ff] uppercase font-bold tracking-widest">
                &gt;&gt; Ingest & Extraction
              </h4>
              <p className="text-[#c2c6d6] text-sm leading-relaxed font-body">
                {language === 'de'
                  ? 'Docling und PyMuPDF lesen Tabellen, Textblöcke und Werte aus komplexen PDFs aus und bereiten sie für die weitere Verarbeitung vor.'
                  : 'Docling and PyMuPDF extract tables, text blocks, and values from complex PDFs and prepare them for the next processing step.'}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-label text-xs text-[#adc6ff] uppercase font-bold tracking-widest">
                &gt;&gt; Context-aware translation
              </h4>
              <p className="text-[#c2c6d6] text-sm leading-relaxed font-body">
                {language === 'de'
                  ? 'Die Übersetzung läuft nicht blind Wort für Wort, sondern mit Dokumentkontext, damit Fachbegriffe und technische Zusammenhänge verständlich bleiben.'
                  : 'The translation does not run word by word in isolation. It uses document context so technical terms and relationships stay understandable.'}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-label text-xs text-[#adc6ff] uppercase font-bold tracking-widest">
                &gt;&gt; Validation layer
              </h4>
              <p className="text-[#c2c6d6] text-sm leading-relaxed font-body">
                {language === 'de'
                  ? 'Eine Python-Validierung prüft Zahlenwerte und formale Muster gegen das Ausgangsdokument. Das reduziert Fehler und macht Abweichungen sichtbar.'
                  : 'A Python validation layer checks numeric values and formal patterns against the source document. That helps reduce errors and makes mismatches visible.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1b1b1b]/60 border border-[#424754]/25 px-4 py-3 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-[#adc6ff]/80" aria-hidden="true" />
            <div className="font-label text-[10px] text-[#8c909f] font-bold">
              STATUS: <span className="text-[#adc6ff]">LOCAL PROCESSING / VALIDATION INCLUDED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseA;
