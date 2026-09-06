import { test, expect } from '@playwright/test';

test('TaskDashboard component functionality', async ({ page }) => {
  await page.goto('/dashboard');

  // Verify "Scheduled" tab is active by default
  const scheduledTab = page.getByRole('tab', { name: 'Scheduled' });
  await expect(scheduledTab).toBeVisible();
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');

  // Verify switching tabs
  const allTab = page.getByRole('tab', { name: 'All' });
  await allTab.click();
  await expect(allTab).toHaveAttribute('aria-selected', 'true');
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'false');

  // Verify "+ New" button
  const newButton = page.getByRole('button', { name: 'New' });
  await expect(newButton).toBeVisible();
  await expect(newButton).toHaveClass(/bg-purple-600/);

  // Verify card styling (rounded-xl)
  // We need to find the main container. Since we don't have a specific ID, we can look for the text container's parent
  // or just check if the new button is within a rounded-xl container.
  // Alternatively, we can assume the first div in the dashboard page is the wrapper if it's the only component.
  // But let's check the container that holds the tabs.
  const container = page.locator('.rounded-xl').first();
  await expect(container).toBeVisible();
  await expect(container).toHaveClass(/bg-zinc-900/);
  await expect(container).toHaveClass(/border-zinc-800/);

  // Verify empty state
  await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();

  // Verify filter chips
  const performanceChip = page.getByRole('button', { name: 'Performance' });
  const designChip = page.getByRole('button', { name: 'Design' });
  const securityChip = page.getByRole('button', { name: 'Security' });

  await expect(performanceChip).toBeVisible();
  await expect(designChip).toBeVisible();
  await expect(securityChip).toBeVisible();

  // Verify toggling filter
  await expect(performanceChip).toHaveAttribute('aria-pressed', 'false');
  await performanceChip.click();
  await expect(performanceChip).toHaveAttribute('aria-pressed', 'true');
  await performanceChip.click();
  await expect(performanceChip).toHaveAttribute('aria-pressed', 'false');

  // Verify filtering functionality
  // 1. Create a task with category "Design"
  await newButton.click();

  const titleInput = page.getByLabel('Task Title');
  await expect(titleInput).toBeVisible();
  await titleInput.fill('Design Task');

  // Select Design category in the dialog (scope to form to distinguish from filter chips)
  await page.locator('form').getByRole('button', { name: 'Design' }).click();

  await page.getByRole('button', { name: 'Create Task' }).click();

  // Wait for dialog to close
  await expect(page.locator('form')).not.toBeVisible();

  // 2. Verify it is visible when no filters are active
  await expect(page.getByText('Design Task')).toBeVisible();

  // 3. Activate "Performance" filter and verify the task becomes hidden
  await performanceChip.click();
  await expect(performanceChip).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Design Task')).not.toBeVisible();

  // 4. Deactivate "Performance" filter and verify the task reappears
  await performanceChip.click();
  await expect(performanceChip).toHaveAttribute('aria-pressed', 'false');
  await expect(page.getByText('Design Task')).toBeVisible();

  // 5. Activate "Design" filter and verify the task is visible
  await designChip.click();
  await expect(designChip).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Design Task')).toBeVisible();
});
