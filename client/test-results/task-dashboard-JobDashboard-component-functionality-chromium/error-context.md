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
- region "Notifications (F8)":
  - list
- region "Notifications alt+T"
- banner:
  - heading "Dashboard" [level=1]
  - paragraph: Welcome,
  - button "Logout"
- heading "Analytics" [level=2]
- application: Applied Interview Offer Rejected 0 1 2 3 4
- heading "Job Applications" [level=2]
- button "+ New Job"
- textbox "Search company or position..."
- combobox:
  - option "All Statuses" [selected]
  - option "Applied"
  - option "Interview"
  - option "Offer"
  - option "Rejected"
- table:
  - rowgroup:
    - row "Company Position Status Location Actions":
      - columnheader "Company"
      - columnheader "Position"
      - columnheader "Status"
      - columnheader "Location"
      - columnheader "Actions"
  - rowgroup:
    - row "Tech Corp Frontend Engineer Applied - Edit Delete":
      - cell "Tech Corp"
      - cell "Frontend Engineer"
      - cell "Applied"
      - cell "-"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
    - row "Design Inc UI Designer Interview - Edit Delete":
      - cell "Design Inc"
      - cell "UI Designer"
      - cell "Interview"
      - cell "-"
      - cell "Edit Delete":
        - button "Edit"
        - button "Delete"
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