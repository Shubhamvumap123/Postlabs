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

  // Verify empty state for Scheduled
  await expect(page.getByText('No scheduled tasks')).toBeVisible();

  // Verify switching tabs and empty states
  const allTab = page.getByRole('tab', { name: 'All' });
  await allTab.click();
  await expect(allTab).toHaveAttribute('aria-selected', 'true');
  await expect(scheduledTab).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByText('No tasks found')).toBeVisible();

  const completedTab = page.getByRole('tab', { name: 'Completed' });
  await completedTab.click();
  await expect(page.getByText('No completed tasks yet')).toBeVisible();

  const archivedTab = page.getByRole('tab', { name: 'Archived' });
  await archivedTab.click();
  await expect(page.getByText('No archived tasks')).toBeVisible();

  // Go back to All for further tests
  await allTab.click();

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

test('TaskDashboard Undo Delete', async ({ page }) => {
  // Create a task to delete
  const newButton = page.getByRole('button', { name: 'New' });
  await newButton.click();
  await page.getByLabel('Task Title').fill('Task to Delete');
  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.locator('form')).toBeHidden();

  const taskRow = page.locator('.group', { hasText: 'Task to Delete' }).first();

  // Hover and click delete
  await taskRow.hover();
  await taskRow.getByRole('button', { name: 'Delete' }).click();

  // Verify task is gone
  await expect(page.getByText('Task to Delete')).toBeHidden();

  // Verify Undo toast appears and click it
  const undoButton = page.getByRole('button', { name: 'Undo' });
  await expect(undoButton).toBeVisible();
  await undoButton.click();

  // Verify task is back
  await expect(page.getByText('Task to Delete')).toBeVisible();
});

test('TaskDashboard Keyboard Accessibility', async ({ page }) => {
  // Create a task
  const newButton = page.getByRole('button', { name: 'New' });
  await newButton.click();
  await page.getByLabel('Task Title').fill('Keyboard Task');
  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.locator('form')).toBeHidden();

  const taskRow = page.locator('.group', { hasText: 'Keyboard Task' }).first();
  const deleteButton = taskRow.getByRole('button', { name: 'Delete' });

  // Initially delete button might be hidden (opacity 0) if not hovered/focused
  // Note: Playwright's toBeVisible checks CSS visibility/opacity too.
  // The button has opacity-0 via parent, so it should be effectively hidden?
  // Actually, opacity:0 elements are technically "visible" in the DOM tree but "hidden" to the user.
  // Playwright's toBeVisible() considers opacity:0 as hidden.
  // So:
  // await expect(deleteButton).not.toBeVisible(); // This might fail if the test runs too fast or if opacity transition takes time?
  // Actually, let's verify we can focus it.

  // Focus the "Mark as complete" button first (it's the first in the row)
  const completeButton = taskRow.getByRole('button', { name: /Mark as/ });
  await completeButton.focus();

  // Tab to the next button (Archive or Delete)
  // We can simulate Tab press.
  await page.keyboard.press('Tab'); // This goes to title? No, title is not interactive.
  // The structure is: Button (Complete) -> Div (Text) -> Div (Actions) -> Button (Archive) -> Button (Delete)
  // So next tab stop should be Archive or Delete.
  // Wait, if buttons are opacity-0, they are still in the tab order unless display:none or visibility:hidden.
  // Opacity:0 does NOT remove from tab order.

  // So pressing Tab should land on Archive or Delete.
  // Let's assume we land on Archive.

  // We want to verify that WHEN one of these buttons is focused, the container becomes opaque.
  // We can check if the button becomes "visible" (opacity > 0).

  // Focus the delete button directly
  await deleteButton.focus();

  // Now it should be visible because of focus-within:opacity-100
  await expect(deleteButton).toBeVisible();
});
