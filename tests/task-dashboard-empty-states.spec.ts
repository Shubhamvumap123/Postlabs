import { test, expect } from '@playwright/test';

test('TaskDashboard empty states', async ({ page }) => {
  await page.goto('/dashboard');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();

  // Default tab is "Scheduled"
  await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();

  // Switch to "Completed"
  await page.getByRole('tab', { name: 'Completed' }).click();
  // Expect a specific message for completed tasks (this should fail currently)
  await expect(page.getByText('No completed tasks yet')).toBeVisible();

  // Switch to "Archived"
  await page.getByRole('tab', { name: 'Archived' }).click();
  // Expect a specific message for archived tasks
  await expect(page.getByText('No archived tasks')).toBeVisible();
});
