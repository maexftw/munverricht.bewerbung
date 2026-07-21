# AGENTS.md
This file provides guidance to agents when working with code in this repository.

- Runtime stack is React 19 + TypeScript + Vite 6 with Node 20. Use `pnpm test`, `pnpm run typecheck`, `pnpm run check:claims`, and `pnpm run build` as the repository quality gates.
- Styling combines Astryx components/tokens, locally built Tailwind 4 utilities, and hard-coded global CSS in `index.html`. The portfolio uses a generated custom theme from `components/astryx/portfolioTheme.ts`; rebuild it with `pnpm exec astryx theme build components/astryx/portfolioTheme.ts -o components/astryx/portfolioTheme.css` after token changes.
- The app boot path is intentionally two-stage: `index.html` renders a static fallback loader and runtime-error UI first, then `index.tsx` updates the diagnostic text and mounts React. Keep that fallback intact when touching startup behavior.
- Language handling is centralized in `App.tsx`: the site defaults to German, persists `mu_language` in `localStorage`, and passes a strict `'de' | 'en'` prop through sections. New copy-heavy components should follow that pattern instead of introducing their own i18n state.
- Recruiter-facing content is a product requirement, not filler text: hero and projects were deliberately normalized for fast scanning (`HIRING_SNAPSHOT`, `QUICK_RECRUITER_ACCESS`, and `Problem → Lösung/ Solution → Ergebnis/Result`). Preserve that scan-first structure when editing content components.
- Resume/contact links are duplicated across the static loader and React content (`Maximilian_Unverricht_Resume_2026.html`, `mailto:info@munverricht.org`, phone, GitHub). When these change, update all entry points together or the non-JS fallback diverges from the main UI.
- The animated background is custom canvas code in `components/CodeAmbientBackground.tsx`, layered under fixed overlays from `index.html`. Its opacity values were intentionally reduced to stay visible but non-distracting; visual tweaks here can easily overpower foreground copy.
- User preference for this repository: when a task is materially faster, clearer, or safer with delegation, proactively spawn subagents instead of waiting for a separate prompt. Prefer parallel exploration or implementation when the work can be cleanly split.

<!-- ASTRYX:START -->
Astryx v0.1.6 · 149 components
CLI: run every command as `pnpm exec astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in your app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — discover, don't guess. Before writing UI:
1. `astryx build "<idea>"` — START HERE: returns a kit (closest [page] + [block]s + [component]s). No args = full playbook.
2. `astryx template <name> [--skeleton]` — scaffold the [page]/[block]s it named, or study their layout. Templates are reference code.
3. `astryx component <Name>` — props + examples for every component you use.

RULES:
- No <div> — components do all layout/spacing. Full page → AppShell; sidebar nav → SideNav.
- Frame first: pick the shell (AppShell / Layout+LayoutPanel) and budget regions in px BEFORE writing content (`astryx docs layout`).
- Dense data = rows (Table, List/Item) edge-to-edge — never Card-wrapped list items. Card = dashboard widgets, galleries, settings groups only.
- Status → StatusDot/Token; Badge only for counts and enumerated states, never decoration.
- Custom styling: component props first; else Tailwind utilities backed by tokens (bg-surface, text-primary, rounded-lg) via tailwind-theme.css. No raw hex/px.
- Tokens for every value (`astryx docs tokens`). Brand/accent via `astryx theme` — never override --color-* in :root.

MORE CLI:
  search "<query>"   find any component / hook / doc / template / block
  component --list   149 components by category
  template --list    page + block recipes
  docs <topic>       color, elevation, icons, illustrations, layout, migration, motion, principles, shape, spacing, styling, theme, tokens, typography
  swizzle <Name>     eject component source for deep customization
  upgrade --apply    run after any @astryxdesign/core bump
<!-- ASTRYX:END -->
