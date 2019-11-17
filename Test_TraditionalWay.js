// Initialize the eyes SDK and set your private API key.
var protractor = require('protractor');
var helper = require('./helper');
var h = new helper.Helper();

describe("Hackathon - Traditional functional testing approach", function() {

    beforeAll(()=>{
             
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
 
    });

    // beforeEach( () => {

    // });

    it("Login Page UI Elements Test", function() {

        //version1
        browser.get('https://demo.applitools.com/hackathon.html');

        // //version2
        // browser.get('https://demo.applitools.com/hackathonV2.html');

        // Verification of Labels
        expect(element(by.css('.auth-header')).getText()).toBe('Login Form');
        expect(h.userNameBlock().getText()).toBe('Username');
        expect(h.userName().getAttribute('placeholder')).toBe('Enter your username');
        expect(h.passwordBlock().getText()).toBe('Password');
        expect(h.password().getAttribute('placeholder')).toBe('Enter your password');
        expect(h.loginbutton().getText()).toBe('Log In');
        expect(element(by.css('.form-check-label')).getText()).toBe('Remember Me');

        // Verification of Fieldss

        expect(h.userName().isPresent()).toBe(true);
        expect(h.password().isPresent()).toBe(true);
        expect(element(by.css('input.form-check-input')).isPresent()).toBe(true);

        // Verification of icons

        expect(h.userNameBlock().element(by.css('.os-icon-user-male-circle')).isPresent()).toBe(true);
        expect(h.passwordBlock().element(by.css('.os-icon-fingerprint')).isPresent()).toBe(true);
        expect(element(by.css('input.form-check-input')).isPresent()).toBe(true);

        // Verification of images

        expect(element(by.css('.logo-w a:nth-child(1) img')).getAttribute('src')).toBe('https://demo.applitools.com/img/logo-big.png');
        expect(element(by.css('.buttons-w div a:nth-child(1) img')).getAttribute('src')).toBe('https://demo.applitools.com/img/social-icons/twitter.png');
        expect(element(by.css('.buttons-w div a:nth-child(2) img')).getAttribute('src')).toBe('https://demo.applitools.com/img/social-icons/facebook.png');
        expect(element(by.css('.buttons-w div a:nth-child(3) img')).getAttribute('src')).toBe('https://demo.applitools.com/img/social-icons/linkedin.png');

    });

    it("Data Driven Test", function() {

        //Error to be shown upon clicking on login button without entering both user name and password
        h.loginbutton().click();
        expect(h.loginWarning().getText()).toBe('Both Username and Password must be present');

        //Error to be shown upon clicking on login button without password
        h.userName().sendKeys('Test Username');
        h.loginbutton().click();
        expect(h.loginWarning().getText()).toBe('Password must be present');

        //Error to be shown upon clicking on login button without entering user name
        h.userName().clear();
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        expect(h.loginWarning().getText()).toBe('Username must be present');

        //Login should be successful upon entering user name and password
        h.userName().clear();
        h.password().clear();
        h.userName().sendKeys('Test Username');
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        expect(element(by.cssContainingText('.top-menu-controls','Compare Expenses')).isPresent()).toBe(true);
 
     });    

     it("Table Sort Test : From amount sort - Ascending", function() {

        var expsortingorder = [{amount:'- 320.00 USD', status:'Pending', date:'Yesterday', description:'MailChimp Services', category:'Software'},
        {amount:'- 244.00 USD', status:'Complete', date:'Jan 7th', description:'Ebay Marketplace', category:'Ecommerce'},
        {amount:'+ 17.99 USD', status:'Pending', date:'Jan 23rd', description:'Shopify product', category:'Shopping'},
        {amount:'+ 340.00 USD', status:'Pending', date:'Jan 9th', description:'Templates Inc', category:'Business'},
        {amount:'+ 952.23 USD', status:'Declined', date:'Jan 19th', description:'Stripe Payment Processing', category:'Finance'},
        {amount:'+ 1,250.00 USD', status:'Complete', date:'Today', description:'Starbucks coffee', category:'Restaurant / Cafe'}]

        element(by.id('amount')).click();
        for(var i = 0; i< expsortingorder.length; i++){
            expect(element(by.css('tr:nth-child('+(i+1)+') td:nth-child(5) span')).getText()).toBe(expsortingorder[i].amount);
            expect(element(by.css('tr:nth-child('+(i+1)+') td:nth-child(1) span:nth-child(2)')).getText()).toBe(expsortingorder[i].status);
            expect(element(by.css('tr:nth-child('+(i+1)+') td:nth-child(2) span:nth-child(1)')).getText()).toBe(expsortingorder[i].date);
            expect(element(by.css('tr:nth-child('+(i+1)+') td:nth-child(3) span')).getText()).toBe(expsortingorder[i].description);
            expect(element(by.css('tr:nth-child('+(i+1)+') td:nth-child(4) a')).getText()).toBe(expsortingorder[i].category);
        }
 
     });

     it("Canvas Chart Test", function() {

        element(by.id('showExpensesChart')).click();
        expect(element(by.id('canvas')).isPresent()).toBe(true);
        expect(browser.imageComparison.checkElement(element(by.id('canvas')), 'Upto2018.png')).toEqual(0);
        element(by.buttonText('Show data for next year')).click();
        expect(browser.imageComparison.checkElement(element(by.id('canvas')), 'AfterAdding2019.png')).toEqual(0);
         
     });

     it("Dynamic Content Test", function() {

        //Version1
        browser.get('https://demo.applitools.com/hackathon.html?showAd=true');
        // //Version2
        // browser.get('https://demo.applitools.com/hackathonV2.html?showAd=true');

        h.userName().sendKeys('Test Username');
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        expect(element(by.css('#flashSale img')).getAttribute('src')).toBe('https://demo.applitools.com/img/flashSale.gif');
        expect(element(by.css('#flashSale2 img')).getAttribute('src')).toBe('https://demo.applitools.com/img/flashSale2.gif');   
     });
});