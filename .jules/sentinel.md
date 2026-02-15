## 2025-05-18 - Hardcoded Secrets in Client-Side Code
**Vulnerability:** Found hardcoded placeholders for Mailchimp API keys in `src/components/Footer.tsx`.
**Learning:** Even placeholders can be dangerous if developers replace them with real keys directly in the code. Client-side apps should never make direct calls to APIs requiring private keys.
**Prevention:** Always use environment variables for configuration. For private APIs, never expose the key to the client; proxy the request through a backend service.
