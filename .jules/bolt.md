## 2024-05-24 - [Route-Based Code Splitting]
**Learning:** `React.lazy` and `Suspense` effectively reduce initial bundle size by splitting code into separate chunks for each route. Playwright's network interception (`page.route`) is crucial for verifying loading states by artificially delaying specific chunk requests.
**Action:** Always implement code splitting for top-level routes in `App.tsx` and verify the `Suspense` fallback using a network-throttled or intercepted Playwright test.
