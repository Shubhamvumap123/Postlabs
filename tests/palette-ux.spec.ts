import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
});

test('Undo Delete functionality', async ({ page }) => {
  // Create a task
  const newButton = page.getByRole('button', { name: 'New' });
  await newButton.click();
  await page.getByLabel('Task Title').fill('Undo Me');
  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.locator('form')).toBeHidden();

  // Verify task is visible
  const taskRow = page.locator('.group', { hasText: 'Undo Me' }).first();
  await expect(taskRow).toBeVisible();

  // Delete task
  // Hover to reveal actions
  await taskRow.hover();
  await taskRow.getByRole('button', { name: 'Delete' }).click();

  // Verify task is hidden
  await expect(page.getByText('Undo Me')).toBeHidden();

  // Verify toast and click Undo
  const undoButton = page.getByRole('button', { name: 'Undo' });
  await expect(undoButton).toBeVisible();
  await undoButton.click();

  // Verify task is visible again
  await expect(page.getByText('Undo Me')).toBeVisible();
});

test('Dynamic Empty States', async ({ page }) => {
  // Default (Scheduled)
  await expect(page.getByText('No scheduled tasks')).toBeVisible();

  // Completed
  await page.getByRole('tab', { name: 'Completed' }).click();
  await expect(page.getByText('No completed tasks')).toBeVisible();

  // Archived
  await page.getByRole('tab', { name: 'Archived' }).click();
  await expect(page.getByText('No archived tasks')).toBeVisible();

  // All
  await page.getByRole('tab', { name: 'All' }).click();
  await expect(page.getByText('No tasks found')).toBeVisible();

  // Filter Empty State
  // Create a task first so we have something, but filter it out
  const newButton = page.getByRole('button', { name: 'New' });
  await newButton.click();
  await page.getByLabel('Task Title').fill('Filter Me');
  // Default is Performance
  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.locator('form')).toBeHidden();

  // Verify task is visible
  await expect(page.getByText('Filter Me')).toBeVisible();

  // Apply Security filter (Task is Performance)
  await page.getByRole('button', { name: 'Security' }).click();

  // Verify empty state
  await expect(page.getByText('No tasks match your filters')).toBeVisible();
});
