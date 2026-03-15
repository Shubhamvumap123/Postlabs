## 2024-05-18 - Client-Side API Key Exposure
**Vulnerability:** Found placeholder Mailchimp API keys in client-side code (`Footer.tsx`). Making client-side requests to private APIs with secrets exposes those secrets to anyone inspecting the page.
**Learning:** This existed because the frontend was implementing a newsletter signup form without a backend proxy. Developers often use placeholder keys during prototyping, but even placeholder code for private APIs on the client is a risky pattern.
**Prevention:** Never put API keys for private, third-party services in client-side code. All such requests must be proxied through a secure backend (e.g., Next.js API routes, AWS Lambda, Node.js/Express) where secrets are stored in environment variables.
