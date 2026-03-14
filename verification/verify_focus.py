import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Navigate to the local dashboard route where the component is rendered
        await page.goto("http://localhost:5173/dashboard")

        # Add a task because it's initially empty
        await page.locator('.bg-purple-600').filter(has_text='New').first.click()
        await page.fill('input#title', 'Keyboard Focus Test Task')
        await page.locator('button', has_text='Create Task').click()

        # Wait for dialog to close and task to appear
        await page.wait_for_selector('text="Keyboard Focus Test Task"')
        await asyncio.sleep(1) # wait for animations to settle

        # Press tab sequentially to focus through the document until we hit the "Mark as complete" button
        for _ in range(50):
            await page.keyboard.press("Tab")
            focused_aria_label = await page.evaluate("document.activeElement.getAttribute('aria-label')")
            if focused_aria_label in ["Mark as complete", "Mark as incomplete"]:
                break

        # Now tab again to focus on the Archive button (or Delete button if Archive is hidden)
        await page.keyboard.press("Tab")
        await asyncio.sleep(0.5)

        # Take a screenshot
        await page.screenshot(path="verification/focus_state.png")

        # Check focus-within by checking visibility of the buttons container
        archive_btn = page.locator("button[aria-label='Archive']")
        delete_btn = page.locator("button[aria-label='Delete']")

        archive_visible = await archive_btn.is_visible()
        delete_visible = await delete_btn.is_visible()

        print(f"Archive button visible: {archive_visible}")
        print(f"Delete button visible: {delete_visible}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
