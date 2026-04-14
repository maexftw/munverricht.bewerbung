import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TerminalBoot from './TerminalBoot';
import Hero from './Hero';
import Evolution from './Evolution';
import ShowcaseA from './ShowcaseA';
import ShowcaseB from './ShowcaseB';
import SkillMonitor from './SkillMonitor';
import ContactShell from './ContactShell';
import CodeAmbientBackground from './CodeAmbientBackground';
import Navigation from './Navigation';
import Projects from './Projects';
import LegalInfo from './LegalInfo';
import ScrollToTop from './ScrollToTop';
import { ThemeProvider } from './ThemeContext';
import { themeClasses } from './themeClasses';

type MainPortfolioPageProps = {
  language: 'de' | 'en';
  onLanguageChange: (nextLanguage: 'de' | 'en') => void;
};

const MainPortfolioPage: React.FC<MainPortfolioPageProps> = ({ language, onLanguageChange }) => {
  const [booting, setBooting] = useState(true);

  return (
    <ThemeProvider>
      <div className={`relative min-h-screen overflow-hidden ${themeClasses.pageShell}`}>
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,_color-mix(in_srgb,var(--accent-color)_8%,transparent)_0%,transparent_48%)]" />
        <div className="fixed bottom-0 left-0 right-0 h-[34vh] pointer-events-none z-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--accent-color)_7%,transparent),transparent_72%)]" />
        <div className="scanline" />
        <div className="crt-overlay" />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 mono text-xs font-bold uppercase tracking-widest focus:bg-[color:var(--accent-fill)] focus:text-[color:var(--accent-contrast)] focus:ring-[color:var(--focus-ring)] focus:ring-offset-2 focus:ring-offset-[color:var(--surface-1)]"
        >
          {language === 'de' ? 'Zum Hauptinhalt springen' : 'Skip to main content'}
        </a>

        <Navigation language={language} onLanguageChange={onLanguageChange} />

        <CodeAmbientBackground />

        <div className="flex flex-col items-center w-full px-4 sm:px-5 lg:px-0">
          <main id="main-content" className="relative z-10 w-full max-w-6xl mx-auto space-y-24 sm:space-y-28 lg:space-y-32 py-10 sm:py-12 pb-28 sm:pb-24 outline-none" tabIndex={-1}>
            <Hero language={language} />
            <Evolution language={language} />
            <ShowcaseA language={language} />
            <ShowcaseB language={language} />
            <Projects language={language} />
            <SkillMonitor language={language} />
            <ContactShell language={language} />
            <LegalInfo language={language} />
            <footer className={`pt-16 sm:pt-20 pb-8 text-center mono text-[10px] sm:text-xs leading-relaxed ${themeClasses.textSoft} border-t ${themeClasses.sectionBorder}`}>
              <p className="break-words">© 2026 MAXIMILIAN UNVERRICHT // FRONTEND & WEB DELIVERY</p>
            </footer>
          </main>
        </div>

        <ScrollToTop language={language} />

        <AnimatePresence>
          {booting && (
            <TerminalBoot onComplete={() => setBooting(false)} />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default MainPortfolioPage;
