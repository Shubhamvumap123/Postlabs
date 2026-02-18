## 2025-02-18 - Client-Side API Key Exposure
**Vulnerability:** Hardcoded API key placeholders and client-side fetch calls to external services (Mailchimp) were found in the `Footer` component.
**Learning:** The codebase contained a pattern of making direct third-party API calls from the frontend, which necessitates exposing API keys to the client. This is a common anti-pattern in frontend-only or jamstack sites.
**Prevention:** Always proxy third-party API calls through a backend service or serverless function. Never use API keys directly in the frontend. Use "Demo Mode" or mocks for local development if backend is unavailable.
