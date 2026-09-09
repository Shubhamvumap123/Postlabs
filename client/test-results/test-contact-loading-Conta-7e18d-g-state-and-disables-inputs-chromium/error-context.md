# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test-contact-loading.spec.ts >> Contact form shows loading state and disables inputs
- Location: tests/test-contact-loading.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('main form').first().locator('#firstName')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('Contact form shows loading state and disables inputs', async ({ page }) => {
  4  |   await page.goto('/contact-us');
  5  |
  6  |   const form = page.locator('main form').first();
  7  |   const firstName = form.locator('#firstName');
  8  |   const lastName = form.locator('#lastName');
  9  |   const email = form.locator('#email');
  10 |   const message = form.locator('#message');
  11 |   const submitButton = form.locator('button[type="submit"]');
  12 |
> 13 |   await firstName.fill('Test');
     |                   ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  14 |   await lastName.fill('User');
  15 |   await email.fill('test@example.com');
  16 |   await message.fill('Hello this is a test.');
  17 |
  18 |   // Initially inputs are enabled
  19 |   await expect(firstName).toBeEnabled();
  20 |   await expect(submitButton).toBeEnabled();
  21 |
  22 |   // Click submit
  23 |   await submitButton.click();
  24 |
  25 |   // Wait a tiny bit for state to update
  26 |   await page.waitForTimeout(100);
  27 |
  28 |   // Verify elements are disabled during loading
  29 |   await expect(firstName).toBeDisabled();
  30 |   await expect(lastName).toBeDisabled();
  31 |   await expect(email).toBeDisabled();
  32 |   await expect(message).toBeDisabled();
  33 |   await expect(submitButton).toBeDisabled();
  34 |
  35 |   // Verify loading state is visible by checking for lucide icon class
  36 |   await expect(submitButton.locator('svg.animate-spin')).toBeVisible();
  37 |   await expect(submitButton).toContainText('Sending...');
  38 |
  39 |   // Wait for loading to finish
  40 |   await page.waitForTimeout(2000);
  41 |
  42 |   // Verify toast appears and elements are re-enabled and form resets
  43 |   await expect(page.locator('text=Message sent successfully')).toBeVisible();
  44 |   await expect(firstName).toBeEnabled();
  45 |   await expect(firstName).toHaveValue('');
  46 | });
  47 |
```