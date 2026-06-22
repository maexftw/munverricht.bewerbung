import type { ComponentProps, ReactNode } from 'react';
import { cx } from './classNames';

export type BadgeTone = 'default' | 'primary' | 'muted' | 'proof' | 'live';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends ComponentProps<'span'> {
  tone?: BadgeTone;
  size?: BadgeSize;
  icon?: ReactNode;
}

const toneClasses: Record<BadgeTone, string> = {
  default: 'border-base-300 bg-base-200 text-base-content',
  primary: 'border-primary/50 bg-primary/10 text-primary',
  muted: 'border-neutral-700 bg-transparent text-neutral-400',
  proof: 'border-info/40 bg-info/10 text-info',
  live: 'border-success/40 bg-success/10 text-success',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'min-h-0 px-2 py-1 text-[10px]',
  md: 'min-h-0 px-3 py-1.5 text-xs',
};

export function Badge({ tone = 'default', size = 'sm', icon, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cx(
        'badge inline-flex h-auto items-center gap-1.5 rounded border font-medium uppercase tracking-wider',
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
