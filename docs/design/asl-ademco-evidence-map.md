# ASL Ademco Vertical Agent — Evidence Mapping

Purpose: keep the munverricht.org case study honest. Claims on the public portfolio must map to existing files, current reruns, or explicit caveats.

## Public case framing

Working title: **ASL Ademco Vertical Agent**

Short claim:

> Partner-facing AI demo for security-technology questions: route a user question into a safe ASL partner corridor, retrieve product/context hints, show compatible product directions, and avoid raw technical failures or unsuitable answers.

What it should prove on munverricht.org:

- Product thinking in a real B2B/security-tech domain.
- Frontend implementation for a focused AI demo surface.
- Partner-safe UX instead of generic end-customer shop behavior.
- Catalog/RAG/eval awareness.
- Cloudflare-oriented delivery and browser QA discipline.

## Existing evidence found locally

Source workspace inspected during planning:

`/home/llm/asl-ademco-live-demo`

Important files:

| Evidence file | What it supports | Public-claim status |
|---|---|---|
| `reports/asl-demo-ui-walkthroughs.md` | Standalone `/asl-demo/`, manual UX walkthroughs, mobile/desktop observations, previous test/build notes | Existing evidence. Must rerun before saying current/green. |
| `shop-src/src/features/asl-demo/asl-demo-app.jsx` | ASL demo UI surface | Existing evidence. Inspect/quote only after copying or linking source safely. |
| `shop-src/src/lib/asl-demo-ui.js` | Demo UI helpers/state | Existing evidence. |
| `functions/api/shop/_lib/asl-partner-mode.js` | Partner-mode gating/framing | Existing evidence. |
| `scripts/eval-asl-mode.mjs` | Evaluation script entry point | Existing evidence. Must rerun before green status. |
| `tests/asl-demo-ui.test.mjs` | UI smoke tests | Existing evidence. Must rerun before green status. |
| `tests/asl-eval-suite.test.mjs` | Eval suite | Existing evidence. Must rerun before green status. |
| `tests/asl-partner-mode.test.mjs` | Partner-mode contract | Existing evidence. Must rerun before green status. |
| `tests/asl-chat-gates.test.mjs` | Chat gate/deployment safety | Existing evidence. Must rerun before green status. |
| `tests/chat-rag-eval.test.mjs` | RAG/chat quality checks | Existing evidence. Must rerun before green status. |
| `package.json` scripts `test:asl-demo`, `test:asl-eval`, `test:deployment`, `test:rag`, `build:pages` | Verification commands | Existing evidence. Must rerun in the real ASL project before public green claim. |

## Claims allowed now

Use these phrases safely before rerunning ASL tests:

- “Existing project evidence includes a standalone ASL partner demo route, UI smoke tests, eval scripts, and Cloudflare Pages build scripts.”
- “The case documents how I shaped a security-tech product advisor from catalog/domain constraints into a partner-facing demo.”
- “The public portfolio separates previously documented evidence from checks rerun during the current redesign pass.”

## Claims requiring current rerun

Do not publish these as current facts until commands were rerun and logged:

- “`npm run test:asl-demo` passes.”
- “`npm run build:pages` succeeds.”
- “No console errors.”
- “No mobile horizontal overflow.”
- “Chat fallback states work.”
- “Deployment config is valid.”

Suggested rerun commands in the ASL/KOST workspace:

```bash
npm run test:asl-demo
npm run test:asl-eval
npm run test:deployment
npm run test:rag
npm run build:pages
```

If only some pass, the case study should say exactly which gates were verified in this pass and which remain historical evidence.

## Do not claim without explicit approval/evidence

- Revenue, conversion, customer adoption, or client approval metrics.
- Names of private stakeholders or non-public customer facts.
- Exact catalog coverage numbers unless generated from current scripts.
- Live production readiness of the ASL assistant.
- Current Cloudflare deployment status unless verified from the actual target deployment.

## Public page content skeleton

### One-line teaser

DE:

> Aus einer komplexen Security-Tech-Domäne wurde eine partnerfähige AI-Demo: Fragen einordnen, Produktkorridore zeigen, Fallbacks absichern und das Ganze browser- und buildbar halten.

EN:

> A complex security-tech domain turned into a partner-facing AI demo: classify questions, show product corridors, guard fallbacks, and keep the result browser- and build-verifiable.

### Problem

DE:

> Sicherheitsprodukte sind beratungsintensiv. Partner brauchen schnelle Orientierung zu Kompatibilität, Einsatzbereich und nächsten Prüfpunkten, ohne dass ein normaler Endkunden-Shop falsche Sicherheit vorgibt.

EN:

> Security products need context-heavy consultation. Partners need quick orientation around compatibility, use case, and next checks without a normal end-customer shop pretending to know too much.

### Solution

DE:

> Ich habe eine separate ASL-Demo-Strecke konzipiert: Partnerfragen werden in sichere Antwortkorridore gelenkt, Produkt-/Katalogwissen wird strukturiert genutzt, ungeeignete Fragen landen in erklärten Fallbacks.

EN:

> I shaped a separate ASL demo surface: partner questions are routed into safe answer corridors, product/catalog knowledge is used structurally, and unsuitable questions land in explained fallbacks.

### Result

DE:

> Das Ergebnis ist kein Chatbot-Spielzeug, sondern ein prüfbarer Produktprototyp mit UI, Gatekeeping, Test-/Eval-Ansätzen und Cloudflare-orientierter Delivery-Struktur.

EN:

> The result is not a chatbot toy, but a verifiable product prototype with UI, gatekeeping, test/eval hooks, and Cloudflare-oriented delivery structure.

## Next implementation notes for munverricht.org

- Add ASL as the first featured item, not just another card.
- Add a case route such as `/case/asl-ademco-agent`.
- Use chips for evidence state: `Existing evidence`, `Needs rerun`, `Verified in this pass`.
- Link to demo only if the target URL is verified and safe to share.
- Keep `/webdesign` mostly out of scope for this redesign slice.
