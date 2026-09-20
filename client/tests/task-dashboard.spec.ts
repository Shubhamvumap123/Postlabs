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
  // Verify "+ New Job" button
  const newButton = page.getByRole('button', { name: '+ New Job' });
  await expect(newButton).toBeVisible();

  // Verify filtering functionality
  const statusFilter = page.locator('select').first();
  await statusFilter.selectOption('Interview');

});
