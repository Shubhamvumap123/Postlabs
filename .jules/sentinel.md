## 2024-05-18 - Client-Side API Placeholders
**Vulnerability:** Found `Footer.tsx` containing a `fetch` call to Mailchimp with placeholder `apikey YOUR_API_KEY`.
**Learning:** Even placeholder code can be dangerous as it encourages developers to paste secrets directly into client-side code. The pattern suggests a lack of backend proxy architecture for third-party services.
**Prevention:** Replaced with a "Demo Mode" simulation. Future integrations must use a backend proxy.
