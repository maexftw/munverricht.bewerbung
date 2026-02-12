
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
      <div className="scanline" />
      <div className="crt-overlay" />
      
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
            <main className="w-full max-w-6xl mx-auto space-y-32 py-12">
              <Hero />
              <Evolution />
              <ShowcaseA />
              <ShowcaseB />
              <SkillMonitor />
              <ContactShell />
              <footer className="pt-20 pb-8 text-center mono text-xs text-neutral-600 border-t border-neutral-900">
                <p>© 2024 MAXIMILIAN UNVERRICHT // THE AGENTIC DEVELOPER // v3.0.1-STABLE</p>
              </footer>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
