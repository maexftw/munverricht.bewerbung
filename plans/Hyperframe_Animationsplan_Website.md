# Hyperframe-Animationsplan für die Website

## Zielbild
- Alle bisherigen, inkonsistenten Animationen werden durch ein einheitliches Hyperframe-System ersetzt.
- Animationen priorisieren Lesbarkeit, Orientierung und Conversion statt reiner Deko.
- Motion-Design bleibt performant (mobile-first) und respektiert `prefers-reduced-motion`.

## Motion-Prinzipien (global)

### 1) Motion-Rollen
- **Orientierung:** Seiten-/Section-Übergänge, Sticky-Header-Verhalten, Scroll-Kontext.
- **Feedback:** Hover, Focus, Klick-/Tap-Reaktion, Form-Zustände.
- **Storytelling:** Hero-Inszenierung und Key-Visual-Transitions.

### 2) Timing & Easing
- UI-Microinteractions: **120–220ms**.
- Standard Enter/Exit von Content: **220–420ms**.
- Hero-/Story-Transitions: **480–900ms**.
- Easing-Basis:
  - Enter: `ease-out` (schneller Start, weiches Einrasten).
  - Exit: `ease-in` (dezentes Ausblenden).
  - Looping/Idle: sehr subtil, linear oder sanftes Sine-ähnliches Gefühl.

### 3) Performance-Regeln
- Primär `transform` + `opacity`; Layout-affine Properties vermeiden.
- Scroll-getriebene Effekte throttlen/synchronisieren.
- Mobile-Fallback mit reduzierter Layer-Anzahl und kürzeren Staggers.
- `prefers-reduced-motion`: stark vereinfachte Fade-Transitions ohne Parallax/Loop.

### 4) Konsistenz-Regeln
- Maximal **1 dominanter Effekt pro Viewport-Bereich**.
- Kein „Dauerblinken“ bei CTA-Elementen; Highlights nur situativ.
- Gleiches Interaction-Pattern für gleiche UI-Typen (alle Cards, alle Buttons etc.).

## Mapping: Welche Animationen pro Bereich mit Hyperframe

## 1) Navigation / Header

| Bereich | Hyperframe-Animation | Trigger | Intensität | Nutzen |
|---|---|---|---|---|
| Sticky Header | Höhen-/Opacity-Transition + Backdrop-Blur | Scroll Down/Up | Subtil | Bessere Orientierung beim Lesen |
| Desktop Nav Active State | Unterstrich- oder Pill-Slide | Route/Section Change | Subtil | Aktive Position klar sichtbar |
| Mobile Menu | Hamburger→Close Morph + Panel Slide/Fade | Menu Toggle | Mittel | Hochwertiges Mobile-Gefühl |

## 2) Hero

| Bereich | Hyperframe-Animation | Trigger | Intensität | Nutzen |
|---|---|---|---|---|
| Headline | Staggered Line Reveal (Y+Opacity) | Initial Load | Mittel | Sofortige visuelle Führung |
| Subheadline | Delay Fade-Up | Nach Headline | Subtil | Lesefluss unterstützen |
| Primary CTA | Soft Lift + leichter Glow bei Hover/Focus | Hover/Focus | Subtil | Conversion-Hinweis ohne Ablenkung |
| Hero Visual | Sehr leichte Drift/Parallax | Scroll + Idle | Mittel | Premium-Storytelling |

## 3) Content-Sections (About, Services, Projects)

| Bereich | Hyperframe-Animation | Trigger | Intensität | Nutzen |
|---|---|---|---|---|
| Section Container | Fade-Up Enter | In-View | Subtil | Klarer Übergang je Abschnitt |
| Feature-/Service-Cards | Stagger Grid Reveal | In-View | Subtil/Mittel | Struktur und Scanbarkeit |
| Section Headings | Masked Reveal oder Clip Fade | In-View | Subtil | Visuelle Hierarchie |

## 4) Projekt-Showcase

| Bereich | Hyperframe-Animation | Trigger | Intensität | Nutzen |
|---|---|---|---|---|
| Projektkarten | Hover Elevation + Border/Shadow Shift | Hover/Focus | Subtil | Interaktion wirkt „klickbar“ |
| Screenshot-Preview | Gentle Zoom + Shine Sweep (sparsam) | Hover | Mittel | Fokus auf Portfolio-Visuals |
| Filter/Sort UI (falls vorhanden) | State Morph / Chip Transition | Click | Subtil | Direkter Feedback-Loop |

## 5) Formular / Conversion

| Bereich | Hyperframe-Animation | Trigger | Intensität | Nutzen |
|---|---|---|---|---|
| Input Focus | Border/Glow Transition | Focus/Blur | Subtil | Klarer Eingabekontext |
| Validation Error | Kurzer X-Shake + Color Flash (nur Fehler) | Invalid Submit | Subtil | Fehler schnell erkennbar |
| Success State | Check Reveal + Message Fade-In | Valid Submit | Subtil | Positives Abschluss-Feedback |
| Submit Button | Press Compression + Loading Morph | Click/Loading | Mittel | Wahrnehmung von Responsiveness |

## 6) Footer / Utility

| Bereich | Hyperframe-Animation | Trigger | Intensität | Nutzen |
|---|---|---|---|---|
| Footer Links | Underline Slide | Hover/Focus | Subtil | Konsistente Link-Feedbacks |
| Scroll-To-Top | Float-In/Out | Scroll Threshold | Subtil | Navigationserleichterung |

## Umsetzungsreihenfolge (Preview-Branch geeignet)

### Phase 1 – Quick Wins (niedriges Risiko, hoher UX-Gewinn)
1. Globales Motion-Token-Set (Timing, Easing, Distances) definieren.
2. Button-/Card-Microinteractions vereinheitlichen.
3. Header Sticky-Transition + Mobile-Menu-Animation.
4. Section Fade-Up + Stagger für Standard-Content.

### Phase 2 – Hero & Showcase (Brand-Impact)
1. Hero Headline/Subheadline Sequenz.
2. CTA-Interaction-Veredelung.
3. Showcase-Hover und Preview-Transitions.

### Phase 3 – Conversion & Advanced
1. Formular-Feedback-Animationen.
2. Optional: Route-Transitions / Shared Element Patterns.
3. Performance-Tuning (Mobile/Low-End) + Reduced-Motion-Fallback.

## Akzeptanzkriterien pro Phase
- Keine beeinträchtigte Lesbarkeit oder Clickability.
- Keine spürbaren Frame-Drops auf mobilem Mid-Tier-Gerät.
- Einheitliches Bewegungsgefühl über alle Seiten.
- Barrierefreiheit: `prefers-reduced-motion` vollständig respektiert.

## Cloudflare Preview Workflow
1. Auf **`preview/hyperframe-animation-plan`** arbeiten.
2. Änderungen pushen und als Preview-Deployment in Cloudflare Pages prüfen.
3. Animationen mit realem Content validieren (Desktop + Mobile).
4. Erst nach Abnahme als PR Richtung Main mergen.
