import React, { useState, useEffect } from 'react';
import TerminalBoot from './components/TerminalBoot';
import Hero from './components/Hero';
import Evolution from './components/Evolution';
import ShowcaseA from './components/ShowcaseA';
import ShowcaseB from './components/ShowcaseB';
import SkillMonitor from './components/SkillMonitor';
import ContactShell from './components/ContactShell';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import { motion, AnimatePresence } from 'framer-motion';
import { useTina } from 'tinacms/dist/react';
import { createClient } from "tinacms/dist/client";
import { queries } from "./tina/__generated__/types";

// Initialize Tina Client dynamically
const tinaClient = createClient({
  url: (import.meta.env.PROD && import.meta.env.VITE_TINA_PUBLIC_CLIENT_ID)
    ? `https://content.tinajs.io/1.4/content/${import.meta.env.VITE_TINA_PUBLIC_CLIENT_ID}/github/${import.meta.env.CF_PAGES_BRANCH || 'main'}`
    : 'http://localhost:4001/graphql',
  token: import.meta.env.VITE_TINA_TOKEN || 'b7e2d199f0f29b1656fdb8de286855837bacddf9',
  queries,
});

// Lazy load BackgroundAnimation
const BackgroundAnimation = React.lazy(() => import('./components/BackgroundAnimation'));

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [tinaData, setTinaData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageResponse = await tinaClient.queries.page({ relativePath: 'home.md' });
        const projectsResponse = await tinaClient.queries.projectConnection();

        setTinaData({
          page: pageResponse,
          projects: projectsResponse.data.projectConnection.edges?.map((edge: any) => edge.node) || []
        });
      } catch (error) {
        console.error("Error fetching Tina data:", error);
      }
    };
    fetchData();
  }, []);

  // useTina hook for live editing
  const { data } = useTina({
    query: tinaData?.page?.query,
    variables: tinaData?.page?.variables,
    data: tinaData?.page?.data,
  });

  const page = data?.page || {};
  const projects = tinaData?.projects || [];

  return (
    <div className="relative min-h-screen selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-blue-900/20 via-blue-900/10 to-transparent pointer-events-none z-0" />
      <div className="scanline" />
      <div className="crt-overlay opacity-50" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[2000] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black mono text-xs font-bold uppercase tracking-widest"
      >
        Zum Hauptinhalt springen
      </a>

      <Navigation />

      <React.Suspense fallback={null}>
        <BackgroundAnimation isPaused={false} />
      </React.Suspense>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center w-full px-4 md:px-0"
      >
        <main id="main-content" className="relative z-10 w-full max-w-6xl mx-auto space-y-32 py-12 outline-none" tabIndex={-1}>
          <Hero data={page.hero} />
          <Evolution data={page.evolution} />
          <ShowcaseA />
          <ShowcaseB />
          <Projects data={projects} />
          <SkillMonitor data={page.skills} />
          <ContactShell />
          <footer className="pt-20 pb-8 text-center mono text-xs text-neutral-300 border-t border-neutral-800">
            <p>© 2026 MAXIMILIAN UNVERRICHT // THE AGENTIC DEVELOPER // v3.1.0-STABLE</p>
          </footer>
        </main>
      </motion.div>

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
