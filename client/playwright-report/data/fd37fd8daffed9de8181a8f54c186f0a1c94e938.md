# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: job-dashboard.spec.ts >> JobDashboard component renders
- Location: tests/job-dashboard.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Job Tracker Dashboard')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Job Tracker Dashboard')

```

```yaml
- region "Notifications (F8)":
  - list
- region "Notifications alt+T"
- heading "Login to JobTracker" [level=2]
- text: Email
- textbox "Email"
- text: Password
- textbox "Password"
- button "Login"
- paragraph:
  - text: Don't have an account?
  - link "Register":
    - /url: /register
- text: "[plugin:vite:react-babel] /app/client/src/components/Footer.tsx: Identifier 'isInView' has already been declared. (62:8) 65 | <> /app/client/src/components/Footer.tsx:62:8 60 | 61 | 62 | const isInView = useInView(sentinelRef, { once: true }); | ^ 63 | 64 | return ( at constructor (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:369:19) at TypeScriptParserMixin.raise (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:6620:19) at TypeScriptScopeHandler.checkRedeclarationInScope (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:1623:19) at TypeScriptScopeHandler.declareName (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:1589:12) at TypeScriptScopeHandler.declareName (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:4896:11) at TypeScriptParserMixin.declareNameFromIdentifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7588:16) at TypeScriptParserMixin.checkIdentifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7584:12) at TypeScriptParserMixin.checkLVal (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7521:12) at TypeScriptParserMixin.parseVarId (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13441:10) at TypeScriptParserMixin.parseVarId (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9773:11) at TypeScriptParserMixin.parseVar (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13412:12) at TypeScriptParserMixin.parseVarStatement (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13259:10) at TypeScriptParserMixin.parseVarStatement (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9429:31) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12880:23) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9529:18) at TypeScriptParserMixin.parseStatementLike (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12796:17) at TypeScriptParserMixin.parseStatementListItem (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12776:17) at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13345:61) at TypeScriptParserMixin.parseBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13338:10) at TypeScriptParserMixin.parseBlock (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13326:10) at TypeScriptParserMixin.parseFunctionBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12129:24) at TypeScriptParserMixin.parseFunctionBodyAndFinish (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12115:10) at TypeScriptParserMixin.parseFunctionBodyAndFinish (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9193:18) at /app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13474:12 at TypeScriptParserMixin.withSmartMixTopicForbiddingContext (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12432:14) at TypeScriptParserMixin.parseFunction (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13473:10) at TypeScriptParserMixin.parseExportDefaultExpression (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13936:19) at TypeScriptParserMixin.parseExportDefaultExpression (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9423:18) at TypeScriptParserMixin.parseExport (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13857:25) at TypeScriptParserMixin.parseExport (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9406:20) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12907:27) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9529:18) at TypeScriptParserMixin.parseStatementLike (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12796:17) at TypeScriptParserMixin.parseModuleItem (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12773:17) at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13345:36) at TypeScriptParserMixin.parseBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13338:10) at TypeScriptParserMixin.parseProgram (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12651:10) at TypeScriptParserMixin.parseTopLevel (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12641:25) at TypeScriptParserMixin.parse (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14517:25) at TypeScriptParserMixin.parse (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:10147:18) at parse (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14551:38) at parser (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/parser/index.js:41:34) at parser.next (<anonymous>) at normalizeFile (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/transformation/normalize-file.js:51:37) at normalizeFile.next (<anonymous>) at run (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/transformation/index.js:22:50) at run.next (<anonymous>) at transform (/app/node_modules/.pnpm/@babel+core@7.29.7/node_modules/@babel/core/lib/transform.js:22:33) at transform.next (<anonymous>) at step (/app/node_modules/.pnpm/gensync@1.0.0-beta.2/node_modules/gensync/index.js:261:32 Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
- code: server.hmr.overlay
- text: to
- code: "false"
- text: in
- code: vite.config.ts
- text: .
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
  3 | test('JobDashboard component renders', async ({ page }) => {
  4 |   await page.goto('/dashboard');
> 5 |   await expect(page.getByText('Job Tracker Dashboard')).toBeVisible();
    |                                                         ^ Error: expect(locator).toBeVisible() failed
  6 | });
```