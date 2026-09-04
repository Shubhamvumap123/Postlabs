## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2024-09-04 - Insecure Deserialization / Type Confusion in Local Storage
**Vulnerability:** Untrusted data fetched from `localStorage` was parsed via `JSON.parse` and assumed to be an array without structural validation, which could crash the application during array operations if a different type was injected.
**Learning:** Malicious or malformed data in `localStorage` can lead to Application Denial of Service (DoS) due to type confusion. We must validate the type and structure of parsed JSON data before use.
**Prevention:** Always structurally validate data retrieved from `localStorage` (e.g., using `Array.isArray()`) to ensure it matches the expected type before setting state.
