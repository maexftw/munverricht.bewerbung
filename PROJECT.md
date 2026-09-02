# Project: Maximilian Unverricht Cyberpunk Digital Portfolio Rebuild

## Architecture
- **Framework**: React 19, TypeScript 5.7, Vite 6, Tailwind CSS 3.4
- **Aesthetic**: Premium Cyberpunk / High-Tech Developer HUD
- **Canvas & Palette**:
  - Background: Deep Cyber-Slate `#0B0F17`, Terminal Well `#070A0F`, Card Glass `#111827` / `rgba(15, 23, 42, 0.85)`
  - Primary Accents: Cyber Cyan `#00F0FF` (13.45:1 contrast), Matrix Emerald `#05DF72` (11.82:1 contrast), Neon Violet `#C084FC` (7.80:1 contrast), Amber `#F59E0B` (9.17:1 contrast)
  - Text: High-contrast `#F8FAFC` (18.1:1), Secondary `#94A3B8` (7.44:1), Muted `#64748B` (4.61:1)
- **Component Architecture**: Modular, accessible React 19 functional components with custom hooks, Tailwind CSS utility tokens, and 21st.dev inspired HUD/Bento patterns.
- **State Management**: React 19 Context for Language (`LanguageContext`) and Theme/Settings (`ThemeContext`).
- **Data Layer**: Strongly typed immutable datasets in `src/data/` for ASL Ademco, secondary projects, timeline, skills, and bilingual dictionaries (`translationsDe.ts`, `translationsEn.ts`).

