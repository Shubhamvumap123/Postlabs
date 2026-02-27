import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test('Capture TaskDashboard screenshot', async ({ page }) => {
  // Wait for the dashboard to be visible using a more specific locator
  await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();

  // Wait for animations to settle
  await page.waitForTimeout(1000);

  // Take screenshot of the initial state (Scheduled tab)
  await page.screenshot({ path: 'verification/task-dashboard-scheduled.png' });

  // Switch to Completed tab
  await page.getByRole('tab', { name: 'Completed' }).click();
  await page.waitForTimeout(600); // Wait for tab animation
  await page.screenshot({ path: 'verification/task-dashboard-completed.png' });

  // Open New Task Dialog
  await page.getByRole('button', { name: 'New' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.waitForTimeout(500); // Wait for dialog animation
  await page.screenshot({ path: 'verification/task-dashboard-dialog.png' });
});
