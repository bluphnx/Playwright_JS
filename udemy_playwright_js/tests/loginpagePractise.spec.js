const { test, expect } = require('@playwright/test');

test.skip('browser fixture', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.google.com");
});

test.skip('page fixture', async ({ page }) => {

    await page.goto("https://www.amazon.com")
    console.log(await page.title());
    await expect(page).toHaveTitle('Amazon.com. Spend less. Smile more.');

});

test.skip('page context test', async ({ page }) => {

    await page.goto("https://www.google.com");
    const title = await page.title();
    // console.log(title);
    await expect(page).toHaveTitle('Google');
});

test.skip('browser context test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.google.com");
    const title = await page.title();
    // console.log(title);
    await expect(page).toHaveTitle('oogle');
});

test('Sign in with wrong password and test error toast message', async ({ page }) => {


    const userName = page.locator('#username');
    const Password = page.locator('[name="password"]');
    const SubmitBtn = page.locator('.btn-md');
    const url = "https://rahulshettyacademy.com/loginpagePractise/";

    await page.goto(url);
    const title = await page.title();
    // console.log(title);
    // await expect(page).toHaveTitle('Google');
    await userName.fill("rahulshettyacademy"); // correct username
    // await page.locator('[name="password"]').fill('Learning@830$3mK2'); // correct password
    await Password.fill('Learning@'); // wrong password
    await SubmitBtn.click();

    const errorMsgLocator = page.locator('[style*="block"]');

    await expect(errorMsgLocator).toContainText('Incorrect');


    // const signInErrorMsg = await page.locator('[style*="block"]').textContent();

    const signInErrorMsg = await errorMsgLocator.textContent();
    console.log(signInErrorMsg);
    expect(signInErrorMsg).toContain('Incorrect');

    await userName.fill("");
    await Password.fill("");
    await SubmitBtn.click();
    await expect(errorMsgLocator).toContainText('Empty');


    // after success sign in - new page -> title
    // await expect(page).toHaveTitle('ProtoCommerce');
    // Gracefully close up everything
  await context.close();
  await browser.close();
});

test("login and list all products in website", async ({ browser }) => {

    // browser initialization

    const context = await browser.newContext();
    const page = await context.newPage();

    // variables 
    const BaseUrl = "https://rahulshettyacademy.com/loginpagePractise/"
    const userName = page.locator("input[name='username']");
    const Password = page.locator("#password");
    const userRadio = page.locator("span.checkmark").last();
    const AdminRadio = page.locator("span.checkmark").first();
    const PopUpOkay = page.locator("#okayBtn");
    const dropdown = page.locator("select.form-control");
    const TnC = page.locator("[name*='term']");
    const SignIn = page.locator("#signInBtn");
    const allPrices = page.locator(".card-body h5");
    const allTitles = page.locator(".card-body a");
    const DocumentLink = page.locator("a[href*='documents-request']");
    const TechSmartHireLink = page.locator("a[href*='techsmarthire']");

    // code

    // open website
    await page.goto(BaseUrl);
    // enter username
    await userName.fill("rahulshettyacademy");
    // enter password
    await Password.fill("Learning@830$3mK2");
    // click 'user' radio button
    await userRadio.click();
    // print if selected
    console.log(`userRadio : ` + await userRadio.isChecked());
    // validate radio button is clicked or not
    await expect(userRadio).toBeChecked();
    // user radio button > click > popup > okay
    await PopUpOkay.click();
    // user radio button > click > popup > cancel
    // await page.locator("#cancelBtn").click(); 
    // select Consultant option from dropdown
    await dropdown.selectOption("consult");
    // await expect(page.locator("select.form-control").selectOption("consult")).toContainText("Consultant"); // wrong
    // click terms and condition checkbox
    await TnC.click();
    // print if selected
    console.log(`TnC : ` + await TnC.isChecked());
    // validate check box is clicked or not
    await expect(TnC).toBeChecked();

    // uncheck the TnC
    await TnC.uncheck();
    // print if selected
    console.log(`TnC : ` + await TnC.isChecked());
    // validate check box is clicked or not
    await expect(await TnC.isChecked()).toBeFalsy();


    await expect(TechSmartHireLink).toHaveAttribute('class', 'blinkingText');
    await expect(DocumentLink).toHaveAttribute('class', 'blinkingText');


    // click sign-in button
    await SignIn.click();

    // to make sure the all page contents are loaded
    // if we exclude it also test will be passed but in the next statement allTextContents will have an empty array, 
    // in order to avoid that we write this to load all the elements and then get the text contents
    //wait for the first element to load
    await allPrices.first().textContent();
    // wait and print the first element to load
    // console.log(await page.locator(".card-body h5").first().textContent());

    // to get all prices from card
    const allprices = await allPrices.allTextContents();
    // to get all titles from card
    const alltitles = await allTitles.allTextContents();
    // to print all titles and prices from card
    // console.log(alltitles, allprices);

    for (let index = 0; index < alltitles.length; index++) {
        // const element = array[index];

        // console.log(`Title : alltitles.nth[index] Price : allprices.nth[index]`); // wrong
        console.log(`${index + 1}) Product : ${alltitles[index]} => Price : ${allprices[index]}`)

    }

    // await page.pause();
    // Gracefully close up everything
  await context.close();
  await browser.close();

});

test("extract username from document website and enter in Email field", async ({ browser }) => {

    // browser initialization

    const context = await browser.newContext();
    const page = await context.newPage();

    // variables 
    const BaseUrl = "https://rahulshettyacademy.com/loginpagePractise/"
    const userName = page.locator("input[name='username']");
    const Password = page.locator("#password");
    const userRadio = page.locator("span.checkmark").last();
    const AdminRadio = page.locator("span.checkmark").first();
    const PopUpOkay = page.locator("#okayBtn");
    const dropdown = page.locator("select.form-control");
    const TnC = page.locator("[name*='term']");
    const SignIn = page.locator("#signInBtn");
    const allPrices = page.locator(".card-body h5");
    const allTitles = page.locator(".card-body a");
    const DocumentLink = page.locator("a[href*='documents-request']");
    const TechSmartHireLink = page.locator("a[href*='techsmarthire']");

    // code

    // open website
    await page.goto(BaseUrl);

    // const [newPage, newPage2] = await Promise.all([
    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        DocumentLink.click(),
        // TechSmartHireLink.click()
    ]);

    const para = await newPage.locator(".red").textContent();
    // console.log(para); // full string
    const array1 = para.split("@");
    /*
array1 = [  'Please email us at mentor',  'rahulshettyacademy.com with below template to receive response ']
  */
    // console.log(array1);
    const array2 = array1[1].split(".");
    /**
array2 = [  'rahulshettyacademy',  'com with below template to receive response ']
     */
    // console.log(array2[0]); // rahulshettyacademy

    // const newPage2_title = await newPage2.title();
    // console.log(newPage2_title);


    await userName.fill(array2[0]);
    console.log(await userName.inputValue());
    // await page.pause();

    // Gracefully close up everything
  await context.close();
  await browser.close();
});
