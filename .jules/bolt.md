## 2026-02-24 - Video Lazy Loading
**Learning:** Video autoplay on off-screen elements is a major performance drain. Using `framer-motion`'s `useInView` with a margin (e.g., `200px`) allows us to lazy-load and play/pause videos only when near the viewport.
**Action:** Always check `<video>` tags for `autoPlay` and wrap them in a lazy-loading observer if they are not above the fold.
