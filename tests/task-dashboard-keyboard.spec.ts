import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test('TaskDashboard tab keyboard navigation', async ({ page }) => {
  // Focus the "Scheduled" tab, which is selected by default
  const scheduledTab = page.getByRole('tab', { name: 'Scheduled' });
  await scheduledTab.focus();

  // Verify "Scheduled" is selected
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');

  // Press ArrowRight to move to "Completed"
  await page.keyboard.press('ArrowRight');
  const completedTab = page.getByRole('tab', { name: 'Completed' });
  await expect(completedTab).toBeFocused();
  await expect(completedTab).toHaveAttribute('aria-selected', 'true');
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'false');

  // Press ArrowRight to move to "Archived"
  await page.keyboard.press('ArrowRight');
  const archivedTab = page.getByRole('tab', { name: 'Archived' });
  await expect(archivedTab).toBeFocused();
  await expect(archivedTab).toHaveAttribute('aria-selected', 'true');

  // Press ArrowRight to loop back to "All"
  await page.keyboard.press('ArrowRight');
  const allTab = page.getByRole('tab', { name: 'All' });
  await expect(allTab).toBeFocused();
  await expect(allTab).toHaveAttribute('aria-selected', 'true');

  // Press ArrowLeft to loop back to "Archived"
  await page.keyboard.press('ArrowLeft');
  await expect(archivedTab).toBeFocused();
  await expect(archivedTab).toHaveAttribute('aria-selected', 'true');

  // Press ArrowLeft to move to "Completed"
  await page.keyboard.press('ArrowLeft');
  await expect(completedTab).toBeFocused();
  await expect(completedTab).toHaveAttribute('aria-selected', 'true');
});
