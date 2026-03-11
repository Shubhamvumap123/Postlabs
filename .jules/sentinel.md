## 2025-03-11 - DOM-based XSS vulnerability with innerHTML in animations
**Vulnerability:** Found a DOM-based XSS vulnerability in `src/hooks/useScrollAnimations.tsx` where `element.innerHTML` was being assigned using string interpolation with unsanitized text from `element.innerText`.
**Learning:** Animations often split text and wrap it in tags (like `<span>`), but doing this with string concatenation and `innerHTML` can execute malicious scripts if the source text contains untrusted input.
**Prevention:** Avoid `innerHTML` entirely for dynamically constructed content. Use native DOM methods like `document.createElement()`, assign properties natively (`.className`, `.style`), and set text using `.textContent`.
