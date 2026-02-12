
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalBootProps {
  onComplete: () => void;
}

const TerminalBoot: React.FC<TerminalBootProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const bootMessages = [
    "[INFO] Initializing System Core...",
    "[INFO] Loading Legacy Experience (12 Years)... Complete.",
    "[INFO] Re-indexing Expertise: WordPress (10Y), Webflow (2Y)... Done.",
    "[INFO] Checking Certificates: Google Ads, Analytics... Verified.",
    "[WARN] Legacy Logic detected. Triggering REFACTORE_CAREER.exe...",
    "[INFO] Connecting to Anti-Gravity IDE... Connected via Local SSH.",
    "[INFO] Initializing Agentic Workflow: Google AI Studio & Stitch...",
    "[INFO] Syncing Local LLMs (Mistral-Large, Qwen-32B)... Ready.",
    "[OK] System Optimization Level: MAXIMAL.",
    "[SYSTEM] Agentic Mode: ACTIVE."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        const nextLog = bootMessages[currentLine];
        if (nextLog) {
          setLogs(prev => [...prev, nextLog]);
        }
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[1000] flex items-center justify-center p-6 mono text-sm overflow-hidden">
      <div className="w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded p-6 shadow-2xl relative">
        <div className="absolute top-2 right-4 flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="space-y-1">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${log && (log.includes('[OK]') || log.includes('ACTIVE')) ? 'text-green-500 font-bold' : 
                          log && log.includes('[WARN]') ? 'text-yellow-500' : 'text-neutral-400'}`}
            >
              <span className="text-neutral-600">[{new Date().toLocaleTimeString('de-DE', { hour12: false })}]</span> {log}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-blue-500 inline-block align-middle ml-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalBoot;
