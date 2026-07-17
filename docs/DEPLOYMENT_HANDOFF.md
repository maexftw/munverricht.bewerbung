# Portfolio Deployment Handoff

Stand: 2026-07-17

## Aktueller Arbeitsstand

- Branch: `codex/portfolio-firecrawl-sites`
- Öffentlicher Preview-Fix: Commit `dcad4d4d76801531a7f395a04997a306bfdfbee3`
- Cloudflare-Pages-Projekt: `maximilian-unverricht`
- Öffentliche Preview ohne Login: `https://dc8d0e77.maximilian-unverricht.pages.dev/`
- Das Git-Deployment für den Branch ist in Cloudflare Pages aktiv.

## Behobene Ursache

Vite schreibt den Browser-Build nach `dist/client`. Cloudflare Pages veröffentlichte zuvor `dist`, wodurch `/` und die JavaScript-Assets mit 404 antworteten. `wrangler.toml` setzt deshalb `pages_build_output_dir = "dist/client"`.

## Verifizierter Zustand

- Startseite, drei Case-Routen, `/impressum` und `/datenschutz`: HTTP 200
- Haupt-JavaScript-Asset: HTTP 200
- Browser-Rendering: Portfolio-Inhalt sichtbar, keine Konsolenfehler
- Die Preview ist ohne Login erreichbar.

## Abgrenzung zu OpenAI Sites

Das OpenAI-Sites-Projekt aus `.openai/hosting.json` ist ein separates, weiterhin privates Deployment. Seine `chatgpt.site`-URL und deren Owner-only-Zugriff wurden für den öffentlichen Cloudflare-Preview-Fix nicht verändert.

## Weiterarbeiten

Vor Änderungen `git fetch --all --prune --tags` und `git status -sb` ausführen. Vom Branch `codex/portfolio-firecrawl-sites` und dessen aktuellem Remote-HEAD weiterarbeiten. Nach materiellen Änderungen Build, Typecheck, Browser-QA und `graphify update .` erneut ausführen.
