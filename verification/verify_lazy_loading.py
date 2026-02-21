from playwright.sync_api import sync_playwright
import time

def verify_lazy_loading():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        print("Navigating to Dashboard...")
        # Enable request interception to simulate network delay if needed,
        # but for now we just verify it loads.
        page.goto("http://localhost:4173/dashboard")

        # Wait for the dashboard content to be visible
        # "Scheduled tasks will show up here" is the default empty state text
        page.wait_for_selector("text=Scheduled tasks will show up here")

        print("Dashboard loaded successfully.")

        # Take a screenshot
        page.screenshot(path="verification/dashboard_loaded.png")
        print("Screenshot saved to verification/dashboard_loaded.png")

        browser.close()

if __name__ == "__main__":
    verify_lazy_loading()
