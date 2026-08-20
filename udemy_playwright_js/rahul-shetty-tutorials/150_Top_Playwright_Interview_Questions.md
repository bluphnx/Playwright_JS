# 150 — Top 20 Playwright Interview Questions

## Table of Contents

| #  | Question                                                              |
|----|-----------------------------------------------------------------------|
| 1  | What is the difference between Browser Context and Page?              |
| 2  | Explain the Different Timeout Layers in Playwright                    |
| 3  | How Does Playwright Achieve Auto-Waiting?                             |
| 4  | How Do You Run Tests in Parallel?                                     |
| 5  | How Do You Handle Multiple Tabs (Child Windows)?                      |
| 6  | How Do You Handle iframes?                                            |
| 7  | Difference Between toBeAttached and toBeVisible                       |
| 8  | How Does Playwright Support API Testing & Network Interception?       |
| 9  | What is Page Object Model (POM)?                                      |
| 10 | How Do You Run Specific Tests?                                        |
| 11 | How Do You Run Tests Across Multiple Browsers?                        |
| 12 | How Does Playwright Handle Authentication State Reuse?                |
| 13 | Soft Assertions vs Regular Assertions                                 |
| 14 | How Do You Run Only Failed Tests?                                     |
| 15 | How Do You Handle Retries?                                            |
| 16 | How Do You Take Screenshots and Compare?                              |
| 17 | HTML Reports and Trace Viewer                                         |
| 18 | Codegen (Record & Playback)                                           |
| 19 | What are Fixtures in Playwright? (Bonus)                              |
| 20 | How Do You Handle Dialogs/Alerts? (Bonus)                             |
| 21 | Playwright vs Selenium (Bonus)                                        |
| 22 | How Do You Handle File Uploads? (Bonus)                               |
| 23 | What is page.evaluate()? (Bonus)                                      |
| 24 | How Do You Handle Dropdowns? (Bonus)                                  |
| 25 | What are Playwright Projects Used For? (Bonus)                        |

---

## Q1: What is the difference between Browser Context and Page?

**Browser** → An instance of a browser engine (Chromium, Firefox, WebKit)

**Browser Context** → An isolated incognito session within that browser
- Has its own cookies, localStorage, cache
- Nothing leaks between contexts
- Like opening a separate incognito window

**Page** → A single tab within a context
- Multiple pages can exist in one context
- Pages within the SAME context share cookies/session

```
Browser (chromium.launch())
├── Context 1 (incognito window 1)
│   ├── Page 1 (tab) — shares cookies with Page 2
│   └── Page 2 (tab) — shares cookies with Page 1
└── Context 2 (incognito window 2) — completely isolated
    └── Page 3 (tab) — has NO access to Context 1 cookies
```

**Key behavior:**
- Login in Page 1 → open Page 2 in same context → Page 2 is already logged in ✓
- Login in Context 1 → open Page 3 in Context 2 → Page 3 is NOT logged in ✗

**Code:**
```js
const browser = await chromium.launch();

// Context 1 — isolated session
const context1 = await browser.newContext();
const page1 = await context1.newPage();
await page1.goto('/login'); // Login here...

const page2 = await context1.newPage();
await page2.goto('/dashboard'); // Already logged in! (same context)

// Context 2 — completely fresh
const context2 = await browser.newContext();
const page3 = await context2.newPage();
await page3.goto('/dashboard'); // NOT logged in (different context)
```

**Follow-up question:** "Will pages within the same context share cookies?"
**Answer:** Yes — all pages in the same context share cookies, localStorage, and session data.

---

## Q2: Explain the Different Timeout Layers in Playwright

| Timeout Type     | Default            | Where to set                        | What it controls                    |
|------------------|--------------------|-------------------------------------|-------------------------------------|
| Test timeout     | 30 seconds         | `timeout: 60000` in config          | Entire test execution time          |
| Action timeout   | Falls back to test | `use: { actionTimeout: 10000 }`     | click, fill, check actions          |
| Navigation timeout| Falls back to test | `use: { navigationTimeout: 30000 }` | page.goto() URL loading             |
| Assertion timeout| **5 seconds**      | `expect: { timeout: 10000 }`        | expect() assertions (auto-retry)    |
| Global timeout   | No default         | `globalTimeout: 600000`             | Entire test suite run               |

**Key points:**
- If you don't set action/navigation timeout → they fall back to test timeout (30s)
- Assertion timeout has its OWN default of 5 seconds (separate from test timeout)
- You can override per-test: `test.setTimeout(60000)`

**Config example:**
```js
export default defineConfig({
    timeout: 60000,                    // Test: 60 seconds
    globalTimeout: 600000,             // Suite: 10 minutes
    expect: { timeout: 10000 },        // Assertions: 10 seconds
    use: {
        actionTimeout: 10000,          // Actions: 10 seconds
        navigationTimeout: 30000,      // Navigation: 30 seconds
    }
});
```

---

## Q3: How Does Playwright Achieve Auto-Waiting?

