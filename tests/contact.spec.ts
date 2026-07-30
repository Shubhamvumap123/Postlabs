import { test, expect } from '@playwright/test';

test('Contact form functionality', async ({ page }) => {
  await page.goto('/contact-us');

  const firstName = page.getByLabel('First Name');
  const lastName = page.getByLabel('Last Name');
  // Need to be specific for Email since footer also has an email input
  const email = page.getByRole('textbox', { name: 'Email', exact: true });
  const message = page.getByLabel('Message');
  const submitButton = page.getByRole('button', { name: 'Send Message', exact: true }); // Wait! when loading, the name changes!

  await firstName.fill('Jane');
  await lastName.fill('Doe');
  await email.fill('jane@example.com');
  await message.fill('This is a test message.');

  await submitButton.click();

  // Need to find the button again because the text changed
  const loadingButton = page.locator('button[type="submit"]', { hasText: 'Sending...' });
  // Assert button becomes disabled
  await expect(loadingButton).toBeDisabled();

  // Wait for the toast message to appear (API call finishes)
  const toastMessage = page.getByText('Message sent successfully! We\'ll get back to you soon.');
  await expect(toastMessage).toBeVisible({ timeout: 5000 });

  // Assert form resets
  await expect(firstName).toBeEmpty();
  await expect(lastName).toBeEmpty();
  await expect(email).toBeEmpty();
  await expect(message).toBeEmpty();

  // Assert button state is restored
  await expect(submitButton).toBeEnabled();
});
