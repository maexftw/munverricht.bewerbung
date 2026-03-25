import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Wrench, Workflow, Globe, Cpu } from 'lucide-react';
import ASCIIText from './ASCIIText';

type Language = 'de' | 'en';

type SkillMonitorProps = {
  language: Language;
};

const skills = [
  {
    category: { de: 'VS Code & Frontend-Umsetzung', en: 'VS Code & frontend delivery' },
    items: [
      'Visual Studio Code',
      'React',
      'Vite',
      'TypeScript',
      'Tailwind',
      'Anime.js',
      'HTML5',
    ],
    icon: Globe,
    level: 94,
    accent: 'blue',
    status: { de: 'tägliche Arbeitsumgebung', en: 'primary day-to-day environment' },
  },
  {
    category: { de: 'Delivery & Plattformen', en: 'Delivery & platforms' },
    items: ['GitHub', 'Cloudflare Pages', 'Wrangler', 'Google Cloud', 'AWS', 'Azure'],
    icon: Workflow,
    level: 74,
    accent: 'violet',
    status: { de: 'vorhandene Plattform-Erfahrung, nicht Kernprofil', en: 'platform exposure, not the core specialization' },
  },
  {
    category: { de: 'Lokale LLM-Workflows', en: 'Local LLM workflows' },
    items: ['Local models', 'VS Code agents', 'Roo Code', 'Cline', 'Structured generation', 'Python validation scripts'],
    icon: Cpu,
    level: 91,
    accent: 'cyan',
    status: { de: 'Kernfokus für Coding, Prototyping und Verfeinerung', en: 'core focus for coding, prototyping, and refinement' },
  },
  {
    category: { de: 'Praxis-Fundament', en: 'Practical foundation' },
    items: ['WordPress', 'Webflow', 'Content structure', 'Launch support', 'Client communication'],
    icon: Wrench,
    level: 88,
    accent: 'amber',
    status: { de: 'langjährige Projektpraxis', en: 'long-term project experience' },
  },
  {
    category: { de: 'Marketing-nahe Tools', en: 'Marketing-adjacent tools' },
    items: ['Google Ads (Cert.)', 'Google Analytics (Cert.)', 'Tag Manager'],
    icon: Activity,
    level: 72,
    accent: 'emerald',
    status: { de: 'hilfreich für Seiten mit Vertriebsbezug', en: 'helpful for sites with commercial goals' },
  },
];

const accentStyles: Record<string, { glow: string; border: string; text: string; bar: string }> = {
  blue: {
    glow: 'from-blue-500/20 to-transparent',
    border: 'group-hover:border-blue-500/60',
    text: 'text-blue-400',
    bar: 'from-blue-500 to-cyan-400',
  },
  violet: {
    glow: 'from-violet-500/20 to-transparent',
    border: 'group-hover:border-violet-500/60',
    text: 'text-violet-400',
    bar: 'from-violet-500 to-blue-400',
  },
  cyan: {
    glow: 'from-cyan-500/20 to-transparent',
    border: 'group-hover:border-cyan-500/60',
    text: 'text-cyan-400',
    bar: 'from-cyan-400 to-blue-500',
  },
  amber: {
    glow: 'from-amber-500/20 to-transparent',
    border: 'group-hover:border-amber-500/60',
    text: 'text-amber-400',
    bar: 'from-amber-400 to-orange-500',
  },
  emerald: {
    glow: 'from-emerald-500/20 to-transparent',
    border: 'group-hover:border-emerald-500/60',
    text: 'text-emerald-400',
    bar: 'from-emerald-400 to-teal-500',
  },
};

const SkillMonitor: React.FC<SkillMonitorProps> = ({ language }) => {
  return (
    <section id="skill-monitor" className="space-y-12 py-6 scroll-mt-28">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="mono text-blue-500 text-xs tracking-widest uppercase mb-2" aria-hidden="true"><ASCIIText text="// TOOLS_IN_USE" /></h3>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.05em] mono"><ASCIIText text={language === 'de' ? 'Tools & Arbeitskontext' : 'Tools & working context'} /></h2>
        <p className="max-w-[68ch] text-neutral-400 text-sm leading-relaxed">
          {language === 'de'
            ? 'Keine Buzzword-Matrix, sondern die Tools und Arbeitsbereiche, mit denen ich aktuell wirklich arbeite. Der Schwerpunkt liegt klar auf VS Code als Arbeitsumgebung, lokalen LLM-Modellen für agentische Coding-Workflows und der Umsetzung bis zum nutzbaren Ergebnis; Plattformen sind vorhanden, aber nicht der Kern der Positionierung.'
            : 'This is not a buzzword matrix. It shows the tools and work areas I actually use right now. The center of gravity is clearly VS Code as the working environment, local LLM models for agentic coding workflows, and implementation through to usable output; platform exposure exists, but it is not the core positioning.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <motion.article
            key={skill.category.en}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`group relative overflow-hidden rounded-xl border border-neutral-900 bg-[#111111] p-6 hover:shadow-[0_0_30px_rgba(59,130,246,0.22)] transition-all duration-300 ${accentStyles[skill.accent].border}`}
          >
            <div className={`absolute -top-14 -right-14 h-28 w-28 rounded-full bg-gradient-to-br ${accentStyles[skill.accent].glow} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />

            <div className="flex items-start justify-between gap-4 relative z-10">
              <div className="space-y-2">
                <h4 className={`mono text-[10px] uppercase tracking-[0.22em] ${accentStyles[skill.accent].text}`}>{skill.category[language]}</h4>
                <div className="mono text-[9px] text-neutral-600">{skill.status[language]}</div>
              </div>

              <div className={`rounded-md border border-neutral-800 bg-black/40 p-2 ${accentStyles[skill.accent].text}`} aria-hidden="true">
                <skill.icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-4 h-[2px] w-full bg-neutral-900 overflow-hidden rounded-full" aria-hidden="true">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.06, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r ${accentStyles[skill.accent].bar}`}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-200 mono tracking-wide"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-900 flex items-center justify-between" aria-hidden="true">
              <span className="mono text-[8px] text-neutral-600">{language === 'de' ? 'EINORDNUNG' : 'CONTEXT'}</span>
              <div className="flex items-center gap-2">
                <span className="mono text-[9px] text-neutral-300">{skill.level}%</span>
                <span className={`mono text-[8px] ${accentStyles[skill.accent].text}`}>{language === 'de' ? '>> PRAKTISCH GENUTZT' : '>> PRACTICALLY USED'}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SkillMonitor;
