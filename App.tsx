
import React, { useState, useEffect } from 'react';
import TerminalBoot from './components/TerminalBoot';
import Hero from './components/Hero';
import Evolution from './components/Evolution';
import ShowcaseA from './components/ShowcaseA';
import ShowcaseB from './components/ShowcaseB';
import SkillMonitor from './components/SkillMonitor';
import ContactShell from './components/ContactShell';
import BackgroundAnimation from './components/BackgroundAnimation';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);

  return (
    <div className="relative min-h-screen selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-blue-900/40 via-blue-900/10 to-transparent pointer-events-none z-0" />
      <div className="scanline" />
      <div className="crt-overlay opacity-50" />

      <BackgroundAnimation />

      <AnimatePresence mode="wait">
        {booting ? (
          <motion.div key="boot" exit={{ opacity: 0 }}>
            <TerminalBoot onComplete={() => setBooting(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center w-full px-4 md:px-0"
          >
            <main className="relative z-10 w-full max-w-6xl mx-auto space-y-32 py-12">
              <Hero />
              <Evolution />
              <ShowcaseA />
              <ShowcaseB />
              <SkillMonitor />
              <ContactShell />
              <footer className="pt-20 pb-8 text-center mono text-xs text-neutral-400 border-t border-neutral-800">
                <p>© 2026 MAXIMILIAN UNVERRICHT // THE AGENTIC DEVELOPER // v3.1.0-STABLE</p>
              </footer>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
