import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test('TaskDashboard component functionality', async ({ page }) => {
  // Verify "Scheduled" tab is active by default
  const scheduledTab = page.getByRole('tab', { name: 'Scheduled' });
  await expect(scheduledTab).toBeVisible();
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');

  // Verify empty state text (Scheduled tab default)
  await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();

  // Verify switching tabs
  const allTab = page.getByRole('tab', { name: 'All' });
  await allTab.click();
  await expect(allTab).toHaveAttribute('aria-selected', 'true');
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'false');

  // Verify empty state text for "All" tab
  await expect(page.getByText('No tasks created yet')).toBeVisible();

  // Verify "+ New" button
  const newButton = page.getByRole('button', { name: 'New' });
  await expect(newButton).toBeVisible();
  await expect(newButton).toHaveClass(/bg-purple-600/);

  // Verify card styling (rounded-xl)
  const container = page.locator('.rounded-xl').first();
  await expect(container).toBeVisible();
  await expect(container).toHaveClass(/bg-zinc-900/);
  await expect(container).toHaveClass(/border-zinc-800/);

  // Verify filter chips existence
  const performanceChip = page.getByRole('button', { name: 'Performance' });
  const designChip = page.getByRole('button', { name: 'Design' });
  const securityChip = page.getByRole('button', { name: 'Security' });

  await expect(performanceChip).toBeVisible();
  await expect(designChip).toBeVisible();
  await expect(securityChip).toBeVisible();

  // Create tasks for testing filters
  // Task 1: Performance
  await newButton.click();
  await page.getByLabel('Task Title').fill('Performance Task');
  // Default category is Performance
  await page.getByRole('button', { name: 'Create Task' }).click();

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

  // Verify filtering behavior
  await expect(page.getByText('Performance Task')).toBeVisible();
  await expect(page.getByText('Design Task')).toBeHidden();

  // Deactivate filter
  await performanceChip.click();

  // Test Completing a task
  // We are on "All" tab, create a new task for completion test
  await newButton.click();
  await page.getByLabel('Task Title').fill('Task to Complete');
  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.locator('form')).toBeHidden();

  // Use .group class to target the task row container
  const taskToCompleteRow = page.locator('.group', { hasText: 'Task to Complete' }).first();
  // Click the check circle button
  await taskToCompleteRow.getByRole('button', { name: 'Mark as complete' }).click();

  // Go to "Completed" tab
  const completedTab = page.getByRole('tab', { name: 'Completed' });
  await completedTab.click();
  await expect(page.getByText('Task to Complete')).toBeVisible();

  // Verify it's not in "Scheduled" tab
  await scheduledTab.click();
  await expect(page.getByText('Task to Complete')).toBeHidden();

  // Test Archiving a task
  // Create a new task for archiving
  await newButton.click();
  await page.getByLabel('Task Title').fill('Task to Archive');
  await page.getByRole('button', { name: 'Create Task' }).click();
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
  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.locator('form')).toBeHidden();

  // Verify task is visible
  await expect(page.getByText('Persistent Task')).toBeVisible();

  // Reload page
  await page.reload();

  // Verify task is still visible
  await expect(page.getByText('Persistent Task')).toBeVisible();
});

test('TaskDashboard empty states', async ({ page }) => {
  // Default (Scheduled)
  await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();

  // All
  await page.getByRole('tab', { name: 'All' }).click();
  await expect(page.getByText('No tasks created yet')).toBeVisible();

  // Completed
  await page.getByRole('tab', { name: 'Completed' }).click();
  await expect(page.getByText('No completed tasks yet')).toBeVisible();

  // Archived
  await page.getByRole('tab', { name: 'Archived' }).click();
  await expect(page.getByText('No archived tasks')).toBeVisible();

  // Filter
  await page.getByRole('tab', { name: 'All' }).click();
  const performanceChip = page.getByRole('button', { name: 'Performance' });
  await performanceChip.click();
  // Since we have no tasks, it should show filter empty state
  await expect(page.getByText('No tasks found matching your filters')).toBeVisible();
});

test('TaskDashboard keyboard navigation', async ({ page }) => {
  const scheduledTab = page.getByRole('tab', { name: 'Scheduled' });
  const allTab = page.getByRole('tab', { name: 'All' });
  const completedTab = page.getByRole('tab', { name: 'Completed' });

  // Initial state: Scheduled selected
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');

  // Focus the scheduled tab
  await scheduledTab.focus();

  // Press ArrowLeft -> All (Previous of Scheduled)
  // tabs = ["All", "Scheduled", "Completed", "Archived"]
  await page.keyboard.press('ArrowLeft');
  await expect(allTab).toHaveAttribute('aria-selected', 'true');
  await expect(allTab).toBeFocused();

  // Press ArrowRight -> Scheduled
  await page.keyboard.press('ArrowRight');
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'true');
  await expect(scheduledTab).toBeFocused();

  // Press ArrowRight -> Completed
  await page.keyboard.press('ArrowRight');
  await expect(completedTab).toHaveAttribute('aria-selected', 'true');
  await expect(completedTab).toBeFocused();
});
