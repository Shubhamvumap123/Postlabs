import { test, expect } from '@playwright/test';

test('Footer newsletter subscription (demo mode)', async ({ page }) => {
  // 1. Go to the homepage
  await page.goto('/');

  // 2. Scroll to the bottom to reveal the footer
  // The footer in this app is revealed only when the user scrolls near the bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 3. Wait for the footer to become visible (it has a transition)
  const footer = page.locator('footer');
  await expect(footer).toBeVisible({ timeout: 10000 });
  await expect(footer).toHaveClass(/opacity-100/);

  // 4. Fill in the email
  const emailInput = footer.locator('input[type="email"]');
  await emailInput.fill('test@example.com');

  // 5. Submit the form
  const submitButton = footer.locator('button[type="submit"]');
  await submitButton.click();

  // 6. Verify success message (we are moving to sonner toast, so we check for that)
  // Note: The original code used alert(), but we are changing it to a toast.
  // We'll check for the text "Thanks for signing up" which should appear in the toast.
  const toast = page.getByText('Thanks for signing up');
  await expect(toast).toBeVisible();
});
