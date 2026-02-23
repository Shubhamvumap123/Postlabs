import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
});

test('TaskDashboard keyboard navigation for tabs', async ({ page }) => {
  const allTab = page.getByRole('tab', { name: 'All' });
  const scheduledTab = page.getByRole('tab', { name: 'Scheduled' });
  const completedTab = page.getByRole('tab', { name: 'Completed' });
  const archivedTab = page.getByRole('tab', { name: 'Archived' });

  // Start by clicking the Scheduled tab (default active)
  await scheduledTab.click();
  await expect(scheduledTab).toBeFocused();
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');

  // Press Right Arrow
  await page.keyboard.press('ArrowRight');

  // Expect focus to move to "Completed" and be selected (automatic activation)
  await expect(completedTab).toBeFocused();
  await expect(completedTab).toHaveAttribute('aria-selected', 'true');
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'false');

  // Press Right Arrow again
  await page.keyboard.press('ArrowRight');
  await expect(archivedTab).toBeFocused();
  await expect(archivedTab).toHaveAttribute('aria-selected', 'true');

  // Press Right Arrow again (loop to "All")
  await page.keyboard.press('ArrowRight');
  await expect(allTab).toBeFocused();
  await expect(allTab).toHaveAttribute('aria-selected', 'true');

  // Press Left Arrow (loop back to "Archived")
  await page.keyboard.press('ArrowLeft');
  await expect(archivedTab).toBeFocused();
  await expect(archivedTab).toHaveAttribute('aria-selected', 'true');
});
