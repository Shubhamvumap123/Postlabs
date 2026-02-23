from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to dashboard...")
            page.goto("http://localhost:4173/dashboard")

            # Wait for dashboard to be visible (means lazy loading worked)
            print("Waiting for dashboard content...")
            page.wait_for_selector("text=Scheduled tasks will show up here")

            print("Taking screenshot...")
            page.screenshot(path="dashboard.png")
            print("Screenshot saved to dashboard.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
