import { test, expect } from '@playwright/test';

test.describe('Footer Security', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('external link should have rel="noopener noreferrer"', async ({ page }) => {
    const link = page.getByRole('link', { name: 'HRVST' });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('newsletter subscription should show demo alert when keys are missing', async ({ page }) => {
    // Scroll to footer to ensure visibility (though not strictly needed for actionability)
    const footer = page.getByRole('contentinfo');
    await footer.scrollIntoViewIfNeeded();

    // Fill email
    await page.getByPlaceholder('Email Address').fill('test@example.com');

    // Listen for dialog (alert)
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Demo Mode');
      await dialog.dismiss();
    });

    // Submit form
    await page.getByRole('button', { name: '→' }).click();
  });
});
