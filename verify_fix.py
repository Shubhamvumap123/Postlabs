from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:5173")

        # Scroll to bottom to ensure footer is visible (fade in)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # Wait for footer to be visible (opacity transition)
        footer = page.locator("footer")
        # Ensure opacity is 1
        page.wait_for_function("window.getComputedStyle(document.querySelector('footer')).opacity === '1'")

        # Fill email
        page.fill('footer input[name="email"]', 'verify@example.com')
        page.click('footer button[type="submit"]')

        # Wait for toast
        page.wait_for_selector('text="Subscribed to newsletter (Demo)"')

        # Take screenshot
        page.screenshot(path="verification.png")
        browser.close()

if __name__ == "__main__":
    run()
