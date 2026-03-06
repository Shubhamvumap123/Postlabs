## 2025-02-17 - [CRITICAL] Hardcoded API key in client-side component
**Vulnerability:** A hardcoded API key (`YOUR_API_KEY`) and list ID (`YOUR_LIST_ID`) were present in the client-side `Footer` component for a Mailchimp subscription form.
**Learning:** Client-side components should never make direct API calls to services requiring private keys or secrets, as these are exposed to anyone viewing the source code.
**Prevention:** Always proxy API calls requiring private keys through a secure backend endpoint. For client-side demonstrations, implement a simulated 'Demo Mode' without real secrets.
