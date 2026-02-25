## 2024-05-23 - Lazy Loading Videos with Framer Motion

**Learning:** When using `framer-motion`'s `useInView` for lazy loading videos, combine it with `preload="none"` and remove `autoPlay`. Use a `useEffect` to trigger `play()`/`pause()` based on visibility. A margin (e.g., "200px") ensures the video starts playing just before it enters the viewport.

**Action:** Apply this pattern to other heavy media components (like `VideoSection.tsx`) to improve initial load performance.
