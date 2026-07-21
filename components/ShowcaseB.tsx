import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, CreditCard, Monitor, MousePointer2, Settings, Workflow, Zap } from 'lucide-react';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { Token } from '@astryxdesign/core/Token';
import { VStack } from '@astryxdesign/core/VStack';
import ASCIIText from './ASCIIText';

type Language = 'de' | 'en';

type ShowcaseBProps = {
  language: Language;
};

const phaseContent = {
  de: [
    {
      id: 'PHASE_01',
      title: 'Entwurf & erster Code',
      text: 'Aus Briefing, Referenzen und Seitenstruktur entsteht ein erster umsetzbarer Stand für Layouts, Komponenten und Content-Blöcke.',
      tone: 'blue' as const,
    },
    {
      id: 'PHASE_02',
      title: 'Review & Verfeinerung',
      text: 'Danach folgen manuelle Überarbeitung in der IDE, inhaltliche Schärfung, technische Korrekturen und saubere Übergänge für den Live-Betrieb.',
      tone: 'blue' as const,
    },
    {
      id: 'PHASE_03',
      title: 'Deployment & Kundenpflege',
      text: 'Wenn redaktionelle Pflege Teil des Projekts ist, wird eine passende Content-Schicht ergänzt. Bei Baker & Charlie geschieht das über JSON-Inhalte und Pages CMS.',
      tone: 'green' as const,
    },
  ],
  en: [
    {
      id: 'PHASE_01',
      title: 'Draft & first code pass',
      text: 'A first workable version for layouts, components, and content blocks is built from the brief, references, and page structure.',
      tone: 'blue' as const,
    },
    {
      id: 'PHASE_02',
      title: 'Review & refinement',
      text: 'Then comes manual work in the IDE: content sharpening, technical fixes, and cleaner handoff quality for live use.',
      tone: 'blue' as const,
    },
    {
      id: 'PHASE_03',
      title: 'Deployment & client editing',
      text: 'When editorial maintenance is part of a project, a suitable content layer is added. Baker & Charlie uses JSON content and Pages CMS for this.',
      tone: 'green' as const,
    },
  ],
};