Playwright locators are **lazy** — they don't resolve until an action is performed.

Before performing any action (click, fill, check), Playwright automatically verifies:
- ✅ Element is **attached** to DOM
- ✅ Element is **visible**
- ✅ Element is **stable** (not animating)
- ✅ Element is **enabled** (not disabled)
- ✅ Element is **not obscured** (no overlay blocking it)

```js
await page.locator('#submit').click();
// Internally: waits for attached → visible → stable → enabled → not obscured → THEN clicks
```

**How long does it wait?**
- It waits up to the **action timeout** you configured
- Default: falls back to test timeout (30s)
- Custom: `use: { actionTimeout: 10000 }` → waits up to 10 seconds

**No explicit waits needed** (unlike Selenium):
```java
// Selenium — manual waits required
WebDriverWait wait = new WebDriverWait(driver, 10);
wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));
driver.findElement(By.id("submit")).click();

// Playwright — auto-wait built-in
await page.locator('#submit').click();  // That's it!
```

---

## Q4: How Do You Run Tests in Parallel?

**In config file:**
```js
export default defineConfig({
    workers: 4,              // 4 tests run simultaneously
    fullyParallel: true,     // Parallelize within files too
});
```

**From terminal (overrides config):**
```bash
npx playwright test --workers=4        # 4 parallel workers
npx playwright test --workers=50%      # Half your CPU cores
npx playwright test --workers=1        # Sequential (no parallel)
```

**Key:** Each worker gets its own isolated browser — no shared state, no conflicts.

---

## Q5: How Do You Handle Multiple Tabs (Child Windows)?

When a click opens a new tab, capture it with `Promise.all`:

```js
const [newPage] = await Promise.all([
    context.waitForEvent('page'),     // Listen for new tab event
    page.locator('a.external').click() // Action that opens new tab
]);

await newPage.waitForLoadState();
console.log(await newPage.title());   // Interact with new tab
```

**Why Promise.all?**
- Click and event listener must happen simultaneously
- If you click first → event already fired, you missed it
- Promise.all ensures both are captured together

---

## Q6: How Do You Handle iframes?

Use `frameLocator()` — switch to frame first, then locate elements inside:

```js
const frame = page.frameLocator('#payment-iframe');
await frame.locator('#card-number').fill('4111111111111111');
await frame.getByRole('button', { name: 'Pay Now' }).click();
```

**Key:** You CANNOT directly use `page.locator()` for elements inside iframes. Must use `frameLocator()` first.

---

## Q7: Difference Between toBeAttached and toBeVisible

| Assertion          | What it checks                                    | Element can be hidden? |
|--------------------|---------------------------------------------------|------------------------|
| `toBeAttached()`   | Element exists in the DOM (HTML)                  | ✅ Yes — hidden is OK  |
| `toBeVisible()`    | Element exists AND is rendered/visible to user    | ❌ No — must be visible |

**Use case for toBeAttached:**
- Testing mobile-only elements on desktop (element in DOM but hidden)
- Checking dynamic content is loaded but not yet displayed

```js
await expect(page.locator('#mobile-toggle')).toBeAttached();  // In DOM, maybe hidden
await expect(page.locator('#mobile-toggle')).toBeVisible();   // Actually visible
```

---

## Q8: How Does Playwright Support API Testing & Network Interception?

**API Testing (without browser):**
```js
const apiContext = await request.newContext();
const response = await apiContext.post('/api/login', {
    data: { email: 'user@mail.com', password: 'Pass123' }
});
expect(response.ok()).toBeTruthy();
```

**Network Interception (mock responses):**
```js
await page.route('**/api/users', route => {
    route.fulfill({
        status: 200,
        body: JSON.stringify([{ name: 'Mock User' }])
    });
});
```

**Use cases:**
- Mock API failures (500 errors)
- Test empty states (return empty array)
- Speed up tests (block images/analytics)
- Test loading states (delay responses)

---

## Q9: What is Page Object Model (POM)?

A design pattern that encapsulates page locators and actions into separate class files.

```js
// pageobjects/LoginPage.js
class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = page.getByPlaceholder('Email');
        this.password = page.locator('#password');
        this.loginBtn = page.getByRole('button', { name: 'Login' });
    }
    async login(email, pass) {
        await this.email.fill(email);
        await this.password.fill(pass);
        await this.loginBtn.click();
    }
}

// Test file — reads like business logic
const loginPage = new LoginPage(page);
await loginPage.login('user@mail.com', 'Pass123');
```

**Benefits:**
- Locator changes → fix ONE file, not 50 tests
- Tests are readable (method names, not raw selectors)
- Code reuse across tests

---

## Q10: How Do You Run Specific Tests?

```bash
# Run specific file
npx playwright test tests/login.spec.js

# Run by test name
npx playwright test -g "place order"

# Run by tag
npx playwright test --grep "@smoke"

# Exclude tag
npx playwright test --grep-invert "@slow"

# Run in specific browser
npx playwright test --project=firefox

# Headed mode (see browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug
```

