import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { User, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div id="about" className="hyp-genre scroll-mt-24">
      <div className="hyp-genre-left" aria-hidden="true" />
      <div className="hyp-genre-right space-y-6">
        <div className="hyp-genre-top">
          <div className="hyp-genre-icon" aria-hidden="true">
            <User className="w-8 h-8 text-[var(--accent1)]" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--accent2)]">
              {language === 'de' ? 'PROFIL & WERDEGANG' : 'PROFILE & BACKGROUND'}
            </div>
            <h2 className="hyp-genre-name text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--bgInverse)]">
              {t.about.title}
            </h2>
          </div>
          <div className="hyp-genre-desc text-sm sm:text-base text-[var(--bgInverse)]/80 font-medium leading-relaxed">
            {t.about.subtitle}
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-[var(--bgInverse)]/90 leading-relaxed font-sans bg-[var(--bg2)]/40 p-5 rounded-xl border border-[var(--bgInverse2)]/30">
          {t.about.paragraphs.map((para, idx) => (
            <p key={idx} className="leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {t.about.highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-[var(--bgInverse)] text-[var(--bg1)] rounded-xl border border-[var(--bgInverse2)] shadow-md flex flex-col justify-between space-y-2 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-[var(--accent2)] tracking-wider">
                <span>{item.label}</span>
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent1)]" />
              </div>
              <div className="text-base sm:text-lg font-black text-white tracking-tight">
                {item.value}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 hyp-hatch-accent1 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
