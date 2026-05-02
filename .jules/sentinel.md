## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2025-02-23 - Add Input Length Limits (Defense in Depth)
**Vulnerability:** Missing input length limits on all form fields across the application (Contact, Settings, Task Dashboard, Newsletter), allowing unbounded text entry.
**Learning:** Frontend forms often rely solely on backend validation (which doesn't exist here) or omit length limits entirely, which can lead to UI freezing, unbounded localStorage usage, or denial of service through excessively large payloads.
**Prevention:** Always define reasonable `maxLength` constraints directly on HTML input and textarea elements as a first layer of defense, even if the backend also validates length.
