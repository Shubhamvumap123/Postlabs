## 2024-05-24 - Array Filtering Optimization in React Components
**Learning:** Complex array filtering logic in React components (like `TaskDashboard`) can cause unnecessary performance bottlenecks if recalculated on every render, especially when unrelated state (like opening a modal or typing in an input) changes.
**Action:** Use `useMemo` to cache the result of expensive array operations like `.filter()`, ensuring they only recalculate when their specific dependencies (e.g., `tasks`, `activeFilters`, `activeTab`) change.
