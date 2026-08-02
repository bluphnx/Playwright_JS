// const { test, expect } = require('playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CartPage } = require('../pageobjects/CartPage');
const { OrderSummaryPage } = require('../pageobjects/OrderSummaryPage');
const {customtest} = require('../utils/test-base');


customtest(`E2E - place order for `, async ({ browser,TestDataForOrder }) => {

    // browser initialization

    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);


    await loginPage.goTo();
    await loginPage.ValidLogin(TestDataForOrder.username, TestDataForOrder.password);
    await dashboardPage.SearchAndAddToCart(TestDataForOrder.Product);
    await cartPage.NavigateToCart();
    await cartPage.PlaceOrder(TestDataForOrder.username);
    await orderSummaryPage.verifyOrder();
    

});