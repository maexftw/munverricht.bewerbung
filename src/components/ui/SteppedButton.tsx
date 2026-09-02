import React from 'react';

export type SteppedButtonVariant = 'primary' | 'secondary' | 'dark' | 'outline' | 'neutral';

export interface SteppedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SteppedButtonVariant;
  active?: boolean;
  steppedShadow?: 'accent1' | 'accent2' | 'white' | 'none';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const SteppedButton: React.FC<SteppedButtonProps> = ({
  variant = 'primary',
  active = false,
  steppedShadow,
  icon,
  iconPosition = 'left',
  size = 'md',
  children,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-3 py-2 gap-1.5 min-h-[44px]',
    md: 'text-sm px-4 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3 gap-2.5 min-h-[48px]',
  }[size];

  // Base background & text styling
  const variantClasses: Record<SteppedButtonVariant, string> = {
    primary: active
      ? 'bg-[var(--accent1)] text-white border border-[var(--accent1)]'
      : 'bg-[var(--accent1)] text-white hover:opacity-95 border border-[var(--accent1)]',
    secondary: active
      ? 'bg-[var(--accent2)] text-[var(--bgInverse)] border border-[var(--bgInverse2)]'
      : 'bg-[var(--accent2)] text-[var(--bgInverse)] hover:opacity-95 border border-[var(--bgInverse2)]/40',
    dark: active
      ? 'bg-[var(--bgInverse)] text-[var(--bg1)] border border-[var(--accent1)]'
      : 'bg-[var(--bgInverse)] text-[var(--bg1)] hover:bg-[var(--bgInverse2)] border border-[var(--bgInverse2)]',
    outline: active
      ? 'bg-[var(--accent1)] text-[var(--bg1)] border-2 border-[var(--accent1)]'
      : 'bg-transparent text-[var(--bgInverse)] hover:bg-[var(--bg2)]/50 border-2 border-[var(--bgInverse2)]',
    neutral: active
      ? 'bg-[var(--bgInverse2)] text-[var(--bg1)] border border-[var(--bgInverse)]'
      : 'bg-[var(--bg2)] text-[var(--bgInverse)] hover:bg-[var(--bg3)] border border-[var(--bgInverse2)]/30',
  };

  // Stepped box shadow mapping
  let shadowClass = '';
  if (steppedShadow === 'accent1' || (!steppedShadow && (variant === 'primary' || active))) {
    shadowClass = 'hyp-shadow-stepped-1';
  } else if (steppedShadow === 'accent2' || (!steppedShadow && variant === 'secondary')) {
    shadowClass = 'hyp-shadow-stepped-2';
  } else if (steppedShadow === 'white') {
    shadowClass = 'hyp-shadow-stepped-white';
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`touch-target inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider transition-all duration-150 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent1)] focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses[variant]} ${shadowClass} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

export default SteppedButton;
