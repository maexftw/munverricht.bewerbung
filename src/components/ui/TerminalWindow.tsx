import React, { useState } from 'react';
import { Copy, Check, Terminal as TerminalIcon } from 'lucide-react';

export interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  scanlines?: boolean;
  copyContent?: string;
  statusBadge?: React.ReactNode;
  maxHeight?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'agent@cloudflare-worker:~',
  children,
  scanlines = true,
  copyContent,
  statusBadge,
  maxHeight = 'max-h-[480px]',
  className = '',
  ...rest
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyContent) return;
    try {
      await navigator.clipboard.writeText(copyContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore copy error
    }
  };

  return (
    <div
      className={`
        relative rounded-xl border border-cyan-500/25 bg-[#070A0F]
        shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden
        ${className}
      `}
      {...rest}
    >
      {/* Terminal Header Chrome */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-cyan-500/20 select-none">
        {/* Window Control Dots */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400/30" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/30" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/30" aria-hidden="true" />
        </div>

        {/* Terminal Title */}
        <div className="flex items-center gap-2 font-mono text-xs text-slate-400 font-medium truncate max-w-[60%]">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
          <span className="truncate">{title}</span>
        </div>

        {/* Action Controls & Badges */}
        <div className="flex items-center gap-2">
          {statusBadge}
          {copyContent && (
            <button
              type="button"
              onClick={handleCopy}
              className="touch-target min-h-[32px] min-w-[32px] p-1.5 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Terminal Body Feed */}
      <div
        className={`
          relative p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-200
          overflow-y-auto ${maxHeight}
          ${scanlines ? 'cyber-scanlines' : ''}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
