import React, { useState } from 'react';
import TerminalBoot from './components/TerminalBoot';
import Hero from './components/Hero';
import Evolution from './components/Evolution';
import ShowcaseA from './components/ShowcaseA';
import ShowcaseB from './components/ShowcaseB';
import SkillMonitor from './components/SkillMonitor';
import ContactShell from './components/ContactShell';
import CodeAmbientBackground from './components/CodeAmbientBackground';
import { motion, AnimatePresence } from 'framer-motion';

import Navigation from './components/Navigation';

import Projects from './components/Projects';
import LegalInfo from './components/LegalInfo';
import CookieConsent from './components/CookieConsent';

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);

  return (
    <div className="relative min-h-screen selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/8 via-transparent to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-blue-900/15 via-blue-900/5 to-transparent pointer-events-none z-0" />
      <div className="scanline" />
      <div className="crt-overlay" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black mono text-xs font-bold uppercase tracking-widest"
      >
        Zum Hauptinhalt springen
      </a>

      <Navigation />

      <CodeAmbientBackground />

      {/* Main Content - Immediately Visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center w-full px-4 md:px-0"
      >
        <main id="main-content" className="relative z-10 w-full max-w-6xl mx-auto space-y-32 py-12 outline-none" tabIndex={-1}>
          <Hero />
          <Evolution />
          <ShowcaseA />
          <ShowcaseB />
          <Projects />
          <SkillMonitor />
          <ContactShell />
          <LegalInfo />
          <footer className="pt-20 pb-8 text-center mono text-xs text-neutral-300 border-t border-neutral-800">
            <p>© 2026 MAXIMILIAN UNVERRICHT // THE AGENTIC DEVELOPER // v3.1.0-STABLE</p>
          </footer>
        </main>
      </motion.div>

      <CookieConsent />

      {/* Non-blocking System Boot Overlay */}
      <AnimatePresence>
        {booting && (
          <TerminalBoot onComplete={() => setBooting(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
