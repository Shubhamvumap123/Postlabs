## 2025-02-21 - Route-Based Code Splitting Opportunity
**Learning:** The application was using static imports for all route components in `App.tsx`, forcing the entire application to load in a single bundle.
**Action:** Always check `App.tsx` or router configuration for static imports. Use `React.lazy` and `Suspense` to split code by route, significantly reducing initial load time.
