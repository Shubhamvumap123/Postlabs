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
- generic [ref=e3]:
  - generic [ref=e4]: "[plugin:vite:react-babel] /app/client/src/App.tsx: Identifier 'Navigate' has already been declared. (9:9) 12 | const Dashboard = lazy(() => import(\"./pages/Dashboard\"));"
  - generic [ref=e5]: /app/client/src/App.tsx:9:9
  - generic [ref=e6]: "7 | import { ThemeProvider } from \"./components/ThemeProvider\"; 8 | import LoadingFallback from \"./components/LoadingFallback\"; 9 | import { Navigate } from \"react-router-dom\"; | ^ 10 | 11 | const Index = lazy(() => import(\"./pages/Index\"));"
  - generic [ref=e7]: at constructor (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:369:19) at TypeScriptParserMixin.raise (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:6620:19) at TypeScriptScopeHandler.declareName (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:4882:21) at TypeScriptParserMixin.declareNameFromIdentifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7588:16) at TypeScriptParserMixin.checkIdentifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7584:12) at TypeScriptParserMixin.checkLVal (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7521:12) at TypeScriptParserMixin.finishImportSpecifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14295:10) at TypeScriptParserMixin.parseImportSpecifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14448:17) at TypeScriptParserMixin.parseImportSpecifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:10169:18) at TypeScriptParserMixin.parseNamedImportSpecifiers (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14427:36) at TypeScriptParserMixin.parseImportSpecifiersAndAfter (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14271:37) at TypeScriptParserMixin.parseImport (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14264:17) at TypeScriptParserMixin.parseImport (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9374:26) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12905:27) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9529:18) at TypeScriptParserMixin.parseStatementLike (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12796:17) at TypeScriptParserMixin.parseModuleItem (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12773:17) at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13345:36) at TypeScriptParserMixin.parseBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13338:10) at TypeScriptParserMixin.parseProgram (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12651:10) at TypeScriptParserMixin.parseTopLevel (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12641:25) at TypeScriptParserMixin.parse (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14517:25) at TypeScriptParserMixin.parse (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:10147:18) at parse (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14551:38) at parser (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/parser/index.js:41:34) at parser.next (<anonymous>) at normalizeFile (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/transformation/normalize-file.js:51:37) at normalizeFile.next (<anonymous>) at run (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/transformation/index.js:22:50) at run.next (<anonymous>) at transform (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/transform.js:22:33) at transform.next (<anonymous>) at step (/app/node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:261:32) at /app/node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:273:13 at async.call.result.err.err (/app/node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:223:11) at /app/node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:189:28 at /app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/gensync-utils/async.js:67:7 at /app/node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:113:33 at step (/app/node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:287:14) at /app/node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:273:13 at async.call.result.err.err (/app/node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:223:11
  - generic [ref=e8]:
    - text: Click outside, press Esc key, or fix the code to dismiss.You can also disable this overlay by setting
    - code [ref=e9]: server.hmr.overlay
    - text: to
    - code [ref=e10]: "false"
    - text: in
    - code [ref=e11]: vite.config.ts
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