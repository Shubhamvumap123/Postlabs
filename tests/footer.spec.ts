import { test, expect } from '@playwright/test';

test.describe('Footer Security and Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Footer external links should have rel="noopener noreferrer"', async ({ page }) => {
    // Scroll to bottom to ensure footer is rendered/visible (though DOM might be there)
    await page.evaluate(() => globalThis.scrollTo(0, document.body.scrollHeight));

    // Wait for opacity transition
    await expect(page.locator('footer')).toHaveCSS('opacity', '1');

    const hrvstLink = page.locator('footer a[href="https://gohrvst.com"]');

    // Check for target="_blank"
    await expect(hrvstLink).toHaveAttribute('target', '_blank');

    // This assertion is expected to FAIL initially, then PASS after fix
    // I will comment it out or expect it to fail if I wanted TDD, but for this workflow
    // I will write the test to verify the FINAL state.
    // For now, I'll check if it exists, and then after fix I'll check the attribute.
    // Actually, I can use a soft assertion or just write the test for the desired state.

    // Checking for the desired state (this will fail now)
    await expect(hrvstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('Newsletter form should be in Demo Mode and not expose secrets', async ({ page }) => {
    await page.evaluate(() => globalThis.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('footer')).toHaveCSS('opacity', '1');

    const emailInput = page.locator('footer input[name="email"]');
    const submitButton = page.locator('footer button[type="submit"]');

    await emailInput.fill('security-test@example.com');

    // In the new implementation, we expect a toast, not an alert.
    // But currently it uses alert.
    // I will update this test to expect the toast AFTER I apply the fix.
    // For now, I will write the test assuming the FIX is applied (TDD style).

    // If I run this now, it will fail. That's fine.
    await submitButton.click();

    // Expect success toast (assuming we switch to sonner)
    await expect(page.getByText("Subscribed to newsletter (Demo)")).toBeVisible();

    // Ensure form is reset
    await expect(emailInput).toHaveValue('');
  });
});
