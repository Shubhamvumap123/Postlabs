## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2024-05-18 - LocalStorage Denial of Service in Task Dashboard
**Vulnerability:** A client-side Denial of Service (DoS) and potential local storage exhaustion vulnerability was found in `TaskDashboard.tsx` where users could add unlimited tasks and task titles with unlimited length, which are persisted to `localStorage`.
**Learning:** Persisting unbounded user input to `localStorage` without enforcing collection-size limits or individual entry length constraints can lead to local storage quota exhaustion, breaking application functionality for the user.
**Prevention:** Enforce strict collection-size limits (e.g., maximum 100 items) and string length limits (e.g., `maxLength={200}`) on user inputs both at the HTML level and within the application state manipulation logic before persisting to `localStorage`.
