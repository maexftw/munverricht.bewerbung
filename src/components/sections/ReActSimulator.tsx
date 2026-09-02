import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { flagshipAslAdemcoData } from '../../data/flagshipAslAdemco';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Database,
} from 'lucide-react';
import { SteppedButton } from '../ui/SteppedButton';

export const ReActSimulator: React.FC = () => {
  const { language } = useLanguage();
  const traces = flagshipAslAdemcoData.reactTraces;

  const [selectedTraceId, setSelectedTraceId] = useState(traces[0]?.id || 'trace-1');
  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimerRef = useRef<number | null>(null);

  const activeTrace = traces.find((t) => t.id === selectedTraceId) || traces[0]!;
  const maxCycles = activeTrace.cycles.length;
  const isFinished = currentCycleIndex >= maxCycles;

  // Auto-play interval effect
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = window.setInterval(() => {
        setCurrentCycleIndex((prev) => {
          if (prev >= maxCycles) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2400);
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
      playTimerRef.current = null;
    }

    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    };
  }, [isPlaying, maxCycles]);

  const handleSelectTrace = (id: string) => {
    setSelectedTraceId(id);
    setCurrentCycleIndex(0);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentCycleIndex <= maxCycles) {
      setCurrentCycleIndex((prev) => Math.min(prev + 1, maxCycles));
    }
  };

  const handlePrev = () => {
    setCurrentCycleIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setCurrentCycleIndex(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isFinished) {
      setCurrentCycleIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Visible cycles up to current index
  const visibleCycles = activeTrace.cycles.slice(0, currentCycleIndex);

  return (
    <div className="bg-[var(--bgInverse)] text-[var(--bg1)] rounded-2xl p-5 sm:p-7 border border-[var(--bgInverse2)] shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--bgInverse2)]/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent1)] animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent2)]">
              INTERACTIVE REASONING RUNTIME
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[var(--accent1)]" />
            <span>ReAct Agent Loop Simulator</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-mono">
            {language === 'de'
              ? 'Interaktiver Schritt-für-Schritt Trace des Thought → Action → Observation → Final Answer Zyklus (max. 7 Zyklen).'
              : 'Interactive step-by-step trace of Thought → Action → Observation → Final Answer loop (max 7 cycles).'}
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="ReAct Loop Trace Presets">
          {traces.map((trace, idx) => (
            <button
              key={trace.id}
              type="button"
              aria-pressed={selectedTraceId === trace.id}
              onClick={() => handleSelectTrace(trace.id)}
              className={`touch-target px-3 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors border min-h-[44px] ${
                selectedTraceId === trace.id
                  ? 'bg-[var(--accent1)] text-white border-[var(--accent1)] shadow-md'
                  : 'bg-[var(--bgInverse2)] text-gray-300 hover:text-white border-white/10'
              }`}
            >
              Preset {idx + 1}: {trace.title.slice(0, 20)}...
            </button>
          ))}
        </div>
      </div>

      {/* User Inquiry Box */}
      <div className="p-4 rounded-xl bg-[var(--darkBg1)] border border-[var(--darkInverse2)] space-y-1.5">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent2)]">
          {language === 'de' ? 'Eingehende Installateur-Anfrage:' : 'Incoming Installer Inquiry:'}
        </div>
        <p className="text-sm sm:text-base font-mono text-gray-100 italic">
          "{activeTrace.query}"
        </p>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-[var(--bgInverse2)]/60 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <SteppedButton
            size="sm"
            variant="neutral"
            steppedShadow="none"
            onClick={handlePrev}
            disabled={currentCycleIndex === 0}
            icon={<ChevronLeft className="w-4 h-4" />}
            aria-label="Previous step"
          >
            {language === 'de' ? 'Zurück' : 'Prev'}
          </SteppedButton>

          <SteppedButton
            size="sm"
            variant="primary"
            steppedShadow="none"
            onClick={handleNext}
            disabled={currentCycleIndex >= maxCycles}
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
            aria-label="Next step"
          >
            {language === 'de' ? 'Nächster Schritt' : 'Next Step'}
          </SteppedButton>

          <SteppedButton
            size="sm"
            variant="secondary"
            steppedShadow="none"
            onClick={togglePlay}
            icon={
              isPlaying ? (
                <Pause className="w-4 h-4 text-[var(--bgInverse)]" />
              ) : (
                <Play className="w-4 h-4 text-[var(--bgInverse)]" />
              )
            }
            aria-label={isPlaying ? 'Pause trace' : 'Auto play trace'}
          >
            {isPlaying
              ? language === 'de'
                ? 'Pause'
                : 'Pause'
              : isFinished
              ? language === 'de'
                ? 'Neustart'
                : 'Replay'
              : language === 'de'
              ? 'Auto-Play'
              : 'Auto-Play'}
          </SteppedButton>

          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset simulation"
            className="touch-target p-2 rounded text-gray-400 hover:text-white hover:bg-[var(--bgInverse2)] transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Tracker Pill */}
        <div className="flex items-center gap-2 font-mono text-xs text-gray-300">
          <span>
            {language === 'de' ? 'Zyklus' : 'Cycle'}:{' '}
            <strong className="text-[var(--accent2)] font-black text-sm">
              {currentCycleIndex}
            </strong>{' '}
            / {maxCycles}
          </span>
          {currentCycleIndex >= maxCycles && (
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-[11px]">
              ✓ VERIFIED
            </span>
          )}
        </div>
      </div>

      {/* Main Two-Column Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Step-by-Step Reasoning Chain */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[var(--accent1)]" />
            <span>
              {language === 'de' ? 'Ausgeführte ReAct Schritte' : 'Executed ReAct Reasoning Steps'}
            </span>
          </div>

          {currentCycleIndex === 0 ? (
            <div className="p-8 text-center rounded-xl bg-[var(--darkBg1)] border border-dashed border-gray-600 text-gray-400 font-mono text-xs space-y-2">
              <Cpu className="w-8 h-8 text-[var(--accent1)] mx-auto opacity-70 animate-bounce" />
              <p>
                {language === 'de'
                  ? 'Klicken Sie auf "Nächster Schritt" oder "Auto-Play", um die ReAct-Reasoning-Schleife zu starten.'
                  : 'Click "Next Step" or "Auto-Play" to initiate the ReAct reasoning loop.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
              {visibleCycles.map((step) => (
                <div
                  key={step.cycle}
                  className="p-4 rounded-xl bg-[var(--darkBg1)] border border-[var(--darkInverse2)] shadow-md space-y-2.5 animate-[hypFadeIn_0.2s_ease-out]"
                >
                  {/* Step Cycle Header */}
                  <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-1.5">
                    <span className="font-bold text-gray-300">
                      [CYCLE {step.cycle}]
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase">
                      THOUGHT + TOOL CALL
                    </span>
                  </div>

                  {/* Thought */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-purple-400 block">
                      🧠 THOUGHT:
                    </span>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans">
                      {step.thought}
                    </p>
                  </div>

                  {/* Action / Tool */}
                  <div className="space-y-1 bg-black/40 p-2.5 rounded-lg border border-white/5 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
                      <span>⚡ ACTION: {step.tool}()</span>
                      <span className="text-[10px] text-gray-400">Cloudflare Worker</span>
                    </div>
                    <pre className="text-[11px] text-gray-300 overflow-x-auto m-0 p-0">
                      <code>{JSON.stringify(step.args, null, 2)}</code>
                    </pre>
                  </div>

                  {/* Observation */}
                  <div className="space-y-1 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/20 font-mono text-xs">
                    <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                      <span>🔍 OBSERVATION (Cloudflare D1 SQLite):</span>
                      <span className="text-[10px] text-emerald-400/80">
                        {step.verified ? '✓ DB POSITIVE-BOUND' : '⚠ EMPTY / CHECK'}
                      </span>
                    </div>
                    <pre className="text-[11px] text-emerald-200/90 overflow-x-auto m-0 p-0 max-h-32">
                      <code>{JSON.stringify(step.observation, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              ))}

              {/* Final Answer Banner when finished */}
              {isFinished && (
                <div className="p-4 rounded-xl bg-[var(--accent1)] text-white shadow-xl space-y-2 border border-white/20 animate-[hypFadeIn_0.3s_ease-out]">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-[var(--accent2)]" />
                    <span>FINAL VERIFIED ANSWER (100% GUARDRAIL PASSED)</span>
                  </div>
                  <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed font-sans font-medium">
                    {activeTrace.finalAnswer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Live Hydrated Bill of Materials (BOM) */}
        <div className="lg:col-span-5 bg-[var(--darkBg1)] rounded-xl p-5 border border-[var(--darkInverse2)] shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[var(--accent2)]" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Live Hydrated BOM
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent2)] text-[var(--bgInverse)] font-black uppercase">
              D1 SQL
            </span>
          </div>

          {currentCycleIndex === 0 ? (
            <div className="py-12 text-center text-gray-300 font-mono text-xs">
              {language === 'de'
                ? 'Noch keine Artikel verifiziert. Starten Sie die Simulation.'
                : 'No items verified yet. Start the simulation.'}
            </div>
          ) : selectedTraceId === 'trace-smoke-detectors' ? (
            <div className="space-y-3 font-mono text-xs">
              {/* Items Table */}
              <div className="space-y-2">
                {currentCycleIndex >= 1 && (
                  <div className="p-2.5 rounded bg-black/40 border border-white/10 flex items-start justify-between gap-2">
                    <div>
                      <div className="text-white font-bold">12x ADEM-BM-8003</div>
                      <div className="text-[11px] text-gray-400">Optischer Rauchmelder IQ8</div>
                    </div>
                    <div className="text-right text-[var(--accent2)] font-bold">
                      822,00 €
                    </div>
                  </div>
                )}

                {currentCycleIndex >= 2 && (
                  <div className="p-2.5 rounded bg-black/40 border border-white/10 flex items-start justify-between gap-2">
                    <div>
                      <div className="text-white font-bold">12x ADEM-SO-8055</div>
                      <div className="text-[11px] text-gray-400">Standard-Meldesockel IQ8</div>
                      <span className="inline-block mt-0.5 text-[9px] px-1 bg-emerald-500/20 text-emerald-400 rounded">
                        Mandatory Base
                      </span>
                    </div>
                    <div className="text-right text-[var(--accent2)] font-bold">
                      134,40 €
                    </div>
                  </div>
                )}

                {currentCycleIndex >= 3 && (
                  <div className="p-2.5 rounded bg-black/40 border border-white/10 flex items-start justify-between gap-2">
                    <div>
                      <div className="text-white font-bold">1x ADEM-BMZ-IQ8C</div>
                      <div className="text-[11px] text-gray-400">Brandmelderzentrale 2 Loops</div>
                    </div>
                    <div className="text-right text-[var(--accent2)] font-bold">
                      1.420,00 €
                    </div>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm">
                <span className="font-bold text-gray-300">
                  {language === 'de' ? 'Gesamtsumme Netto:' : 'Total Net:'}
                </span>
                <span className="font-black text-base text-[var(--accent2)]">
                  {currentCycleIndex >= 4 ? '2.376,40 €' : currentCycleIndex >= 3 ? '2.376,40 €' : currentCycleIndex >= 2 ? '956,40 €' : '822,00 €'}
                </span>
              </div>

              {/* Verification Badges */}
              <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Positiv-Bindung Aktiv</span>
                </div>
                <div className="text-[10px] text-emerald-400/80">
                  Alle 3 Positionen mit realen D1 Lagerbeständen verifiziert.
                </div>
              </div>
            </div>
          ) : selectedTraceId === 'trace-underground-garage' ? (
            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-2">
                {currentCycleIndex >= 1 && (
                  <div className="p-2.5 rounded bg-black/40 border border-white/10 flex items-start justify-between gap-2">
                    <div>
                      <div className="text-white font-bold">8x ADEM-BWM-65PRO</div>
                      <div className="text-[11px] text-gray-400">Außen-PIR-Melder IP65</div>
                    </div>
                    <div className="text-right text-[var(--accent2)] font-bold">
                      944,00 €
                    </div>
                  </div>
                )}
                {currentCycleIndex >= 2 && (
                  <div className="p-2.5 rounded bg-black/40 border border-white/10 flex items-start justify-between gap-2">
                    <div>
                      <div className="text-white font-bold">8x ADEM-MB-ECK01</div>
                      <div className="text-[11px] text-gray-400">Eck-Montagewinkel verstellbar</div>
                    </div>
                    <div className="text-right text-[var(--accent2)] font-bold">
                      116,00 €
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm">
                <span className="font-bold text-gray-300">
                  {language === 'de' ? 'Gesamtsumme Netto:' : 'Total Net:'}
                </span>
                <span className="font-black text-base text-[var(--accent2)]">
                  {currentCycleIndex >= 2 ? '1.060,00 €' : '944,00 €'}
                </span>
              </div>
            </div>
          ) : (
            /* Guardrail test trace */
            <div className="p-4 rounded bg-red-950/40 border border-red-500/40 text-xs font-mono text-red-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-red-400">
                <AlertTriangle className="w-4 h-4" />
                <span>GUARDRAIL HARD BLOCK</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {language === 'de'
                  ? 'Unverifizierte Dummy-SKU "SKU-99999-FAKE" wurde durch den SQL-RAG Interceptor blockiert. 0 Halluzinationen zugelassen.'
                  : 'Unverified dummy SKU "SKU-99999-FAKE" blocked by SQL-RAG interceptor. 0 hallucinations permitted.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReActSimulator;
