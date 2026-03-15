import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        print("Navigating to /dashboard...")
        await page.goto("http://localhost:5173/dashboard")
        await page.wait_for_load_state('networkidle')

        print("Opening the dialog...")
        await page.locator('.bg-purple-600').filter(has_text='New').first.click()

        # Wait for dialog using ARIA role
        dialog = page.locator('div[role="dialog"]')
        await dialog.wait_for(state='visible', timeout=5000)

        aria_modal = await dialog.get_attribute('aria-modal')
        print(f"aria-modal attribute: {aria_modal}")

        aria_labelledby = await dialog.get_attribute('aria-labelledby')
        print(f"aria-labelledby attribute: {aria_labelledby}")

        aria_describedby = await dialog.get_attribute('aria-describedby')
        print(f"aria-describedby attribute: {aria_describedby}")

        print("Checking if IDs match...")
        title_id = await page.locator('h2').get_attribute('id')
        desc_id = await page.locator('p').filter(has_text='Add a new task').get_attribute('id')
        print(f"H2 ID: {title_id}")
        print(f"P ID: {desc_id}")
        if aria_labelledby == title_id and aria_describedby == desc_id:
            print("SUCCESS: ARIA IDs match the elements")
        else:
            print("ERROR: ARIA IDs do not match the elements")

        print("Testing Escape key listener...")
        await page.keyboard.press('Escape')
        await dialog.wait_for(state='hidden', timeout=5000)
        print("SUCCESS: Escape key closes the dialog")

        await browser.close()

asyncio.run(run())
