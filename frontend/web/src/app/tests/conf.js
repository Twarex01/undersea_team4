exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['loginSpec.js'],
    onPrepare: function() {
        browser.driver.get('http://localhost:4200/login');

        var username = browser.driver.findElement(by.id('userName')).sendKeys('asd');;
        var password = browser.driver.findElement(by.id('password')).sendKeys('asd');
        var submitButton = browser.driver.findElement(by.id('submitBtn')).click();

        return browser.driver.wait(() => {
            return browser.driver.getCurrentUrl().then((url) => {
                return url;
            })
        }, 10000)
    }
  }