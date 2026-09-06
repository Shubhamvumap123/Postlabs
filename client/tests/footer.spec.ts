import { test, expect } from '@playwright/test';

test('App basic rendering', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
});
