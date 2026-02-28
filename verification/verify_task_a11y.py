import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        print("Navigating to dashboard...")
        await page.goto("http://localhost:4173/dashboard")

        # Create a task first
        new_button = page.get_by_role("button", name="New")
        await new_button.click()

        await page.get_by_label("Task Title").fill("A11y Test Task")
        await page.get_by_role("button", name="Create Task").click()

        # Wait for the task to be visible
        await page.get_by_text("A11y Test Task").wait_for(state="visible")

        # Focus on the Archive button (it's inside the .group div which we made visible on focus-within)
        # Note: the group locator targets the task row container
        archive_btn = page.locator(".group").first.get_by_role("button", name="Archive")

        # We simulate keyboard navigation by using `focus()`
        print("Focusing on the Archive button...")
        await archive_btn.focus()

        # Give a small delay for transitions
        await page.wait_for_timeout(1000)

        # Take a screenshot
        await page.screenshot(path="verification/task_a11y_focus.png")
        print("Screenshot saved to verification/task_a11y_focus.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
