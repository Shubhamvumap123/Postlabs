# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: footer.spec.ts >> Footer newsletter subscription (demo mode)
- Location: tests/footer.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('footer')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('footer')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('Footer newsletter subscription (demo mode)', async ({ page }) => {
  4  |   // 1. Go to the homepage
  5  |   await page.goto('/');
  6  |
  7  |   // 2. Scroll to the bottom to reveal the footer
  8  |   // The footer in this app is revealed only when the user scrolls near the bottom
  9  |   // Using globalThis instead of window to satisfy Deno linter in CI, although in browser context they are the same here.
  10 |   // Wait for the page to load
  11 |   await page.waitForLoadState('networkidle');
  12 |
  13 |   await page.evaluate(() => {
  14 |     globalThis.scrollTo(0, document.body.scrollHeight);
  15 |     // Dispatch scroll event manually just in case
  16 |     globalThis.dispatchEvent(new Event('scroll'));
  17 |   });
  18 |
  19 |   // 3. Wait for the footer to become visible (it has a transition)
  20 |   const footer = page.locator('footer');
> 21 |   await expect(footer).toBeVisible({ timeout: 10000 });
     |                        ^ Error: expect(locator).toBeVisible() failed
  22 |
  23 |   // Wait for the opacity transition to complete
  24 |   await expect(footer).toHaveClass(/opacity-100/);
  25 |
  26 |   // 4. Fill in the email
  27 |   const emailInput = footer.locator('input[type="email"]');
  28 |   await emailInput.fill('test@example.com');
  29 |
  30 |   // 5. Submit the form
  31 |   const submitButton = footer.locator('button[type="submit"]');
  32 |   await submitButton.click();
  33 |
  34 |   // 6. Verify success message (we are moving to sonner toast, so we check for that)
  35 |   // Note: The original code used alert(), but we are changing it to a toast.
  36 |   // We'll check for the text "Thanks for signing up" which should appear in the toast.
  37 |   const toast = page.getByText('Thanks for signing up');
  38 |   await expect(toast).toBeVisible();
  39 | });
  40 |
```