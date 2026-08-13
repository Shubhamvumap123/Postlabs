## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## [Insecure LocalStorage Deserialization]
**Vulnerability:** Untrusted LocalStorage data was directly parsed into React state without structure validation.
**Learning:** Blindly trusting LocalStorage data for React state initialization is a critical vulnerability pattern in this SPA. If the stored data structure is manipulated (e.g., to an object instead of an array), array methods like `.filter` or `.map` will throw a TypeError, causing a complete application crash.
**Prevention:** Always validate untrusted LocalStorage data structure (e.g., using `Array.isArray`) before parsing it into state.
