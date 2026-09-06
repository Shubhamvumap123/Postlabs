## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.
## 2024-05-18 - Missing Input Length Limits
**Vulnerability:** User-facing input fields and textareas lacked `maxLength` attributes, allowing unbounded text input.
**Learning:** Unbounded inputs can lead to client-side Denial of Service (DoS) by freezing the browser when attempting to render or process excessively large strings. They also contribute to unbounded state growth in React and `localStorage`.
**Prevention:** Always set reasonable `maxLength` attributes on user-facing HTML `input` and `textarea` elements.
