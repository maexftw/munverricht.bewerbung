# AI Handoff & State (agents.md)

> [!NOTE]
> Diese Datei ist kein zweites Git-Log. Sie dient ausschließlich dem **Handoff** zwischen AIs (Jules <-> Antigravity).

## 🚀 ÜBERGABE-STATUS (Current Handoff)
- **Status:** Deployment-Rätsel gelöst. 
- **Erkenntnis:** Der Code ist perfekt (Jules' Fixes funktionieren), aber Cloudflare ist falsch konfiguriert (serviert Root statt `dist`).
- **Nächster Schritt for Jules/AG:** 
  1. Den PR mergen.
  2. Im Cloudflare Dashboard unter Pages > Settings > Build & Deploy:
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Build Output Directory: `dist`
- **Blocker:** Keine.

---

## 🤖 AI Workflow Briefing
1. **Source of Truth:** Der Code und die PR-Kommentare auf GitHub.
2. **Handoff:** Vor dem Ende jeder Session wird der "Übergabe-Status" hier aktualisiert.
3. **Branching:** `ag-*` (Antigravity), `jules-*` (Jules).

## Session 2026-02-15 (Antigravity)
- **Ergebnis:** Workflow v2 stabil, Jules-Bridge aktiv, Cloudflare-Diagnose via CLI möglich.
