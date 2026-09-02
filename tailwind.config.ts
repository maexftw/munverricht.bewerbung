import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cyberpunk Dark Base Canvas & Surfaces
        'cyber-canvas': '#0B0F17',
        'cyber-void': '#070A0F',
        'cyber-surface': 'rgba(15, 23, 42, 0.85)',
        'cyber-surface-solid': '#111827',
        'cyber-surface-hover': 'rgba(30, 41, 59, 0.9)',
        'cyber-surface-elevated': '#1E293B',

        // Cyber Accents & Neon Glows (WCAG AA Compliant)
        'cyber-cyan': '#00F0FF',
        'cyber-cyan-dim': '#0891B2',
        'cyber-emerald': '#05DF72',
        'cyber-emerald-base': '#10B981',
        'cyber-violet': '#C084FC',
        'cyber-violet-deep': '#A855F7',
        'cyber-amber': '#F59E0B',
        'cyber-danger': '#EF4444',

        // Typography Colors
        'cyber-text-primary': '#F8FAFC',
        'cyber-text-secondary': '#94A3B8',
        'cyber-text-muted': '#64748B',

        // Borders & Dividers
        'cyber-border-hairline': 'rgba(0, 240, 255, 0.15)',
        'cyber-border-subtle': 'rgba(0, 240, 255, 0.25)',

        // Semantic compatibility aliases
        canvas: '#0B0F17',
        void: '#070A0F',
        'surface-elevated': '#1E293B',
        'surface-subtle': '#111827',
        'surface-muted': '#1E293B',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
        'border-hairline': 'rgba(0, 240, 255, 0.15)',
        'border-subtle': 'rgba(0, 240, 255, 0.25)',
        'accent-primary': '#00F0FF',
        'accent-hover': '#38BDF8',
        'accent-subtle': 'rgba(0, 240, 255, 0.15)',
        'status-success': '#05DF72',
      },
      fontFamily: {
        sans: [
          'Outfit',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Inter"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          'ui-monospace',
          'SFMono-Regular',
          '"Cascadia Code"',
          'monospace',
        ],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '6xl': '72rem',
        '7xl': '80rem',
        'prose': '65ch',
      },
      boxShadow: {
        'cyber-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'cyber-emerald': '0 0 20px rgba(5, 223, 114, 0.35)',
        'cyber-violet': '0 0 20px rgba(168, 85, 247, 0.35)',
        'cyber-card': '0 0 25px rgba(0, 240, 255, 0.08)',
        subtle: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        card: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.98)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2s infinite',
      },
    },
  },
  plugins: [typography],
};

export default config;
