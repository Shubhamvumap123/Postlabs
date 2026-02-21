## 2025-02-23 - Keyboard Accessibility for Hover Actions
**Learning:** UX elements revealed only on hover (e.g., `opacity-0 group-hover:opacity-100`) are inaccessible to keyboard users.
**Action:** Always pair `group-hover:opacity-100` with `group-focus-within:opacity-100` (or similar focus utilities) to ensuring action buttons become visible when a user tabs into the parent container.

## 2025-02-23 - Context-Aware Empty States
**Learning:** Generic empty states (e.g., "No items") confuse users when filters or tabs are active.
**Action:** Implement dynamic empty state logic that reflects the current context (e.g., "No completed tasks" vs "No tasks matching filter") to provide clarity and confirm system status.
