class LoginPage {

    constructor(page) {

        this.page = page;
        this.SignInBtn = page.locator("#login");
        this.userName = page.locator("[formcontrolname='userEmail']");
        this.Password = page.locator("#userPassword");

    }

    async goTo(){

        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async ValidLogin(username,password) {

        await this.userName.fill(username);
        await this.Password.fill(password);
        await this.SignInBtn.click();
    }


}

module.exports = {LoginPage};