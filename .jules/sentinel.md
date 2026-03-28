## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2025-02-27 - Local Storage Exhaustion/DoS Vulnerability
**Vulnerability:** A Denial of Service (DoS) vulnerability was found in `TaskDashboard.tsx` where users could input unbounded task titles and create an infinite number of tasks, eventually exhausting `localStorage` limits.
**Learning:** `localStorage` has a strict storage limit (typically ~5MB). When persisting application state or user content without bounds, malicious or unintentional massive inputs can exhaust this quota, causing save failures, data loss, or application crashes upon reload.
**Prevention:** Always enforce strict length limits on inputs (`maxLength`) and size bounds on collections (e.g., max 100 items) both in the UI and state management logic before persisting to `localStorage`. Reject invalid actions rather than silently truncating data to prevent data loss.
