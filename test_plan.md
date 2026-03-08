1. Fix Reverse Tabnabbing Vulnerabilities
   - Add `rel="noopener noreferrer"` to external links opening with `target="_blank"` in `src/components/Footer.tsx`.
   - Update `src/components/FeatureCards.tsx` similarly if missing `noopener`. (It has `noreferrer` but we should add `noopener`).
2. Fix DOM XSS via `innerHTML` in `src/hooks/useScrollAnimations.tsx`
   - Add a simple HTML escaping utility function.
   - Use the escaping function before putting `word` into the span's HTML string.
3. Pre-commit instructions
   - Run tests and linting.
4. Submit PR
