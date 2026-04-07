import React, { useEffect, useState } from 'react';
import TerminalBoot from './components/TerminalBoot';
import Hero from './components/Hero';
import Evolution from './components/Evolution';
import ShowcaseA from './components/ShowcaseA';
import ShowcaseB from './components/ShowcaseB';
import SkillMonitor from './components/SkillMonitor';
import ContactShell from './components/ContactShell';
import CodeAmbientBackground from './components/CodeAmbientBackground';
import FirecrawlAnimationDemo from './components/FirecrawlAnimationDemo';
import WebdesignPage from './components/WebdesignPage';
import { AnimatePresence } from 'framer-motion';

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
  const [pathname, setPathname] = useState(() => (typeof window === 'undefined' ? '/' : window.location.pathname));

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handlePopstate = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const setVars = (x: number, y: number) => {
      root.style.setProperty('--space-x', x.toFixed(3));
      root.style.setProperty('--space-y', y.toFixed(3));
    };

    const animateFrame = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setVars(currentX, currentY);
      rafId = window.requestAnimationFrame(animateFrame);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || window.innerWidth < 1024) return;
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        targetX = 0;
        targetY = 0;
        currentX = 0;
        currentY = 0;
        setVars(0, 0);
      }
    };

    setVars(0, 0);
    rafId = window.requestAnimationFrame(animateFrame);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    reducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      reducedMotion.removeEventListener('change', handleMotionChange);
      window.cancelAnimationFrame(rafId);
      root.style.removeProperty('--space-x');
      root.style.removeProperty('--space-y');
    };
  }, []);

  const isFirecrawlAnimationDemo = pathname === '/firecrawl-animation';
  const isWebdesignPage = pathname === '/webdesign';

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
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,_color-mix(in_srgb,var(--accent-color)_8%,transparent)_0%,transparent_48%)]" />
        <div className="fixed bottom-0 left-0 right-0 h-[34vh] pointer-events-none z-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--accent-color)_7%,transparent),transparent_72%)]" />
        <div
          className="pointer-events-none fixed inset-x-[4vw] top-[8vh] z-0 h-[52vh] rounded-[3rem] border border-[color:var(--accent-border)]/30 bg-[linear-gradient(140deg,rgba(59,130,246,0.08),rgba(15,23,42,0.02),rgba(255,255,255,0.02))] opacity-80 blur-[1px]"
          style={{ transform: 'perspective(1600px) rotateX(calc(var(--space-y, 0) * -6deg)) rotateY(calc(var(--space-x, 0) * 8deg)) translate3d(calc(var(--space-x, 0) * -22px), calc(var(--space-y, 0) * -12px), -120px)' }}
        />
        <div
          className="pointer-events-none fixed -left-[12vw] top-[16vh] z-0 h-[46vh] w-[36vw] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14),transparent_68%)] blur-3xl"
          style={{ transform: 'translate3d(calc(var(--space-x, 0) * 28px), calc(var(--space-y, 0) * -18px), 0)' }}
        />
        <div
          className="pointer-events-none fixed -right-[10vw] top-[28vh] z-0 h-[38vh] w-[34vw] rounded-full bg-[radial-gradient(circle,rgba(191,219,254,0.12),transparent_72%)] blur-3xl"
          style={{ transform: 'translate3d(calc(var(--space-x, 0) * -34px), calc(var(--space-y, 0) * 18px), 0)' }}
        />
        <div
          className="pointer-events-none fixed inset-x-0 top-[11rem] z-0 h-px bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.42),transparent)] opacity-70"
          style={{ transform: 'translate3d(0, calc(var(--space-y, 0) * 10px), 0)' }}
        />
        <div className="scanline" />
        <div className="crt-overlay" />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 mono text-xs font-bold uppercase tracking-widest focus:bg-[color:var(--accent-fill)] focus:text-[color:var(--accent-contrast)] focus:ring-[color:var(--focus-ring)] focus:ring-offset-2 focus:ring-offset-[color:var(--surface-1)]"
        >
          {language === 'de' ? 'Zum Hauptinhalt springen' : 'Skip to main content'}
        </a>

        <Navigation language={language} onLanguageChange={handleLanguageChange} currentPath={pathname} />

        {!isWebdesignPage && <CodeAmbientBackground />}

        {isWebdesignPage ? (
          <div
            className="relative z-10"
            style={{ transform: 'perspective(1800px) rotateX(calc(var(--space-y, 0) * -0.8deg)) rotateY(calc(var(--space-x, 0) * 0.9deg))' }}
          >
            <WebdesignPage language={language} />
          </div>
        ) : (
          <div className="flex flex-col items-center w-full px-4 sm:px-5 lg:px-0">
            <main
              id="main-content"
              className="relative z-10 w-full max-w-6xl mx-auto space-y-24 sm:space-y-28 lg:space-y-32 py-10 sm:py-12 pb-28 sm:pb-24 outline-none"
              tabIndex={-1}
              style={{ transform: 'perspective(1800px) rotateX(calc(var(--space-y, 0) * -0.9deg)) rotateY(calc(var(--space-x, 0) * 1deg))' }}
            >
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
        )}

        <ScrollToTop language={language} />
        <CookieConsent language={language} />

        <AnimatePresence>
          {booting && <TerminalBoot onComplete={() => setBooting(false)} />}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
};

export default App;
