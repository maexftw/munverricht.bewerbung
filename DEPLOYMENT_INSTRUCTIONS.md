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

The repository is already configured for Cloudflare Pages deployment with the following settings:

- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`

These settings are explicitly defined in the `wrangler.toml` file, ensuring Cloudflare Pages correctly executes the build process.

#### 3. Repository Setup

Ensure your repository includes the following files:
- `package.json` (with build scripts)
- `wrangler.toml` (configured for Cloudflare Pages)
- `.gitignore` (excludes sensitive files like `.env.local`)

#### 4. Local Testing

To test the deployment locally before pushing to Cloudflare:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with your API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Verify that the `dist` directory is created with all necessary files.

#### 5. Push to GitHub

Once you've tested locally, push your changes to GitHub:

```bash
git add .
git commit -m "Fix Cloudflare Pages deployment configuration"
git push origin main
```

#### 6. Connect to Cloudflare Pages

1. In your Cloudflare Dashboard, go to Workers & Pages
2. Click "Create a project" or "Connect to Git"
3. Select your GitHub repository
4. Cloudflare will automatically detect the build settings from `wrangler.toml`
5. Trigger a new deployment

### Troubleshooting

#### Issue: "Output directory 'dist' not found"

**Solution**: 
- Ensure you have run `npm install` to install all dependencies
- Verify that your local build works by running `npm run build`
- Check that `.env.local` is properly configured with your API key
- Confirm that the `dist` directory is created after building
- Ensure `wrangler.toml` includes the `[build]` section with the correct `command`

#### Issue: API Key Not Working

**Solution**:
- Double-check that the GEMINI_API_KEY is set in Cloudflare Pages environment variables
- Ensure the API key has proper permissions for the Gemini service
- Verify that no sensitive files are committed to the repository

### Security Notes

- The `.env.local` file is included in `.gitignore` and should never be committed to the repository
- All API keys should be managed through Cloudflare Pages environment variables
- Keep your API keys secure and never expose them in public repositories

### Repository Structure

The repository structure is optimized for Cloudflare Pages deployment:

```
munverricht.bewerbung/
├── src/                 # Source code
├── public/              # Static assets
├── components/          # React components
├── wrangler.toml        # Cloudflare Pages configuration
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

This structure ensures compatibility with Cloudflare Pages' automatic build detection.