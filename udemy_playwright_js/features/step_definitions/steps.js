const { Given, When, Then } = require('@cucumber/cucumber')
const  playwright  = require('playwright');
const { LoginPage } = require('../../pageobjects/LoginPage');
const { DashboardPage } = require('../../pageobjects/DashboardPage');
const { CartPage } = require('../../pageobjects/CartPage');
const { OrderSummaryPage } = require('../../pageobjects/OrderSummaryPage');



Given('I login to the ecommerce application with {string} and {string}', async function (username, password) {

    this.browser = await playwright.chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    const loginPage = new LoginPage(this.page);
    await loginPage.goTo();
    await loginPage.ValidLogin(username, password);
});

When('I search for {string} and add it to cart', async function (product) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.SearchAndAddToCart(product);
});

When('I verify product is displayed in the cart', async function () {
    this.cartPage = new CartPage(this.page);
    await this.cartPage.NavigateToCart();

});

When('I enter account details and place the order for the {string}', async function (user) {

    await this.cartPage.PlaceOrder(user);
});

Then('I should see the order in the order history page', async function () {
    const orderSummaryPage = new OrderSummaryPage(this.page);
    await orderSummaryPage.verifyOrder();
});