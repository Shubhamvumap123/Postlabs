## 2025-03-16 - Prevent DOM XSS in React Hooks with direct DOM manipulation
**Vulnerability:** The `useScrollAnimations` hook was splitting element text and using `.innerHTML` to inject span tags around words, creating a DOM-based XSS vulnerability if the element content was user-controlled.
**Learning:** React's built-in XSS protection doesn't apply when custom hooks directly manipulate the DOM using vanilla JS methods like `.innerHTML` or `.insertAdjacentHTML`.
**Prevention:** Avoid `.innerHTML` entirely when constructing DOM elements in hooks. Use `document.createElement()` and assign content using `.textContent`, then `.appendChild()`, even if it makes the code slightly more verbose.
