// r123am@gmail.com
// q123am@gmail.com
// Amazon@123

const { test, expect } = require('playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CartPage } = require('../pageobjects/CartPage');
const { OrderSummaryPage } = require('../pageobjects/OrderSummaryPage');

// json -> string (json.stringify) -> javascript object (json.parse)
const testdata = JSON.parse(JSON.stringify(require('../utils/testdata.json')));


const username = "r123am@gmail.com";
const password = "Amazon@123";
// const Product = "ADIDAS ORIGINAL";
const Product = "ZARA COAT 3";
// const Product = "iphone 13 pro";
 


test(`E2E - place order for Product`, async ({ browser }) => {

    // browser initialization

    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);


    await loginPage.goTo();
    await loginPage.ValidLogin(username, password);
    await dashboardPage.SearchAndAddToCart(Product);
    await cartPage.NavigateToCart();
    await cartPage.PlaceOrder(username);
    await orderSummaryPage.verifyOrder();
    

});

