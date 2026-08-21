
const { test, expect, request } = require('@playwright/test');

const loginRequestPayload = { userEmail: "r123am@gmail.com", userPassword: "Amazon@123" };

let response;
   

test.beforeAll(async () => {

    const apicontext = await request.newContext();
    response = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginRequestPayload,
    })

    expect(response.ok()).toBeTruthy();

})

test("api post", async ({ page }) => {

    const myOrdersTab = page.locator("button[routerlink*='myorders']");

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value)

    }, (await response.json()).token);

    console.log(await response.json());

    await page.goto("https://rahulshettyacademy.com/client");
    
    await myOrdersTab.click();
    await page.waitForTimeout(2000);
})