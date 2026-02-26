import { test, expect } from '@playwright/test';

test('Footer newsletter subscription security check', async ({ page }) => {
  // Go to the home page
  await page.goto('/');

  // Scroll to the bottom to make the footer visible
  // We need to wait for the scroll event to trigger the opacity change
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Wait for the footer to become visible (opacity transition)
  const footer = page.locator('footer');
  // It starts with opacity-0 and changes to opacity-100
  await expect(footer).toHaveClass(/opacity-100/);

  // Find the email input and submit button
  const emailInput = page.locator('footer input[type="email"]');
  const submitButton = page.locator('footer button[type="submit"]');

  await expect(emailInput).toBeVisible();
  await expect(submitButton).toBeVisible();

  // Monitor network requests to ensure NO request is made to Mailchimp
  let mailchimpRequestMade = false;
  await page.route('**/*mailchimp.com*', route => {
    mailchimpRequestMade = true;
    console.log('Intercepted Mailchimp request');
    route.abort();
  });

  // Fill in a test email
  await emailInput.fill('security-test@example.com');

  // Click submit
  await submitButton.click();

  // Verify success toast appears
  // Note: The toast implementation might change, but "Thanks for signing up" is the expected success message
  // Using a regex to be flexible about the exact wording if we change it slightly
  // Also increasing timeout as the toast might have a delay
  await expect(page.getByText(/Thanks for signing up/i)).toBeVisible({ timeout: 10000 });

  // Verify no request was made to Mailchimp
  expect(mailchimpRequestMade).toBe(false);
});
