import React from 'react';

export interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'emerald' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  cornerCut?: boolean;
  glow?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  'data-testid'?: string;
}

const VARIANT_STYLES = {
  primary: `
    bg-cyan-500 text-slate-950 font-semibold
    hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.45)]
    border border-cyan-300/40
    active:scale-[0.98]
  `,
  secondary: `
    bg-slate-900/80 text-cyan-400 font-medium
    hover:bg-slate-800 hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]
    border border-cyan-500/30
    active:scale-[0.98]
  `,
  emerald: `
    bg-emerald-500 text-slate-950 font-semibold
    hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(5,223,114,0.45)]
    border border-emerald-300/40
    active:scale-[0.98]
  `,
  ghost: `
    bg-transparent text-slate-300 font-medium
    hover:bg-slate-800/60 hover:text-white hover:border-slate-700
    border border-transparent
    active:scale-[0.98]
  `,
  danger: `
    bg-red-950/80 text-red-400 font-medium
    hover:bg-red-900 hover:text-red-300 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]
    border border-red-500/40
    active:scale-[0.98]
  `,
};

const SIZE_STYLES = {
  sm: 'px-3.5 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base font-semibold',
};

export const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  cornerCut = true,
  glow = true,
  href,
  target,
  rel,
  icon,
  iconPosition = 'left',
  disabled,
  ...props
}) => {
  const baseClasses = `
    touch-target min-h-[44px] inline-flex items-center justify-center gap-2
    font-sans tracking-wide transition-all duration-200 select-none
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F17]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    ${cornerCut ? 'cyber-corner-cut' : 'rounded-lg'}
    ${VARIANT_STYLES[variant]}
    ${SIZE_STYLES[size]}
    ${className}
  `.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    const { type: _type, ...anchorProps } = props as any;
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={baseClasses}
        aria-disabled={disabled}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default CyberButton;
