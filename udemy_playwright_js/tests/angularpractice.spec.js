const { test, expect } = require('@playwright/test');

test("Playwright Special Locators", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()

    const OpenUrl = page.goto("https://rahulshettyacademy.com/angularpractice");

    await OpenUrl;
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success!").isVisible();
    // by default 5 seconds provided for expect assertions in step level
    // we can override using {timeout:10000} - 10 seconds
    await expect(page.getByText("Success!")).toBeVisible({ timeout: 6000 });
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

});

test("Playwright Test level Timeout Example", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage()

    const OpenUrl = page.goto("https://rahulshettyacademy.com/angularpractice");
    const slowExpect = expect.configure({ timeout: 9000 });


    await OpenUrl;
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success!").isVisible();
    // by default 5 seconds provided for expect assertions in step level
    // we can override using {timeout:10000} - 10 seconds
    await slowExpect(page.getByText("Success!")).toBeVisible();
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

// Gracefully close up everything
  await context.close();
  await browser.close();

});

/**
 
Notes Recap
Playwright Timeouts — Recap Notes


1️⃣ ASSERTION Timeout (expect)

Example used: expect(page.getByText('Success!')).toBeVisible();

LevelHow to SetCodeGlobal
(applies to all tests)playwright.config.ts

export default defineConfig({
  expect: { timeout: 10000 }
});

Test
(applies to all assertions in one test only)expect.configure() inside the test

const slowExpect = expect.configure({ timeout: 10000 });
await slowExpect(locator).toBeVisible();

Step
(applies to just this one line)Pass timeout directly

await expect(page.getByText('Success!'))
  .toBeVisible({ timeout: 10000 });

📌 Default = 5s. Unrelated to test timeout — it's a separate clock.
2️⃣ ACTION Timeout (click, fill, waitFor, etc.)

Example used: await page.getByText('Get Started').click();

LevelHow to SetCodeGlobal
(applies to all actions across suite)playwright.config.ts

export default defineConfig({
  use: { actionTimeout: 10000 }
});

Test
(applies to all actions in one test)page.setDefaultTimeout()

page.setDefaultTimeout(10000);
await page.getByText('Get Started').click();

Step
(applies to just this one line)Pass timeout directly

await page.getByText('Get Started')
  .click({ timeout: 10000 });

📌 Default = 0 (no built-in limit — inherits whatever's left of the test's 30s).
📌 page.setDefaultTimeout() affects actions only, NOT assertions.
3️⃣ TEST Timeout (entire test function)

Example used: A test with multiple steps: goto → click → fill → click → assert.

LevelHow to SetCodeGlobal
(applies to every test in suite)playwright.config.ts

export default defineConfig({
  timeout: 60000
});

Test
(applies to just one test)test.setTimeout() inside the test

test('checkout flow', async ({ page }) => {
  test.setTimeout(60000);
  // ...
});

Step❌ Not applicable — test timeout has no per-line override; it's the ceiling for the whole test

📌 Default = 30s. This is one single cumulative clock — it does NOT reset between steps.
📌 Bonus shortcut: test.slow() triples the default (30s → 90s) without typing a number.
🔑 Golden Rule to Remember

    An explicit timeout (step or config) only shortens or lengthens that specific operation's own wait. It can never push execution beyond the overall Test Timeout. If the Test Timeout hits first, everything stops — regardless of what any action/assertion timeout was set to. 

Quick memory hook for students:

    Assertions → "Is it there?" → 5s default

    Actions → "Do it now" → 0 default (borrows from test clock)

    Test → "How long can the whole thing run?" → 30s default, the ultimate ceiling
 */