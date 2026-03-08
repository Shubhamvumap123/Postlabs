## 2024-05-20 - Ensure focus visibility for hover-only actions
**Learning:** UI elements or buttons that appear exclusively on hover (e.g., via `group-hover:opacity-100`) must also include focus-visible styles (such as `focus-within:opacity-100` on the container and `focus-visible:ring-2` on the elements) to ensure keyboard accessibility and visual focus states.
**Action:** When using `group-hover:opacity-100` to hide secondary actions, always add `focus-within:opacity-100` to the container and proper focus rings to the interactive elements to support keyboard users.
