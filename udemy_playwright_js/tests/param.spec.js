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


// const email = "r123am@gmail.com";
// const password = "Amazon@123";
// // const Product = "ADIDAS ORIGINAL";
// const Product = "ZARA COAT 3";
// // const Product = "iphone 13 pro";

// test.describe.configure({mode:"parallel"});
// test.describe.configure({mode:"serial"});
for(const data of testdata){
test(`@Web E2E - place order for ${data.Product}`, async ({ browser }) => {

    // browser initialization

    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const orderSummaryPage = new OrderSummaryPage(page);


    await loginPage.goTo();
    await loginPage.ValidLogin(data.username, data.password);
    await dashboardPage.SearchAndAddToCart(data.Product);
    await cartPage.NavigateToCart();
    await cartPage.PlaceOrder(data.username);
    await orderSummaryPage.verifyOrder();
    

});

}

/**
Remove-Item -Recurse -Force allure-results
Remove-Item -Recurse -Force allure-results
npx playwright test tests/automationpractice.spec.js
npx allure generate ./allure-results --clean
npx allure open ./allure-report

npx playwright test tests/clientPO_JsonData.spec.js --reporter=line,allure-playwright

--reporter=line,allure-playwright

java -jar jenkins.war -httpPort=9090

 */