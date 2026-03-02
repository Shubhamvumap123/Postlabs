## 2024-05-24 - Client-side Mailchimp API integration
**Vulnerability:** API key exposed in frontend Mailchimp integration
**Learning:** The frontend attempts to directly call the Mailchimp API, passing an API key in the headers. This requires embedding the API key in the frontend bundle, making it accessible to anyone who views the source code.
**Prevention:** Always use a backend proxy for 3rd party services that require authentication with private API keys. The frontend should only make requests to your own backend (or a serverless function), which can then securely store and use the API key to interact with Mailchimp.
