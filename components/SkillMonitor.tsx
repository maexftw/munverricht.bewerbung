import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, Brain, Globe, Cpu } from 'lucide-react';

const skills = [
  { category: 'Core Tools', items: ['Google Anti-Gravity IDE', 'Google Stitch', 'Vibe Coding'], icon: <Globe className="w-4 h-4" />, level: 98 },
  { category: 'Intelligence', items: ['LM Studio', 'Mistral-Large', 'Qwen-32B (Local)', 'RAG Pipelines'], icon: <Brain className="w-4 h-4" />, level: 95 },
  { category: 'High-End Station', items: ['NVIDIA RTX 5090', 'Local Inference Server', 'Unreal Engine 5'], icon: <Cpu className="w-4 h-4" />, level: 100 },
  { category: 'Legacy Roots', items: ['WordPress (10Y)', 'Webflow (2Y)', 'PHP', 'GSAP'], icon: <Database className="w-4 h-4" />, level: 90 },
  { category: 'Business Data', items: ['Google Ads (Cert.)', 'Google Analytics (Cert.)', 'Tag Manager'], icon: <Activity className="w-4 h-4" />, level: 85 },
];

const SkillMonitor: React.FC = () => {
  return (
    <section className="space-y-12">
      <div className="flex flex-col items-center text-center">
        <h3 className="mono text-blue-500 text-xs tracking-widest uppercase mb-2" aria-hidden="true">// RESOURCE_MONITOR</h3>
        <h2 className="text-3xl font-bold uppercase tracking-[0.05em]">System Performance</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-6 bg-[#111111] border border-neutral-900 rounded-lg hover:border-blue-500 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity" aria-hidden="true">
              {skill.icon}
            </div>

            <h4 className="mono text-[10px] text-blue-500 uppercase tracking-widest mb-4">{skill.category}</h4>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <span key={item} className="text-xs text-neutral-200 font-medium">
                    {item}
                  </span>
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between mono text-[8px] text-neutral-600">
                  <span>LOAD_CAPACITY</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-[2px] w-full bg-neutral-900 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                  />
                </div>
              </div>
            </div>

            {/* Hover Detail Element */}
            <div className="mt-4 pt-4 border-t border-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
              <span className="mono text-[8px] text-green-500">{">> STATUS: STABLE_EXPERT"}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillMonitor;
