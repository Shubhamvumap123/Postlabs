## 2026-02-21 - Route-based Code Splitting
**Learning:** `React.lazy` and `Suspense` are highly effective for reducing initial bundle size in single-page applications with multiple routes.
**Action:** Always check `App.tsx` or the main router configuration for direct imports of page components. If found, refactor to lazy loading to improve TTI (Time to Interactive). Ensure a loading fallback is provided to prevent a blank screen during navigation.
