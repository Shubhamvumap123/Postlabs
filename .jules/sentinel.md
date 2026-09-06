## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2026-08-19 - DOM-based XSS via innerHTML and Unvalidated localStorage state
**Vulnerability:** DOM-based XSS via `innerHTML` in Footer, and lack of structural validation for `localStorage` state in TaskDashboard.
**Learning:** In React applications, assigning to `element.innerHTML` bypasses React's XSS escaping and opens up a vector if the injected string becomes dynamic. Additionally, `localStorage` data should not be trusted to always match the expected type; blind `JSON.parse()` without structural validation (e.g. `Array.isArray()`) can lead to runtime `TypeError` crashes if array methods are later invoked on the state.
**Prevention:** Avoid `element.innerHTML` and strictly use safe alternatives like `textContent` or `createElement()` for DOM manipulation. Always structurally validate state loaded from `localStorage` before using it in the component.
