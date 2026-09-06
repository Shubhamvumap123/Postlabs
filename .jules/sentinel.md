## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.
## 2024-05-18 - Prevent LocalStorage Denial of Service (DoS)
**Vulnerability:** The task creation form allowed storing an unbounded number of tasks with no length limits on the task title directly into `localStorage`.
**Learning:** In client-only applications where state is persisted entirely in `localStorage`, unbounded inputs can quickly exhaust the typical 5MB browser storage quota, crashing the application entirely when further writes fail.
**Prevention:** Always implement strict `maxLength` constraints on HTML inputs and explicitly enforce length and collection-size limits within the state manipulation handlers before persisting to `localStorage`.
