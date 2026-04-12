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
import { AnimatePresence } from 'framer-motion';
import WebdesignLandingPage from './components/WebdesignLandingPage';
import WebAmbientBackground from './components/WebAmbientBackground';

import Navigation from './components/Navigation';
import { ThemeProvider } from './components/ThemeContext';

import Projects from './components/Projects';
import LegalInfo from './components/LegalInfo';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import { themeClasses } from './components/themeClasses';

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [language, setLanguage] = useState<'de' | 'en'>(() => {
    if (typeof window === 'undefined') return 'de';
    const saved = window.localStorage.getItem('mu_language');
    return saved === 'en' ? 'en' : 'de';
  });
  const pathname = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') || '/' : '/';
  const isFirecrawlAnimationDemo = pathname === '/firecrawl-animation';
  const isWebdesignLandingPage = pathname === '/webdesign';

  if (isFirecrawlAnimationDemo) {
    return <FirecrawlAnimationDemo />;
  }

  if (isWebdesignLandingPage) {
    return (
      <ThemeProvider forcedTheme="light">
        <div className={`relative min-h-screen overflow-hidden ${themeClasses.webPageShell}`} data-route-theme="light">
          <WebAmbientBackground />
          <div className={`fixed inset-0 z-0 pointer-events-none ${themeClasses.webAmbientTop}`} />
          <div className={`fixed inset-x-0 top-[16vh] z-0 h-[44vh] pointer-events-none ${themeClasses.webAmbientCenter}`} />
          <div className={`fixed bottom-0 left-0 right-0 z-0 h-[38vh] pointer-events-none ${themeClasses.webAmbientBottom}`} />
          <WebdesignLandingPage />
        </div>
      </ThemeProvider>
    );
  }

  const handleLanguageChange = (nextLanguage: 'de' | 'en') => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('mu_language', nextLanguage);
  };

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

      <Navigation language={language} onLanguageChange={handleLanguageChange} />

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
      <CookieConsent language={language} />

        {/* Non-blocking System Boot Overlay */}
        <AnimatePresence>
          {booting && (
            <TerminalBoot onComplete={() => setBooting(false)} />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default App;
