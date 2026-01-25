import { test, expect } from '@playwright/test';

test.describe('TaskDashboard Component', () => {
  test('should render task dashboard with all elements', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');

    // Verify Dashboard Card
    const dashboard = page.locator('.bg-zinc-900.rounded-xl.border.border-zinc-800');
    await expect(dashboard).toBeVisible();

    // Verify Tabs
    const tabs = ['All', 'Scheduled', 'Completed', 'Archived'];
    for (const tab of tabs) {
      await expect(page.getByRole('button', { name: tab })).toBeVisible();
    }

    // Verify "New" Button
    const newButton = page.getByRole('button', { name: 'New' });
    await expect(newButton).toBeVisible();
    await expect(newButton).toHaveClass(/bg-purple-600/);

    // Verify Empty State
    await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();

    // Verify Filters
    const filters = ['Performance', 'Design', 'Security'];
    for (const filter of filters) {
      await expect(page.getByRole('button', { name: filter })).toBeVisible();
    }
  });

  test('should switch tabs', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');

    // Default tab is Scheduled
    const scheduledTab = page.getByRole('button', { name: 'Scheduled' });
    // Active tab has text-white. We can check class.
    await expect(scheduledTab).toHaveClass(/text-white/);

    // Click "All" tab
    const allTab = page.getByRole('button', { name: 'All' });
    await allTab.click();

    // Verify "All" is active (we can't easily check layoutId animation but we can check the text color class logic)
    // The component logic: activeTab === tab ? "text-white" : "text-zinc-400..."
    await expect(allTab).toHaveClass(/text-white/);
    await expect(scheduledTab).toHaveClass(/text-zinc-400/);
  });

  test('should toggle filters', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');

    const performanceFilter = page.getByRole('button', { name: 'Performance' });

    // Initial state: inactive
    // Inactive class: bg-transparent border-zinc-800 text-zinc-500
    await expect(performanceFilter).toHaveClass(/bg-transparent/);

    // Click to toggle on
    await performanceFilter.click();

    // Active state: bg-zinc-800 border-zinc-700 text-white
    await expect(performanceFilter).toHaveClass(/bg-zinc-800/);

    // Click to toggle off
    await performanceFilter.click();
    await expect(performanceFilter).toHaveClass(/bg-transparent/);
  });
});
