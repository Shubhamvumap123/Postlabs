## 2025-10-26 - Frontend API Key Exposure
**Vulnerability:** Hardcoded Mailchimp API keys in the frontend (`Footer.tsx`).
**Learning:** Even placeholder keys (`YOUR_API_KEY`) encourage insecure patterns. Client-side code is publicly visible, so any secrets bundled with it are compromised.
**Prevention:**
1.  **Never** make direct calls to third-party APIs that require secret keys from the client.
2.  Use a backend proxy to handle the API request securely.
3.  Use `import.meta.env` for configuration, but treat frontend environment variables as public.
4.  Implement "Demo Mode" or safe defaults if keys are missing to prevent broken UI during development.
