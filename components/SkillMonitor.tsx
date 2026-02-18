import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, Brain, Globe, Cpu } from 'lucide-react';

const skills = [
  {
    category: 'Core Tools',
    items: ['Google Anti-Gravity IDE', 'Google Stitch', 'Vibe Coding'],
    icon: Globe,
    level: 98,
    accent: 'blue',
  },
  {
    category: 'Intelligence',
    items: ['LM Studio', 'Mistral-Large', 'Qwen-32B (Local)', 'RAG Pipelines'],
    icon: Brain,
    level: 95,
    accent: 'violet',
  },
  {
    category: 'High-End Station',
    items: ['NVIDIA RTX 5090', 'Local Inference Server', 'Unreal Engine 5'],
    icon: Cpu,
    level: 100,
    accent: 'cyan',
  },
  {
    category: 'Legacy Roots',
    items: ['WordPress (10Y)', 'Webflow (2Y)', 'PHP', 'GSAP'],
    icon: Database,
    level: 90,
    accent: 'amber',
  },
  {
    category: 'Business Data',
    items: ['Google Ads (Cert.)', 'Google Analytics (Cert.)', 'Tag Manager'],
    icon: Activity,
    level: 85,
    accent: 'emerald',
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

const SkillMonitor: React.FC = () => {
  return (
    <section className="space-y-12 py-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="mono text-blue-500 text-xs tracking-widest uppercase mb-2" aria-hidden="true">// RESOURCE_MONITOR</h3>
        <h2 className="text-3xl font-bold uppercase tracking-[0.05em]">Capability Matrix</h2>
        <p className="max-w-[68ch] text-neutral-400 text-sm leading-relaxed">
          Gleiche Inhalte, neues Interface: eine kompaktere Ops-Ansicht mit klaren Schwerpunkten statt klassischer Kartenwand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <motion.article
            key={skill.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`group relative overflow-hidden rounded-xl border border-neutral-900 bg-[#111111] p-6 transition-all duration-300 ${accentStyles[skill.accent].border}`}
          >
            <div className={`absolute -top-14 -right-14 h-28 w-28 rounded-full bg-gradient-to-br ${accentStyles[skill.accent].glow} blur-2xl`} aria-hidden="true" />

            <div className="flex items-start justify-between gap-4 relative z-10">
              <div className="space-y-2">
                <h4 className={`mono text-[10px] uppercase tracking-[0.22em] ${accentStyles[skill.accent].text}`}>{skill.category}</h4>
                <div className="mono text-[9px] text-neutral-600">OPS_LOAD_{String(skill.level).padStart(3, '0')}</div>
              </div>

              <div className={`rounded-md border border-neutral-800 bg-black/40 p-2 ${accentStyles[skill.accent].text}`} aria-hidden="true">
                <skill.icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-4 h-[2px] w-full bg-neutral-900 overflow-hidden rounded-full" aria-hidden="true">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.06 }}
                className={`h-full bg-gradient-to-r ${accentStyles[skill.accent].bar}`}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {skill.items.map(item => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-200 mono tracking-wide"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-900 flex items-center justify-between" aria-hidden="true">
              <span className="mono text-[8px] text-neutral-600">LOAD_CAPACITY</span>
              <div className="flex items-center gap-2">
                <span className="mono text-[9px] text-neutral-300">{skill.level}%</span>
                <span className={`mono text-[8px] ${accentStyles[skill.accent].text}`}>{'>> STATUS: STABLE_EXPERT'}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SkillMonitor;
