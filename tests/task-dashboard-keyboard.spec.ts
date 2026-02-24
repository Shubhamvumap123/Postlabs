import { test, expect } from '@playwright/test';

test.describe('TaskDashboard Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    // Clear local storage to start fresh
    await page.evaluate(() => window.localStorage.clear());
  });

  test('Navigate tabs using arrow keys', async ({ page }) => {
    const allTab = page.getByRole('tab', { name: 'All' });
    const scheduledTab = page.getByRole('tab', { name: 'Scheduled' });
    const completedTab = page.getByRole('tab', { name: 'Completed' });
    const archivedTab = page.getByRole('tab', { name: 'Archived' });

    // Click to focus the first tab (or tab into it, but clicking is easier for setup)
    await allTab.click();
    await expect(allTab).toHaveAttribute('aria-selected', 'true');

    // Press ArrowRight -> Should go to "Scheduled"
    await page.keyboard.press('ArrowRight');
    await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');
    await expect(scheduledTab).toBeFocused();

    // Press ArrowRight -> Should go to "Completed"
    await page.keyboard.press('ArrowRight');
    await expect(completedTab).toHaveAttribute('aria-selected', 'true');
    await expect(completedTab).toBeFocused();

    // Press ArrowLeft -> Should go back to "Scheduled"
    await page.keyboard.press('ArrowLeft');
    await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');
    await expect(scheduledTab).toBeFocused();

    // Navigate to "All" (first tab)
    await page.keyboard.press('ArrowLeft');
    await expect(allTab).toHaveAttribute('aria-selected', 'true');

    // Press ArrowLeft on first tab -> Should wrap around to "Archived" (last tab)
    await page.keyboard.press('ArrowLeft');
    await expect(archivedTab).toHaveAttribute('aria-selected', 'true');
    await expect(archivedTab).toBeFocused();
  });
});
