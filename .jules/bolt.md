## 2024-03-18 - TaskDashboard Re-render Bottleneck
**Learning:** The `TaskDashboard` component maintains fast-updating form state (`newTaskTitle` which updates on every keystroke) in the same component as the complex `tasks` array filtering logic. This architectural choice causes an O(N) array filter recalculation on every single keystroke.
**Action:** Always wrap derived list states (like `filteredTasks`) in `useMemo` when they share a component with fast-updating form inputs, preventing keystroke lag as the list grows.

## 2024-05-18 - HeroGlow React State mousemove Bottleneck
**Learning:** Using `useState` to track high-frequency events like `mousemove` causes continuous, excessive React component re-renders, stalling the main thread and janking animations.
**Action:** Use `useRef` to store mutable values and directly mutate the DOM element's style using `requestAnimationFrame` for high-frequency event tracking, bypassing React's render cycle entirely.
