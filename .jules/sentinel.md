## 2026-02-16 - [Exposed Session Cookies and Redacted Keys]
**Vulnerability:** Active session cookies for indeed.com and hardcoded JULES_API_KEY were found in the repository root.
**Learning:** Development tools and browser artifacts (like cookies from scraping/automation attempts) can easily be accidentally committed if not properly ignored.
**Prevention:** Strictly maintain .gitignore and use environment variables for all API keys, even in helper scripts. Added indeed_cookies.json to .gitignore.

## 2026-02-20 - [Removal of Unauthenticated Gemini API Endpoint]
**Vulnerability:** Exposed an unauthenticated API endpoint at `functions/api/chat.ts` that interfaced with Google Gemini. Any user could send requests to this endpoint, potentially exhausting the API quota or incurring costs if billed.
**Learning:** Legacy endpoints or features that are no longer linked from the frontend can remain active in the deployment environment (Cloudflare Functions) if not explicitly removed, creating a hidden attack surface.
**Prevention:** Regularly audit the `functions/` or `api/` directory to ensure all active endpoints are required and properly authenticated. Implement a "cleanup" step when pivoting features or branding.

## 2026-02-21 - [Secure Restoration of AI Proxy with Generic Branding]
**Vulnerability:** Direct Client-Side API Key Usage in `components/ContactShell.tsx`.
**Solution:** Restored the contact form feature but moved the AI logic to a secure Cloudflare Pages Function at `functions/api/workflow-analysis.ts`. Replaced all AI-specific branding (Agentic, Gemini) with generic terms (Modern Workflow, Advanced System) to comply with project directives.
**Learning:** When restoring legacy features, ensure they align with the current security architecture and branding guidelines. Using a server-side proxy is the only secure way to handle private API keys in a client-side application.
