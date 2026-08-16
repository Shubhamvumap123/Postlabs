## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2026-08-16 - Structural Validation for Local Storage
**Vulnerability:** Unvalidated JSON deserialization from localStorage could lead to runtime TypeError crashes (Denial of Service) if the parsed data is not an array.
**Learning:** Client-side storage is an untrusted data source. Deserialized data must be structurally validated before being used in operations like `.map()` or `.filter()`.
**Prevention:** Always use structural validation (e.g., `Array.isArray()`) when hydrating state from localStorage or other client-side storage mechanisms.
