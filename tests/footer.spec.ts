import { test, expect } from '@playwright/test';

test.describe('Footer Security', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('External links should have rel="noopener noreferrer"', async ({ page }) => {
    // Wait for footer to be visible (it has a scroll listener, so we might need to scroll down)
    // deno-lint-ignore no-window
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // The "Designed by HRVST" link
    const hrvstLink = page.getByText('HRVST');
    await expect(hrvstLink).toBeVisible();

    // Check for target="_blank"
    await expect(hrvstLink).toHaveAttribute('target', '_blank');

    // Check for rel="noopener noreferrer" (or at least "noopener")
    // Note: modern browsers imply noopener for target=_blank, but explicit is better for older browsers and clarity.
    // The fix should add it.
    await expect(hrvstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('Newsletter subscription should not expose real API keys', async ({ page }) => {
    // deno-lint-ignore no-window
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toBeVisible();

    await emailInput.fill('test@example.com');

    // Setup dialog handler to accept alerts
    page.on('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });

    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // We expect a success message in demo mode, not a network failure
    // The original code would alert "Something went wrong" or fail network.
    // The fixed code should alert "Thanks for signing up" (simulated).
    // But since this test runs *before* the fix, it might fail if we assert the new behavior.
    // So for now, I will just assert the input is there.
    // I will update this test to be more specific after the fix if needed,
    // or I can write it to expect the *fixed* behavior and it will fail now (TDD).

    // TDD approach: Expect the fixed behavior (simulated success).
    // However, since I can't easily capture the alert text in a persistent way to assert on it later without a complex setup,
    // checking that no network request to "YOUR_DC.api.mailchimp.com" is made would be good.

    const requestPromise = page.waitForRequest(req => req.url().includes('api.mailchimp.com'), { timeout: 1000 }).catch(() => null);

    // If requestPromise resolves to a request, it means the bad code ran.
    // If it times out (returns null), it means no request was made (Good).

    const request = await requestPromise;
    expect(request).toBeNull();
  });
});
