## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2025-03-26 - Local Storage Exhaustion (Client-Side DoS)
**Vulnerability:** A lack of strict collection-size limits and input character limits allowed local storage state (`TaskDashboard` items) to grow boundlessly, posing a risk of client-side Denial of Service due to `localStorage` space exhaustion.
**Learning:** Even though state is isolated client-side, unlimited growth in `localStorage` operations or string lengths can exhaust the available 5MB limit, throwing quota exceeded errors and preventing the app from functioning correctly for the user.
**Prevention:** Implement strict length limits on user text inputs (e.g., `maxLength`) and restrict the overall size of persistent collections (e.g., max 100 items), displaying explicit error messages rather than silently failing.
