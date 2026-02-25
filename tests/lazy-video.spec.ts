import { test, expect } from '@playwright/test';

test('Lazy loading video in FullWidthVideoSection', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Locate the video in FullWidthVideoSection by its unique poster image
  const video = page.locator('video[poster*="post-labs-video-1-poster-00001.jpg"]');

  // Verify initial state: should be paused and have preload="none"
  // This step is expected to fail before the optimization is implemented because of 'autoPlay'
  const isPaused = await video.evaluate((el) => (el as HTMLVideoElement).paused);
  expect(isPaused).toBe(true);

  await expect(video).toHaveAttribute('preload', 'none');

  // Scroll the video into view to trigger lazy loading
  await video.scrollIntoViewIfNeeded();

  // Verify the video starts playing
  await expect.poll(async () => {
    return await video.evaluate((el) => !(el as HTMLVideoElement).paused);
  }, {
    message: 'Video should start playing when in view',
    timeout: 10000,
  }).toBe(true);
});
