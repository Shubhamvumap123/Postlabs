## 2025-05-20 - [Client-Side API Key Exposure]
**Vulnerability:** Found a hardcoded fetch call in `Footer.tsx` that exposed the Mailchimp API key structure directly in client-side code (`Authorization: "apikey YOUR_API_KEY"`).
**Learning:** Even placeholder code can encourage dangerous patterns. Developers copy-pasting this would immediately expose their private API keys to anyone viewing the source.
**Prevention:** Never include API calls that require private keys in frontend code. Always use a backend proxy or serverless function to handle sensitive operations, keeping keys securely on the server.
