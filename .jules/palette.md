## 2025-02-19 - Keyboard Navigation for Custom Tabs
**Learning:** Custom tab implementations often miss standard keyboard navigation (Arrow keys). While `role="tab"` identifies them to screen readers, it doesn't automatically add the expected interaction behavior.
**Action:** Always verify custom tab components with arrow keys. Use `useRef` to manage focus programmatically when implementing WAI-ARIA tab patterns manually.
