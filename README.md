<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1KVS3BFpzD94hUETJ1pswtmq4g1ji5wa0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment (Cloudflare Pages)

Dieses Projekt ist für das Deployment auf Cloudflare Pages vorbereitet.

### Voraussetzungen
1. Ein Cloudflare Account.
2. Das Repository muss auf GitHub oder GitLab liegen.

### Einrichtung
1. Gehe im Cloudflare Dashboard zu **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Wähle dieses Repository aus.
3. Die Build-Einstellungen sollten automatisch erkannt werden:
   - **Framework preset:** None (oder Vite, falls erkannt)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **WICHTIG (Umgebungsvariablen):**
   - Gehe zu **Settings** > **Environment variables**.
   - Füge unter **Production** (und ggf. Preview) die Variable `GEMINI_API_KEY` mit deinem API Key hinzu.
   - Stelle sicher, dass dies unter **Build variables** geschieht, da Vite diese Werte während des Build-Prozesses fest in den Code schreibt.

### Lokale Konfiguration
Die Dateien `wrangler.toml`, `.node-version` und `public/_redirects` wurden hinzugefügt, um den Prozess zu automatisieren und das Routing sicherzustellen.

### Fehlerbehebung (Troubleshooting)
Falls der Build fehlschlägt, weil `wrangler.toml` die Sektion `[build]` nicht unterstützt:
Die Build-Konfiguration (Befehl und Verzeichnis) muss zwingend im Cloudflare Dashboard unter **Settings** > **Builds & deployments** > **Configure methods** eingetragen werden, da `wrangler.toml` für Pages aktuell nur das Output-Verzeichnis (`pages_build_output_dir`) und Kompatibilitäts-Einstellungen unterstützt.

## VS Code + GitHub PR Workflow (Quick)

Basierend auf [agents.md](agents.md) gilt: **Source of Truth ist Code + PR-Kommentare auf GitHub**.

### Empfohlene VS Code Extensions
- `GitHub Pull Requests and Issues` (ID: `github.vscode-pull-request-github`)
- `GitLens` (ID: `eamodio.gitlens`)

Empfehlungen sind im Repo hinterlegt in [.vscode/extensions.json](.vscode/extensions.json).

### Praktischer Ablauf pro Task
1. **Main synchronisieren**
   - Source Control oder Terminal: `git checkout main && git pull origin main`
2. **Feature-Branch erstellen**
   - Namensschema aus [agents.md](agents.md): `ag-<topic>` oder `jules-<topic>`
3. **Änderungen umsetzen + prüfen**
   - Source Control Diff prüfen
   - optional lokal testen/builden
4. **Committen**
   - Kurze, klare Commit Message mit Scope
5. **Push + PR erstellen**
   - In Source Control: `Publish Branch`
   - In GitHub PR Extension: `Create Pull Request`
6. **PR reviewen und updaten**
   - Feedback/Checks in VS Code PR-Panel bearbeiten
   - Bei Änderungen: neuer Commit, Push auf denselben Branch
7. **Merge + Branch löschen**
   - Nach erfolgreichem Review/Checks mergen
8. **Handoff aktualisieren**
   - Vor Session-Ende den Übergabe-Block in [agents.md](agents.md) aktualisieren

### Optional: vorhandenes Script nutzen
Das bestehende PowerShell-Script [sync.ps1](sync.ps1) unterstützt den Ablauf mit `Pull-Main`, `New-Task` und `Push-Task`.
