## 2024-05-22 - Hover-Only Actions Accessibility
**Learning:** Actions hidden with `opacity-0` and only shown on `group-hover` are inaccessible to keyboard users because they can focus the element but cannot see it.
**Action:** Always include `group-focus-within:opacity-100` (or similar focus-visible logic) alongside hover effects to ensure controls are visible when focused via keyboard.
