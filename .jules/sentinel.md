## 2024-03-08 - [Reverse Tabnabbing]
**Vulnerability:** Found `target="_blank"` on links without `rel="noopener noreferrer"`.
**Learning:** React elements with `target="_blank"` expose the application to reverse tabnabbing attacks where the newly opened tab can manipulate the original tab via `window.opener`.
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"`.
## 2024-03-08 - [DOM XSS via innerHTML]
**Vulnerability:** In `src/hooks/useScrollAnimations.tsx`, `element.innerText` is split and written back to `element.innerHTML` without sanitization. If an element with `.reveal-text` contains user-controllable text, this could lead to DOM-based XSS when the user scrolls it into view.
**Learning:** Avoid directly copying text to `innerHTML` even if you think it's static. Always sanitize or properly construct DOM elements.
**Prevention:** Construct DOM elements natively (`document.createElement`) and use `.textContent`, or sanitize string literals with a robust escape function before assigning to `innerHTML`.
## 2024-03-08 - [Client-side API call with Private Key]
**Vulnerability:** Found Mailchimp API keys intended to be stored in the frontend client (`YOUR_API_KEY`) and live fetch calls to an external service requiring a private key.
**Learning:** Client-side API calls to services requiring private keys are strictly forbidden; they must be proxied via a backend.
**Prevention:** Remove all live client-side fetch calls and API key placeholders for services requiring private keys.
