const { LoginPage } = require('./LoginPage')
const { DashboardPage } = require('./DashboardPage')
const { CartPage } = require('./CartPage')
const { OrderSummaryPage } = require('./OrderSummaryPage')

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderSummaryPage = new OrderSummaryPage(this.page);

    }

    getLoginPage() {

        return this.loginPage;
    }
    getDashboardPage() {

        return this.dashboardPage;
    }
    getCartPage() {

        return this.cartPage;
    }
    getOrderSummaryPage() {

        return this.orderSummaryPage;
    }


}
module.exports = { POManager };