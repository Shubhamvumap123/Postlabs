import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    try:
        page.goto("http://localhost:5173/dashboard")
    except Exception as e:
        print(f"Failed to navigate: {e}")
        return

    # Wait for the page to load
    page.wait_for_load_state("networkidle")

    # Focus the first tab
    page.get_by_role("tab", name="Scheduled").click()

    # Press ArrowRight to go to "Completed"
    page.keyboard.press("ArrowRight")

    # Wait for animation (the pill animation duration is 0.6s)
    time.sleep(1)

    # Take screenshot
    page.screenshot(path="verification/tab_navigation.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
