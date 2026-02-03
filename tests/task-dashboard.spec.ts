import { test, expect } from '@playwright/test';

test.describe('TaskDashboard Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should render the dashboard correctly', async ({ page }) => {
    // Check if the dashboard container is visible
    const dashboard = page.locator('.w-full.max-w-2xl');
    await expect(dashboard).toBeVisible();

    // Check for the "+ New" button
    const newButton = page.getByRole('button', { name: 'New' });
    await expect(newButton).toBeVisible();
    await expect(newButton).toHaveClass(/bg-purple-600/);
  });

  test('should handle tab navigation', async ({ page }) => {
    const tabs = ['All', 'Scheduled', 'Completed', 'Archived'];

    // Check all tabs exist
    for (const tab of tabs) {
      await expect(page.getByRole('tab', { name: tab })).toBeVisible();
    }

    // Default active tab should be "Scheduled"
    const scheduledTab = page.getByRole('tab', { name: 'Scheduled' });
    await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');
    await expect(scheduledTab).toHaveClass(/text-white/);

    // Click "Completed"
    const completedTab = page.getByRole('tab', { name: 'Completed' });
    await completedTab.click();

    // Verify "Completed" is now active
    await expect(completedTab).toHaveAttribute('aria-selected', 'true');
    await expect(completedTab).toHaveClass(/text-white/);

    // Verify "Scheduled" is no longer active
    await expect(scheduledTab).toHaveAttribute('aria-selected', 'false');
    await expect(scheduledTab).toHaveClass(/text-zinc-400/);
  });

  test('should display empty state', async ({ page }) => {
    const emptyStateText = page.getByText('Scheduled tasks will show up here');
    await expect(emptyStateText).toBeVisible();

    // Check for the clock icon container (approximate check based on structure)
    const iconContainer = page.locator('.min-h-\\[300px\\] .rounded-full.bg-zinc-800\\/50');
    await expect(iconContainer).toBeVisible();
  });

  test('should handle filter chips', async ({ page }) => {
    const performanceChip = page.getByRole('button', { name: 'Performance' });
    const designChip = page.getByRole('button', { name: 'Design' });
    const securityChip = page.getByRole('button', { name: 'Security' });

    await expect(performanceChip).toBeVisible();
    await expect(designChip).toBeVisible();
    await expect(securityChip).toBeVisible();

    // Initial state: not pressed (bg-transparent)
    await expect(performanceChip).toHaveAttribute('aria-pressed', 'false');
    await expect(performanceChip).toHaveClass(/bg-transparent/);

    // Toggle Performance
    await performanceChip.click();
    await expect(performanceChip).toHaveAttribute('aria-pressed', 'true');
    await expect(performanceChip).toHaveClass(/bg-zinc-800/);

    // Toggle again
    await performanceChip.click();
    await expect(performanceChip).toHaveAttribute('aria-pressed', 'false');
    await expect(performanceChip).toHaveClass(/bg-transparent/);

    // Toggle multiple
    await designChip.click();
    await securityChip.click();
    await expect(designChip).toHaveAttribute('aria-pressed', 'true');
    await expect(securityChip).toHaveAttribute('aria-pressed', 'true');
  });
});
