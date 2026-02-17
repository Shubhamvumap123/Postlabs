import { test, expect } from '@playwright/test';

test.describe('Task Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure a clean state
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
    await page.goto('/dashboard');
  });

  test('should display initial empty state correctly', async ({ page }) => {
    // Check for tabs
    await expect(page.getByRole('tab', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Scheduled' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Completed' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Archived' })).toBeVisible();

    // Check for "+ New" button
    const newButton = page.getByRole('button', { name: 'New' });
    await expect(newButton).toBeVisible();
    // Verify it has the expected styling (purple background)
    await expect(newButton).toHaveClass(/bg-purple-600/);

    // Check for empty state
    await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();
    // Assuming the Clock icon is present, but it's hard to test specifically without an aria-label or reliable selector.
    // However, the text is the key requirement.

    // Check for filter chips
    await expect(page.getByRole('button', { name: 'Performance' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Design' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Security' })).toBeVisible();
  });

  test('should add a new task', async ({ page }) => {
    // Open the dialog
    await page.getByRole('button', { name: 'New' }).click();

    // Wait for dialog
    const dialog = page.getByRole('dialog', { name: 'Create New Task' });
    await expect(dialog).toBeVisible();

    // Fill the form
    await page.getByLabel('Task Title').fill('Test Task 1');

    // Select a category (default is Performance, let's switch to Design)
    // The filter buttons in the dialog don't have explicit roles other than button, but we can find by text.
    await dialog.getByRole('button', { name: 'Design' }).click();

    // Submit
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Verify dialog closes
    await expect(dialog).toBeHidden();

    // Verify task appears in the list
    await expect(page.getByText('Test Task 1')).toBeVisible();

    // Verify category and date
    await expect(page.locator('span.capitalize', { hasText: 'design' }).first()).toBeVisible();
    // Date is tricky due to format, but we can check if it exists.
  });

  test('should filter tasks by tab', async ({ page }) => {
    // Add a task
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByLabel('Task Title').fill('Task to Complete');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Verify it's in "Scheduled" tab (default)
    await expect(page.getByText('Task to Complete')).toBeVisible();

    // Mark as complete
    await page.getByLabel('Mark as complete').click();

    // Verify it disappears from "Scheduled" view (since we are on Scheduled tab)
    // Wait, the logic is: activeTab === 'Scheduled' && task.status === 'Scheduled'.
    // If we mark it complete, it should disappear immediately from the list.
    await expect(page.getByText('Task to Complete')).toBeHidden();

    // Switch to "Completed" tab
    await page.getByRole('tab', { name: 'Completed' }).click();

    // Verify it appears there
    await expect(page.getByText('Task to Complete')).toBeVisible();

    // Verify it has line-through style
    const taskTitle = page.getByText('Task to Complete');
    await expect(taskTitle).toHaveClass(/line-through/);
  });

  test('should filter tasks by category chips', async ({ page }) => {
    // Add two tasks with different categories
    // Task 1: Performance
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByLabel('Task Title').fill('Performance Task');
    // Default is Performance
    await page.getByRole('button', { name: 'Create Task' }).click();
    await expect(page.getByRole('dialog')).toBeHidden();

    // Task 2: Design
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByLabel('Task Title').fill('Design Task');
    await page.getByRole('dialog').getByRole('button', { name: 'Design' }).click();
    await page.getByRole('button', { name: 'Create Task' }).click();
    await expect(page.getByRole('dialog')).toBeHidden();

    // Verify both are visible initially (no filters active)
    await expect(page.getByText('Performance Task')).toBeVisible();
    await expect(page.getByText('Design Task')).toBeVisible();

    // Click "Performance" filter chip
    // The filter chips are outside the dialog, at the bottom.
    // We need to be careful not to click the one inside the dialog if it was open (it's closed now).
    // The bottom filters are "Skill-based agents".
    // We can scope by text "Skill-based agents" section but simpler to just click by name as they are unique on the main page now.
    await page.getByRole('button', { name: 'Performance' }).click();

    // Verify "Performance" chip is active (aria-pressed="true")
    await expect(page.getByRole('button', { name: 'Performance' })).toHaveAttribute('aria-pressed', 'true');

    // Verify "Performance Task" is visible, "Design Task" is hidden
    await expect(page.getByText('Performance Task')).toBeVisible();
    await expect(page.getByText('Design Task')).toBeHidden();

    // Click "Design" filter chip to add it (OR logic? or AND? Logic says: if activeFilters.length > 0 && !activeFilters.includes(task.category))
    // So if we select Performance, only Performance tasks show.
    // If we select Design too, then tasks with EITHER Performance OR Design?
    // Let's check logic: activeFilters.includes(task.category).
    // So if activeFilters=['performance', 'design'], then a task with 'performance' category is included.
    // Yes, it's an OR logic for the filters (show tasks matching ANY active filter).

    await page.getByRole('button', { name: 'Design' }).click();

    // Now both should be visible
    await expect(page.getByText('Performance Task')).toBeVisible();
    await expect(page.getByText('Design Task')).toBeVisible();

    // Deselect Performance
    await page.getByRole('button', { name: 'Performance' }).click();

    // Now only Design Task visible
    await expect(page.getByText('Performance Task')).toBeHidden();
    await expect(page.getByText('Design Task')).toBeVisible();
  });
});
