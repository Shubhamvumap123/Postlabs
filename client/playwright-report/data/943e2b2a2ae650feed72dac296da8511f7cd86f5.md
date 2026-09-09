# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task-dashboard.spec.ts >> JobDashboard component functionality
- Location: tests/task-dashboard.spec.ts:61:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('tab', { name: 'Applied' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('tab', { name: 'Applied' })

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   |
  3   | // Skip auth tests in pure e2e without backend, or mock it.
  4   | // We'll mock the auth and API calls using playwright's page.route
  5   |
  6   | test.beforeEach(async ({ page }) => {
  7   |   // Mock localStorage for token
  8   |   await page.addInitScript(() => {
  9   |     window.localStorage.setItem('token', 'fake-jwt-token');
  10  |     window.localStorage.setItem('user', JSON.stringify({ name: 'Test User' }));
  11  |   });
  12  |
  13  |   // Mock API responses
  14  |   await page.route('**/api/jobs', async (route) => {
  15  |     if (route.request().method() === 'GET') {
  16  |       await route.fulfill({
  17  |         status: 200,
  18  |         contentType: 'application/json',
  19  |         body: JSON.stringify([
  20  |           { _id: '1', company: 'Tech Corp', position: 'Frontend Engineer', status: 'Applied', type: 'Full-time', createdAt: new Date().toISOString() },
  21  |           { _id: '2', company: 'Design Inc', position: 'UI Designer', status: 'Interview', type: 'Contract', createdAt: new Date().toISOString() }
  22  |         ])
  23  |       });
  24  |     } else if (route.request().method() === 'POST') {
  25  |       const postData = JSON.parse(route.request().postData() || '{}');
  26  |       await route.fulfill({
  27  |         status: 201,
  28  |         contentType: 'application/json',
  29  |         body: JSON.stringify({
  30  |           _id: Math.random().toString(),
  31  |           ...postData,
  32  |           createdAt: new Date().toISOString()
  33  |         })
  34  |       });
  35  |     }
  36  |   });
  37  |
  38  |   await page.route('**/api/jobs/*', async (route) => {
  39  |     if (route.request().method() === 'PUT') {
  40  |       const postData = JSON.parse(route.request().postData() || '{}');
  41  |       await route.fulfill({
  42  |         status: 200,
  43  |         contentType: 'application/json',
  44  |         body: JSON.stringify({
  45  |           _id: route.request().url().split('/').pop(),
  46  |           company: 'Updated',
  47  |           position: 'Updated',
  48  |           type: 'Full-time',
  49  |           ...postData,
  50  |           createdAt: new Date().toISOString()
  51  |         })
  52  |       });
  53  |     } else if (route.request().method() === 'DELETE') {
  54  |       await route.fulfill({ status: 200, body: JSON.stringify({ message: 'Deleted' }) });
  55  |     }
  56  |   });
  57  |
  58  |   await page.goto('/dashboard');
  59  | });
  60  |
  61  | test('JobDashboard component functionality', async ({ page }) => {
  62  |   // Verify "Applied" tab is active by default
  63  |   const appliedTab = page.getByRole('tab', { name: 'Applied' });
> 64  |   await expect(appliedTab).toBeVisible();
      |                            ^ Error: expect(locator).toBeVisible() failed
  65  |   await expect(appliedTab).toHaveAttribute('aria-selected', 'true');
  66  |
  67  |   // Verify switching tabs
  68  |   const interviewTab = page.getByRole('tab', { name: 'Interview' });
  69  |   await interviewTab.click();
  70  |   await expect(interviewTab).toHaveAttribute('aria-selected', 'true');
  71  |   await expect(appliedTab).toHaveAttribute('aria-selected', 'false');
  72  |
  73  |   // Go back to applied tab
  74  |   await appliedTab.click();
  75  |
  76  |   // Verify "+ New Application" button
  77  |   const newButton = page.getByRole('button', { name: 'New Application' });
  78  |   await expect(newButton).toBeVisible();
  79  |
  80  |   // Create tasks for testing filters
  81  |   // Task 1: Full-time
  82  |   await newButton.click();
  83  |   await page.getByPlaceholder('e.g. Google').fill('Apple');
  84  |   await page.getByPlaceholder('e.g. Senior Frontend Engineer').fill('Fullstack Engineer');
  85  |   // Default category is Full-time
  86  |   await page.getByRole('button', { name: 'Create' }).click();
  87  |
  88  |   // Wait for dialog to close to avoid matching buttons inside it
  89  |   await expect(page.locator('form')).toBeHidden();
  90  |
  91  |   // Verify task is visible
  92  |   await expect(page.getByText('Fullstack Engineer')).toBeVisible();
  93  |
  94  |   // Change status of first job to interview
  95  |   const firstJobDropdown = page.locator('select').first();
  96  |   await firstJobDropdown.selectOption('Interview');
  97  |
  98  |   // Go to Interview tab
  99  |   await interviewTab.click();
  100 |
  101 |   // Delete the job from interview tab
  102 |   const deleteBtn = page.getByRole('button', { name: 'Delete' }).first();
  103 |   await deleteBtn.click();
  104 | });
  105 |
```