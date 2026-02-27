import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        print("Navigating to /dashboard...")

        # We will intercept the request for the dashboard chunk and delay it.
        # This forces the Suspense fallback to be displayed.

        async def handle_route(route):
            url = route.request.url
            if "Dashboard" in url and url.endswith(".js"):
                print(f"Delaying chunk: {url}")
                await asyncio.sleep(2)  # Delay for 2 seconds
                await route.continue_()
            else:
                await route.continue_()

        # Intercept requests for the Dashboard chunk.
        await page.route("**/*", handle_route)

        # Navigate to the dashboard.
        # We start the navigation task but do not await it immediately.
        goto_task = asyncio.create_task(page.goto("http://localhost:3000/dashboard"))

        # Wait a brief moment for the app to mount and start fetching the chunk.
        await asyncio.sleep(0.5)

        print("Taking screenshot of loading state...")
        # Capture the screen while the chunk is still delayed.
        await page.screenshot(path="verification/loading_state.png")

        # Now wait for the navigation to complete (which waits for the chunk).
        try:
            await goto_task
        except Exception as e:
            print(f"Navigation error (might be timeout due to delay): {e}")

        print("Waiting for dashboard content...")
        # Wait for something specific to the dashboard to ensure it's loaded.
        try:
             # Look for "New" button which is unique to dashboard.
             await page.wait_for_selector("text=New", timeout=5000)
             print("Dashboard loaded.")
        except Exception as e:
            print(f"Timeout waiting for dashboard content: {e}")

        print("Taking screenshot of loaded dashboard...")
        await page.screenshot(path="verification/dashboard_loaded.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
