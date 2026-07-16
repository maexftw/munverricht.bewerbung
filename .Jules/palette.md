## 2026-02-16 - Accessible Terminal & Interactive Feedback
**Learning:** Terminal-style UI sequences (like boot logs) are often invisible to screen readers unless explicitly marked with `aria-live`. Interactive elements that trigger async actions (like message sending) require both visual (spinner) and descriptive (`aria-label`) feedback to satisfy accessibility standards while maintaining a "tech-heavy" aesthetic.
**Action:** Always wrap dynamic log feeds in `aria-live="polite"` and ensure icon-only buttons transition to a loading state with an updated ARIA label during execution.

## 2026-02-16 - Readability & Contrast Optimization
**Learning:** Pure white text on deep black backgrounds (#000000) causes visual fatigue and "halation" (glowing effect). Subtile background layering (cards at #111111 vs body at #050505) and constrained text widths (65ch) significantly improve reading comfort and information hierarchy without sacrificing the "dark mode" aesthetic.
**Action:** Use #E0E0E0 or text-neutral-200 for body text, maintain 1.6 line-height, and use subtle background deltas for visual nesting.

## 2026-02-17 - Focus Visibility & Success Affirmation
**Learning:** In a minimal, "command-line" inspired UI, focus states must be punchy to be usable. The project's standard 15px glow (`shadow-[0_0_15px_rgba(59,130,246,0.5)]`) provides high visibility without breaking the aesthetic. Furthermore, for terminal-like inputs, transitioning the action icon to a "Success" state (e.g., a green checkmark) provides crucial positive reinforcement that the action completed, which can otherwise be ambiguous in a scroll-heavy log.
**Action:** Use the 15px blue glow for focus-visible states on interactive terminal inputs. Always provide a clear, distinct success icon transition and ARIA label update for completed async tasks.

## 2026-02-18 - Full Localization & Navigation Aids
**Learning:** In a multi-lingual project, partial localization (e.g., German content but English navigation) creates a disjointed user experience. Providing clear navigation aids like a "Scroll to Top" button on long-scrolling pages is essential for usability, especially when using fixed navigation bars that might obscure content.
**Action:** Always ensure 100% localization of UI elements (Navigation, Loaders, Tooltips) and implement "Scroll to Top" functionality for pages exceeding 3 viewports.
