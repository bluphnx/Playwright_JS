class APIutils {

    constructor(apicontext, loginPayLoad) {

        this.apicontext = apicontext;
        this.loginPayLoad = loginPayLoad;

    }

    async getToken() {

        // login api

        const loginRespone = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            });

        // console.log("Status:", loginRespone.status());
        // console.log("Body:", await loginRespone.text());  // See what's actually returned

        // expect(loginRespone.ok()).toBeTruthy();

        const loginResponeJson = await loginRespone.json();
        const token = loginResponeJson.token;

        console.log(token);

        return token;

    }

    async createOrder(orderPayload) {
        // order api
        let response = {};
        response.token = await this.getToken();

        const orderRespone = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json; charset=utf-8'
                }

            }
        );

        console.log("Body:", await orderRespone.text());  // See the server's error message
        // expect(orderRespone.ok()).toBeTruthy();
        // expect(orderRespone.status()).toBe(201);  // ✅ checks exact status code

        const orderResponeJson = await orderRespone.json();

        const ordersID = orderResponeJson.orders[0];
        console.log('orderResponeJson.orders[0]: ' + ordersID);
        const productOrderId = orderResponeJson.productOrderId[0];
        console.log('orderResponeJson.productOrderId[0]: ' + productOrderId);
        const orderResponeMessage = orderResponeJson.message;
        console.log('orderResponeJson.message: ' + orderResponeMessage);

        response.orderid = ordersID;

        return response;

    }
}

module.exports = { APIutils };