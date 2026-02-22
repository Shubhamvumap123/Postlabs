import { test, expect } from '@playwright/test';

test.describe('Navigation Accessibility', () => {
  test('Active link has aria-current="page"', async ({ page }) => {
    await page.goto('/');

    // Navigation appears only after scrolling
    await page.evaluate(() => window.scrollTo(0, 500));
    // Wait for animation (transition-all duration-500)
    await page.waitForTimeout(1000);

    const nav = page.locator('nav');

    // Check Home link
    const homeLink = nav.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();

    // Check if aria-current="page" is present on the active link
    await expect(homeLink).toHaveAttribute('aria-current', 'page');

    // Check if other links do NOT have aria-current="page"
    const settingsLink = nav.getByRole('link', { name: 'Settings' });
    await expect(settingsLink).not.toHaveAttribute('aria-current', 'page');

    // Navigate to Settings
    await settingsLink.click();

    // On settings page, scroll again to ensure nav is visible
    // Settings page has enough content?
    // It has "min-h-screen" and padding, and content.
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);

    // Verify Settings is now active
    await expect(settingsLink).toHaveAttribute('aria-current', 'page');
    await expect(homeLink).not.toHaveAttribute('aria-current', 'page');
  });

  test('Links have accessible names on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Scroll to reveal nav
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);

    const nav = page.locator('nav');

    // On mobile, the text is hidden. We verify that we can still find the link by its name.
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Settings' })).toBeVisible();
  });
});
