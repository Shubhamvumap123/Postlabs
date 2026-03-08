1. **Remove Client-side Mailchimp API Call (Critical Security Fix)**
   - The `Footer.tsx` component contains a live `fetch` call to the Mailchimp API, complete with placeholders for API keys (`YOUR_API_KEY`, `YOUR_LIST_ID`).
   - Client-side API calls to services requiring private keys are critical vulnerabilities.
   - Per the instructions: "The Footer component must implement a simulated 'Demo Mode' for newsletter subscriptions to avoid exposing API keys on the client side. Any live client-side fetch calls to Mailchimp using placeholder or real API keys are critical vulnerabilities that must be removed."
   - Replace the `fetch` logic in `handleSubmit` with a simulated delay and an alert/toast indicating "Demo mode: Thanks for signing up", removing the URL, API keys, and fetch block entirely.

2. **Fix Reverse Tabnabbing Vulnerabilities (High)**
   - Add `rel="noopener noreferrer"` to the `target="_blank"` link in `src/components/Footer.tsx`.
   - Update the `target="_blank"` link in `src/components/FeatureCards.tsx` to include `noopener` (it currently only has `noreferrer`).

3. **Pre-commit Steps**
   - Run the full test suite (`pnpm test`), lint (`pnpm lint`), and format checks (`pnpm format` or via `lint` if format isn't available) as instructed in pre_commit_instructions to ensure quality, security, and verification.

4. **Submit**
   - Submit the PR with standard title "🛡️ Sentinel: [CRITICAL] Fix client-side API key exposure and reverse tabnabbing".
