## 2024-05-18 - Making Custom Modals Accessible
**Learning:** Custom modal components (like `Dialog.tsx`) must explicitly implement ARIA roles (`role="dialog"`, `aria-modal="true"`), map titles and descriptions using unique IDs (like React's `useId()`) for `aria-labelledby` and `aria-describedby`, and provide global keyboard handling to close on the `Escape` key.
**Action:** When building or auditing custom modal components, always verify that ARIA attributes are set correctly, that dynamic content is linked via generated IDs, and that `Escape` key global listener functionality is present.
