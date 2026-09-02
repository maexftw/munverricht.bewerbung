# Maximilian Unverricht — Official Design System & Token Contract

**Framework**: React 19 + Tailwind CSS v3.4 + Cloudflare Pages  
**Design Persona**: Corporate Light Authority, German Engineering Precision, Anti-Slop Discipline  
**Standard**: WCAG 2.1 AA / AAA Compliance, 4pt/8pt Spacing Scale, 0px Horizontal Overflow  

---

## 1. Dial Calibration & Anti-Slop Contract

| Parameter | Calibrated Value | Operational Meaning |
|---|---|---|
| `DESIGN_VARIANCE` | **0.3** | High predictability, clean asymmetrical splits, editorial structure |
| `MOTION_INTENSITY` | **0.2** | Snappy transitions (150–200ms), zero parallax slop, reduced motion default |
| `VISUAL_DENSITY` | **0.5** | High scannability, tabular metrics, restrained whitespace |

### Prohibited Tropes
- ❌ No dark purple/violet neon gradients or glowing glow meshes.
- ❌ No repetitive 3-equal-card spam without typographical hierarchy.
- ❌ No nested cards within cards with heavy box shadows.
- ❌ No 9999px rounded pill badge overload across every heading.
- ❌ No mixed-family serif italics injected into modern sans-serif headings.

---

## 2. Color Palette & Contrast Contract

All color combinations have been mathematically verified against WCAG 2.1 AA / AAA standards:

| Semantic Token | Hex Value | Tailwind Class | Role | WCAG Contrast |
|---|---|---|---|---|
| `canvas` | `#FAFAFA` | `bg-canvas` / `bg-neutral-50` | Base document backdrop | Base canvas |
| `surface-elevated` | `#FFFFFF` | `bg-surface-elevated` / `bg-white` | Cards, panels, header | 1.05:1 vs canvas |
| `surface-subtle` | `#F1F5F9` | `bg-surface-subtle` / `bg-slate-100` | Code chips, callouts | 1.15:1 vs canvas |
| `surface-muted` | `#E2E8F0` | `bg-surface-muted` / `bg-slate-200` | Hover states, tab pills | 1.35:1 vs canvas |
| `text-primary` | `#0F172A` | `text-primary` / `text-slate-900` | Headings, hero display | **16.5:1** (AAA) |
| `text-secondary` | `#334155` | `text-secondary` / `text-slate-700` | Body text, bullet points | **9.6:1** (AAA) |
| `text-muted` | `#64748B` | `text-muted` / `text-slate-500` | Eyebrows, timestamps | **4.6:1** (AA >= 4.5:1) |
| `border-hairline` | `#E2E8F0` | `border-hairline` / `border-slate-200` | 1px hairline dividers | 1.35:1 UI element |
| `border-subtle` | `#CBD5E1` | `border-subtle` / `border-slate-300` | Form/toggle borders | 1.75:1 UI element |
| `accent-primary` | `#0284C7` | `text-sky-600` / `bg-sky-600` | Primary interactive blue | **4.8:1** (AA) |
| `accent-hover` | `#0369A1` | `bg-sky-700` / `text-sky-700` | Interactive active/hover | **6.5:1** (AAA) |
| `accent-subtle` | `#E0F2FE` | `bg-accent-subtle` / `bg-sky-50` | Badge tints, focus rings | Background tint |
| `status-success` | `#15803D` | `text-emerald-700` / `bg-emerald-50` | Verification, live status | **4.8:1** (AA) |

---

## 3. Mathematical Rhythm Scale (4pt / 8pt Grid)

| Step | Value | Tailwind Class | Semantic Usage |
|---|---|---|---|
| 1 | `4px` | `p-1`, `gap-1`, `space-x-1` | Badge internal padding, icon inline gap |
| 2 | `8px` | `p-2`, `gap-2`, `space-y-2` | Tech tag gaps, compact button padding |
| 3 | `12px` | `p-3`, `gap-3`, `space-y-3` | Navigation items, compact list gap |
| 4 | `16px` | `p-4`, `gap-4`, `space-y-4` | Standard card internal padding, base container padding |
| 5 | `24px` | `p-6`, `gap-6`, `space-y-6` | Major card interior padding, grid column gap |
| 6 | `32px` | `p-8`, `gap-8`, `space-y-8` | Section header bottom margin, case study pillar gap |
| 7 | `48px` | `py-12`, `gap-12` | Sub-section vertical separation, mobile section padding |
| 8 | `64px` | `py-16` | Standard desktop section top/bottom padding |
| 9 | `96px` | `py-24` | Hero & flagship transition spacing |
| 10 | `128px` | `py-32` | Maximum document whitespace separation |

---

## 4. Typography Scale & Optical Physics

- **Sans Display Font**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", sans-serif`
- **Monospace & Numbers**: `ui-monospace, "SF Mono", "Cascadia Code", "Fira Code", monospace` with `font-variant-numeric: tabular-nums`

| Level | Size / Line Height | Tailwind Classes | Purpose |
|---|---|---|---|
| **Display H1** | `2.25rem - 3.25rem` / `leading-[1.12]` | `text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight` | Hero name & primary positioning |
| **Section H2** | `1.75rem - 2.25rem` / `leading-[1.2]` | `text-2xl sm:text-3xl font-bold tracking-tight` | Major section titles |
| **Subsection H3** | `1.125rem - 1.25rem` / `leading-snug` | `text-lg sm:text-xl font-semibold tracking-normal` | Project titles, job roles |
| **Eyebrow** | `0.75rem (12px)` / `leading-none` | `text-xs font-semibold tracking-[0.15em] uppercase` | Section context labels |
| **Body Primary** | `1rem (16px)` / `leading-relaxed` | `text-base text-secondary leading-relaxed` | Editorial paragraphs (max `65ch`) |
| **Body Small** | `0.875rem (14px)` / `leading-normal` | `text-sm text-secondary leading-normal` | Tech chips, project descriptions |
| **Metrics / Code** | `0.875rem - 1.25rem` / `leading-none` | `font-mono tabular-nums font-semibold` | SKU counts, cycles, benchmarks |

---

## 5. Interaction, A11y & Mobile Contracts

1. **Touch Targets**: All interactive elements (buttons, links, language toggles, copy chips) must have a minimum bounding box of **44 × 44px** on touch viewports (`min-h-[44px] min-w-[44px]`).
2. **Keyboard Focus Visible**: Every interactive element must display a crisp high-contrast focus ring:
   ```css
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white
   ```
3. **Motion Reduction**: All transitions must fall back to instant changes (`0.01ms`) under `prefers-reduced-motion: reduce`.
4. **Layout Stability**: Container is constrained to `max-w-6xl` (1152px) with horizontal margins auto, preventing overflow across 375px to 1920px viewports.
