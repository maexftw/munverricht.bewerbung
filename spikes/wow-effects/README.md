# Munverricht Wow Effects Lab

Disposable comparison spike for code-first, AI-operable interaction frameworks.

## Questions

| Spike | Given / When / Then | Primary risk |
|---|---|---|
| Shader Hero | Given a branded hero, when pointer and idle motion drive a custom shader, then it should feel premium without external assets | Visual quality and GPU cost |
| System Landscape | Given portfolio project data, when rendered as an interactive R3F scene, then it should communicate systems thinking rather than generic 3D decoration | Complexity and mobile usability |
| Kinetic Type | Given real portfolio language, when pointer physics disturb and reform glyphs, then typography itself should become the interaction | Readability and canvas performance |

## Run

From the repository root:

```sh
pnpm run dev:wow
```

Open `http://127.0.0.1:4176/`.

The existing root dev server also exposes the lab at
`http://127.0.0.1:4175/spikes/wow-effects/index.html`.

## Guardrails

- Code-first and reproducible; no GUI-only source of truth.
- One dominant interaction per scene.
- Mobile fallback and `prefers-reduced-motion` required.
- No production routing or deployment; this lab is intentionally isolated.
- Verify visual quality, responsiveness, console output, and build before a verdict.

## Evaluation rubric

Each experiment is scored from 1–5 after browser QA:

| Dimension | Question |
|---|---|
| Wow | Does the first three seconds create a genuine stop-and-look moment? |
| Brand fit | Does it feel like Munverricht rather than a generic WebGL demo? |
| Agent control | Can a coding agent reproduce and art-direct variants without a GUI source of truth? |
| Performance | Does it remain smooth and responsive on desktop and degrade cleanly on mobile? |
| Accessibility | Is content usable under reduced motion, touch, and keyboard constraints? |
| Production cost | Can the effect be isolated, lazy-loaded, and maintained without dominating the site? |

Automated evidence can be captured with:

```sh
node spikes/wow-effects/scripts/capture.mjs
```

## Verdict

## Verdict: VALIDATED WITH TRADE-OFFS

All three code-first approaches produced reproducible interactive scenes without a GUI-authored source file. Desktop, 390px mobile, reduced-motion rendering, isolated production build, runtime console, and visual screenshots were checked.

| Experiment | Wow | Brand fit | Agent control | Performance | Accessibility | Production cost |
|---|---:|---:|---:|---:|---:|---:|
| Shader Hero — R3F + GLSL | 4 | 4 | 5 | 4 | 4 | 4 |
| System Landscape — R3F + Drei | 3 | 4 | 4 | 3 | 3 | 3 |
| Kinetic Type — p5.js | 3 | 4 | 5 | 3 | 4 | 2 |

### What worked

- The shader is the strongest hero candidate: immediate atmosphere, no external assets, direct pointer/click art direction, and a tiny experiment-specific chunk.
- R3F/Drei makes spatial project diagrams straightforward to describe and regenerate in code. Selecting nodes creates a meaningful interaction rather than decorative rotation.
- p5.js is highly agent-controllable and excellent for rapid interaction sketches. The typography reacts correctly to pointer repulsion and press attraction.
- Every experiment supports touch, responsive sizing, explicit full-motion preview, system preference, and a reduced-motion composition.
- No runtime console errors remained in the final three-scene browser pass.

### What did not work as well

- The spatial system needs more editorial choreography before production; a still frame can read as a cluster of spheres until the user interacts.
- p5.js contributes the heaviest isolated scene chunk (about 271 kB gzip) and is excessive for this one typography effect. A production version should port the proven behavior to a small custom Canvas component.
- The shared React Three Fiber runtime is about 240 kB gzip. It must remain lazy-loaded and should earn its cost with a dominant hero experience.
- Mobile scenes need intentionally simplified art direction; desktop compositions cannot merely be scaled down.

### Build evidence

- Shell/runtime: approximately 63 kB gzip
- Shared R3F runtime: approximately 240 kB gzip
- Shader experiment: approximately 2 kB gzip beyond the shared runtime
- System Landscape experiment: approximately 13 kB gzip beyond the shared runtime
- p5 Kinetic Type experiment: approximately 271 kB gzip

### Recommendation

Use **React Three Fiber + custom GLSL** as the primary Munverricht wow stack. Keep Astryx as the system layer and load the WebGL experience only around one high-value hero or showcase moment. Preserve the System Landscape as a second-stage concept for project storytelling. Treat p5.js as the fast ideation environment, then port successful production effects to custom Canvas when bundle cost matters.
