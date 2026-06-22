import { forwardRef, type ComponentProps } from 'react';
import { cx } from './classNames';

export type CardVariant = 'terminal' | 'panel' | 'glass';

export interface CardSurfaceOptions {
  variant?: CardVariant;
  interactive?: boolean;
  className?: string;
}

export interface CardProps extends ComponentProps<'div'> {
  variant?: CardVariant;
  interactive?: boolean;
}

export interface CardLinkProps extends ComponentProps<'a'> {
  variant?: CardVariant;
  interactive?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  terminal: 'border-neutral-800 bg-[#111111] text-neutral-100 shadow-none',
  panel: 'border-slate-200/70 bg-white/80 text-slate-900 shadow-[0_8px_18px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.82)]',
  glass: 'border-white/60 bg-white/20 text-base-content shadow-[0_16px_36px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.74)] backdrop-blur-[14px]',
};

export function cardSurfaceClassName({ variant = 'terminal', interactive = false, className }: CardSurfaceOptions = {}) {
  return cx(
    'card relative overflow-hidden rounded border',
    variantClasses[variant],
    interactive && 'touch-manipulation outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100',
    className,
  );
}

export function Card({ variant = 'terminal', interactive = false, className, ...props }: CardProps) {
  return <div className={cardSurfaceClassName({ variant, interactive, className })} {...props} />;
}

export const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(
  ({ variant = 'terminal', interactive = true, className, ...props }, ref) => (
    <a ref={ref} className={cardSurfaceClassName({ variant, interactive, className: cx('group block', className) })} {...props} />
  ),
);

CardLink.displayName = 'CardLink';
