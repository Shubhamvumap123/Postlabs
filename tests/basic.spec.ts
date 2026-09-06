import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Vite \+ React/);
});

test('shows Job Tracker Pro heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Job Tracker Pro');
});
