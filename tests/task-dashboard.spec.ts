import { test, expect } from '@playwright/test';

test.describe('TaskDashboard Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should render the dashboard card', async ({ page }) => {
    // Check for the main card container
    // We can target it by finding a generic div with specific classes,
    // or better, since it's the only main content on /dashboard, we can assume it's there if text is visible.
    // But let's try to be specific with the classes used in TaskDashboard.tsx
    const card = page.locator('.bg-zinc-900.rounded-xl.border.border-zinc-800');
    await expect(card).toBeVisible();
  });

  test('should display all tabs', async ({ page }) => {
    const tabs = ["All", "Scheduled", "Completed", "Archived"];
    for (const tab of tabs) {
      await expect(page.getByRole('tab', { name: tab })).toBeVisible();
    }
  });

  test('should handle tab switching', async ({ page }) => {
    const scheduledTab = page.getByRole('tab', { name: 'Scheduled' });
    const allTab = page.getByRole('tab', { name: 'All' });

    // "Scheduled" is default active
    await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');
    await expect(allTab).toHaveAttribute('aria-selected', 'false');

    // Click "All"
    await allTab.click();
    await expect(allTab).toHaveAttribute('aria-selected', 'true');
    await expect(scheduledTab).toHaveAttribute('aria-selected', 'false');
  });

  test('should render the "New" button correctly', async ({ page }) => {
    const newButton = page.getByRole('button', { name: 'New' });
    await expect(newButton).toBeVisible();

    // Check for specific styling classes
    await expect(newButton).toHaveClass(/bg-purple-600/);
    await expect(newButton).toHaveClass(/text-white/);
  });

  test('should display the empty state', async ({ page }) => {
    await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();

    // Check if the empty state container is present
    const emptyState = page.locator('.min-h-\\[300px\\]');
    await expect(emptyState).toBeVisible();

    // Check for an SVG inside (the clock icon)
    await expect(emptyState.locator('svg')).toBeVisible();
  });

  test('should handle filter chips', async ({ page }) => {
    const performanceFilter = page.getByRole('button', { name: 'Performance' });
    const designFilter = page.getByRole('button', { name: 'Design' });
    const securityFilter = page.getByRole('button', { name: 'Security' });

    await expect(performanceFilter).toBeVisible();
    await expect(designFilter).toBeVisible();
    await expect(securityFilter).toBeVisible();

    // Verify initial state (not pressed)
    await expect(performanceFilter).toHaveAttribute('aria-pressed', 'false');

    // Toggle Performance
    await performanceFilter.click();
    await expect(performanceFilter).toHaveAttribute('aria-pressed', 'true');
    // Check for active style (bg-zinc-800)
    await expect(performanceFilter).toHaveClass(/bg-zinc-800/);

    // Toggle again
    await performanceFilter.click();
    await expect(performanceFilter).toHaveAttribute('aria-pressed', 'false');
    // Check for inactive style (bg-transparent)
    await expect(performanceFilter).toHaveClass(/bg-transparent/);
  });
});
