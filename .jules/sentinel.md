## 2025-03-17 - DOM-based XSS in Scroll Animations
**Vulnerability:** DOM-based Cross-Site Scripting (XSS) vulnerability found in `src/hooks/useScrollAnimations.tsx`. The code read an element's text using `innerText` and immediately concatenated it into a raw string wrapped in `<span>` tags, which was then directly assigned to `element.innerHTML`.
**Learning:** Even simple UI logic for text animation can introduce DOM XSS if it directly interpolates an element's text into an HTML string and uses `innerHTML`.
**Prevention:** Avoid `innerHTML` whenever possible. Use safe DOM manipulation APIs like `document.createElement`, `element.appendChild`, and `element.textContent` when reading and rewriting DOM elements to ensure any text is securely encoded.
