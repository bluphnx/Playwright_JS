const base  = require('@playwright/test');

exports.customtest = base.test.extend(

    {
        TestDataForOrder:
        {
            username: "q123am@gmail.com",
            password: "Amazon@123",
            Product: "iphone 13 pro"
        }

    }

)