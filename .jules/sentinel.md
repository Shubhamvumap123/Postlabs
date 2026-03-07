## 2024-05-18 - [Fix DOM-based XSS in scroll animations]
**Vulnerability:** The `useScrollAnimations` hook was vulnerable to DOM-based XSS because it read `innerText` from elements and injected it directly into `element.innerHTML` without sanitization.
**Learning:** Even when reading from the DOM (e.g. `innerText`), user-provided or dynamically loaded content can be manipulated and cause XSS when re-injected as raw HTML.
**Prevention:** Always sanitize any dynamic or user-supplied text before using `innerHTML`, or prefer using safe DOM manipulation methods like `textContent` or `document.createElement`.
