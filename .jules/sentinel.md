## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.
## 2026-04-22 - Missing Input Length Limits
**Vulnerability:** Multiple user-facing input and textarea fields across the application lacked maxLength constraints, creating a risk for unbounded state growth and client-side Denial of Service (DoS) through excessive localStorage usage.
**Learning:** React state and localStorage can be easily overwhelmed by excessively large inputs if length boundaries are not strictly defined at the presentation layer.
**Prevention:** Always enforce appropriate maxLength attributes on all user-facing form inputs and textareas to constrain input size before it reaches application state or storage.
