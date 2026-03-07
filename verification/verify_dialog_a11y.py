import asyncio
from playwright.async_api import async_playwright

async def verify_dialog():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Navigate to the dashboard directly via route
        await page.goto("http://localhost:5173/dashboard")
        await page.wait_for_load_state('networkidle')

        await page.screenshot(path="verification/dashboard_page.png")

        # Open the New Task dialog
        await page.get_by_role("button", name="New").click()

        # Wait for the dialog to be visible
        dialog = page.get_by_role("dialog")
        await dialog.wait_for(state="visible")

        # Verify ARIA attributes are present
        aria_modal = await dialog.get_attribute("aria-modal")
        assert aria_modal == "true", "aria-modal should be true"

        aria_labelledby = await dialog.get_attribute("aria-labelledby")
        assert aria_labelledby is not None, "aria-labelledby should be set"

        aria_describedby = await dialog.get_attribute("aria-describedby")
        assert aria_describedby is not None, "aria-describedby should be set"

        # Verify close button has aria-label
        close_btn = dialog.get_by_role("button", name="Close dialog")
        await close_btn.wait_for(state="visible")

        # Take a screenshot of the open dialog
        await page.screenshot(path="verification/dialog_open.png")

        # Verify Escape key closes the dialog
        await page.keyboard.press("Escape")
        await dialog.wait_for(state="hidden")

        # Take a screenshot after closing
        await page.screenshot(path="verification/dialog_closed.png")

        await browser.close()
        print("Dialog verification passed!")

if __name__ == "__main__":
    asyncio.run(verify_dialog())
