import React from 'react';

export interface GlowingBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'emerald' | 'cyan' | 'violet' | 'amber' | 'danger';
  pulsing?: boolean;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  cornerCut?: boolean;
}

const BADGE_STYLES = {
  emerald: {
    container: 'bg-emerald-950/50 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(5,223,114,0.15)]',
    dot: 'bg-emerald-400',
    ping: 'bg-emerald-400',
  },
  cyan: {
    container: 'bg-cyan-950/50 border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.15)]',
    dot: 'bg-cyan-400',
    ping: 'bg-cyan-400',
  },
  violet: {
    container: 'bg-purple-950/50 border-purple-500/30 text-purple-300 shadow-[0_0_15px_rgba(192,132,252,0.15)]',
    dot: 'bg-purple-400',
    ping: 'bg-purple-400',
  },
  amber: {
    container: 'bg-amber-950/50 border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    dot: 'bg-amber-400',
    ping: 'bg-amber-400',
  },
  danger: {
    container: 'bg-red-950/50 border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]',
    dot: 'bg-red-400',
    ping: 'bg-red-400',
  },
};

const SIZE_STYLES = {
  sm: 'px-2.5 py-1 text-[11px]',
  md: 'px-3 py-1.5 text-xs',
};

export const GlowingBadge: React.FC<GlowingBadgeProps> = ({
  children,
  className = '',
  variant = 'cyan',
  pulsing = false,
  size = 'md',
  icon,
  cornerCut = false,
  ...rest
}) => {
  const style = BADGE_STYLES[variant];

  return (
    <span
      className={`
        inline-flex items-center gap-2 font-mono font-medium tracking-wider uppercase
        border backdrop-blur-sm select-none
        ${cornerCut ? 'cyber-corner-cut-sm' : 'rounded-md'}
        ${style.container}
        ${SIZE_STYLES[size]}
        ${className}
      `}
      {...rest}
    >
      {pulsing && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={`
              absolute inline-flex h-full w-full rounded-full opacity-75
              motion-safe:animate-ping
              ${style.ping}
            `}
            aria-hidden="true"
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${style.dot}`}
            aria-hidden="true"
          />
        </span>
      )}
      {icon && !pulsing && <span className="inline-flex shrink-0">{icon}</span>}
      <span className="tabular-nums">{children}</span>
    </span>
  );
};

export default GlowingBadge;
