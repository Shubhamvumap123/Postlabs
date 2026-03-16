## 2024-05-24 - TaskDashboard Filtering Optimization
**Learning:** Complex array filtering logic (`filteredTasks`) inside a React component runs on every render unless memoized, which can be a performance bottleneck for large task lists.
**Action:** Use `useMemo` to wrap the filtering logic so that the expensive calculation only re-runs when its dependencies (`tasks`, `activeFilters`, `activeTab`) change.
