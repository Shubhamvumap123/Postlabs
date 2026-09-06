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

  // Verify empty state text
  await expect(page.getByText('No scheduled tasks found')).toBeVisible();

  // Verify filter chips existence
  const performanceChip = page.locator('#root').getByRole('button', { name: 'Performance' });
  const designChip = page.locator('#root').getByRole('button', { name: 'Design' });
  const securityChip = page.locator('#root').getByRole('button', { name: 'Security' });

  // Verify input limits (Security test)
  await newButton.click();
  const titleInput = page.getByLabel('Task Title');
  await expect(titleInput).toHaveAttribute('maxLength', '100');
  await page.getByRole('button', { name: 'Cancel' }).click();

  await expect(performanceChip).toBeVisible();
  await expect(designChip).toBeVisible();
  await expect(securityChip).toBeVisible();

  // Create tasks for testing filters
  // Task 1: Performance
  await newButton.click();
  await page.getByLabel('Task Title').fill('Performance Task');
  // Default category is Performance
  await page.locator('form').getByRole('button', { name: 'Create Task' }).click();

  // Task 2: Design
  await newButton.click();
  await page.getByLabel('Task Title').fill('Design Task');
  await page.locator('form').getByRole('button', { name: 'Design' }).click(); // Select Design category
  await page.locator('form').getByRole('button', { name: 'Create Task' }).click();

  // Wait for dialog to close to avoid matching buttons inside it
  await expect(page.locator('form')).toBeHidden();

  // Verify both tasks are visible initially (no filters active)
  // Note: We switched to "All" tab earlier
  await expect(page.getByText('Performance Task')).toBeVisible();
  await expect(page.getByText('Design Task')).toBeVisible();

  // Activate Performance filter
  await performanceChip.click();
  await expect(performanceChip).toHaveAttribute('aria-pressed', 'true');
  await performanceChip.click();
  await expect(performanceChip).toHaveAttribute('aria-pressed', 'false');

  // Verify filtering functionality
  // 1. Create a task with category "Design"
  await newButton.click();
  await page.getByLabel('Task Title').fill('Task to Complete');
  await page.locator('form').getByRole('button', { name: 'Create Task' }).click();
  await expect(page.locator('form')).toBeHidden();

  // Wait for dialog to close
  await expect(page.locator('form')).not.toBeVisible();

  // 2. Verify it is visible when no filters are active
  await expect(page.getByText('Design Task')).toBeVisible();

  // 3. Activate "Performance" filter and verify the task becomes hidden
  await performanceChip.click();
  await expect(performanceChip).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Design Task')).not.toBeVisible();

  // Test Archiving a task
  // Create a new task for archiving
  await newButton.click();
  await page.getByLabel('Task Title').fill('Task to Archive');
  await page.locator('form').getByRole('button', { name: 'Create Task' }).click();
  await expect(page.locator('form')).toBeHidden();

  // It should be visible in Scheduled tab
  await expect(page.getByText('Task to Archive')).toBeVisible();

  // Hover over the task row to show actions (Archive button appears on hover)
  const taskToArchiveRow = page.locator('.group', { hasText: 'Task to Archive' }).first();
  await taskToArchiveRow.hover();

  // Click Archive button
  await taskToArchiveRow.getByRole('button', { name: 'Archive' }).click();

  // Verify it's gone from Scheduled tab
  await expect(page.getByText('Task to Archive')).toBeHidden();

  // Go to "Archived" tab
  const archivedTab = page.getByRole('tab', { name: 'Archived' });
  await archivedTab.click();
  await expect(page.getByText('Task to Archive')).toBeVisible();

});

test('TaskDashboard persistence', async ({ page }) => {
  // Create a task
  const newButton = page.getByRole('button', { name: 'New' });
  await newButton.click();
  await page.getByLabel('Task Title').fill('Persistent Task');
  await page.locator('form').getByRole('button', { name: 'Create Task' }).click();
  await expect(page.locator('form')).toBeHidden();

  // Verify task is visible
  await expect(page.getByText('Persistent Task')).toBeVisible();

  // Reload page
  await page.reload();

  // Verify task is still visible
  await expect(page.getByText('Persistent Task')).toBeVisible();
});
