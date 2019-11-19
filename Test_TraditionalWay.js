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

    it("1. Login Page UI Elements Test", async() => {

        //version1
        await browser.get('https://demo.applitools.com/hackathon.html');

        // //version2
        // browser.get('https://demo.applitools.com/hackathonV2.html');

        // Verification of Labels
        await expect(h.loginPageHeader().getText()).toBe('Login Form');
        await expect(h.userNameBlock().getText()).toBe('Username');
        await expect(h.userName().getAttribute('placeholder')).toBe('Enter your username');
        await expect(h.passwordBlock().getText()).toBe('Password');
        await expect(h.password().getAttribute('placeholder')).toBe('Enter your password');
        await expect(h.loginbutton().getText()).toBe('Log In');
        await expect(h.rememberMeLabel().getText()).toBe('Remember Me');

        // Verification of Fieldss

        await expect(h.userName().isPresent()).toBe(true);
        await expect(h.password().isPresent()).toBe(true);
        await expect(h.rememberMeCheckBox().isPresent()).toBe(true);

        // Verification of icons

        await expect(h.userNameBlock().$('.os-icon-user-male-circle').isPresent()).toBe(true);
        await expect(h.passwordBlock().$('.os-icon-fingerprint').isPresent()).toBe(true);

        // Verification of images

        await expect(h.loginPageLogoImg()).toBe('https://demo.applitools.com/img/logo-big.png');
        await expect(h.loginPageSocialMediaTwitterImg()).toBe('https://demo.applitools.com/img/social-icons/twitter.png');
        await expect(h.loginPageSocialMediaFacebookImg()).toBe('https://demo.applitools.com/img/social-icons/facebook.png');
        await expect(h.loginPageSocialMediaLinkedInImg()).toBe('https://demo.applitools.com/img/social-icons/linkedin.png');

    });

    it("2. Data Driven Test", async() => {

        //Error to be shown upon clicking on login button without entering both user name and password
        h.loginbutton().click();
        await expect(h.loginWarning().getText()).toBe('Both Username and Password must be present');

        //Error to be shown upon clicking on login button without password
        h.userName().sendKeys('Test Username');
        h.loginbutton().click();
        await expect(h.loginWarning().getText()).toBe('Password must be present');

        //Error to be shown upon clicking on login button without entering user name
        h.userName().clear();
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        await expect(h.loginWarning().getText()).toBe('Username must be present');

        //Login should be successful upon entering user name and password
        h.userName().clear();
        h.password().clear();
        h.userName().sendKeys('Test Username');
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        await expect(element(by.cssContainingText('.top-menu-controls','Compare Expenses')).isPresent()).toBe(true);
 
     });    

     it("3. Table Sort Test : From amount sort - Ascending", async() => {

        var expsortingorder = [{amount:'- 320.00 USD', status:'Pending', date:'Yesterday', description:'MailChimp Services', category:'Software'},
        {amount:'- 244.00 USD', status:'Complete', date:'Jan 7th', description:'Ebay Marketplace', category:'Ecommerce'},
        {amount:'+ 17.99 USD', status:'Pending', date:'Jan 23rd', description:'Shopify product', category:'Shopping'},
        {amount:'+ 340.00 USD', status:'Pending', date:'Jan 9th', description:'Templates Inc', category:'Business'},
        {amount:'+ 952.23 USD', status:'Declined', date:'Jan 19th', description:'Stripe Payment Processing', category:'Finance'},
        {amount:'+ 1,250.00 USD', status:'Complete', date:'Today', description:'Starbucks coffee', category:'Restaurant / Cafe'}]

        h.amountColumnHeader().click();
        for(var i = 0; i< expsortingorder.length; i++){
            await expect($('tr:nth-child('+(i+1)+') td:nth-child(5) span').getText()).toBe(expsortingorder[i].amount);
            await expect($('tr:nth-child('+(i+1)+') td:nth-child(1) span:nth-child(2)').getText()).toBe(expsortingorder[i].status);
            await expect($('tr:nth-child('+(i+1)+') td:nth-child(2) span:nth-child(1)').getText()).toBe(expsortingorder[i].date);
            await expect($('tr:nth-child('+(i+1)+') td:nth-child(3) span').getText()).toBe(expsortingorder[i].description);
            await expect($('tr:nth-child('+(i+1)+') td:nth-child(4) a').getText()).toBe(expsortingorder[i].category);
        }
 
     });

     it("4. Canvas Chart Test", async() => {

        await h.showExpensesChart().click();
        await expect(element(by.id('canvas')).isPresent()).toBe(true);
        //await browser.imageComparison.saveFullPageScreen('Upto2018', { /* some options*/ }); // To save image as baseline
        await expect(browser.imageComparison.checkFullPageScreen('Upto2018', { /* some options*/ })).toEqual(0);
        await h.showExpensesChartNextYear().click();
        //await browser.imageComparison.saveFullPageScreen('Including2019', { /* some options*/ }); // To save image as baseline
        await expect(browser.imageComparison.checkFullPageScreen('Including2019', { /* some options*/ })).toEqual(0);
         
     });

     it("5. Dynamic Content Test", async() => {

        //Version1
        await browser.get('https://demo.applitools.com/hackathon.html?showAd=true');
        // //Version2
        // browser.get('https://demo.applitools.com/hackathonV2.html?showAd=true');

        h.userName().sendKeys('Test Username');
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        await expect($('#flashSale img').getAttribute('src')).toBe('https://demo.applitools.com/img/flashSale.gif');
        await expect($('#flashSale2 img').getAttribute('src')).toBe('https://demo.applitools.com/img/flashSale2.gif');   
     });
});