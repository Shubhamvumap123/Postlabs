## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2026-08-28 - Validate Local Storage Data Structure
**Vulnerability:** Application crashes (client-side DoS) when `localStorage` contains invalid structural data types (e.g. object instead of array).
**Learning:** `JSON.parse` returns whatever structure is stored. If an array is expected and `Array.map` or `Array.filter` are used later, it will result in an unhandled `TypeError` crash if the parsed type is different.
**Prevention:** Always structurally validate data loaded from `localStorage` (e.g., using `Array.isArray()`) before setting component state.
