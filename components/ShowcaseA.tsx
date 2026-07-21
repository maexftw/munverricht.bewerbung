import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FileText, Cpu, CheckCircle, ShieldCheck } from 'lucide-react';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { StatusDot } from '@astryxdesign/core/StatusDot';
import { Text } from '@astryxdesign/core/Text';
import { Token } from '@astryxdesign/core/Token';
import { VStack } from '@astryxdesign/core/VStack';
import ASCIIText from './ASCIIText';

type Language = 'de' | 'en';

type ShowcaseAProps = {
  language: Language;
};

const BACKGROUND_TEXT = Array(50)
  .fill('RLC_CONTENT_WORKFLOW_NEWS_CONTACT_PYTHON_PREVIEW_RELEASE_VERIFICATION ')
  .join(' ');

const ShowcaseA: React.FC<ShowcaseAProps> = ({ language }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="showcase-a">
      <VStack gap={10}>
        <VStack gap={4}>
          <Text type="code" color="accent" display="block" className="tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
            <ASCIIText text="// ENGINEERING_USE_CASE_01" />
          </Text>
          <Heading level={2} className="uppercase tracking-[0.05em] mono">
            <ASCIIText text="RLC Content & Release Workflow" />
          </Heading>
          <Text as="p" type="supporting" color="secondary" display="block" textWrap="pretty" className="max-w-[65ch]">
            {language === 'de'
              ? 'Für die Vereinswebsite des RLC 1952 habe ich Contentpflege, Kontaktfunktion und Release-Ablauf als zusammenhängenden Workflow aufgebaut. News und Termine lassen sich strukturiert pflegen, Änderungen werden in einer Vorschau geprüft und erst danach veröffentlicht.'
              : 'For the RLC 1952 association website, I connected content maintenance, the contact function, and the release process. News and events can be maintained in a structured way, reviewed in preview, and published afterwards.'}
          </Text>
        </VStack>

        <Grid columns={{ minWidth: 320, max: 2, repeat: 'fit' }} gap={10} align="center">
          <Card padding={8} className="relative overflow-hidden bg-[#111111]">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mono text-[8px] leading-tight select-none" aria-hidden="true">
              {BACKGROUND_TEXT}
            </div>

            <VStack gap={8} className="relative">
              <div className="flex flex-col space-y-8" aria-hidden="true">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded border border-neutral-800 bg-neutral-900 flex items-center justify-center shadow-lg">
                    <FileText className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div className="h-px flex-1 bg-neutral-800" />
                  <div className="mono text-[10px] text-neutral-500 text-right w-24">01_INGEST</div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded border border-blue-500 bg-blue-500/10 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <Cpu className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 bg-blue-500/10 border border-blue-500/20 rounded p-3 mono text-[9px] text-blue-400">
                    <div className="flex justify-between mb-1">
                      <span>PYTHON_CONTENT_SYNC</span>
                      <span>ACTIVE</span>
                    </div>
                    <div className="w-full bg-neutral-900 h-1 rounded-full">
                      <motion.div
                        initial={{ width: shouldReduceMotion ? '85%' : 0 }}
                        animate={{ width: '85%' }}
                        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                        className="bg-blue-500 h-full rounded-full"
                      />
                    </div>
                  </div>
                  <div className="mono text-[10px] text-blue-500 text-right w-24">02_PROCESS</div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded border border-green-500/50 bg-green-500/5 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="h-px flex-1 bg-neutral-800" />
                  <div className="mono text-[10px] text-green-500 text-right w-24">03_VERIFY</div>
                </div>
              </div>

              <Grid columns={3} gap={4} className="pt-4 text-center">
                <Text type="code" color="secondary" display="block" justify="center" className="uppercase">{language === 'de' ? 'Input: News & Termine' : 'Input: News & events'}</Text>
                <Text type="code" color="accent" display="block" justify="center" className="uppercase">{language === 'de' ? 'Python Content Sync' : 'Python content sync'}</Text>
                <Text type="code" color="accent" display="block" justify="center" className="uppercase text-green-600">{language === 'de' ? 'Geprüfter Release' : 'Verified release'}</Text>
              </Grid>
            </VStack>
          </Card>

          <VStack gap={8} className="self-center">
            <VStack gap={6}>
              <Card padding={0} variant="transparent">
                <VStack gap={2}>
                  <Text type="code" color="accent" display="block" weight="bold" className="uppercase tracking-widest">
                    <ASCIIText text=">> Content automation" />
                  </Text>
                  <Text as="p" type="supporting" color="secondary" display="block">
                    {language === 'de'
                      ? 'Python-Skripte unterstützen die Pflege wiederkehrender Inhalte und halten News, Seiten und strukturierte Daten im gleichen Arbeitsablauf.'
                      : 'Python scripts support recurring content maintenance and keep news, pages, and structured data in the same workflow.'}
                  </Text>
                </VStack>
              </Card>
              <Card padding={0} variant="transparent">
                <VStack gap={2}>
                  <Text type="code" color="accent" display="block" weight="bold" className="uppercase tracking-widest">
                    <ASCIIText text=">> Contact function" />
                  </Text>
                  <Text as="p" type="supporting" color="secondary" display="block">
                    {language === 'de'
                      ? 'Eine Cloudflare Function verarbeitet das Kontaktformular serverseitig. Turnstile und Eingabeprüfungen schützen den Weg bis zur E-Mail-Weiterleitung.'
                      : 'A Cloudflare Function handles the contact form server-side. Turnstile and input validation protect the path through to email delivery.'}
                  </Text>
                </VStack>
              </Card>
              <Card padding={0} variant="transparent">
                <VStack gap={2}>
                  <Text type="code" color="accent" display="block" weight="bold" className="uppercase tracking-widest">
                    <ASCIIText text=">> Preview & release" />
                  </Text>
                  <Text as="p" type="supporting" color="secondary" display="block">
                    {language === 'de'
                      ? 'Vor dem Livegang werden Seiten, Links, Formulare und Build-Ausgabe geprüft. Der Release bleibt dadurch nachvollziehbar und wiederholbar.'
                      : 'Pages, links, forms, and build output are checked before publication. This keeps the release clear and repeatable.'}
                  </Text>
                </VStack>
              </Card>
            </VStack>

            <Card padding={4} variant="green">
              <HStack gap={3} vAlign="center" wrap="wrap">
                <ShieldCheck className="w-5 h-5 text-green-500" aria-hidden="true" />
                <StatusDot variant="success" label="Live" isPulsing />
                <Text type="code" color="secondary">STATUS:</Text>
                <Token label="LIVE / BUILD & RELEASE CHECKED" size="sm" color="green" />
              </HStack>
            </Card>
          </VStack>
        </Grid>
      </VStack>
    </section>
  );
};

export default ShowcaseA;
