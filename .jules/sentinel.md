## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.
## 2026-04-14 - [Client-Side DoS via Unbounded Inputs]
**Vulnerability:** Unbounded inputs in React components combined with localStorage and uncontrolled state updates create a vector for client-side DoS and localStorage exhaustion.
**Learning:** Missing HTML `maxLength` attributes allow attackers to paste massive payloads into fields, causing excessive state allocations and crashing the browser tab, or exhausting the 5MB localStorage limit.
**Prevention:** Always explicitly set `maxLength` limits on all user-facing HTML `input` and `textarea` fields, regardless of backend validation, to enforce basic client-side sanitization and resource constraints.
