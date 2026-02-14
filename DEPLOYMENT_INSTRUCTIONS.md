# Deployment Instructions for munverricht.bewerbung

## Cloudflare Pages Deployment

This document provides instructions for deploying the munverricht.bewerbung repository to Cloudflare Pages.

### Prerequisites

1. A Cloudflare account
2. The repository cloned locally
3. GEMINI_API_KEY (for AI functionality)

### Deployment Steps

#### 1. Configure Environment Variables

Before deploying, you need to set up environment variables in your Cloudflare Pages project:

1. Go to your Cloudflare Dashboard
2. Navigate to Workers & Pages > Your Project
3. Go to Settings > Environment Variables
4. Add the following variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your actual Gemini API key

#### 2. Build Configuration

For Cloudflare Pages Git integration to work correctly with Vite, ensure the following settings are configured in the Cloudflare Dashboard (**Settings > Builds & deployments > Configure methods**):

- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Root Directory**: `/`

**Important Note on wrangler.toml:**
We have intentionally omitted `pages_build_output_dir` from `wrangler.toml`. Including it would force Cloudflare to ignore the dashboard's build settings, but since `wrangler.toml` does not yet support the build command for Git integrations, this leads to a deployment failure ("No build command specified"). By omitting it, we allow Cloudflare to auto-detect the Vite framework or use the dashboard settings.

#### 3. Repository Setup

Ensure your repository includes the following files:
- `package.json` (with build scripts)
- `wrangler.toml` (for local development and bindings)
- `.gitignore` (excludes sensitive files like `.env.local`)

#### 4. Local Testing

To test the deployment locally:

1. Install dependencies: `npm install`
2. Create a `.env.local` file with your API key: `GEMINI_API_KEY=your_key`
3. Build the project: `npm run build`
4. Verify that the `dist` directory is created correctly.

### Troubleshooting

#### Issue: Website shows black screen

**Solution**:
- Perform a **Hard Refresh** (Ctrl+Shift+R or Cmd+Shift+R) to clear your browser cache.
- Ensure you have removed any `importmap` from `index.html`.
- Check that the `GEMINI_API_KEY` is correctly set in the dashboard.

#### Issue: "Output directory 'dist' not found" or "No build command specified"

**Solution**: 
- Ensure you haven't added `pages_build_output_dir` to `wrangler.toml` if you are using Git integration.
- Manually set the **Build Command** to `npm run build` and **Build Output Directory** to `dist` in the Cloudflare Dashboard.

#### Issue: API Key Not Working

**Solution**:
- Double-check that the `GEMINI_API_KEY` is set in Cloudflare Pages environment variables (under Build variables).
