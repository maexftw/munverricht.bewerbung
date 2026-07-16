# Ask-mode project notes

- Describe the repo as a Vite-powered React 19 + TypeScript portfolio that ships with only `dev`, `build`, and `preview` scripts; note explicitly that no lint/test commands are defined.
- Mention that styling is unusual for a Vite React app: Tailwind utilities come from the CDN in `index.html`, while some critical global effects also live there.
- When explaining architecture, call out the static-first boot chain: `index.html` renders a usable fallback and diagnostics before `index.tsx` mounts React.
- When asked about localization or copy updates, note that the site is manually bilingual (`'de' | 'en'`) via `App.tsx` + `localStorage`, not through an i18n library.
- When asked about the site’s intent, emphasize the recruiter-conversion framing baked into `components/Hero.tsx` and `components/Projects.tsx`.
