import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

interface TerminalBootProps {
  onComplete: () => void;
}

interface LogEntry {
  message: string;
  timestamp: string;
}

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

const CURSOR_ANIMATION = { opacity: [0, 1, 0] };
const CURSOR_TRANSITION = { repeat: Infinity, duration: 0.8 };

// Optimized LogItem component with memoization to prevent re-renders of previous logs
const LogItem = memo(({ log }: { log: LogEntry }) => {
  const isSpecial = log.message && (log.message.includes('[OK]') || log.message.includes('ACTIVE'));
  const isWarn = log.message && log.message.includes('[WARN]');

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${isSpecial ? 'text-green-500 font-bold' : isWarn ? 'text-yellow-500' : 'text-neutral-300'}`}
    >
      <span className="text-neutral-600">[{log.timestamp}]</span> {log.message}
    </motion.div>
  );
});

LogItem.displayName = 'LogItem';

const TerminalBoot: React.FC<TerminalBootProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        const nextLog = bootMessages[currentLine];
        if (nextLog) {
          // Calculate timestamp once when the log is created, not on every render
          const timestamp = new Date().toLocaleTimeString('de-DE', { hour12: false });
          setLogs(prev => [...prev, { message: nextLog, timestamp }]);
        }
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[1000] flex items-center justify-center p-6 mono text-sm overflow-hidden" role="dialog" aria-modal="true" aria-label="System-Boot-Vorgang">
      <div className="w-full max-w-2xl bg-[#111111] border border-neutral-800 rounded p-6 shadow-2xl relative">
        <div className="absolute top-2 right-4 flex space-x-2" aria-hidden="true">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="space-y-1" role="status" aria-live="polite">
          {logs.map((log, i) => (
            <LogItem key={i} log={log} />
          ))}
          <motion.div
            animate={CURSOR_ANIMATION}
            transition={CURSOR_TRANSITION}
            className="w-2 h-4 bg-blue-500 inline-block align-middle ml-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalBoot;
