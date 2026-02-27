import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test('TaskDashboard keyboard navigation for tabs', async ({ page }) => {
  const scheduledTab = page.getByRole('tab', { name: 'Scheduled' });
  const completedTab = page.getByRole('tab', { name: 'Completed' });
  const archivedTab = page.getByRole('tab', { name: 'Archived' });
  const allTab = page.getByRole('tab', { name: 'All' });

  // Start at Scheduled (default)
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');

  // Focus the active tab
  await scheduledTab.focus();

  // Use ArrowRight to go to Completed
  await page.keyboard.press('ArrowRight');
  await expect(completedTab).toHaveAttribute('aria-selected', 'true');
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'false');
  await expect(completedTab).toBeFocused();

  // Use ArrowRight to go to Archived
  await page.keyboard.press('ArrowRight');
  await expect(archivedTab).toHaveAttribute('aria-selected', 'true');
  await expect(archivedTab).toBeFocused();

  // Use ArrowRight to loop back to All
  // Order is All, Scheduled, Completed, Archived in the array?
  // Checking source: const tabs = ["All", "Scheduled", "Completed", "Archived"];
  // Ah, the display order might be different or the array index logic.
  // Let's check the order in DOM.
  // The tabs are rendered in order of the array: "All", "Scheduled", "Completed", "Archived".
  // Default active is "Scheduled" (index 1).
  // ArrowRight -> "Completed" (index 2).
  // ArrowRight -> "Archived" (index 3).
  // ArrowRight -> "All" (index 0).

  await page.keyboard.press('ArrowRight');
  await expect(allTab).toHaveAttribute('aria-selected', 'true');
  await expect(allTab).toBeFocused();

  // Use ArrowLeft to go back to Archived
  await page.keyboard.press('ArrowLeft');
  await expect(archivedTab).toHaveAttribute('aria-selected', 'true');
  await expect(archivedTab).toBeFocused();
});

test('TaskDashboard context-aware empty state messages', async ({ page }) => {
  const scheduledTab = page.getByRole('tab', { name: 'Scheduled' });
  const completedTab = page.getByRole('tab', { name: 'Completed' });
  const archivedTab = page.getByRole('tab', { name: 'Archived' });
  const allTab = page.getByRole('tab', { name: 'All' });

  // Default: Scheduled
  await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();

  // Click Completed
  await completedTab.click();
  await expect(page.getByText('No completed tasks yet')).toBeVisible();
  await expect(page.getByText('Scheduled tasks will show up here')).toBeHidden();

  // Click Archived
  await archivedTab.click();
  await expect(page.getByText('No archived tasks')).toBeVisible();

  // Click All
  await allTab.click();
  await expect(page.getByText('No tasks found')).toBeVisible();
});

test('Dialog accessibility (Escape key)', async ({ page }) => {
  const newButton = page.getByRole('button', { name: 'New' });

  // Open dialog
  await newButton.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Check ARIA attributes
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  // Just checking existence of labelledby, tough to match exact ID
  await expect(dialog).toHaveAttribute('aria-labelledby');

  // Press Escape
  await page.keyboard.press('Escape');

  // Verify dialog is closed
  await expect(dialog).toBeHidden();
});
