from playwright.sync_api import sync_playwright

def inspect():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5173")
        html = page.evaluate('document.querySelector(".contact-text").innerHTML')
        print(html)
        browser.close()

if __name__ == "__main__":
    inspect()
