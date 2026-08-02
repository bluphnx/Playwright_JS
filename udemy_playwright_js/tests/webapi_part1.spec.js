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


test("@API E2E - webapi - part 1", async ({ browser }) => {

    // browser initialization

    const context = await browser.newContext();
    const page = await context.newPage();

    // adding the token to browser local storage

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value)

    }, response.token);


    // variables 
    const OpenUrl = page.goto("https://rahulshettyacademy.com/client");

    // const userName = page.locator("[formcontrolname='userEmail']");
    // const Password = page.locator("#userPassword");
    // const SignIn = page.locator("#login");
    // const cardTitles = page.locator(".card-body b");
    // const cardPrices = page.locator("div.card-body .text-muted");
    // const allAddToCart = page.locator("button.w-10");
    // const cartQuantityNo = page.locator("button[routerlink*='dashboard'] label");
    // const AddedToCartSuccessMsg = page.locator("#toast-container");
    // const email = "r123am@gmail.com";
    const myOrdersTab = page.locator("button[routerlink*='myorders']");
    // const myOrdersLink = page.locator("label[routerlink*='myorders']");


    // code


    //login code

    await OpenUrl;
    // await userName.fill(email);
    // await Password.fill("Amazon@123");
    // await SignIn.click();

    // place order code

    //     await cardTitles.last().waitFor();
    //     const allTitles = await cardTitles.allTextContents();
    //     const allPrices = await cardPrices.allTextContents();
    //     const Product = "ZARA COAT 3";


    //     // console.log(allTitles,allPrices)

    //     for (let index = 0; index < allTitles.length; index++) {
    //         // const element = array[index];

    //         // console.log(`Title : alltitles.nth[index] Price : allprices.nth[index]`); // wrong
    //         console.log(`${index + 1}) Product : ${allTitles[index]} => Price : ${allPrices[index]}`);

    //         if (`${allTitles[index]}` == Product) {

    //             // console.log(`${allTitles[index]}`);
    //             // await page.pause();
    //             await allAddToCart.nth(index).click();
    //             // await AddedToCartSuccessMsg.waitFor();
    //             // console.log(await cartQuantityNo.textContent()); 
    //             // 
    //             await page.locator("#toast-container").locator("text=Product Added To Cart").waitFor();
    //             console.log(await AddedToCartSuccessMsg.textContent());
    //             // Option: Use toContainText — auto-waits for the text to appear
    //             await expect(AddedToCartSuccessMsg).toContainText('Product Added To Cart');

    //             break;
    //         }
    //     }
    //     await page.locator("[routerlink*='cart']").click();
    //     await page.locator("div li").last().waitFor({ timeout: 2000 });
    //     const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
    //     expect(bool).toBeTruthy();
    //     await page.locator("text=Checkout").click();
    //     // await page.locator("li[class='totalRow'] button[type='button']").click(); // checkout
    //     await page.locator("[placeholder*='Country']").pressSequentially('Ind');



    //     /*
    //     In the previous lecture, we used the following step to enter characters into an edit dropbox:

    //     await page.locator("[placeholder*='Country']").pressSequentially("ind");

    //     This step may occasionally fail if the application server is slow due to heavy traffic. In such cases, you can introduce a delay and rewrite the step as:

    //     await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });

    // Here, a delay of 150 milliseconds is introduced between each key press.
    // That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d

    // By doing this, you give the application enough time to respond with the relevant options.
    //     */
    //     const dropdownlist = page.locator(".ta-results");
    //     await dropdownlist.waitFor();
    //     const optionscount = await dropdownlist.locator("button").count();

    //     for (let i = 0; i < optionscount; ++i) {

    //         let text = await dropdownlist.locator("button").nth(i).textContent();

    //         if (text === ' India') {
    //             await dropdownlist.locator("button").nth(i).click();
    //             break;

    //         }
    //     }

    //     await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    //     await page.locator(".action__submit").click();


    // order placed successfully in last line 

    /*
    
    console.log(await page.locator("h1.hero-primary").textContent());
    await page.locator("h1.hero-primary").waitFor();
    // await page.pause();
    await expect(page.locator("h1.hero-primary")).toHaveText('Thankyou for the order.');
    const orderidstring = await page.locator("label.ng-star-inserted").textContent();
    console.log(orderidstring);

    let orderid = orderidstring.replaceAll("|", "").trim();
    console.log(orderid);
    
    */


    // validate the order summary page with api




    // validate the order summary page with api



    // await myOrdersLink.click(); // code
    await myOrdersTab.click(); // api testing - tap orders tab in navbar
    await page.pause();
    await page.locator("tbody tr th").last().waitFor();
    const orderCount = await page.locator("tbody tr th").count();

    for (let index = 0; index < orderCount; index++) {

        // if (await page.locator("tbody tr th").nth(index).textContent() === orderid) // code
        if (await page.locator("tbody tr th").nth(index).textContent() === response.orderid)   // api
        {

            console.log(await page.locator("tbody tr th").nth(index).textContent());
            // await page.pause();
            await page.locator("tr .btn-primary").nth(index).click();
            break;
        }

    }
    console.log(await page.locator(".email-title").textContent());
    await expect(page.locator(".email-title")).toHaveText(" order summary ");
    console.log(await page.locator("div.col-text").textContent());
    // await expect(page.locator("div.col-text")).toHaveText(orderid); // code
    await expect(page.locator("div.col-text")).toHaveText(response.orderid);    // API

    // await page.pause();
    // Gracefully close up everything
    await context.close();
    await browser.close();
});