# Debug-mode project notes

- First reproduction path is `npm run dev`; if a production-only issue is suspected, compare with `npm run build` because the repo has no dedicated test or lint harness.
- Boot failures may surface before React mounts. Check both the static diagnostics in `index.html` and the bootstrap logging / crash fallback in `index.tsx` before assuming a component bug.
- If content appears in the wrong language, inspect `mu_language` in `localStorage` and the `App.tsx` language prop flow before changing component copy.
- Visual “too noisy” reports often come from the interaction between `index.html` overlays and `components/CodeAmbientBackground.tsx`, not from a single component.
- Broken contact or resume links must be checked in both the static loader and the React UI because they are duplicated intentionally.
