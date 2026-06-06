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

## Current Handoff — 2026-06-06T07:03:24Z

- Branch/worktree: `codex/asl-ademco-portfolio-redesign` in `/home/llm/workspaces/munverricht-asl-redesign`; created from a fresh clone of `maexftw/munverricht.bewerbung` default branch `main`.
- PR: https://github.com/maexftw/munverricht.bewerbung/pull/60
- Scope completed in this slice: repo source-of-truth `DESIGN.md`, ASL evidence map at `docs/design/asl-ademco-evidence-map.md`, `munverricht.org` branding/contact replacement, ASL flagship block on the homepage, and a new case route at `/case/asl-ademco-agent` with `/asl-ademco-agent` alias.
- `/webdesign` was intentionally left structurally out of scope; only shared/domain/contact branding and one existing TypeScript inference issue were adjusted so gates pass.
- Verification run: `npx @google/design.md lint DESIGN.md` (0 errors, 6 token-usage warnings), `npx tsc --noEmit` (pass), `npm run build` (pass), GStack Browse checks for `/`, `/case/asl-ademco-agent`, mobile 390px, and `/webdesign` (no console errors, no measured horizontal overflow, no `graphiks` text in checked pages).
- QA artifacts: screenshots and JSON/text checks are under `/tmp/munverricht-asl-qa/`; they are local artifacts, not committed.
- Not done: no Cloudflare/deployment action, no live ASL/KOST test reruns, no production-ready claim that ASL tests are currently green.
