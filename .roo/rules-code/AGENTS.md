# Code-mode project notes

- Use Node 20 and the existing npm scripts only: `npm run dev`, `npm run build`, `npm run preview`. There is no repo-defined lint or test script.
- Do not assume a local Tailwind toolchain. Utility classes depend on the CDN `<script>` in `index.html`, and global visual primitives such as scanlines, CRT overlay, focus rings, and canvas opacity also live there.
- Startup UX spans `index.html` and `index.tsx`. If you change boot/loading/error behavior, update both the static fallback and the React bootstrap path.
- Keep the existing bilingual pattern: `App.tsx` owns the `'de' | 'en'` state and storage key `mu_language`; sections receive `language` as a prop.
- Preserve recruiter-scan formatting in content components, especially the structured blocks in `components/Hero.tsx` and the `Problem/Solution/Result` cards in `components/Projects.tsx`.
- Be careful with cross-file contact/resume URLs; the same links appear in the loader HTML and in React components.
- Treat `components/CodeAmbientBackground.tsx` as performance-sensitive canvas code. It already caches gradients/patterns and uses `requestAnimationFrame`; simplify carefully and avoid undoing the deliberate low-visibility tuning.
