const { expect } = require('@playwright/test');


class CartPage {

    constructor(page) {

        this.page = page;
    }
    async NavigateToCart() {

        await this.page.locator("[routerlink*='cart']").click();
        await this.page.locator("div li").last().waitFor();

    }


    async PlaceOrder(email) {

        // const bool = await this.page.locator("h3:has-text('Zara Coat 3')").isVisible();
        // await expect(bool).toBeTruthy();
        await this.page.locator("text=Checkout").click();
        // await this.page.locator("li[class='totalRow'] button[type='button']").click(); // checkout
        await this.page.locator("[placeholder*='Country']").pressSequentially('Ind');

        const dropdownlist = this.page.locator(".ta-results");
        await dropdownlist.waitFor();
        const optionscount = await dropdownlist.locator("button").count();

        for (let i = 0; i < optionscount; ++i) {

            let text = await dropdownlist.locator("button").nth(i).textContent();

            if (text === ' India') {
                await dropdownlist.locator("button").nth(i).click();
                break;

            }
        }

        expect(await this.page.locator(".user__name [type='text']").first()).toHaveText(email);
        await this.page.locator(".action__submit").click();

    }

}

module.exports = { CartPage };