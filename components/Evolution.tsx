import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, History } from 'lucide-react';
import ASCIIText from './ASCIIText';

type Language = 'de' | 'en';

type EvolutionProps = {
  language: Language;
};

const Evolution: React.FC<EvolutionProps> = ({ language }) => {
  return (
    <section id="evolution" className="space-y-16 py-12 scroll-mt-28">
      <div className="flex flex-col items-center text-center space-y-2">
        <h3 className="mono text-blue-500 text-[10px] tracking-[0.3em] uppercase opacity-70" aria-hidden="true">
          <ASCIIText text="// CHRONOLOGICAL_DATABASE" />
        </h3>
        <h2 className="max-w-full px-4 text-xl font-bold uppercase leading-tight tracking-[0.02em] mono sm:text-3xl sm:tracking-[0.05em]">
          <ASCIIText
            text={language === 'de' ? 'Werdegang & Aufbau der Praxis' : 'Career Path & Practical Foundation'}
            noWrap={false}
          />
        </h2>
      </div>

      <div className="max-w-[65ch] mx-auto space-y-12">
        <ul className="relative pl-8 border-l border-neutral-800 space-y-16">
          <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-blue-500 rounded-full flex items-center justify-center" aria-hidden="true">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-blue-500">{language === 'de' ? 'AKTUELL // WEB-SYSTEME & AUTOMATISIERUNG' : 'CURRENT // WEB SYSTEMS & AUTOMATION'}</span>
              <h4 className="text-xl font-bold text-white uppercase tracking-[0.05em]">
                {language === 'de' ? 'Websites, Integrationen und wiederholbare Abläufe' : 'Websites, integrations, and repeatable workflows'}
              </h4>
              <p className="text-neutral-200 text-sm leading-relaxed">
                {language === 'de'
                  ? 'Ich arbeite an React/Vite-Anwendungen, statischen Websites und Cloudflare-Integrationen. Dazu gehören Contentpflege, serverseitige Funktionen, technische Prüfungen und nachvollziehbare Releases.'
                  : 'I work on React/Vite applications, static websites, and Cloudflare integrations. That includes content maintenance, server-side functions, technical checks, and clear releases.'}
              </p>
            </div>
          </motion.li>

          <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-700 rounded-full flex items-center justify-center" aria-hidden="true">
              <GitCommit className="w-3 h-3 text-neutral-500" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-neutral-600">{language === 'de' ? 'CA. 1,5 JAHRE // AI-ASSISTED DEVELOPMENT' : 'AROUND 1.5 YEARS // AI-ASSISTED DEVELOPMENT'}</span>
              <h4 className="text-xl font-bold text-neutral-300 uppercase tracking-[0.05em]">
                {language === 'de' ? 'Coding Agents als Werkzeug, nicht als Versprechen' : 'Coding agents as a tool, not a promise'}
              </h4>
              <p className="text-neutral-200 text-sm leading-relaxed">
                {language === 'de'
                  ? 'Coding Agents unterstützen mich bei Analyse, Umsetzung und Fehlersuche. Entscheidend bleiben klare Quellen, Tests und die Prüfung des tatsächlichen Ergebnisses.'
                  : 'Coding agents support analysis, implementation, and debugging. Clear source material, tests, and verification of the actual result still guide the work.'}
              </p>
            </div>
          </motion.li>

          <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border border-neutral-800 rounded-full flex items-center justify-center" aria-hidden="true">
              <History className="w-3 h-3 text-neutral-700" />
            </div>
            <div className="space-y-2">
              <span className="mono text-[10px] text-neutral-600">{language === 'de' ? 'SEIT 2013 // MARKETING, CMS & COMMERCE' : 'SINCE 2013 // MARKETING, CMS & COMMERCE'}</span>
              <h4 className="text-xl font-bold text-neutral-200 uppercase tracking-[0.05em]">
                {language === 'de' ? 'Von Google Ads und WordPress zur modernen Webentwicklung' : 'From Google Ads and WordPress to modern web development'}
              </h4>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {language === 'de'
                  ? 'Seit 2013 arbeite ich mit Google Ads beziehungsweise AdWords und Analytics; 2017 war ich dafür zertifiziert. WordPress kam etwa 2014/15 hinzu, später Elementor, WooCommerce, JTL – unter anderem beim Aufbau des D-Smoker-Shops –, Shopify und ab etwa Mitte 2022 Webflow. Dieses Fundament verbinde ich heute mit React, Cloudflare und Automatisierung.'
                  : 'I have worked with Google Ads or AdWords and Analytics since 2013 and held certifications for them in 2017. WordPress followed around 2014/15, later Elementor, WooCommerce, JTL—including work on the D-Smoker shop—Shopify, and Webflow from around mid-2022. Today I combine that foundation with React, Cloudflare, and automation.'}
              </p>
            </div>
          </motion.li>
        </ul>
      </div>
    </section>
  );
};

export default Evolution;