---

## Q11: How Do You Run Tests Across Multiple Browsers?

**Config:**
```js
projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

**Run all browsers:** `npx playwright test`
**Run specific browser:** `npx playwright test --project=firefox`

---

## Q12: How Does Playwright Handle Authentication State Reuse?

**Step 1: Save context state after login:**
```js
await context.storageState({ path: 'auth.json' });
```

**Step 2: Reuse in config or new context:**
```js
// In config
use: { storageState: 'auth.json' }

// Or per context
const context = await browser.newContext({ storageState: 'auth.json' });
```

**Result:** New context starts already logged in — no repeated login!

---

## Q13: Soft Assertions vs Regular Assertions

**Regular — stops test on failure:**
```js
await expect(locator).toBeVisible();  // FAILS → test stops here
```

**Soft — continues test on failure:**
```js
await expect.soft(locator).toBeVisible();  // FAILS → test continues
await expect.soft(locator2).toHaveText('X'); // Still executes
// Test marked as failed at the end, but all steps ran
```

**When to use soft:** Long tests with multiple validations — don't want one failure to skip remaining checks.

---

## Q14: How Do You Run Only Failed Tests?

```bash
npx playwright test --last-failed
```

Checks the last HTML report, picks only failed tests, reruns them. Essential for CI/CD.

---

## Q15: How Do You Handle Retries?

**Config:**
```js
retries: 2   // Retry failed tests up to 2 more times
```

**Terminal:**
```bash
npx playwright test --retries=2
```

Handles flaky tests caused by network/environment issues.

---

## Q16: How Do You Take Screenshots and Compare?

```js
await expect(page).toHaveScreenshot('homepage.png');
```

- First run: saves reference screenshot
- Subsequent runs: compares pixel-by-pixel with reference
- Fails if visual difference detected

**Update screenshots when UI changes:**
```bash
npx playwright test --update-snapshots
```

---

## Q17: HTML Reports and Trace Viewer

**View report:**
```bash
npx playwright show-report
```

**Trace Viewer (captures full timeline):**
```js
// Config
use: { trace: 'retain-on-failure' }
```

**View trace:**
```bash
npx playwright show-trace test-results/trace.zip
```

**Trace shows:** DOM snapshots, network requests, console logs, screenshots at each step, timing.

---

## Q18: Codegen (Record & Playback)

```bash
npx playwright codegen https://example.com
```

Opens browser + inspector. Click around → generates Playwright code automatically.

---

## CLI Quick Reference

| Action                   | Command                                      |
|--------------------------|----------------------------------------------|
| Run all tests            | `npx playwright test`                        |
| Run specific file        | `npx playwright test tests/login.spec.js`    |
| Run by tag               | `npx playwright test --grep "@smoke"`        |
| Headed mode              | `npx playwright test --headed`               |
| Debug mode               | `npx playwright test --debug`                |
| Parallel (4 workers)     | `npx playwright test --workers=4`            |
| Specific browser         | `npx playwright test --project=firefox`      |
| Retry failures           | `npx playwright test --retries=2`            |
| Run last failed          | `npx playwright test --last-failed`          |
| View report              | `npx playwright show-report`                 |
| View trace               | `npx playwright show-trace trace.zip`        |
| Record tests             | `npx playwright codegen https://example.com` |
| Update screenshots       | `npx playwright test --update-snapshots`     |

---

## Additional Interview Questions (Bonus)

### Q19: What are fixtures in Playwright?
Fixtures are dependency injection — reusable test preconditions. Built-in: `{ page }`, `{ browser }`, `{ context }`. Custom fixtures extend these with authenticated pages, test data, etc.

### Q20: How do you handle dialogs (alerts)?
```js
page.on('dialog', dialog => dialog.accept());
await page.locator('#delete').click();
```
Register listener BEFORE the action that triggers the dialog.

### Q21: What is the difference between Playwright and Selenium?
- Auto-wait (no explicit waits needed)
- Built-in API testing
- Network interception (page.route)
- Faster (no HTTP bridge)
- All browsers bundled (no driver downloads)
- Trace Viewer for debugging
- Parallel execution without Grid

### Q22: How do you handle file uploads?
```js
await page.locator('input[type="file"]').setInputFiles('path/to/file.pdf');
```

### Q23: What is page.evaluate()?
Execute JavaScript directly in the browser:
```js
const value = await page.evaluate(() => document.title);
```

### Q24: How do you handle dropdowns?
```js
// Native <select>
await page.locator('select#country').selectOption('India');

// Custom dropdown
await page.locator('.dropdown-trigger').click();
await page.locator('.option').filter({ hasText: 'India' }).click();
```

### Q25: What are Playwright projects used for?
- Cross-browser testing (chromium, firefox, webkit)
- Device emulation (iPhone, Pixel)
- Environment separation (staging, production)
- Setup dependencies (login → tests)

---

*Source: Rahul Shetty Academy — Top Playwright Interview Questions*
