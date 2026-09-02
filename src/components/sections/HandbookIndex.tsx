import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Layout, Cpu, Database, Award, History, ArrowUpRight } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

export const HandbookIndex: React.FC = () => {
  const { language } = useLanguage();

  const chips = [
    {
      href: '#skills',
      icon: <Layout className="w-4 h-4 text-[var(--accent1)]" />,
      labelDe: 'Architektur',
      labelEn: 'Architecture',
      tooltipDe: 'React 19 · TypeScript · Tailwind v3/v4',
      tooltipEn: 'React 19 · TypeScript · Tailwind v3/v4',
    },
    {
      href: '#flagship',
      icon: <Cpu className="w-4 h-4 text-[var(--accent2)]" />,
      labelDe: 'AI Tool Calling',
      labelEn: 'AI Tool Calling',
      tooltipDe: 'ReAct Loop · Guardrails · DeepSeek/Gemini',
      tooltipEn: 'ReAct Loop · Guardrails · DeepSeek/Gemini',
    },
    {
      href: '#flagship',
      icon: <Database className="w-4 h-4 text-[var(--accent1)]" />,
      labelDe: 'Edge Storage',
      labelEn: 'Edge Storage',
      tooltipDe: 'Cloudflare D1 SQL · Workers · 1.460+ SKUs',
      tooltipEn: 'Cloudflare D1 SQL · Workers · 1.460+ SKUs',
    },
    {
      href: '#about',
      icon: <Award className="w-4 h-4 text-[var(--accent2)]" />,
      labelDe: 'Web Craft & WCAG',
      labelEn: 'Web Craft & WCAG',
      tooltipDe: 'Lighthouse 100/100 · AA A11y · 0px Overflow',
      tooltipEn: 'Lighthouse 100/100 · AA A11y · 0px Overflow',
    },
    {
      href: '#experience',
      icon: <History className="w-4 h-4 text-[var(--accent1)]" />,
      labelDe: 'Werdegang',
      labelEn: 'Career Timeline',
      tooltipDe: '12+ Jahre · Graphiks.de (2013-2025) & Modern Edge',
      tooltipEn: '12+ Years · Graphiks.de (2013-2025) & Modern Edge',
    },
  ];

  return (
    <nav
      id="handbook"
      aria-label="Core Competencies Handbook Index"
      className="mb-12 sm:mb-16 w-full"
    >
      <div className="bg-[var(--bgInverse)] text-[var(--bg1)] rounded-xl p-4 sm:p-6 border border-[var(--bgInverse2)] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Title with Striped Notch */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-3 h-8 hyp-hatch-accent1 rounded-sm" aria-hidden="true" />
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--accent2)]">
              QUICK NAVIGATION
            </div>
            <div className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
              {language === 'de' ? 'Kompetenz-Index' : 'Handbook Index'}
            </div>
          </div>
        </div>

        {/* Chips with Spring Tooltips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {chips.map((chip, idx) => (
            <Tooltip
              key={idx}
              position="top"
              content={language === 'de' ? chip.tooltipDe : chip.tooltipEn}
            >
              <a
                href={chip.href}
                className="touch-target inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--bgInverse2)] text-gray-200 hover:text-white hover:bg-[var(--bgInverse2)]/80 border border-white/10 hover:border-[var(--accent2)] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--accent1)]"
              >
                {chip.icon}
                <span>{language === 'de' ? chip.labelDe : chip.labelEn}</span>
                <ArrowUpRight className="w-3 h-3 text-gray-400 opacity-60" />
              </a>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Geometric 3-Piece Section Divider */}
      <div className="flex items-center gap-4 my-8" aria-hidden="true">
        <div className="w-12 h-2 hyp-hatch-accent2 rounded" />
        <div className="flex-1 h-px bg-[var(--bgInverse2)]/30" />
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[var(--bgInverse)]" />
          <div className="w-2 h-2 bg-[var(--accent1)]" />
          <div className="w-2 h-2 bg-[var(--accent2)]" />
        </div>
      </div>
    </nav>
  );
};

export default HandbookIndex;
