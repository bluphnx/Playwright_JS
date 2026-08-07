const base = require('@playwright/test');
const { APIutils } = require('./APIutils.js');
const { request } = require('playwright/test');

const loginPayLoad = { userEmail: "r123am@gmail.com", userPassword: "Amazon@123" };
const orderPayload = { orders: [{ country: "Vietnam", productOrderedId: "6960ea76c941646b7a8b3dd5" }] } // iphone 13 pro


exports.customtest = base.test.extend(

    {
        authenticatedPage: async ({ browser }, use) => {


            const context = await browser.newContext();
            const page = await context.newPage();

            // variables 
            const email = "r123am@gmail.com";
            const OpenUrl = page.goto("https://rahulshettyacademy.com/client");
            const userName = page.locator("[formcontrolname='userEmail']"); // [role='value']
            const Password = page.locator("#userPassword"); // #id
            const SignIn = page.locator("#login"); // #id
            const cardTitles = page.locator(".card-body b"); // .class

            await OpenUrl;
            await userName.fill(email);
            await Password.fill("Amazon@123");
            await SignIn.click();
            await cardTitles.last().waitFor();
            await use(page);
// tear down
            await context.close();

        }
        ,

        createOrder: async ({ }, use) => {
            const apicontext = await request.newContext();
           
            const apiutils = new APIutils(apicontext, loginPayLoad);
            let response = await apiutils.createOrder(orderPayload);
            await use(response);
            // tear down - is written after 'use' sstatement

            await apicontext.dispose();

        },
        testData :{

            ProductName : 'ADIDAS ORIGINAL'
        }
    }

);