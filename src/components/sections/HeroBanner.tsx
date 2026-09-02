import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Mail, Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const HeroBanner: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="hero"
      aria-label="Hero Identity Banner"
      className="relative mb-12 sm:mb-16 lg:mb-20 w-full"
    >
      {/* 1. TOP HEADER STRIP: 3 Stat Pills with Stepped Shadows + Multi-Color Rule */}
      <div className="w-full mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Stat Pill 1 */}
          <div className="bg-[var(--bgInverse)] text-[var(--bg1)] p-3 sm:p-4 rounded border border-[var(--bgInverse2)] hyp-shadow-stepped-1 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[var(--accent1)] text-[var(--bg1)] flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent1)] font-bold">
                {language === 'de' ? 'Erfahrung' : 'Experience'}
              </div>
              <div className="text-sm sm:text-base font-black tracking-tight">
                12+ {language === 'de' ? 'Jahre Web-Engineering' : 'Years Web Engineering'}
              </div>
            </div>
          </div>

          {/* Stat Pill 2 */}
          <div className="bg-[var(--bgInverse)] text-[var(--bg1)] p-3 sm:p-4 rounded border border-[var(--bgInverse2)] hyp-shadow-stepped-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[var(--accent2)] text-[var(--bgInverse)] flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent2)] font-bold">
                {language === 'de' ? 'Architektur' : 'Architecture'}
              </div>
              <div className="text-sm sm:text-base font-black tracking-tight">
                React 19 &amp; Cloudflare Edge D1
              </div>
            </div>
          </div>

          {/* Stat Pill 3 */}
          <div className="bg-[var(--bgInverse)] text-[var(--bg1)] p-3 sm:p-4 rounded border border-[var(--bgInverse2)] hyp-shadow-stepped-white col-span-1 sm:col-span-2 lg:col-span-1 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[var(--notWhite)] text-[var(--bgInverse)] flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-gray-300 font-bold">
                {language === 'de' ? 'Vertical AI' : 'Vertical AI'}
              </div>
              <div className="text-sm sm:text-base font-black tracking-tight">
                Deterministic ReAct &amp; SQL RAG
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Color Accent Rule */}
        <div
          className="h-1.5 w-full mt-6 rounded-full overflow-hidden"
          style={{
            background:
              'linear-gradient(to right, var(--accent1) 0%, var(--accent1) 33%, var(--accent2) 33%, var(--accent2) 66%, var(--bgInverse) 66%, var(--bgInverse) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* 2. ASYMMETRIC 3-COLUMN HERO BODY (Left 525px | Divider 9px | Right 1fr) */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,525px)_9px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
        {/* LEFT COLUMN: Identity, Blurb, Event CTA Card */}
        <div className="space-y-6">
          {/* Status Badge & Location Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="stepped" pulsing={true} pulseColor="bg-emerald-400">
              Available for Projects &amp; Roles
            </Badge>

            <Badge variant="outline" icon={<MapPin className="w-3.5 h-3.5 text-[var(--accent1)]" />}>
              {t.hero.location}
            </Badge>
          </div>

          {/* Title & Hatch Backdrop */}
          <div className="relative pt-2">
            <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.2em] text-[var(--accent1)]">
              {t.hero.greeting}
            </p>

            <div className="relative inline-block mt-1">
              {/* Slanted Striped Backdrop behind title */}
              <div
                className="absolute -inset-x-2 -inset-y-1 hyp-hatch-accent1 opacity-20 -rotate-1 rounded pointer-events-none"
                aria-hidden="true"
              />
              <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[var(--bgInverse)] leading-[1.05]">
                {t.hero.name}
              </h1>
            </div>

            {/* Date / Location Stamp Pill */}
            <div className="inline-flex items-center gap-2 mt-2 px-2.5 py-0.5 rounded bg-[var(--bgInverse)] text-[var(--bg1)] text-[11px] font-mono font-bold">
              <span>DORTMUND</span>
              <span>•</span>
              <span>2026</span>
              <span>•</span>
              <span className="text-[var(--accent2)]">12+ YRS</span>
            </div>

            <p className="text-lg sm:text-xl font-bold text-[var(--bgInverse)]/80 mt-2">
              {t.hero.title}
            </p>
          </div>

          {/* Editorial Blurb with Vertical Striped Accent */}
          <div className="relative pl-6 sm:pl-8 py-1">
            <div
              className="absolute left-0 top-0 bottom-0 w-3 hyp-hatch-accent2 rounded"
              aria-hidden="true"
            />
            <p className="text-sm sm:text-base leading-relaxed text-[var(--bgInverse)]/90 font-medium">
              {t.hero.tagline}
            </p>
          </div>

          {/* Primary Event / CTA Card (ASL Ademco Flagship Callout) */}
          <div className="relative overflow-hidden rounded-xl bg-[var(--accent1)] text-[var(--bg1)] p-5 sm:p-6 shadow-xl space-y-4">
            {/* Background Watermark Icon */}
            <div
              className="absolute -right-6 -bottom-6 opacity-15 pointer-events-none"
              aria-hidden="true"
            >
              <ShieldCheck className="w-48 h-48" />
            </div>

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[var(--bgInverse)] text-[var(--bg1)] text-[10px] font-mono uppercase font-bold tracking-wider">
                <Sparkles className="w-3 h-3 text-[var(--accent2)]" />
                <span>{language === 'de' ? 'FLAGSHIP CASE STUDY' : 'FLAGSHIP CASE STUDY'}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                ASL Ademco B2B AI Fachberater
              </h2>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-md">
                {language === 'de'
                  ? 'Kataloggebundener Vertical AI-Agent mit ReAct Reasoning Loop & deterministischem D1 SQL-RAG über 1.460+ Sicherheits-SKUs.'
                  : 'Catalog-bound Vertical AI Agent with ReAct reasoning loop & deterministic D1 SQL RAG over 1,460+ security SKUs.'}
              </p>
            </div>

            {/* CTAs */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#flagship"
                className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--bgInverse)] text-[var(--bg1)] hover:bg-[var(--bgInverse2)] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{t.hero.secondaryCta}</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent2)]" />
              </a>

              <a
                href="#contact"
                className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--bg1)] text-[var(--bgInverse)] hover:bg-white text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bgInverse)]"
              >
                <Mail className="w-4 h-4 text-[var(--accent1)]" />
                <span>{t.hero.primaryCta}</span>
              </a>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: Vertical Dot & Hairline Divider (Desktop only) */}
        <div
          className="hidden lg:flex flex-col items-center justify-between h-full py-4"
          aria-hidden="true"
        >
          <div className="w-2.5 h-2.5 bg-[var(--bgInverse)] rounded-none" />
          <div className="w-px flex-1 bg-[var(--bgInverse2)]/40 my-2" />
          <div className="w-2.5 h-2.5 bg-[var(--accent1)] rounded-none" />
          <div className="w-px flex-1 bg-[var(--bgInverse2)]/40 my-2" />
          <div className="w-2.5 h-2.5 bg-[var(--accent2)] rounded-none" />
        </div>

        {/* RIGHT COLUMN: Giant Watermark Graphic Art & Technical Highlight */}
        <div className="relative rounded-2xl bg-[var(--bgInverse)] text-[var(--bg1)] p-6 sm:p-8 lg:p-10 overflow-hidden min-h-[420px] flex flex-col justify-between border border-[var(--bgInverse2)] shadow-2xl">
          {/* Giant Typography Watermark Art */}
          <div
            className="absolute right-0 top-0 text-[140px] sm:text-[180px] lg:text-[220px] font-black tracking-tighter text-white/[0.03] select-none pointer-events-none leading-none -translate-y-6 translate-x-6"
            aria-hidden="true"
          >
            AI/EDGE
          </div>

          {/* Slanted Hatch Header Strip */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[var(--accent1)] animate-pulse" />
              <span className="uppercase tracking-widest font-bold text-gray-300">
                MAXIMILIAN UNVERRICHT // PROFILE
              </span>
            </div>

            <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bgInverse2)] text-[var(--accent2)] uppercase tracking-widest font-bold">
              EST. 2013
            </div>
          </div>

          {/* Center Graphic Watermark Content */}
          <div className="relative z-10 my-8 space-y-4">
            <div className="inline-block p-1 bg-gradient-to-r from-[var(--accent1)] to-[var(--accent2)] rounded-lg">
              <div className="px-3 py-1 bg-[var(--bgInverse)] rounded text-xs font-mono font-bold tracking-wider text-white uppercase">
                Cloudflare Edge &amp; React 19 Specialist
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              {language === 'de'
                ? 'Präzise Web-Architektur trifft autonome KI-Agenten'
                : 'High-Craft Web Delivery Meets Autonomous AI Agents'}
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-lg font-mono">
              {language === 'de'
                ? '12+ Jahre Erfahrung in CMS, technischer Performance und seit 08/2025 modernste React 19, Cloudflare D1 und ReAct Agent-Pipelines.'
                : '12+ years of experience in CMS, technical performance, and since 08/2025 modern React 19, Cloudflare D1, and ReAct agent workflows.'}
            </p>
          </div>

          {/* Bottom Technical Pill Stack */}
          <div className="relative z-10 pt-4 border-t border-[var(--bgInverse2)]/60 flex flex-wrap items-center gap-2">
            {['React 19', 'TypeScript', 'Cloudflare D1', 'ReAct Loop', 'DeepSeek-V3', 'WCAG AA', 'Playwright'].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded bg-[var(--bgInverse2)] text-gray-200 border border-white/10 hover:border-[var(--accent2)] hover:text-[var(--accent2)] transition-colors"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
