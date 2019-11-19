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

    // login page header
    loginPageHeader() {
        return $('.auth-header');
    }

    // remember me label
    rememberMeLabel() {
        return $('.form-check-label');
    }

    // remember me check box
    rememberMeCheckBox() {
        return $('input.form-check-input');
    }

    
    // main logo image
    loginPageLogoImg() {
        return $('.logo-w a:nth-child(1) img').getAttribute('src');
    }

    
    // Twitter image at login page
    loginPageSocialMediaTwitterImg() {
        return $('.buttons-w div a:nth-child(1) img').getAttribute('src');
    }

    
    // Facebook image at login page
    loginPageSocialMediaFacebookImg() {
        return $('.buttons-w div a:nth-child(2) img').getAttribute('src');
    }

    
    // Linked in image at login page
    loginPageSocialMediaLinkedInImg() {
        return $('.buttons-w div a:nth-child(3) img').getAttribute('src');
    }

    // show expenses chart
    showExpensesChart() {
        return element(by.id('showExpensesChart'));
    }

    // show expenses chart for next year
    showExpensesChartNextYear() {
        return element(by.buttonText('Show data for next year'));
    }

    // Amount at table
    amountColumnHeader() {
        return element(by.id('amount'));
    }
}
exports.Helper = Helper;