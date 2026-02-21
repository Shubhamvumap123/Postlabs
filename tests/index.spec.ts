import { test, expect } from '@playwright/test';

test('Index page loads successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Vite \+ React \+ TS/);

  // check for some elements to ensure page rendered
  await expect(page.getByText('The Future of News Starts Here')).toBeVisible();

  // Check if console has errors
  page.on('console', msg => {
    if (msg.type() === 'error')
      console.error(`Page Error: ${msg.text()}`);
  });
});
