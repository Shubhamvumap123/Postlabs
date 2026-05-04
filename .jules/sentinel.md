## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.
## 2024-05-18 - Missing Input Length Limits
**Vulnerability:** User inputs lacked length restrictions (maxLength), allowing potential DoS attacks via excessively large payloads and uncontrolled resource consumption in localStorage.
**Learning:** Default HTML and custom UI components do not inherently restrict input length. This must be explicitly defined to prevent resource exhaustion and data bloat.
**Prevention:** Always define reasonable `maxLength` attributes on text inputs and textareas based on their expected data size.
