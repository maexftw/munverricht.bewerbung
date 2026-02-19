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
  "[INFO] Connecting to Advanced IDE... Connected.",
  "[INFO] Initializing Modern Workflow: Performance Pipelines...",
  "[INFO] Syncing Latest Tech Stack... Ready.",
  "[OK] System Optimization Level: MAXIMAL.",
  "[SYSTEM] High-Performance Mode: ACTIVE."
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
      className="fixed bottom-4 right-4 z-[1000] flex flex-col items-end pointer-events-none"
      role="status"
      aria-label="System-Boot-Vorgang"
    >
      <div className="w-80 bg-[#111111]/90 backdrop-blur-sm border border-neutral-800 rounded p-4 shadow-2xl relative pointer-events-auto">
        <div className="absolute top-2 right-4 flex space-x-2" aria-hidden="true">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="space-y-1 font-mono text-xs" role="log" aria-live="polite">
          {logs.slice(-5).map((log, i) => ( // Show only last 5 logs to keep it compact
            <LogItem key={i} log={log} />
          ))}
          <motion.div
            animate={CURSOR_ANIMATION}
            transition={CURSOR_TRANSITION}
            className="w-1.5 h-3 bg-blue-500 inline-block align-middle ml-1"
            aria-hidden="true"
          />
        </div>
        <div className="mt-2 h-1 w-full bg-neutral-800 rounded overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: bootMessages.length * 0.12, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalBoot;
