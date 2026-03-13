## 2024-05-18 - Client-Side API Keys Vulnerability
**Vulnerability:** Found Mailchimp placeholder API keys (`YOUR_API_KEY`, `YOUR_DC`, `YOUR_LIST_ID`) hardcoded in `src/components/Footer.tsx`. This indicates an intent to make client-side calls to a private API.
**Learning:** The project is currently a static frontend, leading to the unsafe pattern of attempting direct API calls with private secrets.
**Prevention:** Always proxy private API requests through a backend server (e.g., Next.js API route, Express server, AWS Lambda). Never hardcode secrets in client-side code, and don't rely on `import.meta.env` for private keys unless they are specifically meant to be public (e.g., `VITE_PUBLIC_...`). For now, we should use a simulated fetch request for demonstration purposes.
