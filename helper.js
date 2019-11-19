const protractor = require("protractor");


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

class Helper {
    // login username
    userName() {
        return element(by.id('username'));
    }
    // login username label
    userNameBlock() {
        return $('form .form-group:nth-child(1)');
    }
    //login password
    password() {
        return element(by.id('password'));
    }
    //login password Label
    passwordBlock() {
        return $('form .form-group:nth-child(2)');
    }
    // login button
    loginbutton() {
        return element(by.id('log-in'));
    }
    // login warning
    loginWarning() {
        return $('.alert-warning');
    }
}
exports.Helper = Helper;