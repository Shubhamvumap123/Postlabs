# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: task-dashboard.spec.ts >> JobDashboard component functionality
- Location: tests/task-dashboard.spec.ts:61:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('tab', { name: 'Applied' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('tab', { name: 'Applied' })

```

```yaml
- text: "[plugin:vite:react-babel] /app/client/src/pages/Dashboard.tsx: Identifier 'navigate' has already been declared. (49:6) 52 | fetchJobs(); /app/client/src/pages/Dashboard.tsx:49:6 47 | setLoading(false); 48 | } 49 | }, [navigate]); | ^ 50 | 51 | useEffect(() => { at constructor (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:369:19) at TypeScriptParserMixin.raise (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:6620:19) at TypeScriptScopeHandler.checkRedeclarationInScope (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:1623:19) at TypeScriptScopeHandler.declareName (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:1589:12) at TypeScriptScopeHandler.declareName (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:4896:11) at TypeScriptParserMixin.declareNameFromIdentifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7588:16) at TypeScriptParserMixin.checkIdentifier (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7584:12) at TypeScriptParserMixin.checkLVal (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7521:12) at TypeScriptParserMixin.checkLVal (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:7561:16) at TypeScriptParserMixin.parseVarId (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13441:10) at TypeScriptParserMixin.parseVarId (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9773:11) at TypeScriptParserMixin.parseVar (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13412:12) at TypeScriptParserMixin.parseVarStatement (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13259:10) at TypeScriptParserMixin.parseVarStatement (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9429:31) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12880:23) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9529:18) at TypeScriptParserMixin.parseStatementLike (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12796:17) at TypeScriptParserMixin.parseStatementListItem (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12776:17) at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13345:61) at TypeScriptParserMixin.parseBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13338:10) at TypeScriptParserMixin.parseBlock (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13326:10) at TypeScriptParserMixin.parseFunctionBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12129:24) at TypeScriptParserMixin.parseArrowExpression (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12104:10) at TypeScriptParserMixin.parseParenAndDistinguishExpression (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:11713:12) at TypeScriptParserMixin.parseExprAtom (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:11357:23) at TypeScriptParserMixin.parseExprAtom (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:4780:20) at TypeScriptParserMixin.parseExprSubscripts (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:11102:23) at TypeScriptParserMixin.parseUpdate (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:11087:21) at TypeScriptParserMixin.parseMaybeUnary (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:11067:23) at TypeScriptParserMixin.parseMaybeUnary (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9858:18) at TypeScriptParserMixin.parseMaybeUnaryOrPrivate (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:10920:61) at TypeScriptParserMixin.parseExprOps (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:10925:23) at TypeScriptParserMixin.parseMaybeConditional (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:10902:23) at TypeScriptParserMixin.parseMaybeAssign (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:10852:21) at TypeScriptParserMixin.parseMaybeAssign (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9807:20) at /app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:10821:39 at TypeScriptParserMixin.allowInAnd (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12450:16) at TypeScriptParserMixin.parseMaybeAssignAllowIn (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:10821:17) at TypeScriptParserMixin.parseVar (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13413:91) at TypeScriptParserMixin.parseVarStatement (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13259:10) at TypeScriptParserMixin.parseVarStatement (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9429:31) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12880:23) at TypeScriptParserMixin.parseStatementContent (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:9529:18) at TypeScriptParserMixin.parseStatementLike (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12796:17) at TypeScriptParserMixin.parseModuleItem (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12773:17) at TypeScriptParserMixin.parseBlockOrModuleBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13345:36) at TypeScriptParserMixin.parseBlockBody (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:13338:10) at TypeScriptParserMixin.parseProgram (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12651:10) at TypeScriptParserMixin.parseTopLevel (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:12641:25) at TypeScriptParserMixin.parse (/app/node_modules/.pnpm/@babel+parser@7.29.8/node_modules/@babel/parser/lib/index.js:14517:25 Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
- code: server.hmr.overlay
- text: to
- code: "false"
- text: in
- code: vite.config.ts
- text: .
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   |
  3   | // Skip auth tests in pure e2e without backend, or mock it.
  4   | // We'll mock the auth and API calls using playwright's page.route
  5   |
  6   | test.beforeEach(async ({ page }) => {
  7   |   // Mock localStorage for token
  8   |   await page.addInitScript(() => {
  9   |     window.localStorage.setItem('token', 'fake-jwt-token');
  10  |     window.localStorage.setItem('user', JSON.stringify({ name: 'Test User' }));
  11  |   });
  12  |
  13  |   // Mock API responses
  14  |   await page.route('**/api/jobs', async (route) => {
  15  |     if (route.request().method() === 'GET') {
  16  |       await route.fulfill({
  17  |         status: 200,
  18  |         contentType: 'application/json',
  19  |         body: JSON.stringify([
  20  |           { _id: '1', company: 'Tech Corp', position: 'Frontend Engineer', status: 'Applied', type: 'Full-time', createdAt: new Date().toISOString() },
  21  |           { _id: '2', company: 'Design Inc', position: 'UI Designer', status: 'Interview', type: 'Contract', createdAt: new Date().toISOString() }
  22  |         ])
  23  |       });
  24  |     } else if (route.request().method() === 'POST') {
  25  |       const postData = JSON.parse(route.request().postData() || '{}');
  26  |       await route.fulfill({
  27  |         status: 201,
  28  |         contentType: 'application/json',
  29  |         body: JSON.stringify({
  30  |           _id: Math.random().toString(),
  31  |           ...postData,
  32  |           createdAt: new Date().toISOString()
  33  |         })
  34  |       });
  35  |     }
  36  |   });
  37  |
  38  |   await page.route('**/api/jobs/*', async (route) => {
  39  |     if (route.request().method() === 'PUT') {
  40  |       const postData = JSON.parse(route.request().postData() || '{}');
  41  |       await route.fulfill({
  42  |         status: 200,
  43  |         contentType: 'application/json',
  44  |         body: JSON.stringify({
  45  |           _id: route.request().url().split('/').pop(),
  46  |           company: 'Updated',
  47  |           position: 'Updated',
  48  |           type: 'Full-time',
  49  |           ...postData,
  50  |           createdAt: new Date().toISOString()
  51  |         })
  52  |       });
  53  |     } else if (route.request().method() === 'DELETE') {
  54  |       await route.fulfill({ status: 200, body: JSON.stringify({ message: 'Deleted' }) });
  55  |     }
  56  |   });
  57  |
  58  |   await page.goto('/dashboard');
  59  | });
  60  |
  61  | test('JobDashboard component functionality', async ({ page }) => {
  62  |   // Verify "Applied" tab is active by default
  63  |   const appliedTab = page.getByRole('tab', { name: 'Applied' });
> 64  |   await expect(appliedTab).toBeVisible();
      |                            ^ Error: expect(locator).toBeVisible() failed
  65  |   await expect(appliedTab).toHaveAttribute('aria-selected', 'true');
  66  |
  67  |   // Verify switching tabs
  68  |   const interviewTab = page.getByRole('tab', { name: 'Interview' });
  69  |   await interviewTab.click();
  70  |   await expect(interviewTab).toHaveAttribute('aria-selected', 'true');
  71  |   await expect(appliedTab).toHaveAttribute('aria-selected', 'false');
  72  |
  73  |   // Go back to applied tab
  74  |   await appliedTab.click();
  75  |
  76  |   // Verify "+ New Application" button
  77  |   const newButton = page.getByRole('button', { name: 'New Application' });
  78  |   await expect(newButton).toBeVisible();
  79  |
  80  |   // Create tasks for testing filters
  81  |   // Task 1: Full-time
  82  |   await newButton.click();
  83  |   await page.getByPlaceholder('e.g. Google').fill('Apple');
  84  |   await page.getByPlaceholder('e.g. Senior Frontend Engineer').fill('Fullstack Engineer');
  85  |   // Default category is Full-time
  86  |   await page.getByRole('button', { name: 'Create' }).click();
  87  |
  88  |   // Wait for dialog to close to avoid matching buttons inside it
  89  |   await expect(page.locator('form')).toBeHidden();
  90  |
  91  |   // Verify task is visible
  92  |   await expect(page.getByText('Fullstack Engineer')).toBeVisible();
  93  |
  94  |   // Change status of first job to interview
  95  |   const firstJobDropdown = page.locator('select').first();
  96  |   await firstJobDropdown.selectOption('Interview');
  97  |
  98  |   // Go to Interview tab
  99  |   await interviewTab.click();
  100 |
  101 |   // Delete the job from interview tab
  102 |   const deleteBtn = page.getByRole('button', { name: 'Delete' }).first();
  103 |   await deleteBtn.click();
  104 | });
  105 |
```