## 2024-03-18 - TaskDashboard Re-render Bottleneck
**Learning:** The `TaskDashboard` component maintains fast-updating form state (`newTaskTitle` which updates on every keystroke) in the same component as the complex `tasks` array filtering logic. This architectural choice causes an O(N) array filter recalculation on every single keystroke.
**Action:** Always wrap derived list states (like `filteredTasks`) in `useMemo` when they share a component with fast-updating form inputs, preventing keystroke lag as the list grows.

## 2024-05-18 - HeroGlow React State mousemove Bottleneck
**Learning:** Using `useState` to track high-frequency events like `mousemove` causes continuous, excessive React component re-renders, stalling the main thread and janking animations.
**Action:** Use `useRef` to store mutable values and directly mutate the DOM element's style using `requestAnimationFrame` for high-frequency event tracking, bypassing React's render cycle entirely.

## 2024-05-18 - Redundant IntersectionObserver Instances Bottleneck
**Learning:** Multiple components (`Hero`, `BuildingSection`, `VideoSection`) were instantiating their own `IntersectionObserver` instances to track the exact same `.animate-fade-up` elements, causing redundant DOM queries and overlap with the global observer defined in `useScrollAnimations.tsx`. This leads to unnecessary memory usage and overlapping callbacks triggering on the same elements.
**Action:** Centralize generic global class-based observers (like `.animate-fade-up`) in a single hook (`useScrollAnimations`) and remove redundant local component instantiations.

## 2024-05-18 - Unthrottled Scroll Event Listeners Bottleneck
**Learning:** Attaching unthrottled `scroll` event listeners that query layout properties (like `document.body.offsetHeight`) or trigger React state updates causes continuous synchronous reflows and excessive re-renders, stalling the main thread and severely reducing scrolling performance.
**Action:** Always wrap high-frequency scroll event handlers with `requestAnimationFrame` and add the `{ passive: true }` option to `addEventListener` to avoid blocking the browser's compositing thread and optimize rendering.

## 2024-05-18 - Inverted Image Loading Strategies Anti-Pattern
**Learning:** Found a systemic anti-pattern where critical above-the-fold images (Header logo, Hero down arrow) were intentionally deferred using `loading="lazy"`, actively delaying the Largest Contentful Paint (LCP) and worsening initial render times. Conversely, deeply nested below-the-fold images (e.g., in the Footer) were missing lazy loading entirely, bloating the initial payload.
**Action:** Always eagerly load above-the-fold critical images (use `fetchPriority="high"` where appropriate) and explicitly apply `loading="lazy"` to all below-the-fold images. Never apply `loading="lazy"` to LCP elements.
## 2024-05-18 - Memoizing Element Generation with CSS Driven State
**Learning:** To prevent main thread blocking and animation jank, explicitly memoize functions that generate large amounts of DOM elements using `useMemo`. Crucially, decouple dynamic state (like visibility toggles) from the memoized generation loop by relying on static data dependencies and controlling animations via parent CSS attribute selectors (e.g., `group-data-[visible=true]`) to prevent re-computation on state change.
**Action:** Use useMemo for generating large amounts of DOM elements and rely on parent CSS data-attributes for dynamic styling to prevent component re-renders and re-computations.
