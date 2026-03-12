## 2024-05-24 - Client-Side API Key Exposure in Newsletter Form
**Vulnerability:** A newsletter subscription form in `Footer.tsx` directly called the Mailchimp API from the client using a hardcoded `Authorization: apikey YOUR_API_KEY` header.
**Learning:** External API integrations that require private keys (like Mailchimp) cannot be made directly from client-side React code, as the keys will be exposed to end users in the network requests and source code.
**Prevention:** All external API requests requiring sensitive keys must be proxied through a secure backend server or serverless function where the keys are stored securely as environment variables and never sent to the client.
