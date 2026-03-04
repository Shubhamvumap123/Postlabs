## 2024-05-28 - Keyboard Focus for Hover-Revealed Elements
**Learning:** Elements that rely on `group-hover:opacity-100` for visibility are completely invisible to keyboard users when focused unless the container also includes `focus-within:opacity-100`.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the container, and ensure the interactive elements inside have explicitly defined `focus-visible` styles (e.g., `focus-visible:ring-2`).
