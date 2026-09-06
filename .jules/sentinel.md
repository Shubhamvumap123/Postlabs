## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.
## 2026-04-21 - Unbounded Input Lengths Risk
**Vulnerability:** Missing maxLength restrictions on user inputs, allowing unbounded state/localStorage growth which can lead to client-side DoS or breaking storage limits.
**Learning:** In a client-heavy app, unbounded fields aren't just an API problem; they can crash the browser tab or hit the 5MB localStorage limit very quickly if malicious long strings are copy-pasted.
**Prevention:** Always enforce appropriate maxLength constraints on all user-facing HTML input and textarea fields, especially when those fields back local state or localStorage.
