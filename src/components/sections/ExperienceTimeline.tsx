import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CAREER_TIMELINE } from '../../data/profileTimeline';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { SteppedButton } from '../ui/SteppedButton';

export const ExperienceTimeline: React.FC = () => {
  const { t, language } = useLanguage();
  const [eraFilter, setEraFilter] = useState<'all' | 'modern' | 'agency'>('all');

  const timelineItems = React.useMemo(() => {
    const rawItems: any[] = t.experience.timeline || (t.experience as any).items || CAREER_TIMELINE;
    return rawItems.map((item, idx) => {
      const isCurrent =
        item.isCurrent !== undefined
          ? item.isCurrent
          : idx === 0 || item.period?.includes('2025');
      return {
        period: item.period || '',
        role: item.title || item.role || '',
        company: item.company || '',
        location: item.location || 'Dortmund, Deutschland',
        description: item.description || '',
        achievements: item.achievements || item.highlights || [],
        stack:
          item.stack ||
          item.technologies ||
          (idx === 0
            ? ['React 19', 'TypeScript', 'Cloudflare Pages & D1', 'DeepSeek-V3', 'Google Gemini API', 'Playwright', 'Tailwind CSS']
            : ['WordPress', 'Webflow', 'PHP / JavaScript', 'Technical SEO', 'Conversion Optimization', 'Google Ads / Analytics']),
        isCurrent,
      };
    });
  }, [t.experience]);

  const filteredTimeline =
    eraFilter === 'modern'
      ? timelineItems.filter((item) => item.isCurrent)
      : eraFilter === 'agency'
      ? timelineItems.filter((item) => !item.isCurrent)
      : timelineItems;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-12 sm:py-16 lg:py-20 border-b border-[var(--bgInverse2)]/20 space-y-8"
    >
      {/* Section Header & Era Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-8 hyp-hatch-accent2 rounded-sm" aria-hidden="true" />
            <h2
              id="experience-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[var(--bgInverse)]"
            >
              {t.experience.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--bgInverse)]/80 font-medium max-w-2xl font-sans">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Era Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={language === 'de' ? 'Karriere-Ären Filter' : 'Career Era Filter'}>
          <SteppedButton
            size="sm"
            variant={eraFilter === 'all' ? 'primary' : 'neutral'}
            steppedShadow={eraFilter === 'all' ? 'accent1' : 'none'}
            onClick={() => setEraFilter('all')}
            aria-pressed={eraFilter === 'all'}
          >
            {language === 'de' ? 'Gesamter Werdegang' : 'All Eras'}
          </SteppedButton>

          <SteppedButton
            size="sm"
            variant={eraFilter === 'modern' ? 'primary' : 'neutral'}
            steppedShadow={eraFilter === 'modern' ? 'accent1' : 'none'}
            onClick={() => setEraFilter('modern')}
            aria-pressed={eraFilter === 'modern'}
          >
            {language === 'de' ? 'Modern Edge & AI (2025–Heute)' : 'Modern Edge & AI (2025–Present)'}
          </SteppedButton>

          <SteppedButton
            size="sm"
            variant={eraFilter === 'agency' ? 'primary' : 'neutral'}
            steppedShadow={eraFilter === 'agency' ? 'accent1' : 'none'}
            onClick={() => setEraFilter('agency')}
            aria-pressed={eraFilter === 'agency'}
          >
            {language === 'de' ? 'Graphiks.de (2013–2025)' : 'Graphiks.de (2013–2025)'}
          </SteppedButton>
        </div>
      </div>

      {/* Timeline Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredTimeline.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 sm:p-8 rounded-2xl border-2 border-[var(--bgInverse)] shadow-xl space-y-5 transition-all duration-200 hover:-translate-y-1 ${
              item.isCurrent
                ? 'bg-[var(--bgInverse)] text-[var(--bg1)]'
                : 'bg-[var(--bg1)] text-[var(--bgInverse)]'
            }`}
          >
            {/* Period Badge & Status Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[var(--accent1)] text-white text-xs font-mono font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.period}</span>
              </div>

              {item.isCurrent ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent2)] font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent2)] animate-ping" />
                  CURRENT FOCUS
                </span>
              ) : (
                <span className="text-xs font-mono font-bold text-[var(--bgInverse)]/80 uppercase">
                  12 YEARS
                </span>
              )}
            </div>

            {/* Role & Company */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                {item.role}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold opacity-80">
                <Briefcase className="w-3.5 h-3.5 text-[var(--accent2)]" />
                <span>{item.company}</span>
                <span>•</span>
                <MapPin className="w-3.5 h-3.5 text-[var(--accent1)]" />
                <span>{item.location}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm leading-relaxed opacity-90 font-sans">
              {item.description}
            </p>

            {/* Key Achievements */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent2)] block">
                {language === 'de' ? 'Schlüsselerfolge & Meilensteine:' : 'Key Achievements & Milestones:'}
              </span>
              <ul className="space-y-2 text-xs sm:text-sm">
                {item.achievements.map((ach: string, aIdx: number) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/10">
              {item.stack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-black/20 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
