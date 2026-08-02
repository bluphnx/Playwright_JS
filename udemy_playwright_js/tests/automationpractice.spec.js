const { test, expect } = require('@playwright/test');

test("automation practice", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    let OpenUrl = page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await OpenUrl;
    // OpenUrl = page.goto("https://www.google.com");
    // await OpenUrl;
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();
    // await expect(page.locator("#displayed-text")).toBeVisible();
    // await page.locator("#hide-textbox").click();
    // await expect(page.locator("#displayed-text")).toBeHidden();
    page.on("dialog", dialog => dialog.accept());
    // await page.pause();
    await page.locator("#confirmbtn").click();
    // await page.waitForEvent("dialog");
    await page.locator("#mousehover").hover();
    await page.screenshot({path: 'screen_1.png'})
    await page.locator("#dropdown-class-example").click();
    await page.screenshot({path: 'screen_2.png'})
    await page.locator("#dropdown-class-example").screenshot({path: 'screen__locator_3.png'})
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li [href*='lifetime-access']:visible").click();
    const text = await framePage.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);

});

test("visual test", async ({ page }) => {

await page.goto("https://www.google.com");
expect(await page.screenshot()).toMatchSnapshot('google.png')
});
