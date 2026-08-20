const { After, Before, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const playwright = require('playwright');

Before(async function () {

    this.browser = await playwright.chromium.launch({
        headless: true
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

});


After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});

BeforeStep({tags:'@E2E'},async function () {
    console.log("=== @E2E Before Step ===");

});

AfterStep(async function ({ result }) {

    console.log("=== After Step ===");
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'fail_screenshot_1.png' });
    }

});