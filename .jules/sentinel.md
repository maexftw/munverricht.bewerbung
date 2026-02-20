## 2026-02-16 - [Exposed Session Cookies and Redacted Keys]
**Vulnerability:** Active session cookies for indeed.com and hardcoded JULES_API_KEY were found in the repository root.
**Learning:** Development tools and browser artifacts (like cookies from scraping/automation attempts) can easily be accidentally committed if not properly ignored.
**Prevention:** Strictly maintain .gitignore and use environment variables for all API keys, even in helper scripts. Added indeed_cookies.json to .gitignore.

## 2026-02-20 - [Removal of Unauthenticated Gemini API Endpoint]
**Vulnerability:** Exposed an unauthenticated API endpoint at `functions/api/chat.ts` that interfaced with Google Gemini. Any user could send requests to this endpoint, potentially exhausting the API quota or incurring costs if billed.
**Learning:** Legacy endpoints or features that are no longer linked from the frontend can remain active in the deployment environment (Cloudflare Functions) if not explicitly removed, creating a hidden attack surface.
**Prevention:** Regularly audit the `functions/` or `api/` directory to ensure all active endpoints are required and properly authenticated. Implement a "cleanup" step when pivoting features or branding.
