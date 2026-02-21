# Sentinel's Journal

## 2025-02-14 - DOM Manipulation Risks in React Hooks
**Vulnerability:** Found direct `innerHTML` usage in `useScrollAnimations.tsx` to split text into spans. This could allow XSS if user-controlled content ends up in elements with `.reveal-text` class.
**Learning:** Even in React, direct DOM manipulation hooks can introduce classic vulnerabilities like XSS if `innerHTML` is used instead of safe alternatives.
**Prevention:** Use `textContent` and `createElement` for DOM manipulation, or leverage React's rendering lifecycle instead of direct DOM manipulation where possible.
