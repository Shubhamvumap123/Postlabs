import { test, expect } from '@playwright/test';

// Skip auth tests in pure e2e without backend, or mock it.
// We'll mock the auth and API calls using playwright's page.route

test.beforeEach(async ({ page }) => {
  // Mock localStorage for token
  await page.addInitScript(() => {
    window.localStorage.setItem('token', 'fake-jwt-token');
    window.localStorage.setItem('user', JSON.stringify({ name: 'Test User' }));
  });

  // Mock API responses
  await page.route('**/api/jobs', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { _id: '1', company: 'Tech Corp', position: 'Frontend Engineer', status: 'Applied', type: 'Full-time', createdAt: new Date().toISOString() },
          { _id: '2', company: 'Design Inc', position: 'UI Designer', status: 'Interview', type: 'Contract', createdAt: new Date().toISOString() }
        ])
      });
    } else if (route.request().method() === 'POST') {
      const postData = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          _id: Math.random().toString(),
          ...postData,
          createdAt: new Date().toISOString()
        })
      });
    }
  });

  await page.route('**/api/jobs/*', async (route) => {
    if (route.request().method() === 'PUT') {
      const postData = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          _id: route.request().url().split('/').pop(),
          company: 'Updated',
          position: 'Updated',
          type: 'Full-time',
          ...postData,
          createdAt: new Date().toISOString()
        })
      });
    } else if (route.request().method() === 'DELETE') {
      await route.fulfill({ status: 200, body: JSON.stringify({ message: 'Deleted' }) });
    }
  });

  await page.goto('/dashboard');
});

test('JobDashboard component functionality', async ({ page }) => {
  // Verify "Applied" tab is active by default
  const appliedTab = page.getByRole('tab', { name: 'Applied' });
  await expect(appliedTab).toBeVisible();
  await expect(appliedTab).toHaveAttribute('aria-selected', 'true');

  // Verify switching tabs
  const interviewTab = page.getByRole('tab', { name: 'Interview' });
  await interviewTab.click();
  await expect(interviewTab).toHaveAttribute('aria-selected', 'true');
  await expect(appliedTab).toHaveAttribute('aria-selected', 'false');

  // Go back to applied tab
  await appliedTab.click();

  // Verify "+ New Application" button
  const newButton = page.getByRole('button', { name: 'New Application' });
  await expect(newButton).toBeVisible();

  // Create tasks for testing filters
  // Task 1: Full-time
  await newButton.click();
  await page.getByPlaceholder('e.g. Google').fill('Apple');
  await page.getByPlaceholder('e.g. Senior Frontend Engineer').fill('Fullstack Engineer');
  // Default category is Full-time
  await page.getByRole('button', { name: 'Create' }).click();

  // Wait for dialog to close to avoid matching buttons inside it
  await expect(page.locator('form')).toBeHidden();

  // Verify task is visible
  await expect(page.getByText('Fullstack Engineer')).toBeVisible();

  // Change status of first job to interview
  const firstJobDropdown = page.locator('select').first();
  await firstJobDropdown.selectOption('Interview');

  // Go to Interview tab
  await interviewTab.click();

  // Delete the job from interview tab
  const deleteBtn = page.getByRole('button', { name: 'Delete' }).first();
  await deleteBtn.click();
});