const ShowcaseB: React.FC<ShowcaseBProps> = ({ language }) => {
  return (
    <section id="showcase-b" className="py-12 scroll-mt-28">
      <VStack gap={10}>
        <VStack gap={4} hAlign="center" className="text-center lg:items-end lg:text-right">
          <Text type="code" color="accent" display="block" justify="center" className="tracking-[0.3em] uppercase opacity-70 lg:text-right" aria-hidden="true">
            <ASCIIText text="// WORKFLOW_USE_CASE_02" />
          </Text>
          <Heading level={2} justify="center" textWrap="balance" className="max-w-full px-4 uppercase tracking-[0.05em] mono lg:px-0 lg:text-right">
            <ASCIIText text="Agency workflow: draft, refine, deploy" noWrap={false} />
          </Heading>
          <Text as="p" type="supporting" color="secondary" display="block" textWrap="pretty" className="max-w-[65ch] lg:text-right">
            {language === 'de'
              ? 'Kein Buzzword-Case, sondern ein konkreter Ablauf: schnell einen ersten Stand erzeugen, danach manuell verbessern und am Ende sauber für Kunden oder Redakteure übergeben.'
              : 'Not a buzzword case but a practical sequence: get to a first version quickly, refine it manually, then hand it over cleanly for clients or editors.'}
          </Text>
        </VStack>

        <Grid columns={{ minWidth: 260, max: 3, repeat: 'fit' }} gap={8}>
          {phaseContent[language].map((phase, index) => {
            const isGreen = phase.tone === 'green';

            return (
              <motion.article
                key={phase.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="h-full"
              >
                <Card
                  padding={6}
                  variant={isGreen ? 'green' : 'blue'}
                  className={`relative h-full overflow-hidden space-y-6 transition-colors ${isGreen ? 'hover:border-green-500/50' : 'hover:border-blue-500/50'}`}
                >
                  <div className="absolute -top-14 -right-14 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl" aria-hidden="true" />

                  <VStack gap={6} className="relative z-10">
                    <HStack justify="between" vAlign="center">
                      <Token label={phase.id} size="sm" color={isGreen ? 'green' : 'blue'} />
                      {index === 0 && <Zap className="w-4 h-4 text-blue-500" aria-hidden="true" />}
                      {index === 1 && <Code2 className="w-4 h-4 text-blue-500" aria-hidden="true" />}
                      {index === 2 && <Monitor className="w-4 h-4 text-green-500" aria-hidden="true" />}
                    </HStack>

                    <Heading level={3} className="uppercase tracking-[0.05em]">{phase.title}</Heading>

                    <div className="h-24 bg-neutral-900 rounded border border-neutral-800 p-4 mono text-[8px] overflow-hidden relative" aria-hidden="true">
                      {index === 0 && (
                        <>
                          <div className="absolute top-2 right-2 flex items-center gap-1 text-blue-500">
                            <span className="motion-safe:animate-pulse">●</span> DRAFT_MODE
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-neutral-500">// First pass</div>
                            <div>
                              <span className="text-blue-400">const</span> <span className="text-green-400">Layout</span> = compose({`{`}
                            </div>
                            <div className="pl-2">header: data.title,</div>
                            <div className="pl-2">pipeline: 'active',</div>
                            <div>{`}`})</div>
                          </div>
                        </>
                      )}

                      {index === 1 && (
                        <div className="h-full flex items-center justify-center border-2 border-dashed border-neutral-800 rounded">
                          <div className="flex flex-col items-center gap-2">
                            <Settings className="w-6 h-6 text-neutral-700 motion-safe:animate-spin-slow" />
                            <span className="mono text-[8px] text-neutral-600">MANUAL_REVIEW</span>
                          </div>
                        </div>
                      )}

                      {index === 2 && (
                        <div className="h-full bg-white rounded border border-neutral-200 flex flex-col items-center justify-center gap-2">
                          <div className="w-1/2 h-2 bg-neutral-200 rounded" />
                          <div className="w-3/4 h-4 bg-blue-500/20 rounded" />
                          <div className="flex items-center gap-1 text-blue-500 mono text-[7px] font-bold">
                            <MousePointer2 className="w-2 h-2" /> EDITING_LAYER
                          </div>
                        </div>
                      )}
                    </div>

                    <Text as="p" type="supporting" color="secondary" display="block">{phase.text}</Text>
                  </VStack>
                </Card>
              </motion.article>
            );
          })}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          whileHover={{ scale: 1.01 }}
          className="group transition-all duration-300"
        >
          <Card padding={8} variant="blue" className="relative overflow-hidden bg-gradient-to-br from-[#111111] via-[#0f1118] to-[#111111] hover:shadow-[0_0_35px_rgba(59,130,246,0.16)]">
            <div className="absolute top-0 right-0 h-52 w-52 bg-blue-500/10 blur-3xl rounded-full" aria-hidden="true" />

            <VStack gap={8} className="relative">
              <VStack gap={3}>
                <Text type="code" color="accent" display="block" className="uppercase tracking-[0.24em]">// CASE_03</Text>
                <HStack justify="between" vAlign="start" gap={4} wrap="wrap">
                  <Heading level={3} className="uppercase tracking-[0.04em] mono">
                    <ASCIIText text="Kaffee Faensen Commerce Engine" />
                  </Heading>
                  <Link
                    href="https://www.kaffee-faensen.de/shop/homepage"
                    isExternalLink
                    isStandalone
                    type="code"
                    className="inline-flex items-center gap-2 uppercase tracking-widest"
                  >
                    {language === 'de' ? 'Live ansehen' : 'View live'} <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </HStack>
                <Text as="p" type="supporting" color="secondary" display="block" textWrap="pretty" className="max-w-[72ch]">
                  {language === 'de'
                    ? 'Für den Shop wurde keine Standardvorlage übernommen, sondern eine eigene Commerce-Strecke aufgebaut. Produkte, Warenkorb und Checkout folgen den realen Anforderungen des Projekts; Stripe übernimmt die Zahlungsabwicklung.'
                    : 'The shop does not rely on a standard template. A custom commerce flow was built around the actual project requirements, with Stripe handling payments.'}
                </Text>
              </VStack>

              <Grid columns={{ minWidth: 240, max: 3, repeat: 'fit' }} gap={4}>
                <Card padding={4} variant="muted">
                  <VStack gap={2}>
                    <HStack gap={2} vAlign="center">
                      <Workflow className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                      <Text type="code" color="accent" weight="bold" className="uppercase tracking-widest">
                        {language === 'de' ? 'Eigene Shop-Logik' : 'Custom shop flow'}
                      </Text>
                    </HStack>
                    <Text as="p" type="supporting" color="secondary" display="block">
                      {language === 'de'
                        ? 'Eigene Logik statt starrem Baukasten. So lassen sich Produktdarstellung, Zustände und Checkout-Verhalten passender umsetzen.'
                        : 'Custom logic instead of a rigid builder. That makes product presentation, state handling, and checkout behaviour easier to shape.'}
                    </Text>
                  </VStack>
                </Card>

                <Card padding={4} variant="muted">
                  <VStack gap={2}>
                    <HStack gap={2} vAlign="center">
                      <CreditCard className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                      <Text type="code" color="accent" weight="bold" className="uppercase tracking-widest">
                        {language === 'de' ? 'Stripe-Anbindung' : 'Stripe integration'}
                      </Text>
                    </HStack>
                    <Text as="p" type="supporting" color="secondary" display="block">
                      {language === 'de'
                        ? 'Stripe ist als Zahlungsstrecke angebunden, ohne die restliche Shop-Logik an ein komplettes Standardsystem zu binden.'
                        : 'Stripe handles payments without forcing the rest of the shop flow into a full off-the-shelf system.'}
                    </Text>
                  </VStack>
                </Card>

                <Card padding={4} variant="muted">
                  <VStack gap={2}>
                    <HStack gap={2} vAlign="center">
                      <Monitor className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                      <Text type="code" color="accent" weight="bold" className="uppercase tracking-widest">
                        {language === 'de' ? 'Operativer Nutzen' : 'Operational value'}
                      </Text>
                    </HStack>
                    <Text as="p" type="supporting" color="secondary" display="block">
                      {language === 'de'
                        ? 'Hilfreich, wenn ein Projekt mehr Kontrolle braucht als ein vorgegebenes Theme oder ein Standardshop liefern kann.'
                        : 'Useful when a project needs more control than a preset theme or standard shop setup can provide.'}
                    </Text>
                  </VStack>
                </Card>
              </Grid>
            </VStack>
          </Card>
        </motion.div>
      </VStack>
    </section>
  );
};

export default ShowcaseB;
