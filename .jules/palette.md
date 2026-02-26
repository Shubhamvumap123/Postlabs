## 2024-05-22 - Context-Aware Empty States & Keyboard Visibility
**Learning:** Generic empty states in tabbed interfaces confuse users about whether the filter is working or if there is truly no data. Specific messages (e.g., 'No archived tasks') confirm the system state.
**Action:** Always map empty state messages to the active filter/tab context.

## 2024-05-22 - Keyboard Access for Hover Actions
**Learning:** UI patterns relying solely on `group-hover` to reveal actions (like delete buttons) exclude keyboard users.
**Action:** Always pair `group-hover:opacity-100` with `group-focus-within:opacity-100` for accessible disclosure.
