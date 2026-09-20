# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.ts >> Contact form functionality
- Location: tests/contact.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Send Message', exact: true })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
  - generic [ref=e3]:
    - navigation "Main Navigation":
      - generic:
        - link "Home":
          - /url: /
        - link "Dashboard":
          - /url: /dashboard
        - link "Contact":
          - /url: /contact-us
        - link "Settings":
          - /url: /settings
        - generic:
          - button "Toggle theme"
    - main [ref=e4]:
      - generic [ref=e5]:
        - heading "Get in Touch" [level=1] [ref=e6]
        - paragraph [ref=e7]: Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      - generic [ref=e8]:
        - generic [ref=e10]:
          - heading "Contact Information" [level=3] [ref=e11]
          - generic [ref=e12]:
            - generic [ref=e18]:
              - heading "Email" [level=4] [ref=e19]
              - paragraph [ref=e20]: hello@example.com
              - paragraph [ref=e21]: support@example.com
            - generic [ref=e26]:
              - heading "Phone" [level=4] [ref=e27]
              - paragraph [ref=e28]: +1 (555) 123-4567
              - paragraph [ref=e29]: Mon-Fri 9am-6pm EST
            - generic [ref=e35]:
              - heading "Office" [level=4] [ref=e36]
              - paragraph [ref=e37]: 123 Innovation DriveTech Valley, CA 94043
        - generic [ref=e39]:
          - generic [ref=e40]:
            - generic [ref=e41]:
              - text: First Name
              - textbox "First Name" [ref=e42]:
                - /placeholder: John
                - text: Jane
            - generic [ref=e43]:
              - text: Last Name
              - textbox "Last Name" [ref=e44]:
                - /placeholder: Doe
                - text: Doe
          - generic [ref=e45]:
            - text: Email
            - textbox "Email" [ref=e46]:
              - /placeholder: john@example.com
              - text: jane@example.com
          - generic [ref=e47]:
            - text: Message
            - textbox "Message" [active] [ref=e48]:
              - /placeholder: How can we help you?
              - text: This is a test message.
          - button [ref=e49]:
            - text: Send Message
            - generic [ref=e50]: Send Message
    - contentinfo [ref=e51]:
      - generic [ref=e53]:
        - generic [ref=e55]:
          - text: Ready to Build the Future of Canadian Media?
          - link "Contact Us" [ref=e56] [cursor=pointer]:
            - /url: /contact-us
        - generic [ref=e60]:
          - text: Ready to Build the Future of Canadian Media?
          - link "Contact Us" [ref=e61] [cursor=pointer]:
            - /url: /contact-us
      - link [ref=e65] [cursor=pointer]:
        - /url: /
        - img "Post Labs logo" [ref=e66]
      - generic [ref=e68]:
        - list [ref=e69]:
          - listitem [ref=e70]:
            - link "About" [ref=e71] [cursor=pointer]:
              - /url: /#top
          - listitem [ref=e72]:
            - link "Contact" [ref=e73] [cursor=pointer]:
              - /url: /contact-us
          - listitem [ref=e74]:
            - link "Privacy Policy" [ref=e75] [cursor=pointer]:
              - /url: /privacy-policy
          - listitem [ref=e76]:
            - link "Cookie Policy" [ref=e77] [cursor=pointer]:
              - /url: "#"
        - heading "Sign Up for Our Newsletter" [level=2] [ref=e78]
        - generic [ref=e79]:
          - generic [ref=e80]: Email Address
          - textbox "Email Address" [ref=e81]
          - button "Subscribe to newsletter" [ref=e82]: →
      - generic [ref=e83]:
        - generic [ref=e84]: © 2025 Post Labs, Inc. All rights reserved.
        - generic [ref=e85]:
          - text: Designed by
          - link "HRVST" [ref=e86] [cursor=pointer]:
            - /url: https://gohrvst.com
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('Contact form functionality', async ({ page }) => {
  4  |   await page.goto('/contact-us');
  5  |
  6  |   const firstName = page.getByLabel('First Name');
  7  |   const lastName = page.getByLabel('Last Name');
  8  |   // Need to be specific for Email since footer also has an email input
  9  |   const email = page.getByRole('textbox', { name: 'Email', exact: true });
  10 |   const message = page.getByLabel('Message');
  11 |   const submitButton = page.getByRole('button', { name: 'Send Message', exact: true }); // Wait! when loading, the name changes!
  12 |
  13 |   await firstName.fill('Jane');
  14 |   await lastName.fill('Doe');
  15 |   await email.fill('jane@example.com');
  16 |   await message.fill('This is a test message.');
  17 |
> 18 |   await submitButton.click();
     |                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  19 |
  20 |   // Need to find the button again because the text changed
  21 |   const loadingButton = page.locator('button[type="submit"]', { hasText: 'Sending...' });
  22 |   // Assert button becomes disabled
  23 |   await expect(loadingButton).toBeDisabled();
  24 |
  25 |   // Wait for the toast message to appear (API call finishes)
  26 |   const toastMessage = page.getByText('Message sent successfully! We\'ll get back to you soon.');
  27 |   await expect(toastMessage).toBeVisible({ timeout: 5000 });
  28 |
  29 |   // Assert form resets
  30 |   await expect(firstName).toBeEmpty();
  31 |   await expect(lastName).toBeEmpty();
  32 |   await expect(email).toBeEmpty();
  33 |   await expect(message).toBeEmpty();
  34 |
  35 |   // Assert button state is restored
  36 |   await expect(submitButton).toBeEnabled();
  37 | });
  38 |
```