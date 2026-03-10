## 2025-03-10 - Client-Side API Key Exposure in Newsletter Signup
**Vulnerability:** A client-side fetch call directly to Mailchimp API included placeholder API keys (`YOUR_API_KEY`). If populated, this would expose the credentials to any user inspecting the network tab or source code.
**Learning:** Client-side components like `Footer.tsx` cannot securely hold API keys or credentials. All third-party API integrations requiring authentication must be proxied through a secure backend or implemented via a "Demo Mode" for frontend-only prototypes.
**Prevention:** Never use `fetch` with `Authorization` headers containing static API keys in React client components. Use environment variables routed through backend endpoints instead.
