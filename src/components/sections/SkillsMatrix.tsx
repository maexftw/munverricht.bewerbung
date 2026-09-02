import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SKILLS_TAXONOMY, ENGINEERING_PHILOSOPHY } from '../../data/profileTimeline';
import {
  Layout,
  Database,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const { t, language } = useLanguage();

  const categoryIcons = [
    <Layout className="w-5 h-5 text-[var(--accent1)]" key="0" />,
    <Database className="w-5 h-5 text-[var(--accent2)]" key="1" />,
    <Cpu className="w-5 h-5 text-[var(--accent1)]" key="2" />,
    <ShieldCheck className="w-5 h-5 text-[var(--accent2)]" key="3" />,
  ];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-12 sm:py-16 lg:py-20 border-b border-[var(--bgInverse2)]/20 space-y-10"
    >
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-3 h-8 hyp-hatch-accent1 rounded-sm" aria-hidden="true" />
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--bgInverse)]"
          >
            {t.skills.title}
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[var(--bgInverse)]/80 font-medium max-w-2xl font-sans">
          {t.skills.subtitle}
        </p>
      </div>

      {/* 4 Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SKILLS_TAXONOMY.map((group, idx) => (
          <div
            key={group.id}
            className="p-6 sm:p-7 rounded-2xl bg-[var(--bg1)] border-2 border-[var(--bgInverse)] shadow-lg space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--bgInverse2)]/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[var(--bgInverse)] text-[var(--bg1)] shadow">
                    {categoryIcons[idx % categoryIcons.length]}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-[var(--bgInverse)]">
                      {group.name}
                    </h3>
                    <span className="text-[11px] font-mono text-[var(--accent1)] font-bold">
                      {group.category}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[var(--bg2)] text-[var(--bgInverse)]">
                  0{idx + 1}
                </span>
              </div>

              {/* Description */}
              {group.description && (
                <p className="text-xs sm:text-sm text-[var(--bgInverse)]/80 font-sans leading-relaxed">
                  {group.description}
                </p>
              )}
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--bgInverse2)]/20">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded bg-[var(--bgInverse)] text-[var(--bg1)] hover:bg-[var(--accent1)] hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Philosophy Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bgInverse)] text-[var(--bg1)] border border-[var(--bgInverse2)] shadow-xl space-y-5">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-[var(--accent2)]" />
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
            {language === 'de' ? 'Ingenieur-Prinzipien & Arbeitsphilosophie' : 'Engineering Philosophy & Delivery Principles'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ENGINEERING_PHILOSOPHY.principles.map((p, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[var(--darkBg1)] border border-[var(--darkInverse2)] space-y-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent2)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{p.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
