## 2026-03-29 - [Fix mobile navigation screen reader accessibility]
**Learning:** [Using `hidden sm:inline` in Tailwind completely removes the element from the accessibility tree on mobile. This makes navigation links with only icons visible impossible for screen readers to announce.]
**Action:** [Use `sr-only sm:not-sr-only sm:inline` instead. This hides the text visually on small screens but keeps it available for screen readers, restoring its display properties on larger screens.]
