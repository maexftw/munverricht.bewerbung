## 2026-02-18 - [Initial]
**Learning:** High volume of Canvas API calls (fillRect, fillStyle) in animation loops is a major bottleneck. Caching static elements to offscreen canvases can reduce draw calls by over 90%.
**Action:** Use offscreen canvases for static or slowly changing backgrounds.

## 2026-02-21 - [Bundle Optimization: API Proxying]
**Learning:** Client-side SDKs for large services like Google Gemini add significant weight to the initial JS bundle (~30kB+ minified). Proxying these requests via backend functions not only secures API keys but also reduces client-side payload.
**Action:** Replaced `@google/generative-ai` with native `fetch` calls to a backend proxy.