## Code Layout
```
c:\Users\User\Documents\antigravity\bold-einstein\
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── CyberShell.tsx
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TelemetryHUD.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── flagship/
│   │   │   ├── FlagshipSection.tsx
│   │   │   ├── ReActSimulator.tsx
│   │   │   ├── D1SqlPlayground.tsx
│   │   │   ├── ArchitecturePillars.tsx
│   │   │   └── GuardrailsShowcase.tsx
│   │   ├── projects/
│   │   │   ├── ProjectsBentoGrid.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectFilterTabs.tsx
│   │   ├── skills/
│   │   │   ├── SkillsSection.tsx
│   │   │   └── SkillQuadrant.tsx
│   │   ├── timeline/
│   │   │   ├── TimelineSection.tsx
│   │   │   └── TimelineCard.tsx
│   │   ├── contact/
│   │   │   ├── ContactSection.tsx
│   │   │   └── TerminalInquiry.tsx
│   │   └── ui/
│   │       ├── BentoCard.tsx
│   │       ├── CyberButton.tsx
│   │       ├── GlowingBadge.tsx
│   │       ├── TerminalWindow.tsx
│   │       └── CyberTabs.tsx
│   ├── context/
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   ├── translationsDe.ts
│   │   ├── translationsEn.ts
│   │   ├── flagshipAslAdemco.ts
│   │   ├── secondaryProjects.ts
│   │   └── profileTimeline.ts
│   ├── types/
│   │   ├── i18n.ts
│   │   ├── project.ts
│   │   └── theme.ts
│   ├── index.css
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── tiers/
│   └── e2e/
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## Feature Inventory
| # | Feature ID | Feature Name | Description | Milestone | Source |
|---|------------|--------------|-------------|-----------|--------|
| 1 | F01 | Cyberpunk Design Tokens & CSS Shell | Dark slate canvas, cyan/emerald glow tokens, scanlines, microgrid, corner cuts | M1 | ORIGINAL_REQUEST §Visual |
| 2 | F02 | Cyberpunk Navigation & Header HUD | Sticky cyber navbar, jump navigation, mobile drawer with >=44px touch targets | M1 | ORIGINAL_REQUEST §R3 |
| 3 | F03 | Bilingual Localization Engine | DE (default) / EN instant symmetrical translation toggle with localStorage persistence | M1 | ORIGINAL_REQUEST §6 |
| 4 | F04 | Identity & Hero HUD | Maximilian Unverricht 36 J., Dortmund, pulsing status telemetry, experience badges, CTAs | M2 | ORIGINAL_REQUEST §1 |
| 5 | F05 | Direct Inquiry & Contact HUD | Cyber terminal contact interface, copy-to-clipboard email/phone, imprint links | M5 | ORIGINAL_REQUEST §1, §R3 |
| 6 | F06 | ASL Ademco Flagship Architecture | 5 solution pillars, business context, wholesale distributor overview, engineering attribution | M3 | ORIGINAL_REQUEST §2 |
| 7 | F07 | Interactive ReAct Loop Simulator | 7-step reasoning engine trace visualizer, 3 scenario presets, step-by-step playback | M3 | ORIGINAL_REQUEST §2 |
| 8 | F08 | Deterministic SQL-RAG & D1 Playground | 3 SQL query presets, interactive SQL runner, mock Cloudflare D1 table viewer, schema browser | M3 | ORIGINAL_REQUEST §2 |
| 9 | F09 | Anti-Hallucination Guardrails Showcase | Positive catalog binding, dummy SKU blocking, scope gate, B2B planning studio RFQ flow | M3 | ORIGINAL_REQUEST §2 |
| 10 | F10 | Secondary Project: Baker & Charlie | Artisanal bakery in Bengaluru, Cloudflare Pages, Playwright badges, security fixes, ROI | M4 | ORIGINAL_REQUEST §3 |
| 11 | F11 | Secondary Project: KOST Sicherheit | Security company platform, Cloudflare WAF automation, Python SEO tooling | M4 | ORIGINAL_REQUEST §3 |
| 12 | F12 | Secondary Project: Kaffee Faensen | E-commerce coffee store, Pages Functions, Stripe checkout, PLZ delivery routing | M4 | ORIGINAL_REQUEST §3 |
| 13 | F13 | Secondary Project: RLC 1952 | Sports club platform, Python content pipeline, Cloudflare Turnstile protection | M4 | ORIGINAL_REQUEST §3 |
| 14 | F14 | Secondary Project: ZBN Offline RAG | 100% offline civil engineering RAG pipeline, Docling, ChromaDB, Ollama on RTX 5090 | M4 | ORIGINAL_REQUEST §3 |
| 15 | F15 | Interactive Project Category Filter | Responsive tabs (All, Edge Backend, Cloud Infra, AI Pipelines) with active pill indicator | M4 | ORIGINAL_REQUEST §3 |
| 16 | F16 | Skills Taxonomy Matrix | 4 Cyberpunk Quadrants (Frontend, Edge Backend, AI Runtimes, Quality Engineering) | M4 | ORIGINAL_REQUEST §4 |
| 17 | F17 | Career Timeline & Principles | 2 chronological eras (2013-2025 Graphiks.de & 08/2025-Present Edge/AI) + engineering principles | M5 | ORIGINAL_REQUEST §5 |
| 18 | F18 | WCAG 2.1 AA & Responsive Accessibility | >=4.5:1 contrast, min 44x44px touch targets, 0px horizontal scroll (320px–1920px) | M1–M5 | ORIGINAL_REQUEST §R3 |
| 19 | F19 | Performance & Clean Architecture | React 19 clean build, TypeScript strict, Vite code splitting, zero console warnings | M1–M5 | ORIGINAL_REQUEST §R1 |
| 20 | F20 | Production Build & Test Validation | `npm run lint` 0 errors, `npm run build` clean `dist/`, 100% test pass across all tiers | M-Final | ORIGINAL_REQUEST §R4 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M-E2E | E2E Testing Suite Track | 4-tier requirement-driven test harness, tests for all 20 features, publishes TEST_READY.md | none | DONE |
| M1 | Cyberpunk Theme, Base Shell, Navbar & Bilingual Engine | Design tokens, index.css, Tailwind config, CyberShell, Navbar, LanguageSwitcher (F01, F02, F03, F18) | none | DONE |
| M2 | Identity & Hero Telemetry HUD | HeroSection, TelemetryHUD, StatusBadge, Quick CTAs (F04, F18) | M1 | DONE |
| M3 | ASL Ademco B2B Flagship Showcase | FlagshipSection, ReActSimulator, D1SqlPlayground, ArchitecturePillars, GuardrailsShowcase (F06, F07, F08, F09, F18) | M1 | DONE |
| M4 | Secondary Projects Bento Grid & Skills Taxonomy | ProjectsBentoGrid, ProjectCard, ProjectFilterTabs, SkillsSection, SkillQuadrant (F10–F16, F18) | M1 | DONE |
| M5 | Career Timeline, Contact HUD & Footer | TimelineSection, ContactSection, TerminalInquiry, Footer (F05, F17, F18) | M1 | DONE |
| M-Final | E2E Test Suite Pass (Tiers 1-4) & Adversarial Hardening (Tier 5) | Full E2E suite 100% pass, Challenger-led adversarial testing, zero regression, Forensic audit verification (F19, F20) | M-E2E, M1–M5 | DONE |

## Interface Contracts

### LanguageContext (`src/context/LanguageContext.tsx`)
```typescript
export type Language = 'de' | 'en';
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
```

### ReAct Simulator State Contract (`src/types/flagship.ts`)
```typescript
export type ReActStepType = 'THOUGHT' | 'ACTION_SQL' | 'OBSERVATION' | 'GUARDRAIL_CHECK' | 'FINAL_ANSWER';
export interface ReActStep {
  stepNumber: number;
  type: ReActStepType;
  title: string;
  detail: string;
  sqlQuery?: string;
  sqlResult?: Record<string, unknown>[];
  latencyMs?: number;
  status: 'passed' | 'warning' | 'info';
}
export interface ReActTracePreset {
  id: string;
  titleDe: string;
  titleEn: string;
  userQueryDe: string;
  userQueryEn: string;
  steps: ReActStep[];
}
```

### Bento Project Card Contract (`src/types/project.ts`)
```typescript
export interface ProjectItem {
  id: string;
  title: string;
  category: 'edge' | 'infra' | 'ai';
  taglineDe: string;
  taglineEn: string;
  descriptionDe: string;
  descriptionEn: string;
  techStack: string[];
  metrics: { labelDe: string; labelEn: string; value: string }[];
  highlightsDe: string[];
  highlightsEn: string[];
  badge?: string;
  colSpan?: number;
}
```
