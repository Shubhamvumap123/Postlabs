# Bolt's Journal

## 2024-05-22 - Route-based Code Splitting in Vite
**Learning:** Initial bundle size was ~550KB. Implementing `React.lazy` for top-level routes reduced the main entry chunk to ~376KB (31% reduction).
**Action:** Always check `App.tsx` for synchronous page imports as a primary optimization target.
