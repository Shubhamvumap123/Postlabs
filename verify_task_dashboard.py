import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the dashboard
        await page.goto('http://localhost:5173/dashboard')

        # Wait for the dashboard to load (wait for the text to appear)
        await page.wait_for_selector('text=Scheduled tasks will show up here', timeout=10000)

        # Take screenshot of the empty state
        await page.screenshot(path='empty_dashboard.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
