import { test, expect } from '@playwright/test';

test('Footer functionality and security', async ({ page }) => {
  await page.goto('/');

  // Scroll to bottom to reveal footer
  await page.evaluate(() => globalThis.scrollTo(0, document.body.scrollHeight));

  // Wait for opacity transition
  const footer = page.locator('footer');
  await expect(footer).toHaveClass(/opacity-100/);

  // Verify external link security
  const externalLink = page.getByRole('link', { name: 'HRVST' });
  await expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(externalLink).toHaveAttribute('target', '_blank');

  // Verify Newsletter Subscription (Demo Mode)
  const emailInput = page.getByPlaceholder('Email Address');
  const submitButton = page.getByRole('button', { name: '→' });

  await emailInput.fill('test@example.com');
  await submitButton.click();

  // Check for success toast
  await expect(page.getByText('Thanks for signing up, test@example.com! (Demo Mode)')).toBeVisible();
});
