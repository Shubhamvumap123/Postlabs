from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:5173/dashboard")
        page.wait_for_load_state("networkidle")

        page.screenshot(path="empty_state.png")
        print("Empty state screenshot saved as empty_state.png")

        # Click new task
        page.locator("button:has-text('New')").click()
        page.wait_for_timeout(1000)
        page.screenshot(path="new_task_dialog.png")
        print("New task dialog screenshot saved as new_task_dialog.png")

        browser.close()

if __name__ == "__main__":
    verify()
