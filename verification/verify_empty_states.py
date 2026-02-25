import os
from playwright.sync_api import sync_playwright

def verify_empty_states():
    output_dir = "verification"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # 1. Clear local storage before starting
        # Navigate to a known route
        try:
            page.goto("http://localhost:5173/dashboard", timeout=60000)
        except Exception as e:
            print(f"Error navigating: {e}")
            return

        page.evaluate("window.localStorage.clear()")
        page.reload()

        # 2. Wait for page to load
        try:
            page.wait_for_selector('text=No scheduled tasks', timeout=10000)
        except Exception as e:
            print(f"Error waiting for selector: {e}")
            page.screenshot(path=f"{output_dir}/error_screenshot.png")
            return

        page.wait_for_timeout(1000) # Wait for initial animation

        # 3. Screenshot Scheduled Tab (Default)
        page.screenshot(path=f"{output_dir}/verification_scheduled.png")
        print("Captured Scheduled tab empty state.")

        # 4. Switch to All Tab
        page.click("button:has-text('All')")
        # Wait for transition
        page.wait_for_selector('text=No tasks found')
        page.wait_for_timeout(1000)
        page.screenshot(path=f"{output_dir}/verification_all.png")
        print("Captured All tab empty state.")

        # 5. Switch to Completed Tab
        page.click("button:has-text('Completed')")
        page.wait_for_selector('text=No completed tasks yet')
        page.wait_for_timeout(1000)
        page.screenshot(path=f"{output_dir}/verification_completed.png")
        print("Captured Completed tab empty state.")

        # 6. Switch to Archived Tab
        page.click("button:has-text('Archived')")
        page.wait_for_selector('text=No archived tasks')
        page.wait_for_timeout(1000)
        page.screenshot(path=f"{output_dir}/verification_archived.png")
        print("Captured Archived tab empty state.")

        browser.close()

if __name__ == "__main__":
    verify_empty_states()
