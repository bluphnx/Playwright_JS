const { Given, When, Then } = require('@cucumber/cucumber')
// const playwright = require('playwright');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { DashboardPage } = require('../../pageobjects/DashboardPage');
const { CartPage } = require('../../pageobjects/CartPage');
const { OrderSummaryPage } = require('../../pageobjects/OrderSummaryPage');
const { expect } = require('playwright/test');
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(30000);

// const { After,Before } = require('@cucumber/cucumber');

// After(async function () {
//     if (this.page) await this.page.close();
//     if (this.context) await this.context.close();
//     if (this.browser) await this.browser.close();
// });


// npx cucumber-js --exit -> if cucumber doesn't close the project and terminal is still open

// npx cucumber-js features/loginPractice.feature
// npx cucumber-js features/loginPractice.feature --tags "@Regression"
// npx cucumber-js --tags "@E2E"



Given('I login to the ecommerce application with {string} and {string}', async function (username, password) {

    // this.browser = await playwright.chromium.launch({
    //     headless: false
    // });
    // this.context = await this.browser.newContext();
    // this.page = await this.context.newPage();

    this.loginPage = new LoginPage(this.page);
    await this.loginPage.goTo();
    await this.loginPage.ValidLogin(username, password);
});

When('I search for {string} and add it to cart', async function (product) {
    this.dashboardPage = new DashboardPage(this.page);
    await this.dashboardPage.SearchAndAddToCart(product);
});

When('I verify product is displayed in the cart', async function () {
    this.cartPage = new CartPage(this.page);
    await this.cartPage.NavigateToCart();

});

When('I enter account details and place the order for the {string}', async function (user) {

    await this.cartPage.PlaceOrder(user);
});

Then('I should see the order in the order history page', async function () {
    this.orderSummaryPage = new OrderSummaryPage(this.page);
    await this.orderSummaryPage.verifyOrder();
});

Given('I login to the LoginPractice application with {string} and {string}', { timeout: 30000 }, async function (useremail, userpassword) {
// Given('I login to the LoginPractice application with {string} and {string}', async function (useremail, userpassword) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator('#username');
    const Password = this.page.locator('[name="password"]');
    const SubmitBtn = this.page.locator('.btn-md');
    const url = "https://rahulshettyacademy.com/loginpagePractise/";

    await this.page.goto(url);
    // const title = await page.title();

    await userName.fill(useremail);
    await Password.fill(userpassword); // wrong password
    await SubmitBtn.click();


});

Then('verify error message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    const errorMsgLocator = this.page.locator('[style*="block"]');

    await expect(errorMsgLocator).toContainText('Incorrect');
});


