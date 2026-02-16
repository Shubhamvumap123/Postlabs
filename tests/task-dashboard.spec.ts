import { test, expect } from '@playwright/test';

test.describe('TaskDashboard Component', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
    await page.goto('/dashboard');
  });

  test('should render the dashboard with correct layout and default state', async ({ page }) => {
    // Check for the card container styling
    const dashboardCard = page.locator('.max-w-2xl');
    await expect(dashboardCard).toBeVisible();
    await expect(dashboardCard).toHaveClass(/bg-zinc-900/);
    await expect(dashboardCard).toHaveClass(/rounded-xl/);
    await expect(dashboardCard).toHaveClass(/border-zinc-800/);

    // Verify Tabs
    const tabs = ['All', 'Scheduled', 'Completed', 'Archived'];
    for (const tab of tabs) {
      await expect(page.getByRole('tab', { name: tab })).toBeVisible();
    }
    // "Scheduled" should be active by default (based on implementation)
    await expect(page.getByRole('tab', { name: 'Scheduled' })).toHaveAttribute('aria-selected', 'true');

    // Verify "+ New" button
    const newButton = page.getByRole('button', { name: 'New' });
    await expect(newButton).toBeVisible();
    await expect(newButton).toHaveClass(/bg-purple-600/);

    // Verify Empty State
    await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();
    // Verify Clock icon (using a locator that targets the SVG or its container)
    // The implementation uses Lucide Clock icon. Usually renders as an SVG.
    // We can check if the empty state container is visible.
    const emptyState = page.locator('.text-zinc-500', { hasText: 'Scheduled tasks will show up here' });
    await expect(emptyState).toBeVisible();

    // Verify Filter Chips
    const filters = ['Performance', 'Design', 'Security'];
    for (const filter of filters) {
      await expect(page.getByRole('button', { name: filter })).toBeVisible();
    }
    await expect(page.getByText('Skill-based agents')).toBeVisible();
  });

  test('should allow creating a new task', async ({ page }) => {
    const taskTitle = 'Test New Task';

    await page.getByRole('button', { name: 'New' }).click();

    // Verify Dialog opens
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Create New Task' })).toBeVisible();

    // Fill form
    await page.getByLabel('Task Title').fill(taskTitle);

    // Select Category (Performance is default, let's select Design)
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', { name: 'Design' }).click();

    // Submit
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Verify dialog is closed
    await expect(page.getByRole('dialog')).toBeHidden();

    // Verify Task appears in list
    const taskItem = page.locator('.group', { hasText: taskTitle });
    await expect(taskItem).toBeVisible();
    await expect(taskItem).toContainText(/Design/i);

    // Verify Empty State is gone
    await expect(page.getByText('Scheduled tasks will show up here')).not.toBeVisible();
  });

  test('should filter tasks by status tabs', async ({ page }) => {
    // Create a task
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByLabel('Task Title').fill('Task 1');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Verify dialog is closed
    await expect(page.getByRole('dialog')).toBeHidden();

    // Verify it's visible in Scheduled
    await expect(page.getByRole('tab', { name: 'Scheduled' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Task 1')).toBeVisible();

    // Switch to Completed
    await page.getByRole('tab', { name: 'Completed' }).click();
    await expect(page.getByText('Task 1')).not.toBeVisible();
    await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible(); // Empty state shows up

    // Mark task as completed (go back to Scheduled first)
    await page.getByRole('tab', { name: 'Scheduled' }).click();
    await page.getByRole('button', { name: 'Mark as complete' }).click();

    // Wait for transition/state update. The task should disappear from Scheduled view or stay but marked?
    // Implementation:
    // const filteredTasks = tasks.filter(task => ... if (activeTab === 'Scheduled' && task.status === 'Scheduled') ...);
    // So if marked completed, it disappears from "Scheduled" tab.
    await expect(page.getByText('Task 1')).not.toBeVisible();

    // Go to Completed tab
    await page.getByRole('tab', { name: 'Completed' }).click();
    await expect(page.getByText('Task 1')).toBeVisible();
  });

  test('should filter tasks by category chips', async ({ page }) => {
    // Create two tasks with different categories
    // Task 1: Performance
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByLabel('Task Title').fill('Performance Task');
    // Default is Performance
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Task 2: Security
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByLabel('Task Title').fill('Security Task');
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', { name: 'Security' }).click();
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Verify dialog is closed
    await expect(page.getByRole('dialog')).toBeHidden();

    // Both visible initially (no filters active)
    await expect(page.getByText('Performance Task')).toBeVisible();
    await expect(page.getByText('Security Task')).toBeVisible();

    // Filter by Performance
    // The filter buttons in the bottom section
    // They have aria-pressed attribute.
    // Locator: ensure we are clicking the bottom filters, not the ones in the dialog (dialog is closed now so it's fine).
    // The filter buttons in bottom section have text 'Performance', 'Design', 'Security'.

    await page.getByRole('button', { name: 'Performance' }).click();

    // Only Performance Task should be visible
    await expect(page.getByText('Performance Task')).toBeVisible();
    await expect(page.getByText('Security Task')).not.toBeVisible();

    // Toggle off Performance
    await page.getByRole('button', { name: 'Performance' }).click();

    // Both visible again
    await expect(page.getByText('Performance Task')).toBeVisible();
    await expect(page.getByText('Security Task')).toBeVisible();

    // Filter by Security
    await page.getByRole('button', { name: 'Security' }).click();
    await expect(page.getByText('Performance Task')).not.toBeVisible();
    await expect(page.getByText('Security Task')).toBeVisible();
  });
});
