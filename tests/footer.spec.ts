import { test, expect } from '@playwright/test';

test('Footer security and functionality', async ({ page }) => {
  // Navigate to home page
  await page.goto('/');

  // Scroll to bottom to trigger footer visibility
  await page.evaluate(() => globalThis.scrollTo(0, document.body.scrollHeight));

  // Wait for opacity transition (700ms in CSS)
  await page.waitForTimeout(1000);

  // Verify footer is visible
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  await expect(footer).toHaveClass(/opacity-100/);

  // Verify external link security
  const hrvstLink = page.getByRole('link', { name: 'HRVST' });
  await expect(hrvstLink).toBeVisible();
  await expect(hrvstLink).toHaveAttribute('target', '_blank');
  await expect(hrvstLink).toHaveAttribute('rel', 'noopener noreferrer');

  // Test Newsletter Demo Mode

  // Setup dialog handler
  let dialogMessage = '';
  page.on('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });

  // Fill email
  const emailInput = page.getByPlaceholder('Email Address');
  await emailInput.fill('test@example.com');

  // Submit form
  const submitButton = page.locator('form button');
  await submitButton.click();

  // Verify alert message
  // Since we haven't set env vars in the test environment (or they are defaults),
  // it should trigger the Demo Mode alert.
  // The code says: alert(`Thanks for signing up, ${email}! (Demo Mode)`);
  // Or if it falls through to fetch error: "Error signing up..."
  // But wait, in the code:
  // const isDemoMode = !apiKey || apiKey.includes('your_api_key') || apiKey === 'YOUR_API_KEY';
  // If Vite env vars are not loaded in test, apiKey might be undefined.

  // We expect "Demo Mode" message or at least a success-like message if simulated.
  // The updated code waits 1000ms before alerting in Demo Mode.

  await page.waitForTimeout(1500); // Wait for demo delay + a bit

  expect(dialogMessage).toContain('Thanks for signing up, test@example.com!');
  if (dialogMessage.includes('(Demo Mode)')) {
      console.log('Verified Demo Mode is active');
  } else {
      console.log('Verified Standard Submission path');
  }
});
