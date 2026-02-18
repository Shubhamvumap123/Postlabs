from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        print("Navigating to Home Page...")
        page.goto("http://localhost:5173/")
        # Wait for some content to ensure it's loaded
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/home_page.png")
        print("Home Page loaded.")

        print("Navigating to Dashboard...")
        page.goto("http://localhost:5173/dashboard")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/dashboard_page.png")
        print("Dashboard loaded.")

        browser.close()

if __name__ == "__main__":
    run()
