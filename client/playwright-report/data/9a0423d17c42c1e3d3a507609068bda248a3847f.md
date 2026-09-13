# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.ts >> Contact form functionality
- Location: tests/contact.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('First Name')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('Contact form functionality', async ({ page }) => {
  4  |   await page.goto('/contact-us');
  5  |
  6  |   const firstName = page.getByLabel('First Name');
  7  |   const lastName = page.getByLabel('Last Name');
  8  |   // Need to be specific for Email since footer also has an email input
  9  |   const email = page.getByRole('textbox', { name: 'Email', exact: true });
  10 |   const message = page.getByLabel('Message');
  11 |   const submitButton = page.getByRole('button', { name: 'Send Message', exact: true }); // Wait! when loading, the name changes!
  12 |
> 13 |   await firstName.fill('Jane');
     |                   ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  14 |   await lastName.fill('Doe');
  15 |   await email.fill('jane@example.com');
  16 |   await message.fill('This is a test message.');
  17 |
  18 |   await submitButton.click();
  19 |
  20 |   // Need to find the button again because the text changed
  21 |   const loadingButton = page.locator('button[type="submit"]', { hasText: 'Sending...' });
  22 |   // Assert button becomes disabled
  23 |   await expect(loadingButton).toBeDisabled();
  24 |
  25 |   // Wait for the toast message to appear (API call finishes)
  26 |   const toastMessage = page.getByText('Message sent successfully! We\'ll get back to you soon.');
  27 |   await expect(toastMessage).toBeVisible({ timeout: 5000 });
  28 |
  29 |   // Assert form resets
  30 |   await expect(firstName).toBeEmpty();
  31 |   await expect(lastName).toBeEmpty();
  32 |   await expect(email).toBeEmpty();
  33 |   await expect(message).toBeEmpty();
  34 |
  35 |   // Assert button state is restored
  36 |   await expect(submitButton).toBeEnabled();
  37 | });
  38 |
```