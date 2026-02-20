## 2024-05-22 - Client-Side Secrets & Reverse Tabnabbing

**Vulnerability:**
1.  **Client-Side Secrets:** The codebase contained a pattern of making third-party API calls (Mailchimp) directly from the client-side (`src/components/Footer.tsx`), which necessitates exposing API keys in the browser.
2.  **Reverse Tabnabbing:** External links using `target="_blank"` lacked `rel="noopener noreferrer"`, allowing the target page to potentially manipulate the origin page via `window.opener`.

**Learning:**
- Frontend-only architectures often tempt developers to call APIs directly, but this exposes credentials.
- `target="_blank"` without protection is a common, silent risk.

**Prevention:**
- **Secrets:** Always use a backend proxy or serverless function to handle third-party API calls that require secrets. Never expose API keys in client-side code, even as placeholders.
- **Links:** Enforce `rel="noopener noreferrer"` for all external links via linting rules or strict code review.
