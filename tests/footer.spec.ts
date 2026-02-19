import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Footer security and functionality', async ({ page }) => {
  // Scroll to bottom to ensure footer is visible
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 1. Verify External Link Security (Reverse Tabnabbing)
  const externalLink = page.getByRole('link', { name: 'HRVST' });
  await expect(externalLink).toBeVisible();
  await expect(externalLink).toHaveAttribute('target', '_blank');
  await expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');

  // 2. Verify Newsletter Subscription (Demo Mode)
  const emailInput = page.getByPlaceholder('Email Address');
  const submitButton = page.getByRole('button', { name: '→' });

  await emailInput.fill('test@example.com');

  // Setup dialog listener and wait for it
  const dialogPromise = new Promise<string>(resolve => {
    page.once('dialog', dialog => {
      resolve(dialog.message());
      dialog.accept();
    });
  });

  await submitButton.click();

  // Wait for the dialog to appear (it has a 1s delay in the component)
  const message = await dialogPromise;

  // Verify the dialog message indicates success/demo mode
  expect(message).toContain('Demo Mode');
});
