const { expect } = require('@playwright/test');


class DashboardPage {

    constructor(page) {

        this.page = page;
        this.cardTitles = page.locator(".card-body b");
        this.cardPrices = page.locator("div.card-body .text-muted");
        this.allAddToCart = page.locator("button.w-10");
        this.AddedToCartSuccessMsg = page.locator("#toast-container");

    }

    async SearchAndAddToCart(Product) {

        await this.cardTitles.last().waitFor();
        const allTitles = await this.cardTitles.allTextContents();
        const allPrices = await this.cardPrices.allTextContents();


        for (let index = 0; index < allTitles.length; index++) {

            console.log(`${index + 1}) Product : ${allTitles[index]} => Price : ${allPrices[index]}`);

            if (`${allTitles[index]}` == Product) {

                await this.allAddToCart.nth(index).click();

                await this.AddedToCartSuccessMsg.locator("text=Product Added To Cart").waitFor();
                console.log(await this.AddedToCartSuccessMsg.textContent());
                // Option: Use toContainText — auto-waits for the text to appear
                await expect(this.AddedToCartSuccessMsg).toContainText('Product Added To Cart');

                break;
            }
        }

    }



}

module.exports = { DashboardPage };