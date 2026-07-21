import React, { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { AppShell } from '@astryxdesign/core/AppShell';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import TerminalBoot from './TerminalBoot';
import Hero from './Hero';
import Evolution from './Evolution';
import ShowcaseA from './ShowcaseA';
import ShowcaseB from './ShowcaseB';
import SkillMonitor from './SkillMonitor';
import ContactShell from './ContactShell';
import PortfolioAtmosphere from './PortfolioAtmosphere';
import Navigation from './Navigation';
import Projects from './Projects';
import LegalInfo from './LegalInfo';
import ScrollToTop from './ScrollToTop';
import { ThemeProvider } from './ThemeContext';


type MainPortfolioPageProps = {
  language: 'de' | 'en';
  onLanguageChange: (nextLanguage: 'de' | 'en') => void;
};

const defaultMeta = {
  title: 'Maximilian Unverricht | Webentwicklung & AI-Automatisierung',
  description:
    'Portfolio von Maximilian Unverricht: moderne Websites, Cloudflare-Integrationen, Content-Automatisierung und interaktive Webanwendungen.',
};

const upsertMetaTag = (selector: string, attributes: Record<string, string>, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
  return element;
};

const MainPortfolioPage: React.FC<MainPortfolioPageProps> = ({ language, onLanguageChange }) => {
  const [booting, setBooting] = useState(true);
  const portfolioMeta =
    language === 'de'
      ? {
          title: 'Maximilian Unverricht | Webentwicklung & AI-Automatisierung',
          description:
            'Portfolio von Maximilian Unverricht: moderne Websites, Cloudflare-Integrationen, Content-Automatisierung und interaktive Webanwendungen.',
        }
      : {
          title: 'Maximilian Unverricht | Web Development & AI-assisted Automation',
          description:
            'The portfolio of Maximilian Unverricht: modern websites, Cloudflare integrations, content automation, and interactive web applications.',
        };

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitleMeta = document.head.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescriptionMeta = document.head.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const previousDescription = descriptionMeta?.getAttribute('content') ?? defaultMeta.description;
    const previousOgTitle = ogTitleMeta?.getAttribute('content') ?? defaultMeta.title;
    const previousOgDescription = ogDescriptionMeta?.getAttribute('content') ?? defaultMeta.description;

    document.title = portfolioMeta.title;
    upsertMetaTag('meta[name="description"]', { name: 'description' }, portfolioMeta.description);
    upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, portfolioMeta.title);
    upsertMetaTag('meta[property="og:description"]', { property: 'og:description' }, portfolioMeta.description);

    return () => {
      document.title = previousTitle || defaultMeta.title;
      upsertMetaTag('meta[name="description"]', { name: 'description' }, previousDescription);
      upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, previousOgTitle);
      upsertMetaTag('meta[property="og:description"]', { property: 'og:description' }, previousOgDescription);
    };
  }, [portfolioMeta.description, portfolioMeta.title]);

  return (
    <ThemeProvider withAstryx>
      <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-hidden bg-[color:var(--bg-color)] text-[color:var(--text-color)]">
        <PortfolioAtmosphere />

        <AppShell
          className="portfolio-app-shell"
          height="auto"
          variant="section"
          contentPadding={0}
          mobileNav={false}
          topNav={<Navigation language={language} onLanguageChange={onLanguageChange} />}
        >
          <VStack
            id="main-content"
            className="relative z-10 mx-auto outline-none"
            width="100%"
            maxWidth={1152}
            gap={10}
            paddingInline={4}
            paddingBlock={10}
            tabIndex={-1}
          >
            <Hero language={language} />
            <Evolution language={language} />
            <ShowcaseA language={language} />
            <ShowcaseB language={language} />
            <Projects language={language} />
            <SkillMonitor language={language} />
            <ContactShell language={language} />
            <LegalInfo language={language} />
            <footer className="border-t border-[color:var(--border-subtle)] py-8 text-center">
              <Text type="code" color="secondary" display="block" textWrap="wrap">
                © 2026 MAXIMILIAN UNVERRICHT // FRONTEND & WEB DELIVERY
              </Text>
            </footer>
          </VStack>
        </AppShell>

        <ScrollToTop language={language} />

        <AnimatePresence>
          {booting && (
            <TerminalBoot onComplete={() => setBooting(false)} />
          )}
        </AnimatePresence>
      </div>
      </MotionConfig>
    </ThemeProvider>
  );
};

export default MainPortfolioPage;
