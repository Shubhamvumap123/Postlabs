## 2024-05-18 - Keyboard accessibility for hover-only actions
**Learning:** UI elements or buttons that appear exclusively on hover (e.g., via `group-hover:opacity-100`) must also include focus-visible styles (such as `focus-within:opacity-100` and `focus-visible:ring-2`) to ensure keyboard accessibility and visual focus states.
**Action:** Always add `focus-within:opacity-100` and explicit `focus-visible:ring-2` to hover-only actions to ensure they are accessible via keyboard navigation.
