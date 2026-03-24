# Bolt's Journal - Critical Learnings

## 2025-05-15 - Batch Rendering in p5.js with beginShape(POINTS)
**Learning:** Drawing 10,000+ individual points in p5.js using `p.point()` is extremely expensive due to the overhead of setting stroke color/weight and individual draw calls for every particle.
**Action:** Group particles into "buckets" based on shared visual properties (like shade/alpha) and use `p.beginShape(p.POINTS)` followed by multiple `p.vertex()` calls. This batches the draw calls and drastically reduces canvas state changes, providing a massive performance boost for large particle systems.

## 2025-05-15 - Lazy Loading Heavy Visualization Libraries
**Learning:** Including heavy creative coding libraries like `p5.js` in the main application bundle can significantly bloat the initial load time, even if the animation isn't immediately critical (e.g., during a boot sequence).
**Action:** Use `React.lazy` and `Suspense` to move these libraries into separate chunks. This allows the application's "shell" and critical initial UI (like a boot screen) to load and render much faster, deferring the 1MB+ overhead of the visualization library.

## 2025-05-15 - Strategic Animation Pausing
**Learning:** Background animations that are hidden behind opaque overlays (like a fullscreen terminal boot screen) still consume CPU/GPU cycles if the animation loop continues running.
**Action:** Implement an `isPaused` state and use `p.noLoop()` / `p.loop()` to halt the p5.js draw cycle when the animation is not visible. This saves 100% of the animation's resource consumption during the application's initial load phase.
