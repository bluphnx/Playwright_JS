# Cucumber BDD with Playwright — Setup & Learnings

## Running Cucumber Tests

```bash
# Run all feature files
npx cucumber-js

# Run specific feature file
npx cucumber-js features/loginPractice.feature

# Run by tag
npx cucumber-js --tags "@E2E"
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@E2E and not @skip"
```

---

## Project Structure

```
features/
├── ecommerce1.feature           ← Feature files (Gherkin)
├── loginPractice.feature
├── step_definitions/
│   └── steps.js                 ← Step definitions (automation code)
└── support/
    └── hooks.js                 ← Before/After hooks (setup/teardown)
```

---

## Feature File Example

```gherkin
Feature: Ecommerce Validation
    @E2E
    Scenario: Incorrect Login and verify error message
        Given I login to the LoginPractice application with "rahulshettyacademy" and "Learning@"
        Then verify error message is displayed
```

---

## Hooks (features/support/hooks.js)

```js
const { After, Before, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const playwright = require('playwright');

Before(async function () {
    this.browser = await playwright.chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});

BeforeStep(async function () {
    console.log("=== Before Step ===");
});

AfterStep(async function ({ result }) {
    console.log("=== After Step ===");
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'fail_screenshot_1.png' });
    }
});
```

**What each hook does:**

| Hook        | When it runs              | Purpose                                |
|-------------|---------------------------|----------------------------------------|
| Before      | Before EACH scenario      | Launch browser, create page            |
| After       | After EACH scenario       | Close browser (cleanup)                |
| BeforeStep  | Before EACH step          | Logging, debugging                     |
| AfterStep   | After EACH step           | Screenshot on failure                  |

---

## Common Errors & Fixes

### 1. "function timed out, ensure the promise resolves within 5000 milliseconds"

**Cause:** Cucumber's default step timeout is 5 seconds. Browser actions take longer.

**Fix — increase timeout:**
```js
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(30000);  // 30 seconds for all steps
```

Or per step:
```js
Given('I login...', { timeout: 30000 }, async function(user, pass) {
    // ...
});
```

---

### 2. "ReferenceError: expect is not defined"

**Cause:** `expect` isn't imported in `steps.js`.

**Fix:**
```js
const { expect } = require('@playwright/test');
```

---

### 3. Program doesn't end after tests pass

**Cause:** Browser is never closed. Node.js process stays alive.

**Fix:** Add After hook to close browser:
```js
After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});
```

---

### 4. Step count shows more steps than feature file

**Example:** Feature has 2 steps, but output shows "4 steps passed"

**Reason:** Cucumber counts `Before` and `After` hooks in the step total.

```
.                    ← Before hook (counted)
.                    ← Given step
.                    ← Then step
.                    ← After hook (counted)
= 4 steps reported (but only 2 are actual test steps)
```

This is normal behavior — your actual test steps passed correctly.

---

## Key Differences: Playwright Test Runner vs Cucumber

| Feature              | Playwright Test Runner              | Cucumber + Playwright           |
|----------------------|-------------------------------------|---------------------------------|
| Test definition      | `test('name', async () => {})`      | Feature file (Gherkin)          |
| Browser management   | Automatic (fixtures)                | Manual (hooks)                  |
| Timeout              | 30s default (configurable)          | 5s default (must increase)      |
| expect import        | Auto-available                      | Must import manually            |
| Parallelism          | Built-in workers                    | Needs configuration             |
| Reporting            | Built-in HTML + Allure              | Needs separate reporters        |
| Cleanup              | Automatic                           | Must write After hook           |

---

## Step Definitions — Key Rules

1. **Use `function()` not arrow `=>`** — to access `this` (World object)
2. **Share state via `this`** — `this.page`, `this.browser`, `this.context`
3. **Always await** — all Playwright actions are async
4. **Import expect** — not globally available like in Playwright test runner

```js
// WRONG — arrow function can't access 'this'
Given('...', async () => {
    this.page.goto(...)  // ❌ 'this' is undefined
});

// CORRECT — regular function
Given('...', async function() {
    await this.page.goto(...)  // ✅ 'this' works
});
```

---

## Tags — Run Selective Scenarios

```gherkin
@smoke
Scenario: Quick login check
    ...

@E2E @regression
Scenario: Full order flow
    ...

@wip
Scenario: Work in progress (skip this)
    ...
```

```bash
npx cucumber-js --tags "@smoke"              # Only smoke
npx cucumber-js --tags "@E2E"                # Only E2E
npx cucumber-js --tags "@smoke or @E2E"      # Both
npx cucumber-js --tags "not @wip"            # Skip WIP
```

---

## Screenshot on Failure

```js
AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        const screenshot = await this.page.screenshot();
        this.attach(screenshot, 'image/png');  // Attach to Cucumber report
    }
});
```

---

*Source: Playwright + Cucumber BDD Integration*
