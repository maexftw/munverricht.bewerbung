## 2026-02-18 - [Initial]
**Learning:** High volume of Canvas API calls (fillRect, fillStyle) in animation loops is a major bottleneck. Caching static elements to offscreen canvases can reduce draw calls by over 90%.
**Action:** Use offscreen canvases for static or slowly changing backgrounds.
