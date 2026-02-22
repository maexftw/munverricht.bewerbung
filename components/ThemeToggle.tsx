import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isLight = theme === 'light';

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.2 }}
      onClick={onToggle}
      aria-label={isLight ? 'Zum Dark Mode wechseln' : 'Zum Day Mode wechseln'}
      title={isLight ? 'Dark Mode aktivieren' : 'Day Mode aktivieren'}
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-[1200] rounded-l-xl border border-r-0 px-3 py-3 backdrop-blur-md transition-all hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] ${isLight ? 'border-slate-300 bg-white/95 text-slate-700 hover:text-slate-900' : 'border-blue-500/30 bg-[#0f1115]/90 text-neutral-100 hover:text-white'}`}
    >
      <span className="flex items-center gap-2">
        {isLight ? <Moon className="h-4 w-4 text-blue-400" /> : <Sun className="h-4 w-4 text-amber-300" />}
        <span className="mono text-[10px] uppercase tracking-widest hidden sm:block">
          {isLight ? 'Dark' : 'Day'}
        </span>
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
