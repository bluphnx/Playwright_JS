const { test, expect } = require('playwright/test')

test("Title - child window switch", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // await page.goto("https://rahulshettyacademy.com/documents-request");
    // await page.pause();


    const [newPage] = await Promise.all(
        [
        context.waitForEvent('page'),
        await page.locator("a[href*='documents-request']").click(),    
        ]
    );
    await newPage.waitForLoadState('networkidle');
    await newPage.getByRole('link', { name: 'Home' }).click();
    await page.waitForTimeout(3000);

})