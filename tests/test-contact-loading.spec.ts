import { test, expect } from '@playwright/test';

test('Contact form shows loading state and disables inputs', async ({ page }) => {
  await page.goto('/contact-us');

  const form = page.locator('main form').first();
  const firstName = form.locator('#firstName');
  const lastName = form.locator('#lastName');
  const email = form.locator('#email');
  const message = form.locator('#message');
  const submitButton = form.locator('button[type="submit"]');

  await firstName.fill('Test');
  await lastName.fill('User');
  await email.fill('test@example.com');
  await message.fill('Hello this is a test.');

  // Initially inputs are enabled
  await expect(firstName).toBeEnabled();
  await expect(submitButton).toBeEnabled();

  // Click submit
  await submitButton.click();

  // Wait a tiny bit for state to update
  await page.waitForTimeout(100);

  // Verify elements are disabled during loading
  await expect(firstName).toBeDisabled();
  await expect(lastName).toBeDisabled();
  await expect(email).toBeDisabled();
  await expect(message).toBeDisabled();
  await expect(submitButton).toBeDisabled();

  // Verify loading state is visible by checking for lucide icon class
  await expect(submitButton.locator('svg.animate-spin')).toBeVisible();
  await expect(submitButton).toContainText('Sending...');

  // Wait for loading to finish
  await page.waitForTimeout(2000);

  // Verify toast appears and elements are re-enabled and form resets
  await expect(page.locator('text=Message sent successfully')).toBeVisible();
  await expect(firstName).toBeEnabled();
  await expect(firstName).toHaveValue('');
});
