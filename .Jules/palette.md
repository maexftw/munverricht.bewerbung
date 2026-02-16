## 2026-02-16 - Accessible Terminal & Interactive Feedback
**Learning:** Terminal-style UI sequences (like boot logs) are often invisible to screen readers unless explicitly marked with `aria-live`. Interactive elements that trigger async actions (like message sending) require both visual (spinner) and descriptive (`aria-label`) feedback to satisfy accessibility standards while maintaining a "tech-heavy" aesthetic.
**Action:** Always wrap dynamic log feeds in `aria-live="polite"` and ensure icon-only buttons transition to a loading state with an updated ARIA label during execution.

## 2026-02-16 - Readability & Contrast Optimization
**Learning:** Pure white text on deep black backgrounds (#000000) causes visual fatigue and "halation" (glowing effect). Subtile background layering (cards at #111111 vs body at #050505) and constrained text widths (65ch) significantly improve reading comfort and information hierarchy without sacrificing the "dark mode" aesthetic.
**Action:** Use #E0E0E0 or text-neutral-200 for body text, maintain 1.6 line-height, and use subtle background deltas for visual nesting.
