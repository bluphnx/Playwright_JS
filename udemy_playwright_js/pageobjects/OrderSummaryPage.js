const { expect } = require('@playwright/test');


class OrderSummaryPage {

    constructor(page) {

        this.page = page;
        // this.myOrdersTab = page.locator("button[routerlink*='myorders']");
        this.myOrdersLink = page.locator("label[routerlink*='myorders']");

    }


    async verifyOrder() {
        // console.log(await page.locator("h1.hero-primary").textContent());
        await this.page.locator("h1.hero-primary").waitFor();
        // await page.pause();
        expect(await this.page.locator("h1.hero-primary")).toHaveText('Thankyou for the order.');
        const orderidstring = await this.page.locator("label.ng-star-inserted").textContent();
        console.log(orderidstring);

        let orderid = orderidstring.replaceAll("|", "").trim();
        console.log(orderid);

        await this.myOrdersLink.click();
        await this.page.locator("tbody tr th").last().waitFor();
        const orderCount = await this.page.locator("tbody tr th").count();

        for (let index = 0; index < orderCount; index++) {

            if (await this.page.locator("tbody tr th").nth(index).textContent() === orderid) {

                console.log(await this.page.locator("tbody tr th").nth(index).textContent());
                // await page.pause();
                await this.page.locator("tr .btn-primary").nth(index).click();
                break;
            }

        }
        console.log(await this.page.locator(".email-title").textContent());
        await expect(this.page.locator(".email-title")).toHaveText(" order summary ");
        console.log(await this.page.locator("div.col-text").textContent());
        await expect(this.page.locator("div.col-text")).toHaveText(orderid);
    }
}

module.exports = { OrderSummaryPage };