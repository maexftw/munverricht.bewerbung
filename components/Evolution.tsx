import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GitCommit, History } from 'lucide-react';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { StatusDot } from '@astryxdesign/core/StatusDot';
import { Text } from '@astryxdesign/core/Text';
import { Token } from '@astryxdesign/core/Token';
import { VStack } from '@astryxdesign/core/VStack';
import ASCIIText from './ASCIIText';

type Language = 'de' | 'en';

type EvolutionProps = {
  language: Language;
};

const Evolution: React.FC<EvolutionProps> = ({ language }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="evolution" className="py-12 scroll-mt-28">
      <VStack gap={10}>
        <VStack gap={2} hAlign="center" className="text-center">
          <Text type="code" color="accent" display="block" justify="center" className="tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
            <ASCIIText text="// CHRONOLOGICAL_DATABASE" />
          </Text>
          <Heading level={2} justify="center" textWrap="balance" className="max-w-full px-4 uppercase tracking-[0.05em] mono">
            <ASCIIText
              text={language === 'de' ? 'Werdegang & Aufbau der Praxis' : 'Career Path & Practical Foundation'}
              noWrap={false}
            />
          </Heading>
        </VStack>

        <VStack maxWidth="65ch" width="100%" className="mx-auto">
          <ul className="relative pl-8 border-l border-neutral-800 space-y-16">
            <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center" aria-hidden="true">
                <div className="w-2 h-2 bg-blue-500 rounded-full motion-safe:animate-pulse" />
              </div>
              <Card padding={5} variant="blue">
                <VStack gap={2}>
                  <HStack gap={2} vAlign="center" wrap="wrap">
                    <StatusDot variant="accent" label={language === 'de' ? 'Aktuell' : 'Current'} isPulsing={!shouldReduceMotion} />
                    <Token
                      label={language === 'de' ? 'AKTUELL // WEB-SYSTEME & AUTOMATISIERUNG' : 'CURRENT // WEB SYSTEMS & AUTOMATION'}
                      size="sm"
                      color="blue"
                    />
                  </HStack>
                  <Heading level={3} className="uppercase tracking-[0.05em]">
                    {language === 'de' ? 'Websites, Integrationen und wiederholbare Abläufe' : 'Websites, integrations, and repeatable workflows'}
                  </Heading>
                  <Text as="p" type="supporting" color="secondary" display="block">
                    {language === 'de'
                      ? 'Ich arbeite an React/Vite-Anwendungen, statischen Websites und Cloudflare-Integrationen. Dazu gehören Contentpflege, serverseitige Funktionen, technische Prüfungen und nachvollziehbare Releases.'
                      : 'I work on React/Vite applications, static websites, and Cloudflare integrations. That includes content maintenance, server-side functions, technical checks, and clear releases.'}
                  </Text>
                </VStack>
              </Card>
            </motion.li>

            <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-700 rounded-full flex items-center justify-center" aria-hidden="true">
                <GitCommit className="w-3 h-3 text-neutral-500" />
              </div>
              <Card padding={5} variant="muted">
                <VStack gap={2}>
                  <HStack gap={2} vAlign="center" wrap="wrap">
                    <StatusDot variant="neutral" label={language === 'de' ? 'Laufende Praxis' : 'Ongoing practice'} />
                    <Token
                      label={language === 'de' ? 'CA. 1,5 JAHRE // AI-ASSISTED DEVELOPMENT' : 'AROUND 1.5 YEARS // AI-ASSISTED DEVELOPMENT'}
                      size="sm"
                      color="gray"
                    />
                  </HStack>
                  <Heading level={3} color="secondary" className="uppercase tracking-[0.05em]">
                    {language === 'de' ? 'Coding Agents als Werkzeug, nicht als Versprechen' : 'Coding agents as a tool, not a promise'}
                  </Heading>
                  <Text as="p" type="supporting" color="secondary" display="block">
                    {language === 'de'
                      ? 'Coding Agents unterstützen mich bei Analyse, Umsetzung und Fehlersuche. Entscheidend bleiben klare Quellen, Tests und die Prüfung des tatsächlichen Ergebnisses.'
                      : 'Coding agents support analysis, implementation, and debugging. Clear source material, tests, and verification of the actual result still guide the work.'}
                  </Text>
                </VStack>
              </Card>
            </motion.li>

            <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-800 rounded-full flex items-center justify-center" aria-hidden="true">
                <History className="w-3 h-3 text-neutral-700" />
              </div>
              <Card padding={5} variant="transparent">
                <VStack gap={2}>
                  <HStack gap={2} vAlign="center" wrap="wrap">
                    <StatusDot variant="neutral" label={language === 'de' ? 'Historisches Fundament' : 'Historical foundation'} />
                    <Token
                      label={language === 'de' ? 'SEIT 2013 // MARKETING, CMS & COMMERCE' : 'SINCE 2013 // MARKETING, CMS & COMMERCE'}
                      size="sm"
                      color="gray"
                    />
                  </HStack>
                  <Heading level={3} color="secondary" className="uppercase tracking-[0.05em]">
                    {language === 'de' ? 'Von Google Ads und WordPress zur modernen Webentwicklung' : 'From Google Ads and WordPress to modern web development'}
                  </Heading>
                  <Text as="p" type="supporting" color="secondary" display="block">
                    {language === 'de'
                      ? 'Seit 2013 arbeite ich mit Google Ads beziehungsweise AdWords und Analytics; 2017 war ich dafür zertifiziert. WordPress kam etwa 2014/15 hinzu, später Elementor, WooCommerce, JTL – unter anderem beim Aufbau des D-Smoker-Shops –, Shopify und ab etwa Mitte 2022 Webflow. Dieses Fundament verbinde ich heute mit React, Cloudflare und Automatisierung.'
                      : 'I have worked with Google Ads or AdWords and Analytics since 2013 and held certifications for them in 2017. WordPress followed around 2014/15, later Elementor, WooCommerce, JTL—including work on the D-Smoker shop—Shopify, and Webflow from around mid-2022. Today I combine that foundation with React, Cloudflare, and automation.'}
                  </Text>
                </VStack>
              </Card>
            </motion.li>
          </ul>
        </VStack>
      </VStack>
    </section>
  );
};

export default Evolution;
