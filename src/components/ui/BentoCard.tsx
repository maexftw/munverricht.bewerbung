import React, { useRef, useState, useCallback } from 'react';

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'emerald' | 'violet' | 'amber';
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  interactive?: boolean;
  cornerCut?: boolean;
  badge?: React.ReactNode;
}

const GLOW_COLORS = {
  cyan: {
    border: 'border-cyan-500/20 hover:border-cyan-400/50',
    radial: 'rgba(0, 240, 255, 0.12)',
    boxShadow: 'hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    corner: 'border-cyan-400',
  },
  emerald: {
    border: 'border-emerald-500/20 hover:border-emerald-400/50',
    radial: 'rgba(5, 223, 114, 0.12)',
    boxShadow: 'hover:shadow-[0_0_30px_rgba(5,223,114,0.15)]',
    corner: 'border-emerald-400',
  },
  violet: {
    border: 'border-purple-500/20 hover:border-purple-400/50',
    radial: 'rgba(192, 132, 252, 0.12)',
    boxShadow: 'hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]',
    corner: 'border-purple-400',
  },
  amber: {
    border: 'border-amber-500/20 hover:border-amber-400/50',
    radial: 'rgba(245, 158, 11, 0.12)',
    boxShadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    corner: 'border-amber-400',
  },
};

const COL_SPANS = {
  1: 'col-span-1',
  2: 'col-span-1 md:col-span-2',
  3: 'col-span-1 md:col-span-2 lg:col-span-3',
};

const ROW_SPANS = {
  1: 'row-span-1',
  2: 'row-span-1 md:row-span-2',
};

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  colSpan = 1,
  rowSpan = 1,
  interactive = true,
  cornerCut = false,
  badge,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; isHovered: boolean }>({
    x: -1000,
    y: -1000,
    isHovered: false,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  }, []);

  const glow = GLOW_COLORS[glowColor];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative group rounded-xl p-6 sm:p-8
        bg-slate-900/80 backdrop-blur-md
        border ${glow.border}
        transition-all duration-300 ease-out
        ${interactive ? `${glow.boxShadow} hover:-translate-y-0.5` : ''}
        ${cornerCut ? 'cyber-corner-cut' : ''}
        ${COL_SPANS[colSpan]}
        ${ROW_SPANS[rowSpan]}
        overflow-hidden
        ${className}
      `}
      {...rest}
    >
      {/* Spotlight Radial Glow Gradient */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: mousePos.isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glow.radial}, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Cyber Corner Tech Decors */}
      <div
        className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${glow.corner} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
        aria-hidden="true"
      />
      <div
        className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${glow.corner} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${glow.corner} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${glow.corner} opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
        aria-hidden="true"
      />

      {/* Optional Badge Header */}
      {badge && (
        <div className="relative z-10 mb-4 flex items-center justify-between">
          {badge}
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default BentoCard;
