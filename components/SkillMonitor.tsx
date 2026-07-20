import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BadgeCheck, Wrench, Workflow, Globe, Cpu } from 'lucide-react';
import ASCIIText from './ASCIIText';
import PixelCanvas from './PixelCanvas';

type Language = 'de' | 'en';

type SkillMonitorProps = {
  language: Language;
};

const skills = [
  {
    category: { de: 'Frontend-Umsetzung', en: 'Frontend delivery' },
    items: ['React', 'Vite', 'TypeScript', 'Tailwind', 'HTML', 'CSS', 'JavaScript'],
    icon: Globe,
    accent: 'blue',
    status: { de: 'neue Oberflächen und bestehende Codebasen', en: 'new interfaces and existing codebases' },
  },
  {
    category: { de: 'Cloudflare & Delivery', en: 'Cloudflare & delivery' },
    items: ['Cloudflare Pages', 'Cloudflare Functions', 'Wrangler', 'GitHub', 'D1', 'Turnstile'],
    icon: Workflow,
    accent: 'violet',
    status: { de: 'Deployment, serverseitige Funktionen und Betrieb', en: 'deployment, server-side functions, and operations' },
  },
  {
    category: { de: 'AI-assisted Entwicklung', en: 'AI-assisted development' },
    items: ['Coding Agents', 'Hermes', 'Codex', 'Claude Code', 'MCP', 'Graphify'],
    icon: Cpu,
    accent: 'cyan',
    status: { de: 'Analyse, Umsetzung, Fehlersuche und Verifikation', en: 'analysis, implementation, debugging, and verification' },
  },
  {
    category: { de: 'Automatisierung & Inhalte', en: 'Automation & content' },
    items: ['Python', 'Node.js', 'JSON', 'Git workflows', 'Pages CMS', 'Playwright'],
    icon: Wrench,
    accent: 'amber',
    status: { de: 'Contentpflege, Prüfungen und wiederholbare Releases', en: 'content maintenance, checks, and repeatable releases' },
  },
  {
    category: { de: 'Interaktion & Integrationen', en: 'Interaction & integrations' },
    items: ['Stripe', 'SQL', 'Leaflet', 'Canvas', 'GeoJSON', 'LocalStorage'],
    icon: Activity,
    accent: 'emerald',
    status: { de: 'Commerce, Daten und interaktive Browseranwendungen', en: 'commerce, data, and interactive browser applications' },
  },
  {
    category: { de: 'Marketing, CMS & Commerce', en: 'Marketing, CMS & commerce' },
    items: ['Google Ads', 'Google Analytics', 'WordPress', 'Elementor', 'WooCommerce', 'JTL', 'Shopify', 'Webflow'],
    icon: BadgeCheck,
    accent: 'violet',
    status: { de: 'Praxis seit 2013; Google-Zertifizierungen von 2017 historisch', en: 'practice since 2013; 2017 Google certifications are historical' },
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
        <h2 className="text-3xl font-bold uppercase tracking-[0.05em] mono">
          <ASCIIText text={language === 'de' ? 'Tools & Arbeitskontext' : 'Tools & working context'} noWrap={false} />
        </h2>
        <p className="max-w-[68ch] text-neutral-400 text-sm leading-relaxed">
          {language === 'de'
            ? 'Diese Bereiche sind durch konkrete Projekte belegt. Die Tools stehen nicht für sich: Entscheidend ist, was damit umgesetzt, getestet und in Betrieb gebracht wurde.'
            : 'These areas are backed by practical projects. The tools do not stand alone; what matters is what was implemented, tested, and put into operation with them.'}
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
            <PixelCanvas colors={[
              skill.accent === 'blue' ? '#3b82f6' : 
              skill.accent === 'violet' ? '#8b5cf6' : 
              skill.accent === 'cyan' ? '#06b6d4' : 
              skill.accent === 'amber' ? '#f59e0b' : 
              skill.accent === 'emerald' ? '#10b981' : '#ffffff'
            ]} density={0.12} gap={12} />
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
                animate={{ width: '100%' }}
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
                <span className={`mono text-[8px] ${accentStyles[skill.accent].text}`}>{language === 'de' ? '>> PROJEKTBELEGT' : '>> PROJECT-BACKED'}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SkillMonitor;
