## 2026-03-14 - Prevent Client-Side API Key Exposure
**Vulnerability:** Found a critical vulnerability in `src/components/Footer.tsx` where client-side Mailchimp `fetch` calls exposed API keys (or placeholders).
**Learning:** External API calls that require private keys or secrets (like Mailchimp subscriptions) must never be made directly from the client. Even placeholders indicate an architectural flaw where developers intend to put real keys.
**Prevention:** All third-party integrations requiring authentication secrets must be routed through a backend proxy service to securely inject keys and handle the requests. Use a simulated demo mode in client-only prototypes.
