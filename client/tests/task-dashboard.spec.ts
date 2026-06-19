import { test, expect } from '@playwright/test';

test('Dashboard page basic rendering', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/.*login/);
});
