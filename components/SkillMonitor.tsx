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
    items: ['Visual Studio Code', 'React', 'Vite', 'TypeScript', 'Tailwind', 'Anime.js', 'HTML5'],
    icon: Globe,
    level: 94,
    status: { de: 'tägliche Arbeitsumgebung', en: 'primary day-to-day environment' },
  },
  {
    category: { de: 'Delivery & Plattformen', en: 'Delivery & platforms' },
    items: ['GitHub', 'Cloudflare Pages', 'Wrangler', 'Google Cloud', 'AWS', 'Azure'],
    icon: Workflow,
    level: 74,
    status: { de: 'vorhandene Plattform-Erfahrung, nicht Kernprofil', en: 'platform exposure, not the core specialization' },
  },
  {
    category: { de: 'Lokale LLM-Workflows', en: 'Local LLM workflows' },
    items: ['Local models', 'VS Code agents', 'Roo Code', 'Cline', 'Structured generation', 'Python validation scripts'],
    icon: Cpu,
    level: 91,
    status: { de: 'Kernfokus für Coding, Prototyping und Verfeinerung', en: 'core focus for coding, prototyping, and refinement' },
  },
  {
    category: { de: 'Praxis-Fundament', en: 'Practical foundation' },
    items: ['WordPress', 'Webflow', 'Content structure', 'Launch support', 'Client communication'],
    icon: Wrench,
    level: 88,
    status: { de: 'langjährige Projektpraxis', en: 'long-term project experience' },
  },
  {
    category: { de: 'Marketing-nahe Tools', en: 'Marketing-adjacent tools' },
    items: ['Google Ads (Cert.)', 'Google Analytics (Cert.)', 'Tag Manager'],
    icon: Activity,
    level: 72,
    status: { de: 'hilfreich für Seiten mit Vertriebsbezug', en: 'helpful for sites with commercial goals' },
  },
];

const SkillMonitor: React.FC<SkillMonitorProps> = ({ language }) => {
  return (
    <section id="skill-monitor" className="space-y-12 py-6 scroll-mt-28 border-t border-[color:var(--border-subtle)]">
      <div className="grid gap-6 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
        <div className="space-y-4">
          <h3 className="mono text-[11px] tracking-[0.3em] uppercase text-[color:var(--accent-soft)]" aria-hidden="true">
            <ASCIIText text="// TOOLS_IN_USE" />
          </h3>
          <h2 className="max-w-[12ch] text-3xl font-semibold tracking-[-0.05em] text-[color:var(--text-primary)] sm:text-4xl md:text-[3rem]">
            {language === 'de' ? 'Arbeitskontext statt Buzzword-Matrix.' : 'Working context instead of buzzword matrix.'}
          </h2>
        </div>
        <p className="max-w-[42rem] text-sm leading-7 text-[color:var(--text-secondary)]">
          {language === 'de'
            ? 'Das hier ist die aktuelle operative Realität: VS Code als Kernumgebung, lokale LLM-Workflows für produktive Arbeit und Plattform-Erfahrung dort, wo sie beim Launch hilft.'
            : 'This is the current operational reality: VS Code as the core environment, local LLM workflows for practical work, and platform exposure where it actually helps delivery.'}
        </p>
      </div>

      <div className="divide-y divide-[color:var(--border-subtle)] border-y border-[color:var(--border-subtle)]">
        {skills.map((skill, index) => (
          <motion.article
            key={skill.category.en}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="grid gap-5 py-7 md:grid-cols-[minmax(220px,0.3fr)_minmax(0,0.4fr)_minmax(0,0.3fr)] md:px-3"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[color:var(--accent-color)]">
                <skill.icon className="h-4 w-4" aria-hidden="true" />
                <p className="mono text-[10px] uppercase tracking-[0.26em]">{skill.category[language]}</p>
              </div>
              <p className="text-sm leading-7 text-[color:var(--text-secondary)]">{skill.status[language]}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-[color:var(--border-subtle)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="space-y-3 md:pl-6">
              <div className="flex items-center justify-between mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--text-subtle)]">
                <span>{language === 'de' ? 'Praxisbezug' : 'Practical use'}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-[color:var(--border-subtle)]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, delay: 0.1 + index * 0.06 }}
                  className="h-full bg-[linear-gradient(to_right,var(--accent-color),color-mix(in_srgb,var(--accent-color)_48%,white))]"
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SkillMonitor;
