import { test, expect } from '@playwright/test';

test.describe('Footer Subscription', () => {
  test('should allow user to subscribe with email (simulation)', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');

    // Scroll to bottom to ensure footer is visible (due to scroll-triggered visibility)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for opacity transition
    const footer = page.locator('footer');
    await expect(footer).toHaveClass(/opacity-100/);

    // Locate email input and fill it
    const emailInput = page.locator('footer input[name="email"]');
    await emailInput.fill('test@example.com');

    // Submit the form
    const submitButton = page.locator('footer button[type="submit"]');
    await submitButton.click();

    // Verify success toast appears
    // Sonner toasts usually appear in a list with role='status' or similar, but text matching is easiest
    await expect(page.getByText('Thanks for signing up, test@example.com! (Demo Mode)')).toBeVisible({ timeout: 10000 });
  });
});
