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
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('First Name')

```

# Page snapshot

```yaml
- generic [ref=f2e3]:
  - generic [ref=f2e4]: "[plugin:vite:react-babel] /app/client/src/components/Footer.tsx: Identifier 'isInView' has already been declared. (62:8) 65 | <>"
  - generic [ref=f2e5]: /app/client/src/components/Footer.tsx:62:8
  - generic [ref=f2e6]: "60 | 61 | 62 | const isInView = useInView(sentinelRef, { once: true }); | ^ 63 | 64 | return ("
  - generic [ref=f2e7]: at constructor (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:369:19) at TypeScriptParserMixin.raise (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:6620:19) at TypeScriptScopeHandler.checkRedeclarationInScope (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:1623:19) at TypeScriptScopeHandler.declareName (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:1589:12) at TypeScriptScopeHandler.declareName (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:4896:11) at TypeScriptParserMixin.declareNameFromIdentifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7588:16) at TypeScriptParserMixin.checkIdentifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7584:12) at TypeScriptParserMixin.checkLVal (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7521:12) at TypeScriptParserMixin.parseVarId (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13441:10) at TypeScriptParserMixin.parseVarId (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9773:11) at TypeScriptParserMixin.parseVar (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13412:12) at TypeScriptParserMixin.parseVarStatement (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13259:10) at TypeScriptParserMixin.parseVarStatement (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9429:31) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12880:23) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9529:18) at TypeScriptParserMixin.parseStatementLike (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12796:17) at TypeScriptParserMixin.parseStatementListItem (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12776:17) at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13345:61) at TypeScriptParserMixin.parseBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13338:10) at TypeScriptParserMixin.parseBlock (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13326:10) at TypeScriptParserMixin.parseFunctionBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12129:24) at TypeScriptParserMixin.parseFunctionBodyAndFinish (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12115:10) at TypeScriptParserMixin.parseFunctionBodyAndFinish (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9193:18) at /app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13474:12 at TypeScriptParserMixin.withSmartMixTopicForbiddingContext (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12432:14) at TypeScriptParserMixin.parseFunction (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13473:10) at TypeScriptParserMixin.parseExportDefaultExpression (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13936:19) at TypeScriptParserMixin.parseExportDefaultExpression (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9423:18) at TypeScriptParserMixin.parseExport (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13857:25) at TypeScriptParserMixin.parseExport (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9406:20) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12907:27) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9529:18) at TypeScriptParserMixin.parseStatementLike (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12796:17) at TypeScriptParserMixin.parseModuleItem (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12773:17) at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13345:36) at TypeScriptParserMixin.parseBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13338:10) at TypeScriptParserMixin.parseProgram (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12651:10) at TypeScriptParserMixin.parseTopLevel (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12641:25) at TypeScriptParserMixin.parse (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14517:25) at TypeScriptParserMixin.parse (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:10147:18) at parse (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14551:38) at parser (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/parser/index.js:41:34) at parser.next (<anonymous>) at normalizeFile (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/transformation/normalize-file.js:51:37) at normalizeFile.next (<anonymous>) at run (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/transformation/index.js:22:50) at run.next (<anonymous>) at transform (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/transform.js:22:33) at transform.next (<anonymous>) at step (/app/node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:261:32
  - generic [ref=f2e8]:
    - text: Click outside, press Esc key, or fix the code to dismiss.You can also disable this overlay by setting
    - code [ref=f2e9]: server.hmr.overlay
    - text: to
    - code [ref=f2e10]: "false"
    - text: in
    - code [ref=f2e11]: vite.config.ts
    - text: .
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
> 13 |   await firstName.fill('Jane');
     |                   ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  14 |   await lastName.fill('Doe');
  15 |   await email.fill('jane@example.com');
  16 |   await message.fill('This is a test message.');
  17 |
  18 |   await submitButton.click();
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