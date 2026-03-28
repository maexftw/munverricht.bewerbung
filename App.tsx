import React, { useState } from 'react';
import TerminalBoot from './components/TerminalBoot';
import Hero from './components/Hero';
import Evolution from './components/Evolution';
import ShowcaseA from './components/ShowcaseA';
import ShowcaseB from './components/ShowcaseB';
import SkillMonitor from './components/SkillMonitor';
import ContactShell from './components/ContactShell';
import CodeAmbientBackground from './components/CodeAmbientBackground';
import FirecrawlAnimationDemo from './components/FirecrawlAnimationDemo';
import FirstDebitApplicationPage from './components/FirstDebitApplicationPage';
import ApplicationLandingPage from './components/ApplicationLandingPage';
import { AnimatePresence } from 'framer-motion';

import Navigation from './components/Navigation';
import { ThemeProvider } from './components/ThemeContext';

import Projects from './components/Projects';
import LegalInfo from './components/LegalInfo';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import { themeClasses } from './components/themeClasses';

const FIRST_DEBIT_PRIVATE_PATH = '/fd-2026-casefile-7k2q';
const APPLICATION_LANDING_PATH = '/bewerbung';

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [language, setLanguage] = useState<'de' | 'en'>(() => {
    if (typeof window === 'undefined') return 'de';
    const saved = window.localStorage.getItem('mu_language');
    return saved === 'en' ? 'en' : 'de';
  });
  const isFirecrawlAnimationDemo = typeof window !== 'undefined' && window.location.pathname === '/firecrawl-animation';
  const isFirstDebitApplication = typeof window !== 'undefined' && window.location.pathname === FIRST_DEBIT_PRIVATE_PATH;
  const isApplicationLanding = typeof window !== 'undefined' && window.location.pathname === APPLICATION_LANDING_PATH;

  if (isFirecrawlAnimationDemo) {
    return <FirecrawlAnimationDemo />;
  }

  const handleLanguageChange = (nextLanguage: 'de' | 'en') => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('mu_language', nextLanguage);
  };

  return (
    <ThemeProvider>
      <div className={`relative min-h-screen overflow-hidden ${themeClasses.pageShell}`}>
        {!isFirstDebitApplication && !isApplicationLanding && <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,_color-mix(in_srgb,var(--accent-color)_8%,transparent)_0%,transparent_48%)]" />}
        {!isFirstDebitApplication && !isApplicationLanding && <div className="fixed bottom-0 left-0 right-0 h-[34vh] pointer-events-none z-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--accent-color)_7%,transparent),transparent_72%)]" />}
        <div className="scanline" />
        <div className="crt-overlay" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 mono text-xs font-bold uppercase tracking-widest focus:bg-[color:var(--accent-fill)] focus:text-[color:var(--accent-contrast)] focus:ring-[color:var(--focus-ring)] focus:ring-offset-2 focus:ring-offset-[color:var(--surface-1)]"
      >
        {language === 'de' ? 'Zum Hauptinhalt springen' : 'Skip to main content'}
      </a>

      {!isFirstDebitApplication && !isApplicationLanding && <Navigation language={language} onLanguageChange={handleLanguageChange} />}

        {!isFirstDebitApplication && !isApplicationLanding && <CodeAmbientBackground />}

      <div className="flex flex-col items-center w-full px-3 sm:px-4 lg:px-0">
        <main id="main-content" className="relative z-10 w-full max-w-6xl mx-auto space-y-16 sm:space-y-20 lg:space-y-24 py-8 sm:py-10 lg:py-12 pb-20 sm:pb-24 lg:pb-28 outline-none" tabIndex={-1}>
          {isFirstDebitApplication ? (
            <>
              <FirstDebitApplicationPage privatePath={FIRST_DEBIT_PRIVATE_PATH} />
              <footer className={`pt-6 sm:pt-8 pb-6 sm:pb-8 text-center mono text-[9px] sm:text-[10px] lg:text-xs leading-relaxed ${themeClasses.textSoft} border-t ${themeClasses.sectionBorder}`}>
                <p className="break-words">FIRST DEBIT APPLICATION // MAXIMILIAN UNVERRICHT // 2026</p>
              </footer>
            </>
          ) : isApplicationLanding ? (
            <>
              <ApplicationLandingPage />
              <footer className={`pt-6 sm:pt-8 pb-6 sm:pb-8 text-center mono text-[9px] sm:text-[10px] lg:text-xs leading-relaxed ${themeClasses.textSoft} border-t ${themeClasses.sectionBorder}`}>
                <p className="break-words">APPLICATION LANDING // MAXIMILIAN UNVERRICHT // 2026</p>
              </footer>
            </>
          ) : (
            <>
              <Hero language={language} />
              <Evolution language={language} />
              <ShowcaseA language={language} />
              <ShowcaseB language={language} />
              <Projects language={language} />
              <SkillMonitor language={language} />
              <ContactShell language={language} />
              <LegalInfo language={language} />
              <footer className={`pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 text-center mono text-[9px] sm:text-[10px] lg:text-xs leading-relaxed ${themeClasses.textSoft} border-t ${themeClasses.sectionBorder}`}>
                <p className="break-words">© 2026 MAXIMILIAN UNVERRICHT // FRONTEND & WEB DELIVERY</p>
              </footer>
            </>
          )}
        </main>
      </div>

      {!isFirstDebitApplication && !isApplicationLanding && <ScrollToTop language={language} />}
      {!isFirstDebitApplication && !isApplicationLanding && <CookieConsent language={language} />}

        {/* Non-blocking System Boot Overlay */}
        <AnimatePresence>
          {!isFirstDebitApplication && !isApplicationLanding && booting && (
            <TerminalBoot onComplete={() => setBooting(false)} />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default App;
