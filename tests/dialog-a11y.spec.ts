import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test('Dialog Accessibility Check', async ({ page }) => {
  // Open the New Task dialog
  const newButton = page.getByRole('button', { name: 'New' });
  await newButton.click();

  // Wait for dialog animation to finish
  await page.waitForTimeout(300);

  // Check role and aria-modal
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('aria-modal', 'true');

  // Verify aria-labelledby and aria-describedby
  const titleId = await dialog.getAttribute('aria-labelledby');
  const descriptionId = await dialog.getAttribute('aria-describedby');

  expect(titleId).not.toBeNull();
  expect(descriptionId).not.toBeNull();

  // Verify the elements with those IDs exist and have correct text
  if (titleId) {
    const titleElement = page.locator(`id=${titleId}`);
    await expect(titleElement).toHaveText('Create New Task');
  }

  if (descriptionId) {
    const descriptionElement = page.locator(`id=${descriptionId}`);
    await expect(descriptionElement).toHaveText('Add a new task to your dashboard.');
  }

  // Verify close button has aria-label
  const closeButton = page.getByRole('button', { name: 'Close dialog' });
  await expect(closeButton).toBeVisible();

  // Test Escape key closes the dialog
  await page.keyboard.press('Escape');

  // Wait for close animation
  await page.waitForTimeout(300);

  // Dialog should be hidden
  await expect(dialog).toBeHidden();
});
