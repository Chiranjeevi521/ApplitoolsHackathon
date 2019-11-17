const protractor = require("protractor");


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

class Helper {
    //Click on element
    click(aElement) {
        aElement.click();
        browser.driver.sleep(1000);
    }
    //Fill element
    fill(aElement, aValue) {
        aElement.sendKeys(aValue);
    }
    //Clear element
    clear(aElement) {
        aElement.clear();
    }
    // login username
    userName() {
        return element(by.id('username'));
    }
    // login username label
    userNameBlock() {
        return element(by.css('form .form-group:nth-child(1)'));
    }
    //login password
    password() {
        return element(by.id('password'));
    }
    //login password Label
    passwordBlock() {
        return element(by.css('form .form-group:nth-child(2)'));
    }
    // login button
    loginbutton() {
        return element(by.id('log-in'));
    }
    // login warning
    loginWarning() {
        return element(by.css('.alert-warning'));
    }
}
exports.Helper = Helper;