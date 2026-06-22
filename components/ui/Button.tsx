import type { ComponentProps } from 'react';
import { cx } from './classNames';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'terminal';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary border-primary/70 bg-primary text-primary-content hover:border-primary hover:bg-primary/90',
  secondary: 'border-slate-200/80 bg-white/80 text-slate-800 hover:border-primary/40 hover:bg-white',
  ghost: 'btn-ghost text-base-content hover:bg-base-200',
  terminal: 'border-neutral-700 bg-neutral-900 text-neutral-100 hover:border-primary/60 hover:text-white',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm min-h-10 px-3 text-xs',
  md: 'min-h-12 px-5 text-sm',
  lg: 'btn-lg min-h-14 px-6 text-base',
};

export function Button({ variant = 'primary', size = 'md', className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cx('btn rounded-full font-semibold tracking-wide', sizeClasses[size], variantClasses[variant], className)}
      {...props}
    />
  );
}
