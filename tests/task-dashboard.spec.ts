import { test, expect } from '@playwright/test';

test('TaskDashboard renders correctly and is interactive', async ({ page }) => {
  // Navigate to the dashboard page
  await page.goto('/dashboard');

  // Verify the component container exists
  const dashboardCard = page.locator('.bg-zinc-900.rounded-xl.border.border-zinc-800');
  await expect(dashboardCard).toBeVisible();

  // 1. Top Navigation (Tabs)
  const tabs = ["All", "Scheduled", "Completed", "Archived"];
  for (const tab of tabs) {
    await expect(page.getByRole('tab', { name: tab })).toBeVisible();
  }

  // Verify "Scheduled" is active by default
  await expect(page.getByRole('tab', { name: 'Scheduled' })).toHaveAttribute('aria-selected', 'true');

  // Click "Completed" tab and verify it becomes active
  await page.getByRole('tab', { name: 'Completed' }).click();
  await expect(page.getByRole('tab', { name: 'Completed' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tab', { name: 'Scheduled' })).toHaveAttribute('aria-selected', 'false');

  // 2. Primary Action (+ New button)
  const newButton = page.getByRole('button', { name: 'New' });
  await expect(newButton).toBeVisible();
  await expect(newButton).toHaveClass(/bg-purple-600/);

  // 3. Empty State Area
  await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();
  // Check for the clock icon (using the svg selector or verify parent container)
  const clockIcon = page.locator('.w-16.h-16.mb-4.rounded-full').locator('svg');
  await expect(clockIcon).toBeVisible();

  // 4. Bottom Filter Chips
  await expect(page.getByText('Skill-based agents')).toBeVisible();
  const filters = ["Performance", "Design", "Security"];

  for (const filter of filters) {
    const chip = page.getByRole('button', { name: filter });
    await expect(chip).toBeVisible();
    await expect(chip).toHaveAttribute('aria-pressed', 'false');

    // Click to toggle
    await chip.click();
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await expect(chip).toHaveClass(/bg-zinc-800/); // Active state class check

    // Click again to untoggle
    await chip.click();
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
  }
});
