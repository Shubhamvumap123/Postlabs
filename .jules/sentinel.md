## 2024-05-20 - Client-Side API Key Exposure Pattern
**Vulnerability:** Found direct `fetch` calls to external APIs (Mailchimp) in React components (`Footer.tsx`) with placeholder API keys. This pattern encourages developers to paste real private keys into client-side code, leading to key theft.
**Learning:** The project lacks a backend proxy for sensitive third-party integrations, leading to "quick fix" client-side implementations that are insecure.
**Prevention:** Strictly enforce a "No Private Keys in Client" rule. All third-party API calls requiring private keys must be proxied through a backend (e.g., Next.js API routes or Express). Added secure "Demo Mode" simulation in `Footer.tsx` as the default pattern to prevent accidental key exposure.
