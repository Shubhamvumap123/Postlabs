import { test, expect } from '@playwright/test';

test('Navigation and Lazy Loading', async ({ page }) => {
  // 1. Visit the Landing Page (Index)
  await page.goto('/');
  await expect(page).toHaveTitle(/Vite \+ React \+ TS/);
  // Check for a known element on the landing page (e.g., Hero section)
  await expect(page.locator('main')).toBeVisible();

  // 2. Navigate to Dashboard (if there is a link, otherwise direct)
  await page.goto('/dashboard');
  // Task Dashboard might take a moment to load due to lazy loading
  await expect(page.getByRole('button', { name: 'New' })).toBeVisible();

  // 3. Navigate to Contact
  await page.goto('/contact-us');
  await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();

  // 4. Navigate to Settings
  await page.goto('/settings');
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
});
