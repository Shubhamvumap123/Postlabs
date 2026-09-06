## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2024-05-18 - Missing Structural Validation for LocalStorage Arrays
**Vulnerability:** When parsing arrays from `localStorage`, failing to structurally validate the type (e.g., assuming it is an array) creates a denial of service (DoS) vector. If an attacker or corrupted state injects a non-array JSON object, array methods like `.map` or `.filter` will throw a `TypeError`, crashing the component.
**Learning:** React state initialized from `localStorage` must not blindly trust the parsed JSON. Type coercion alone is insufficient; explicit structural checks are required for critical data shapes.
**Prevention:** Always validate the structure of parsed `localStorage` data before assigning it to state, especially for lists. Use `Array.isArray(parsed)` to ensure the data matches the expected type before mapping over it.
