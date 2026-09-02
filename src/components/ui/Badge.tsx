import React from 'react';

export type BadgeVariant = 'default' | 'accent1' | 'accent2' | 'dark' | 'success' | 'warning' | 'outline' | 'stepped';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pulsing?: boolean;
  pulseColor?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  pulsing = false,
  pulseColor,
  icon,
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }[size];

  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-[var(--bg2)] text-[var(--bgInverse)] border border-[var(--bgInverse2)]/20',
    accent1: 'bg-[var(--accent1)] text-[var(--bg1)] border border-[var(--accent1)]',
    accent2: 'bg-[var(--accent2)] text-[var(--bgInverse)] border border-[var(--bgInverse2)]/30',
    dark: 'bg-[var(--bgInverse)] text-[var(--bg1)] border border-[var(--bgInverse2)]',
    success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30',
    outline: 'bg-transparent text-[var(--bgInverse)] border border-[var(--bgInverse2)]',
    stepped: 'bg-[var(--bg1)] text-[var(--bgInverse)] border border-[var(--bgInverse2)] hyp-shadow-stepped-1 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded uppercase tracking-wider transition-colors ${sizeClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {pulsing && (
        <span className="relative flex h-2 w-2 mr-0.5" aria-hidden="true">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              pulseColor || 'bg-emerald-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              pulseColor || 'bg-emerald-500'
            }`}
          />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
