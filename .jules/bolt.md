
## 2024-05-15 - [Added code splitting for routes]
**Learning:** The application was bundling all routes together into a large initial payload (> 500kB), causing an impact to load time. Vite chunk limits trigger warnings for bundles > 500kB. Code splitting is needed.
**Action:** Implemented React.lazy and Suspense for all page-level routes in `src/App.tsx`. Created `LoadingFallback.tsx` to handle route loading states. This split the bundle into smaller, page-specific chunks, reducing the initial load time.
