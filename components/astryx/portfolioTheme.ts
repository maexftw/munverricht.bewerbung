import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral';

export const portfolioTheme = defineTheme({
  name: 'munverricht-portfolio',
  extends: neutralTheme,
  typography: {
    scale: { base: 14, ratio: 1.2 },
    body: {
      family: 'Inter',
      fallbacks: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    heading: {
      family: 'Inter',
      fallbacks: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      weights: { 1: 'bold', 2: 'bold', 3: 'bold', 4: 'bold' },
    },
    code: {
      family: 'JetBrains Mono',
      fallbacks: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    },
  },
  motion: { fast: 180, medium: 410, slow: 975, ratio: 0.75 },
  tokens: {
    '--color-background-body': ['#eef3fb', '#05070d'],
    '--color-background-surface': ['#ffffff', '#101624'],
    '--color-background-card': ['#ffffff', '#0f1118'],
    '--color-background-popover': ['#ffffff', '#101624'],
    '--color-background-muted': ['#f7faff', '#0a0e18'],
    '--color-accent': ['#2563eb', '#60a5fa'],
    '--color-accent-muted': ['#dbeafe', '#1d4ed833'],
    '--color-text-primary': ['#0f172a', '#edf2ff'],
    '--color-text-secondary': ['#52627a', '#c8d3eb'],
    '--color-text-disabled': ['#748399', '#67748e'],
    '--color-text-accent': ['#1d4ed8', '#93c5fd'],
    '--color-icon-accent': ['#2563eb', '#60a5fa'],
    '--color-icon-primary': ['#0f172a', '#edf2ff'],
    '--color-icon-secondary': ['#52627a', '#8e9ab2'],
    '--color-border': ['#47556924', '#95a5c32e'],
    '--color-border-emphasized': ['#4755693d', '#95a5c347'],
    '--color-on-accent': '#ffffff',
    '--radius-inner': '0.25rem',
    '--radius-element': '0.5rem',
    '--radius-container': '0.75rem',
    '--radius-page': '1rem',
  },
  components: {
    appshell: { base: { backgroundColor: 'transparent' } },
    topnav: { base: { backgroundColor: 'var(--nav-bg)', backdropFilter: 'blur(16px)' } },
    section: { base: { backgroundColor: 'transparent' } },
    card: { base: { backgroundColor: 'var(--color-background-card)' } },
  },
});
