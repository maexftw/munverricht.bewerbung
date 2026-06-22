import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Wrench, Workflow, Globe, Cpu } from 'lucide-react';
import ASCIIText from './ASCIIText';
import PixelCanvas from './PixelCanvas';

type Language = 'de' | 'en';

type SkillMonitorProps = {
  language: Language;
};

const skills = [
  {
    category: { de: 'AI-Websysteme & Prototypen', en: 'AI web systems & prototypes' },
    items: [
      'React',
      'Vite',
      'TypeScript',
      'Tailwind',
      'Product advisor UI',
      'Agentic workflow UI',
      'Fast prototypes',
    ],
    icon: Globe,
    level: 94,
    accent: 'blue',
    status: { de: 'Interfaces und Prototypen bis zum testbaren Stand', en: 'interfaces and prototypes through to a testable state' },
  },
  {
    category: { de: 'E-Commerce & Produktdaten', en: 'E-commerce & product data' },
    items: ['Custom shop logic', 'Stripe', 'Cart/Checkout', 'Product states', 'Catalog structure', 'Product advisor flows'],
    icon: Workflow,
    level: 74,
    accent: 'violet',
    status: { de: 'Shop-Logik und beratungsnahe Produktkommunikation', en: 'shop logic and advice-oriented product communication' },
  },
  {
    category: { de: 'Dokumenten-/LLM-Pipelines', en: 'Document / LLM pipelines' },
    items: ['Docling', 'PyMuPDF', 'Local LLM workflows', 'Structured generation', 'JSON output', 'Python validation scripts'],
    icon: Cpu,
    level: 91,
    accent: 'cyan',
    status: { de: 'prüfbare Ausgabe statt losem Chat-Ergebnis', en: 'verifiable output instead of loose chat results' },
  },
  {
    category: { de: 'Delivery & Deployment', en: 'Delivery & deployment' },
    items: ['GitHub', 'Cloudflare Pages', 'Wrangler', 'Preview QA', 'Build checks', 'Handoffs'],
    icon: Wrench,
    level: 88,
    accent: 'amber',
    status: { de: 'vom Prototyp zum überprüfbaren Preview-Stand', en: 'from prototype to verifiable preview state' },
  },
  {
    category: { de: '13 Jahre Web-/Marketing-Praxis', en: '13 years web / marketing practice' },
    items: ['Webdesign', 'SEO structure', 'Google Ads (Cert.)', 'Analytics', 'Content structure', 'Client communication'],
    icon: Activity,
    level: 72,
    accent: 'emerald',
    status: { de: 'businessnaher Blick auf Seiten mit Vertriebsbezug', en: 'business-oriented view on commercially focused sites' },
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
        <h2 className="max-w-full px-3 text-3xl font-bold uppercase tracking-[0.04em] mono"><ASCIIText text={language === 'de' ? 'Tools & Arbeitskontext' : 'Tools & working context'} noWrap={false} /></h2>
        <p className="max-w-[68ch] text-neutral-400 text-sm leading-relaxed">
          {language === 'de'
            ? 'Keine Buzzword-Matrix: hier stehen die Outputs und Arbeitsbereiche, die für AI-nahe Produktrollen relevant sind — Websysteme, Commerce, Produktdaten, Dokumentenpipelines, Preview-Delivery und die Web-/Marketing-Praxis dahinter.'
            : 'Not a buzzword matrix: these are the outputs and work areas relevant to AI-adjacent product roles — web systems, commerce, product data, document pipelines, preview delivery, and the web/marketing practice behind them.'}
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
