const { test, expect, request } = require('playwright/test');

const { APIutils } = require('../utils/APIutils');

let apicontext;
let token;
const loginPayLoad = { userEmail: "r123am@gmail.com", userPassword: "Amazon@123" };
const orderPayload = { orders: [{ country: "Vietnam", productOrderedId: "6960ea76c941646b7a8b3dd5" }] } // iphone 13 pro
let ordersID;
let productOrderId;
let orderResponeMessage;


let response;


test.beforeAll(async () => {

    apicontext = await request.newContext();
    const apiutils = new APIutils(apicontext, loginPayLoad);
    response = await apiutils.createOrder(orderPayload);


    // AuthorizationToken - took from the place order network call
    // this is same as the the token we received from the login response token, but for every new login token refreshes so dont use this static variable AuthorizationToken
    // const AuthorizationToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTViNjk5NDg1Yjg4NDliNDlmNTI5ZmEiLCJ1c2VyRW1haWwiOiJyMTIzYW1AZ21haWwuY29tIiwidXNlck1vYmlsZSI6MTIzNDU2Nzg4OSwidXNlclJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc4NTU0MzMzOSwiZXhwIjoxODE3MTAwOTM5fQ.9dvcRqOVCC_b7snxYnUogOpLXfSc25zMRPekKBudT3M';


});


test("E2E - webapi - part 1", async ({ browser }) => {

    // browser initialization

    const context = await browser.newContext();
    const page = await context.newPage();

    // adding the token to browser local storage

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value)

    }, response.token);


    // variables 
    const OpenUrl = page.goto("https://rahulshettyacademy.com/client");

    const myOrdersTab = page.locator("button[routerlink*='myorders']");

    // code


    //login code

    await OpenUrl;


    // validate the order summary page with api



    // await myOrdersLink.click(); // code
    await myOrdersTab.click(); // api testing - tap orders tab in navbar
    await page.pause();
    await page.locator("tbody tr th").last().waitFor();
    const orderCount = await page.locator("tbody tr th").count();



});