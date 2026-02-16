## 2026-02-16 - [Exposed Session Cookies and Redacted Keys]
**Vulnerability:** Active session cookies for indeed.com and hardcoded JULES_API_KEY were found in the repository root.
**Learning:** Development tools and browser artifacts (like cookies from scraping/automation attempts) can easily be accidentally committed if not properly ignored.
**Prevention:** Strictly maintain .gitignore and use environment variables for all API keys, even in helper scripts. Added indeed_cookies.json to .gitignore.
