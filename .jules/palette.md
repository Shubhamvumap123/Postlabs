## 2026-05-03 - Prevent Visual Jumping in Async Buttons
**Learning:** When adding loading states to buttons, replacing text with a spinner can cause the button to resize, resulting in visual jumping that degrades the UX.
**Action:** Always maintain button dimensions by rendering the original text with `opacity-0` and absolutely positioning the loading spinner (`Loader2`) and text over it. Disable all related form inputs during async operations to prevent duplicate submissions.
