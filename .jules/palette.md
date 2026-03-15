## 2024-05-20 - Custom Dialog Accessibility
**Learning:** Custom dialog components (like `framer-motion` modals) without `role="dialog"`, `aria-modal="true"`, dynamic `aria-labelledby`, and a global `Escape` key listener are completely inaccessible to screen readers and keyboard navigation.
**Action:** When building custom modals, always assign ARIA roles, link IDs dynamically using `React.useId()`, attach `Escape` key listeners to `document`, and ensure the close button has `aria-label` and `focus-visible` styles.
