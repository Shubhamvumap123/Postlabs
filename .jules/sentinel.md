# Sentinel's Security Journal

## 2025-05-22 - Hardcoded Secrets & Client-Side API Keys

**Vulnerability:** Found hardcoded placeholders for Mailchimp API keys (`YOUR_API_KEY`) and usage of these keys directly in client-side code (`Footer.tsx`).
**Learning:** Developers often use placeholders that can be accidentally committed with real values. Furthermore, third-party services like Mailchimp often don't support CORS or client-side calls safely, and exposing keys allows anyone to manipulate the mailing list.
**Prevention:**
1. Use `import.meta.env` (or process.env) for all configuration.
2. Implement "Demo Mode" or checks that prevent real API calls if keys are missing/placeholders.
3. For services requiring private keys, ALWAYS proxy through a backend. Do not call from the browser.
