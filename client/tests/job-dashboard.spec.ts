import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('user', JSON.stringify({ name: 'Test User' }));
    window.localStorage.setItem('userInfo', JSON.stringify({ name: 'Test User' }));
  });
});

test('JobDashboard component renders', async ({ page }) => {
  await page.route('**/api/jobs', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([])
    });
  });

  await page.goto('/dashboard');
  await expect(page.getByText('Job Tracker Dashboard')).toBeVisible();
});