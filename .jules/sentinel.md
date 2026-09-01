## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.
## 2026-09-01 - DOM-based XSS via style.innerHTML
**Vulnerability:** Using element.innerHTML for style injection in React useEffect hooks.
**Learning:** React escapes content by default, but manually creating DOM elements and setting innerHTML bypasses this protection, introducing XSS risks even for non-dynamic content as a bad practice.
**Prevention:** Always use element.textContent or safe React APIs for injecting styles and dynamic content.
