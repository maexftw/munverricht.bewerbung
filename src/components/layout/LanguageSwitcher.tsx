import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export interface LanguageSwitcherProps {
  className?: string;
  variant?: 'compact' | 'segmented';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'compact',
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  const isEn = language === 'en';
  const ariaLabel = isEn ? 'Switch language to German' : 'Switch language to English';

  if (variant === 'segmented') {
    return (
      <div
        role="group"
        aria-label="Language selector"
        className={`inline-flex items-center p-1 rounded-lg bg-slate-900/90 border border-cyan-500/20 backdrop-blur-sm ${className}`}
      >
        <button
          type="button"
          onClick={() => setLanguage('de')}
          aria-pressed={!isEn}
          className={`
            touch-target min-h-[44px] px-3.5 py-1.5 rounded-md text-xs font-mono font-medium tracking-wider
            transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
            ${
              !isEn
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }
          `}
        >
          DE
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          aria-pressed={isEn}
          className={`
            touch-target min-h-[44px] px-3.5 py-1.5 rounded-md text-xs font-mono font-medium tracking-wider
            transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
            ${
              isEn
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }
          `}
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`
        touch-target min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg
        inline-flex items-center gap-2 font-mono text-xs tracking-wider font-semibold
        bg-slate-900/80 border border-cyan-500/30 text-cyan-300
        hover:bg-slate-800 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-[#0B0F17]
        active:scale-[0.98] transition-all duration-200
        ${className}
      `}
    >
      <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
      <span className="tabular-nums uppercase">{language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitcher;
