// Initialize the eyes SDK and set your private API key.
var helper = require('./helper');
var Eyes = require("eyes.selenium").Eyes;
var eyes = new Eyes();
eyes.setApiKey("D98cgCtCwmoKtn9weQBuxPsxar107LRXXt3YZHAOaypUN8110");
var h = new helper.Helper();

describe("Hackathon - visual AI testing with Applitools", function() {

    beforeAll(()=>{
             
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().maximize();
 
    });

    beforeEach(function() {

        // Had to place this seeting to avoid error : Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("Login Page UI Elements Test", function() {

        // Open a chrome browser.
        eyes.open(browser, "Hackathon App", "Login Page UI Elements Test");

        // Navigate the browser to the "hello world!" web-site.
        browser.ignoreSynchronization = true
        //Version1
        browser.get("https://demo.applitools.com/hackathon.html");

        // //Version2
        // browser.get("https://demo.applitools.com/hackathonV2.html");
        
        // // Verification of Labels
        // eyes.check('Login Form',element(by.css('.auth-header'))); // Unable to use eyes.check method as I am getting compile error issue

        // // Glimpse of error log :
        // //   Failed: target.getIgnoreObjects is not a function
        // //   Stack:
        // //     TypeError: target.getIgnoreObjects is not a function
        // //         at Eyes.check (D:\Office\Automation\ApplitoolsHackathon\node_modules\eyes.selenium\src\Eyes.js:228:20)
        // eyes.check('Username',h.userNameBlock());
        // eyes.checkElement(h.userName()); // This is to verify place holder text of user name field
        // eyes.check('Password', h.passwordBlock());
        // eyes.checkElement(h.password()); // This is to verify place holder text of password field
        // eyes.check('Log In',h.loginbutton());
        // eyes.check('Remember Me',element(by.css('.form-check-label'))); 
        // eyes.checkElement(h.userNameBlock().element(by.css('.os-icon-user-male-circle'))); // To verify user name icon
        // eyes.checkElement(h.passwordBlock().element(by.css('.os-icon-fingerprint'))); // To verify password icon 
        // eyes.checkElement(element(by.css('.logo-w a:nth-child(1) img'))); // To verify Top image
        // eyes.checkElement(element(by.css('.buttons-w div a:nth-child(1) img'))); // To verify social network image
        // eyes.checkElement(element(by.css('.buttons-w div a:nth-child(2) img'))); // To verify social network image
        // eyes.checkElement(element(by.css('.buttons-w div a:nth-child(3) img'))); // To verify social network image


        // Verification of Labels
        eyes.checkElement(element(by.css('.auth-header')));
        eyes.checkElement(h.userNameBlock());
        eyes.checkElement(h.userName()); // This is to verify place holder text of user name field
        eyes.checkElement( h.passwordBlock());
        eyes.checkElement(h.password()); // This is to verify place holder text of password field
        eyes.checkElement(h.loginbutton());
        eyes.checkElement(element(by.css('.form-check-label'))); 
        eyes.checkElement(h.userNameBlock().element(by.css('.os-icon-user-male-circle'))); // To verify user name icon
        eyes.checkElement(h.passwordBlock().element(by.css('.os-icon-fingerprint'))); // To verify password icon 
        eyes.checkElement(element(by.css('.logo-w a:nth-child(1) img'))); // To verify Top image
        eyes.checkElement(element(by.css('.buttons-w div a:nth-child(1) img'))); // To verify social network image
        eyes.checkElement(element(by.css('.buttons-w div a:nth-child(2) img'))); // To verify social network image
        eyes.checkElement(element(by.css('.buttons-w div a:nth-child(3) img'))); // To verify social network image

    });

    it("Data Driven Test", function() {

        //Error to be shown upon clicking on login button without entering both user name and password
        h.loginbutton().click();
        eyes.checkElement(h.loginWarning());

        //Error to be shown upon clicking on login button without password
        h.userName().sendKeys('Test Username');
        h.loginbutton().click();
        eyes.checkElement(h.loginWarning());

        //Error to be shown upon clicking on login button without entering user name
        h.userName().clear();
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        eyes.checkElement(h.loginWarning());

        //Login should be successful upon entering user name and password
        h.userName().clear();
        h.password().clear();
        h.userName().sendKeys('Test Username');
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        eyes.checkElement(element(by.css('.top-menu-controls')));
 
     }); 

     it("Table Sort Test : From amount sort - Ascending", function() {

        element(by.id('amount')).click();
        eyes.checkRegionByElement(element(by.id('transactionsTable')));
 
     });

     it("Canvas Chart Test", function() {

        element(by.id('showExpensesChart')).click();
        eyes.checkRegionByElement(element(by.id('canvas')));
        element(by.buttonText('Show data for next year')).click();
        eyes.checkRegionByElement(element(by.id('canvas')));

     });

     it("Dynamic Content Test", function() {

        //Version1
        browser.get('https://demo.applitools.com/hackathon.html?showAd=true');
        // //Version2
        // browser.get('https://demo.applitools.com/hackathonV2.html?showAd=true');

        h.userName().sendKeys('Test Username');
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        eyes.checkRegionByElement(by.css('#flashSale img'));
        eyes.checkRegionByElement(by.css('#flashSale2 img'));
        
        eyes.close();
     });
});