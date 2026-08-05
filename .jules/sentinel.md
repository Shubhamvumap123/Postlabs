## 2024-05-18 - XSS Vulnerability in Custom Scroll Animation Hook
**Vulnerability:** A DOM-based Cross-Site Scripting (XSS) vulnerability was found in `useScrollAnimations.tsx` where text was dynamically split and directly assigned using `element.innerHTML`.
**Learning:** `element.innerHTML` assignment bypasses React's default XSS escaping mechanism. While it was extracting text from `innerText`, any previously injected scripts or user-controlled content in the DOM could be parsed and executed when re-assigned using `innerHTML`. This issue bypasses the React DOM and opens up XSS vectors through animation effects.
**Prevention:** Avoid `element.innerHTML` assignment for manipulating DOM nodes inside custom React hooks. Use native DOM API `document.createElement`, set properties safely with `.textContent`, and `element.appendChild()`, or structure the markup safely using React state and JSX.

## 2026-08-05 - Prevent XSS in inline style injections
**Vulnerability:** Use of `innerHTML` to set `<style>` content.
**Learning:** While static strings in `innerHTML` aren't immediately exploitable, relying on `innerHTML` creates a bad habit and fails automated security scans. `textContent` is safer for injecting text/CSS.
**Prevention:** Always use `textContent` when programmatically creating and appending `<style>` elements or other text nodes.
