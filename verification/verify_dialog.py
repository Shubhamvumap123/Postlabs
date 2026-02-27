from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to dashboard
        page.goto("http://localhost:5173/dashboard")

        # Open New Task Dialog
        page.get_by_role("button", name="New").click()

        # Verify Dialog is visible
        dialog = page.get_by_role("dialog")
        if not dialog.is_visible():
            raise Exception("Dialog is not visible")

        # Verify ARIA attributes via DOM inspection (screenshot will just show visual)
        # We can print attributes to console for log verification
        modal_attr = dialog.get_attribute("aria-modal")
        role_attr = dialog.get_attribute("role")
        print(f"aria-modal: {modal_attr}")
        print(f"role: {role_attr}")

        # Verify Close button name
        close_btn = dialog.get_by_role("button", name="Close")
        if not close_btn.is_visible():
             raise Exception("Close button is not visible or accessible by name 'Close'")

        # Take screenshot of the open dialog
        page.screenshot(path="verification/dialog_accessibility.png")

        # Test Escape key
        page.keyboard.press("Escape")
        page.wait_for_timeout(500) # Give it a moment to animate out
        if dialog.is_visible():
            raise Exception("Dialog did not close on Escape key")

        print("Verification successful!")
        browser.close()

if __name__ == "__main__":
    run()
