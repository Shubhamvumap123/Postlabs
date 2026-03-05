## 2024-05-24 - Missing `rel="noopener noreferrer"` on External Links
**Vulnerability:** External links with `target="_blank"` missing the `rel="noopener noreferrer"` attribute (Reverse Tabnabbing).
**Learning:** This existed because it's easy to overlook adding both `noopener` and `noreferrer` when creating external links in React components. If omitted, the new page can access the original window's `window.opener` object, potentially navigating the original page to a malicious URL.
**Prevention:** Always include `rel="noopener noreferrer"` when using `target="_blank"` on external links. We should configure ESLint rules (like `react/jsx-no-target-blank`) to enforce this automatically.
