## 2024-05-18 - Keyboard accessibility for hover-only actions
**Learning:** UI elements or buttons that appear exclusively on hover (e.g., via `group-hover:opacity-100`) become invisible and inaccessible to keyboard-only users navigating via 'Tab'.
**Action:** Always complement `group-hover` visibility classes with `focus-within:opacity-100` on the parent container, and ensure explicit `focus-visible:ring-2` styles on the nested interactive elements to provide a clear visual focus state.
