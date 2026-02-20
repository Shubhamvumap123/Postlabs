import { test, expect } from '@playwright/test';

test('footer has secure external links', async ({ page }) => {
  await page.goto('/');
  // Footer is hidden until scroll, so scroll to bottom
  await page.evaluate(() => globalThis.scrollTo(0, document.body.scrollHeight));

  // Wait for footer to be visible (it has transition)
  const footer = page.locator('footer');
  // It might take a moment to transition opacity
  await expect(footer).toHaveClass(/opacity-100/);

  const link = page.locator('a[href="https://gohrvst.com"]');
  await expect(link).toBeVisible();

  // Assert for the secure attribute
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

test('footer subscription works securely', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => globalThis.scrollTo(0, document.body.scrollHeight));

  // Handle the alert dialog
  let dialogMessage = '';
  page.on('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });

  // Monitor network requests to ensure no actual API call is made
  let mailchimpRequestMade = false;
  await page.route('**/*api.mailchimp.com/**', route => {
    mailchimpRequestMade = true;
    route.abort();
  });

  await page.fill('input[name="email"]', 'test@example.com');
  await page.click('button[type="submit"]');

  // Wait for the simulated delay (1000ms) plus a buffer
  await page.waitForTimeout(2000);

  // Verify the success message
  expect(dialogMessage).toContain('Thanks for signing up, test@example.com!');

  // Verify no network request was made
  expect(mailchimpRequestMade).toBe(false);
});
