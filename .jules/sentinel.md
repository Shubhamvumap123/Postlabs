## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2026-08-15 - Insecure Deserialization in LocalStorage State
**Vulnerability:** The application trusted `localStorage` contents in `TaskDashboard.tsx` and parsed it directly into a state array without structural validation, which could lead to `TypeError` crashes (DoS) if tampered with.
**Learning:** Client-side storage is entirely user-controllable. Failing to validate the structure of deserialized data before invoking array-specific methods (like `.map()`) creates a client-side denial-of-service vector.
**Prevention:** Always structurally validate data loaded from `localStorage` (e.g., using `Array.isArray()` for expected lists) before relying on its type, treating client-side storage with the same suspicion as external user input.
