## 2025-02-22 - Initial Bundle Bloat
**Learning:** The application was bundling all route components (`Dashboard`, `Settings`, etc.) into the main entry point, causing unnecessary code download on initial load.
**Action:** Implemented route-based code splitting using `React.lazy` and `Suspense` to separate page logic into distinct chunks.
