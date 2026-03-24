# Architect-mode project notes

- Any architecture proposal should preserve the current delivery model: a small Vite/React SPA with Node 20, Cloudflare-oriented deployment metadata, and only `dev` / `build` / `preview` scripts.
- Do not propose Tailwind config refactors as if they already exist. The current styling system depends on CDN Tailwind plus handcrafted global CSS in `index.html`.
- Preserve the dual-layer startup design in plans: static fallback first, React app second. Removing the `index.html` loader/error path changes a deliberate resilience feature.
- Keep bilingual copy architecture simple unless the task explicitly requires more: current state is prop-driven `'de' | 'en'` content from `App.tsx` with `localStorage` persistence.
- Treat recruiter readability as a governing constraint. Content architecture is intentionally optimized for fast scanning and direct contact access, not for generic portfolio storytelling.
- Any redesign of backgrounds or motion should account for the existing requirement that ambient effects remain noticeably subdued relative to foreground content.
