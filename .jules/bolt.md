## 2024-03-01 - Route-based Code Splitting
**Learning:** The application was bundling all route components (`Dashboard`, `Contact`, `Settings`, `Index`) into a single large chunk (~572kB) because of static imports in `App.tsx`.
**Action:** Use `React.lazy` and `Suspense` for all top-level routes to ensure the initial load only fetches what is necessary.
