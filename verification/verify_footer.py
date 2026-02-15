from playwright.sync_api import sync_playwright

def verify_footer():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            page.goto("http://localhost:5173")

            # The footer is initially hidden and appears on scroll.
            # We need to scroll to the bottom.
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

            # Wait for the footer to appear (it has transition duration-700)
            footer = page.locator("footer")
            footer.wait_for(state="visible", timeout=5000)

            # Take a screenshot of the footer
            footer.screenshot(path="verification/footer_verification.png")
            print("Screenshot taken: verification/footer_verification.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_footer()
