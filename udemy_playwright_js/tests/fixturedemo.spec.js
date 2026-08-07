const { test, expect, request } = require('@playwright/test');

const { customtest } = require('../utils/fixtures');


customtest("fixture demo", async ({ authenticatedPage, createOrder }) => {

    const myOrdersTab = authenticatedPage.locator("button[routerlink*='myorders']");

    authenticatedPage.goto("https://rahulshettyacademy.com/client");

    await myOrdersTab.click(); // api testing - tap orders tab in navbar
    await authenticatedPage.locator("tbody tr th").last().waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderid)).toBeVisible();

});