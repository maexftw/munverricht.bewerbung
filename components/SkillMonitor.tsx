import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BadgeCheck, Wrench, Workflow, Globe, Cpu } from 'lucide-react';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { StatusDot } from '@astryxdesign/core/StatusDot';
import { Text } from '@astryxdesign/core/Text';
import { Token } from '@astryxdesign/core/Token';
import { VStack } from '@astryxdesign/core/VStack';
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

const tokenColors: Record<string, 'blue' | 'purple' | 'cyan' | 'orange' | 'green'> = {
  blue: 'blue',
  violet: 'purple',
  cyan: 'cyan',
  amber: 'orange',
  emerald: 'green',
};

const SkillMonitor: React.FC<SkillMonitorProps> = ({ language }) => {
  return (
    <section id="skill-monitor" className="scroll-mt-28 py-6">
      <VStack gap={10}>
        <VStack gap={3} hAlign="center">
          <Text type="code" color="accent" display="block" justify="center" aria-hidden="true">
            <ASCIIText text="// TOOLS_IN_USE" />
          </Text>
          <Heading level={2} justify="center" textWrap="balance">
            <ASCIIText text={language === 'de' ? 'Tools & Arbeitskontext' : 'Tools & working context'} noWrap={false} />
          </Heading>
          <Text type="supporting" color="secondary" display="block" justify="center" textWrap="pretty" className="max-w-[68ch]">
            {language === 'de'
              ? 'Diese Bereiche sind durch konkrete Projekte belegt. Die Tools stehen nicht für sich: Entscheidend ist, was damit umgesetzt, getestet und in Betrieb gebracht wurde.'
              : 'These areas are backed by practical projects. The tools do not stand alone; what matters is what was implemented, tested, and put into operation with them.'}
          </Text>
        </VStack>

        <Grid columns={{ minWidth: 280, max: 3, repeat: 'fit' }} gap={6}>
          {skills.map((skill, i) => (
            <motion.article
              key={skill.category.en}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Card padding={6} className="relative h-full overflow-hidden">
                <PixelCanvas colors={[
                  skill.accent === 'blue' ? '#3b82f6' :
                  skill.accent === 'violet' ? '#8b5cf6' :
                  skill.accent === 'cyan' ? '#06b6d4' :
                  skill.accent === 'amber' ? '#f59e0b' :
                  skill.accent === 'emerald' ? '#10b981' : '#ffffff'
                ]} density={0.12} gap={12} />
                <VStack gap={5} className="relative z-10">
                  <HStack gap={4} hAlign="between" vAlign="start">
                    <VStack gap={2}>
                      <Heading level={3}>{skill.category[language]}</Heading>
                      <Text type="supporting" color="secondary" display="block">{skill.status[language]}</Text>
                    </VStack>
                    <span className="text-[color:var(--accent-color)]" aria-hidden="true">
                      <skill.icon className="h-5 w-5" />
                    </span>
                  </HStack>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.06, ease: 'easeOut' }}
                    className="h-0.5 w-full origin-left bg-[color:var(--accent-color)]"
                    aria-hidden="true"
                  />
                  <HStack gap={2} wrap="wrap">
                    {skill.items.map((item) => (
                      <React.Fragment key={item}><Token label={item} size="sm" color={tokenColors[skill.accent]} /></React.Fragment>
                    ))}
                  </HStack>
                  <HStack gap={2} vAlign="center">
                    <StatusDot variant="accent" label={language === 'de' ? 'Projektbelegt' : 'Project-backed'} />
                    <Text type="code" color="accent">
                      {language === 'de' ? 'PROJEKTBELEGT' : 'PROJECT-BACKED'}
                    </Text>
                  </HStack>
                </VStack>
              </Card>
            </motion.article>
          ))}
        </Grid>
      </VStack>
    </section>
  );
};

export default SkillMonitor;
