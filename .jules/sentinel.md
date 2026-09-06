## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2024-04-24 - Missing Input Length Limits
**Vulnerability:** Missing input length limits on user-facing forms allow unbounded state and localStorage growth.
**Learning:** React state and localStorage (e.g., in TaskDashboard and Settings) can grow unbounded if input sizes are not restricted, leading to potential client-side DoS or storage quota exhaustion.
**Prevention:** Always apply reasonable maxLength attributes to all input and textarea elements rendering user-facing forms.
