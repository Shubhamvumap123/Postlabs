## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2024-03-25 - Local Storage Exhaustion DoS Vulnerability
**Vulnerability:** Unbounded inputs and unlimited item accumulation in `localStorage` in `TaskDashboard.tsx`.
**Learning:** React state that synchronizes with `localStorage` without enforcing input bounds (`maxLength`) or collection size constraints can be exploited to exhaust browser storage, leading to a client-side Denial of Service (DoS).
**Prevention:** Always enforce strict length limits on user inputs (e.g., `maxLength={100}`) and cap the maximum size of collections (e.g., `.slice(0, 100)`) before persisting them to `localStorage`.
