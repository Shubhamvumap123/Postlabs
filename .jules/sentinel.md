## 2025-02-12 - Client-Side API Key Exposure Pattern
**Vulnerability:** Found `fetch` call in `Footer.tsx` with placeholders `YOUR_API_KEY`, encouraging developers to hardcode private keys in the client.
**Learning:** Placeholders in client-side code are often blindly replaced by developers, leading to secret leakage.
**Prevention:** Remove all client-side logic that requires private keys. Replace with simulation ("Demo Mode") and explicit comments mandating backend proxies.
