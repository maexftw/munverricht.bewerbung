import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  executionTimeMs?: number;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'sql',
  title,
  executionTimeMs,
  showLineNumbers = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div
      className={`rounded-lg overflow-hidden border border-[var(--bgInverse2)]/40 bg-[var(--darkBg1)] text-[#e6edf3] font-mono text-xs sm:text-sm shadow-md ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--darkDarker)] border-b border-[var(--darkInverse2)] text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[var(--accent2)]" />
          <span className="font-bold uppercase tracking-wider text-gray-200">
            {title || language}
          </span>
          {executionTimeMs !== undefined && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent1)]/20 text-[var(--accent1)] border border-[var(--accent1)]/40">
              ⚡ {executionTimeMs}ms
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied code to clipboard' : 'Copy code to clipboard'}
          className="touch-target inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium text-gray-300 hover:text-white bg-[var(--darkInverse2)] hover:bg-[var(--bgInverse2)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent1)]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed">
        {showLineNumbers ? (
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="pr-4 text-right text-gray-500 select-none w-8 text-xs align-top">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre font-mono text-gray-200">
                    {line || ' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre className="whitespace-pre font-mono text-gray-200 m-0">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
