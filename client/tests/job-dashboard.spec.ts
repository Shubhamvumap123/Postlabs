import { test, expect } from '@playwright/test';

test('JobDashboard component renders', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Job Tracker Dashboard')).toBeVisible();
});