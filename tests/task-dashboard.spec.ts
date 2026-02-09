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
  const container = page.locator('.rounded-xl').first();
  await expect(container).toBeVisible();
  await expect(container).toHaveClass(/bg-zinc-900/);
  await expect(container).toHaveClass(/border-zinc-800/);

  // Verify empty state text
  await expect(page.getByText('Scheduled tasks will show up here')).toBeVisible();

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
  await expect(page.getByText('Performance Task')).toBeVisible();
  await expect(page.getByText('Design Task')).toBeVisible();

  // Activate Performance filter
  await performanceChip.click();
  await expect(performanceChip).toHaveAttribute('aria-pressed', 'true');

  // Verify filtering behavior
  await expect(page.getByText('Performance Task')).toBeVisible();
  await expect(page.getByText('Design Task')).toBeHidden();

});
