const { element, browser } = require("protractor")

describe('Login Page', () => {
    var username = element(by.id('userName'));
    var password = element(by.id('password'));
    var submitButton = element(by.id('submitBtn'));

    it('should redirect on successful login', () => {
        browser.get('http://localhost:4200/login')

        username.sendKeys('asd');
        password.sendKeys('asd');

        submitButton.click();

        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
    })

})