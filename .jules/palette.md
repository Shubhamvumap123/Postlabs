## 2024-05-23 - Verifying Default States in Tests
**Learning:** When testing stateful components with Playwright, always verify the initial/default state before interacting with the component. This acts as a sanity check and ensures that any subsequent state changes are actually happening.
**Action:** Add default state verification (e.g., empty state for default tab) to tests before triggering interactions.
