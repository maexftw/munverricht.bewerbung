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
