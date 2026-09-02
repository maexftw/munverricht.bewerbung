import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { flagshipAslAdemcoData } from '../../data/flagshipAslAdemco';
import {
  Sparkles,
  ShieldAlert,
  Layers,
  Cpu,
  Database,
  Laptop,
  FileCode,
  CheckCircle2,
  ExternalLink,
  Check,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { ReActSimulator } from './ReActSimulator';
import { D1SqlPlayground } from './D1SqlPlayground';

export const FlagshipCaseStudy: React.FC = () => {
  const { t, language } = useLanguage();
  const data = flagshipAslAdemcoData;

  const pillarIcons = [
    <Cpu className="w-5 h-5 text-[var(--accent1)]" key="0" />,
    <ShieldAlert className="w-5 h-5 text-[var(--accent1)]" key="1" />,
    <Database className="w-5 h-5 text-[var(--accent2)]" key="2" />,
    <Laptop className="w-5 h-5 text-[var(--accent2)]" key="3" />,
    <FileCode className="w-5 h-5 text-[var(--accent1)]" key="4" />,
  ];

  return (
    <section
      id="flagship"
      aria-labelledby="flagship-heading"
      className="py-12 sm:py-16 lg:py-20 border-b border-[var(--bgInverse2)]/20 space-y-12"
    >
      {/* 1. SECTION HEADER */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="accent1" icon={<Sparkles className="w-3.5 h-3.5" />}>
            {t.flagship.badge}
          </Badge>

          <a
            href={data.clientUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--bg2)] hover:bg-[var(--bg3)] text-[var(--bgInverse)] rounded text-xs font-mono font-bold transition-colors"
          >
            <span>{t.flagship.client}</span>
            <ExternalLink className="w-3 h-3 text-[var(--accent1)]" />
          </a>

          <span className="text-xs font-mono text-[var(--bgInverse)]/80">
            {data.timeframe}
          </span>
        </div>

        <h2
          id="flagship-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--bgInverse)]"
        >
          {t.flagship.title}
        </h2>

        <p className="text-base sm:text-lg text-[var(--bgInverse)]/80 font-medium max-w-3xl leading-relaxed">
          {t.flagship.subtitle}
        </p>
      </div>

      {/* 2. EXECUTIVE SUMMARY & PROBLEM GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Executive Summary Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg1)] border-2 border-[var(--bgInverse)] shadow-lg space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent1)]">
            {language === 'de' ? 'Executive Summary' : 'Executive Summary'}
          </div>
          <p className="text-sm sm:text-base text-[var(--bgInverse)]/90 leading-relaxed font-sans">
            {t.flagship.summary}
          </p>
        </div>

        {/* Problem & Domain Challenge Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bgInverse)] text-[var(--bg1)] shadow-xl space-y-3 border border-[var(--bgInverse2)]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent2)]">
            <ShieldAlert className="w-4 h-4 text-[var(--accent1)]" />
            <span>{t.flagship.problemTitle}</span>
          </div>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans">
            {t.flagship.problem}
          </p>
        </div>
      </div>

      {/* 3. FIVE TECHNICAL SOLUTION PILLARS */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-8 hyp-hatch-accent1 rounded-sm" aria-hidden="true" />
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[var(--bgInverse)] flex items-center gap-2">
            <Layers className="w-6 h-6 text-[var(--accent1)]" />
            <span>{t.flagship.pillarsTitle}</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.flagship.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-[var(--bg1)] border-2 border-[var(--bgInverse)] shadow-md space-y-3 transition-all duration-200 hover:-translate-y-1 ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-[var(--bgInverse)] text-[var(--bg1)] shadow">
                  {pillarIcons[idx % pillarIcons.length]}
                </div>
                <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded bg-[var(--bg2)] text-[var(--bgInverse)]">
                  Pillar 0{idx + 1}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-[var(--bgInverse)] pt-1">
                {pillar.title}
              </h4>

              <p className="text-xs sm:text-sm text-[var(--bgInverse)]/85 leading-relaxed font-sans">
                {pillar.description}
              </p>

              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-[var(--bgInverse)] text-[var(--bg1)] text-[11px] font-mono font-bold">
                  {pillar.tech}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. INTERACTIVE SUBSYSTEM A: REACT LOOP SIMULATOR */}
      <div className="space-y-4 pt-4">
        <ReActSimulator />
      </div>

      {/* 5. INTERACTIVE SUBSYSTEM B: CLOUDFLARE D1 SQL PLAYGROUND */}
      <div className="space-y-4 pt-4">
        <D1SqlPlayground />
      </div>

      {/* 6. FOUR PRODUCTION KPIS & METRICS GRID */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-8 hyp-hatch-accent2 rounded-sm" aria-hidden="true" />
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[var(--bgInverse)] flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <span>{t.flagship.metricsTitle}</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.flagship.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-[var(--bgInverse)] text-[var(--bg1)] border border-[var(--bgInverse2)] shadow-xl space-y-2"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono text-[var(--accent2)] tabular-nums tracking-tight">
                {metric.label}
              </div>
              <div className="text-sm font-black uppercase tracking-wider text-white">
                {metric.value}
              </div>
              <div className="text-xs text-gray-300 leading-relaxed font-sans pt-1">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. HONEST DEVELOPER ATTRIBUTION BOX */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg1)] border-2 border-[var(--accent1)] shadow-2xl space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[var(--accent1)] animate-pulse" />
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-[var(--bgInverse)]">
            {t.flagship.attributionTitle}
          </h3>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--bg2)]/60 border-l-4 border-[var(--accent1)] font-mono text-xs sm:text-sm text-[var(--bgInverse)] italic">
          "{t.flagship.attribution.prototype}"
        </div>

        <div className="space-y-2.5 pt-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent1)] block">
            {language === 'de' ? 'Vollständige Produktions-Implementierung durch Maximilian:' : 'Direct Engineering Deliverables by Maximilian:'}
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-[var(--bgInverse)] font-medium">
            {t.flagship.attribution.engineering.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-[var(--bg1)] p-2 rounded border border-[var(--bgInverse2)]/20">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FlagshipCaseStudy;
