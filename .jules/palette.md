## 2024-05-18 - Ensure hover-only elements are accessible via keyboard focus
**Learning:** Elements that rely solely on `group-hover:opacity-100` for visibility become completely invisible to keyboard users navigating via `Tab`.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on the container, and add explicit visual focus indicators (like `focus-visible:ring-2`) to the interactive elements themselves to ensure keyboard accessibility.
