## 2026-02-16 - Accessible Terminal & Interactive Feedback
**Learning:** Terminal-style UI sequences (like boot logs) are often invisible to screen readers unless explicitly marked with `aria-live`. Interactive elements that trigger async actions (like message sending) require both visual (spinner) and descriptive (`aria-label`) feedback to satisfy accessibility standards while maintaining a "tech-heavy" aesthetic.
**Action:** Always wrap dynamic log feeds in `aria-live="polite"` and ensure icon-only buttons transition to a loading state with an updated ARIA label during execution.
