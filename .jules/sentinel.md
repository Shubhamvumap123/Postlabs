## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2026-08-21 - Prevent runtime crashes from malformed localStorage data
**Vulnerability:** The `TaskDashboard` component blindly trusted the `tasks` key from `localStorage`, parsing it and directly setting state. If this key was manipulated to contain a non-array JSON object, array methods used in the UI would cause unhandled `TypeError` runtime crashes.
**Learning:** Client-side storage (`localStorage`/`sessionStorage`) should be treated as untrusted input. While React protects against direct XSS when rendering strings, assuming the structural type of stored data can lead to Application-level DoS (crashing the component tree).
**Prevention:** Always perform structural validation (e.g., `Array.isArray()`) on data parsed from client-side storage before passing it into state that assumes specific data types.
