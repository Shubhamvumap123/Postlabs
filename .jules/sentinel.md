## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2026-08-23 - Structurally Validate localStorage Data
**Vulnerability:** Loading list data from localStorage without structural validation (e.g., checking if it's an array).
**Learning:** Malicious or malformed data in localStorage can cause runtime TypeError crashes (e.g., when calling .map or .filter) if the application blindly trusts the stored structure after JSON.parse(). Client-side storage must be treated as untrusted input.
**Prevention:** Always validate the structure of parsed data from localStorage (e.g., using Array.isArray() for arrays or schema validation like Zod for complex objects) before using it in application state.
