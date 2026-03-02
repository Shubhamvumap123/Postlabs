import { test, expect } from '@playwright/test';

test.describe('Footer Security Verification', () => {
  test('should not make a client-side API call to Mailchimp on newsletter submission', async ({ page }) => {
    // Variable to track if a Mailchimp API call was made
    let madeMailchimpCall = false;

    // Listen to all network requests
    page.on('request', request => {
      if (request.url().includes('api.mailchimp.com')) {
        madeMailchimpCall = true;
      }
    });

    // Handle the expected alert dialog (simulated success)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Thanks for signing up');
      await dialog.accept();
    });

    // Navigate to a page with the footer (e.g., the home page)
    await page.goto('/');

    // Scroll to the bottom to trigger footer visibility if needed
    await page.evaluate(() => globalThis.scrollTo(0, document.body.scrollHeight));

    // Wait for the footer to be visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Fill in the newsletter email input
    const emailInput = page.getByPlaceholder('Email Address');
    await emailInput.fill('test@example.com');

    // Submit the form
    const submitButton = page.locator('button[type="submit"]').filter({ hasText: '→' });
    await submitButton.click();

    // Wait a short time to allow any potential network requests to fire
    await page.waitForTimeout(2000);

    // Verify that the email input is cleared (as it happens in Demo Mode success)
    await expect(emailInput).toHaveValue('');

    // Explicitly check that no Mailchimp request was made
    expect(madeMailchimpCall).toBe(false);
  });
});
