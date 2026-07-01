# AGENTS.md
This file provides guidance to agents when working with code in this repository.

- Runtime stack is React 19 + TypeScript + Vite 6 with Node 20; the only package scripts are `dev`, `build`, and `preview` in `package.json`, so there is no repo-defined lint or automated test command to rely on.
- Styling is split between utility classes rendered directly in TSX and hard-coded global CSS in `index.html`; Tailwind is injected from the CDN there, not from a local Tailwind config or PostCSS pipeline.
- The app boot path is intentionally two-stage: `index.html` renders a static fallback loader and runtime-error UI first, then `index.tsx` updates the diagnostic text and mounts React. Keep that fallback intact when touching startup behavior.
- Language handling is centralized in `App.tsx`: the site defaults to German, persists `mu_language` in `localStorage`, and passes a strict `'de' | 'en'` prop through sections. New copy-heavy components should follow that pattern instead of introducing their own i18n state.
- Recruiter-facing content is a product requirement, not filler text: hero and projects were deliberately normalized for fast scanning (`HIRING_SNAPSHOT`, `QUICK_RECRUITER_ACCESS`, and `Problem → Lösung/ Solution → Ergebnis/Result`). Preserve that scan-first structure when editing content components.
- Resume/contact links are duplicated across the static loader and React content (`Maximilian_Unverricht_Resume.html`, `mailto:info@munverricht.org`, phone, GitHub). When these change, update all entry points together or the non-JS fallback diverges from the main UI.
- The animated background is custom canvas code in `components/CodeAmbientBackground.tsx`, layered under fixed overlays from `index.html`. Its opacity values were intentionally reduced to stay visible but non-distracting; visual tweaks here can easily overpower foreground copy.
- User preference for this repository: when a task is materially faster, clearer, or safer with delegation, proactively spawn subagents instead of waiting for a separate prompt. Prefer parallel exploration or implementation when the work can be cleanly split.

## Preview Handoff - 2026-07-01

- Continue from branch `preview/asl-ademco-portfolio-redesign`, pushed to `origin/preview/asl-ademco-portfolio-redesign`; latest implementation commit before this handoff note is `657f644 feat: update asl showcase preview`.
- Before changing code, run `git fetch --all --prune --tags` and `git status -sb`; do not assume Codex has refreshed remote branches automatically.
- ASL showcase direction is conservative: describe ASL as a B2B Fachassistent / B2B assistant for product search, specification checks, accessories, and project suggestions for trade partners. Do not publish secrets, local paths, admin commands, internal DB names, live-green claims, or 100%/stress-test metrics without fresh verification.
- New source component: `components/AslEvidenceFlow.tsx`. It renders the ASCII process flow `React/Vite Studio -> Agent API -> Produktdaten/Product data -> LLM Route -> Safe B2B Antwort/Safe B2B answer` and respects `prefers-reduced-motion` through Framer Motion's `useReducedMotion`.
- Updated ASL surfaces: `components/Hero.tsx`, `components/AslFlagshipCase.tsx`, `components/AslAdemcoCasePage.tsx`, `components/Projects.tsx`, plus meta/fallback copy in `components/MainPortfolioPage.tsx`, `components/LegalPage.tsx`, and `index.html`.
- Light polish only was applied to `components/ShowcaseA.tsx`, `components/ShowcaseB.tsx`, and `components/SkillMonitor.tsx`; keep future changes similarly small unless the user explicitly asks for a redesign.
- Current route contract remains `/case/asl-ademco-agent` with alias `/asl-ademco-agent`; no new public API or dependency was added.
- Verification already run for the ASL preview update: `npx tsc --noEmit`, `npm run build`, `git diff --check`, forbidden-claim `rg` scan, desktop browser check, and mobile Playwright screenshot check for the case headline. `pnpm install --frozen-lockfile` was used only to restore missing local `node_modules`; no lockfile change was intended.
- The local Vite preview had been started at `http://127.0.0.1:5173/` during QA, but future agents should check whether it is still running before relying on it.

## Current Handoff — 2026-06-06T07:03:24Z

- Branch/worktree: `codex/asl-ademco-portfolio-redesign` in `/home/llm/workspaces/munverricht-asl-redesign`; created from a fresh clone of `maexftw/munverricht.bewerbung` default branch `main`.
- PR: https://github.com/maexftw/munverricht.bewerbung/pull/60
- Scope completed in this slice: repo source-of-truth `DESIGN.md`, ASL evidence map at `docs/design/asl-ademco-evidence-map.md`, `munverricht.org` branding/contact replacement, ASL flagship block on the homepage, and a new case route at `/case/asl-ademco-agent` with `/asl-ademco-agent` alias.
- `/webdesign` was intentionally left structurally out of scope; only shared/domain/contact branding and one existing TypeScript inference issue were adjusted so gates pass.
- Verification run: `npx @google/design.md lint DESIGN.md` (0 errors, 6 token-usage warnings), `npx tsc --noEmit` (pass), `npm run build` (pass), GStack Browse checks for `/`, `/case/asl-ademco-agent`, mobile 390px, and `/webdesign` (no console errors, no measured horizontal overflow, no `graphiks` text in checked pages).
- QA artifacts: screenshots and JSON/text checks are under `/tmp/munverricht-asl-qa/`; they are local artifacts, not committed.
- Not done: no Cloudflare/deployment action, no live ASL/KOST test reruns, no production-ready claim that ASL tests are currently green.

## Local GBrain Handoff — 2026-06-06T10:54:02Z

- Local GBrain is configured and synced for this worktree; `.gbrain-source` pins this clone to source id `gstack-code-99b8d56b-8378d8` and is intentionally gitignored because it is machine/worktree-specific.
- Repo GBrain policy: `read-write`. Search mode: `conservative`. Local embedding route: `ollama:nomic-embed-text` at 768 dimensions, with LM Studio reachable from WSL via `http://172.17.240.1:1234/v1`.
- Last verified sync: `bun run ~/.hermes/skills/gstack/bin/gstack-gbrain-sync.ts` completed with 3 ok / 0 error / 0 skipped; code source page_count is 77 with 1339 chunks and embedding coverage is 100%.
- Smoke searches that worked: `gbrain search "ASL Ademco Vertical Agent" --source gstack-code-99b8d56b-8378d8` and `gbrain search "AslFlagshipCase" --source gstack-code-99b8d56b-8378d8`.
- Caveat: `dist/assets/...` is currently included in search results because generated build output exists in the worktree; prefer source files (`components/*`, `App.tsx`, docs) as canonical results.
