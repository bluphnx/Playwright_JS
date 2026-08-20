const { Given, When, Then } = require('@cucumber/cucumber')
const playwright = require('playwright');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { DashboardPage } = require('../../pageobjects/DashboardPage');
const { CartPage } = require('../../pageobjects/CartPage');
const { OrderSummaryPage } = require('../../pageobjects/OrderSummaryPage');
const { After } = require('@cucumber/cucumber');

After(async function () {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});

// npx cucumber-js --exit -> if cucumber doesn't close the project and terminal is still open

Given('I login to the ecommerce application with {string} and {string}', async function (username, password) {

    this.browser = await playwright.chromium.launch({
        headless: false
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

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