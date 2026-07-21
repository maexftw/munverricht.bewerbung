## Design Context

### Users
- Primäre Nutzer sind kleine Unternehmen, Handwerksbetriebe, Praxen und ähnliche KMU, die eine seriöse moderne Website suchen, ohne Agentur-Komplexität und ohne technische Hürden.
- Die Nutzer kommen meist nicht mit Design- oder Frontend-Vorwissen, sondern mit einer klaren Erwartung: schnell verstehen, Vertrauen aufbauen und unkompliziert Kontakt aufnehmen.
- Die Oberfläche muss deshalb vor allem Orientierung, Ruhe und Glaubwürdigkeit vermitteln, während Preis, Leistung und Kontaktweg sofort erfassbar bleiben.

### Brand Personality
- 3-Wort-Persönlichkeit: seriös, modern, klar
- Gewünschte Emotionen: Vertrauen, Ruhe, Qualität
- Stimme und Wirkung: präzise, sachlich, hochwertig, nicht laut, nicht werblich-überdreht
- Anti-Referenzen: kein lautes Agentur-Design, kein verspieltes Startup-UI, keine grellen Effekte, keine visuelle Selbstinszenierung auf Kosten der Verständlichkeit

### Aesthetic Direction
- Light-first Design mit klarer Lesbarkeit und ruhiger Materialtiefe
- Farbwelt: kühle helle Blau-, Cyan- und Indigo-Akzente auf sehr hellen, leicht getönten Hintergründen
- Oberflächen: Apple-inspirierte helle Material-/Glass-Surfaces nur dort, wo sie Hierarchie, Wertigkeit und Tiefe unterstützen; Headlines und Haupttexte bleiben möglichst klar und nicht verglast
- Motion: zurückhaltend, hochwertig, wellenförmig statt hektisch; `prefers-reduced-motion` ist zu respektieren
- Gesamtwirkung: moderne Premium-Anmutung mit technischer Präzision, aber ohne Dribbble-Spielerei oder übertriebenen Effekt-Charakter

### Design Principles
- Lesbarkeit vor Effekt: Headlines, Fließtext und Conversion-Elemente dürfen nie von Animation, Glasflächen oder Dekoration geschwächt werden.
- Ruhige Wertigkeit statt Lautstärke: Materialtiefe, Blur, Tönung und Schatten immer kontrolliert und subtil einsetzen.
- Klare Hierarchie: Preis, Angebot, Nutzen und Kontakt sollen in wenigen Sekunden erfassbar sein.
- Konsistente Materialsprache: Wenn Glas-/Materialflächen verwendet werden, dann mit abgestimmten Borders, Highlights, Blur und Schatten statt pro Block anderer Stilmittel.
- Light-first und vertrauensorientiert: Helle, saubere Oberflächen mit reduzierter Bewegung und seriöser Farbführung sind der Standard.

<!-- ASTRYX:START -->
Astryx v0.1.6 · 149 components
CLI: run every command as `pnpm exec astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in your app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — discover, don't guess. Before writing UI:
1. `astryx build "<idea>"` — START HERE: returns a kit (closest [page] + [block]s + [component]s). No args = full playbook.
2. `astryx template <name> [--skeleton]` — scaffold the [page]/[block]s it named, or study their layout. Templates are reference code.
3. `astryx component <Name>` — props + examples for every component you use.

RULES:
- No <div> — components do all layout/spacing. Full page → AppShell; sidebar nav → SideNav.
- Frame first: pick the shell (AppShell / Layout+LayoutPanel) and budget regions in px BEFORE writing content (`astryx docs layout`).
- Dense data = rows (Table, List/Item) edge-to-edge — never Card-wrapped list items. Card = dashboard widgets, galleries, settings groups only.
- Status → StatusDot/Token; Badge only for counts and enumerated states, never decoration.
- Custom styling: component props first; else Tailwind utilities backed by tokens (bg-surface, text-primary, rounded-lg) via tailwind-theme.css. No raw hex/px.
- Tokens for every value (`astryx docs tokens`). Brand/accent via `astryx theme` — never override --color-* in :root.

MORE CLI:
  search "<query>"   find any component / hook / doc / template / block
  component --list   149 components by category
  template --list    page + block recipes
  docs <topic>       color, elevation, icons, illustrations, layout, migration, motion, principles, shape, spacing, styling, theme, tokens, typography
  swizzle <Name>     eject component source for deep customization
  upgrade --apply    run after any @astryxdesign/core bump
<!-- ASTRYX:END -->
