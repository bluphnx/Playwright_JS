// r123am@gmail.com
// Amazon@123

const { test, expect } = require('playwright/test');


test("E2E - using CSS Selectors - place order in Client website", async ({ browser }) => {

    // browser initialization

    const context = await browser.newContext();
    const page = await context.newPage();

    // variables 
    const OpenUrl = page.goto("https://rahulshettyacademy.com/client");
    const userName = page.locator("[formcontrolname='userEmail']");
    const Password = page.locator("#userPassword");
    const SignIn = page.locator("#login");
    const cardTitles = page.locator(".card-body b");
    const cardPrices = page.locator("div.card-body .text-muted");
    const allAddToCart = page.locator("button.w-10");
    const cartQuantityNo = page.locator("button[routerlink*='dashboard'] label");
    const AddedToCartSuccessMsg = page.locator("#toast-container");
    const email = "r123am@gmail.com";
    const myOrdersTab = page.locator("button[routerlink*='myorders']");
    const myOrdersLink = page.locator("label[routerlink*='myorders']");


    // code
    // await page.pause(); 
    await OpenUrl;
    await userName.fill(email);
    await Password.fill("Amazon@123");
    await SignIn.click();
    await cardTitles.last().waitFor();
    const allTitles = await cardTitles.allTextContents();
    const allPrices = await cardPrices.allTextContents();
    const Product = "ZARA COAT 3";


    // console.log(allTitles,allPrices)

    for (let index = 0; index < allTitles.length; index++) {
        // const element = array[index];

        // console.log(`Title : alltitles.nth[index] Price : allprices.nth[index]`); // wrong
        console.log(`${index + 1}) Product : ${allTitles[index]} => Price : ${allPrices[index]}`);

        if (`${allTitles[index]}` == Product) {

            // console.log(`${allTitles[index]}`);
            // await page.pause();
            await allAddToCart.nth(index).click();
            // await AddedToCartSuccessMsg.waitFor();
            // console.log(await cartQuantityNo.textContent()); 
            // 
            await page.locator("#toast-container").locator("text=Product Added To Cart").waitFor();
            console.log(await AddedToCartSuccessMsg.textContent());
            // Option: Use toContainText — auto-waits for the text to appear
            await expect(AddedToCartSuccessMsg).toContainText('Product Added To Cart');

            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").last().waitFor({timeout:2000});
    const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
    await expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    // await page.locator("li[class='totalRow'] button[type='button']").click(); // checkout
    await page.locator("[placeholder*='Country']").pressSequentially('Ind');
    /*
    In the previous lecture, we used the following step to enter characters into an edit dropbox:

    await page.locator("[placeholder*='Country']").pressSequentially("ind");

    This step may occasionally fail if the application server is slow due to heavy traffic. In such cases, you can introduce a delay and rewrite the step as:

    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });

Here, a delay of 150 milliseconds is introduced between each key press.
That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d

By doing this, you give the application enough time to respond with the relevant options.
    */
    const dropdownlist = page.locator(".ta-results");
    await dropdownlist.waitFor();
    const optionscount = await dropdownlist.locator("button").count();

    for (let i = 0; i < optionscount; ++i) {

        let text = await dropdownlist.locator("button").nth(i).textContent();

        if (text === ' India') {
            await dropdownlist.locator("button").nth(i).click();
            break;

        }
    }

    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    // console.log(await page.locator("h1.hero-primary").textContent());
    await page.locator("h1.hero-primary").waitFor();
    // await page.pause();
    expect(await page.locator("h1.hero-primary")).toHaveText('Thankyou for the order.');
    const orderidstring = await page.locator("label.ng-star-inserted").textContent();
    console.log(orderidstring);

    let orderid = orderidstring.replaceAll("|", "").trim();
    console.log(orderid);

    await myOrdersLink.click();
    await page.locator("tbody tr th").last().waitFor();
    const orderCount = await page.locator("tbody tr th").count();

    for (let index = 0; index < orderCount; index++) {

        if (await page.locator("tbody tr th").nth(index).textContent() === orderid) {

            console.log(await page.locator("tbody tr th").nth(index).textContent());
            // await page.pause();
            await page.locator("tr .btn-primary").nth(index).click();
            break;
        }

    }
    console.log(await page.locator(".email-title").textContent());
    await expect(page.locator(".email-title")).toHaveText(" order summary ");
    console.log(await page.locator("div.col-text").textContent());
    await expect(page.locator("div.col-text")).toHaveText(orderid);

    // await page.pause();
// Gracefully close up everything
  await context.close();
  await browser.close();
});