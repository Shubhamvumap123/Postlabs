# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: job-dashboard.spec.ts >> JobDashboard component renders
- Location: tests/job-dashboard.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Job Tracker Dashboard')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Job Tracker Dashboard')

```

```yaml
- region "Notifications (F8)":
  - list
- region "Notifications alt+T"
- heading "Login to JobTracker" [level=2]
- text: Email
- textbox "Email"
- text: Password
- textbox "Password"
- button "Login"
- paragraph:
  - text: Don't have an account?
  - link "Register":
    - /url: /register
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
  3 | test('JobDashboard component renders', async ({ page }) => {
  4 |   await page.goto('/dashboard');
> 5 |   await expect(page.getByText('Job Tracker Dashboard')).toBeVisible();
    |                                                         ^ Error: expect(locator).toBeVisible() failed
  6 | });
```