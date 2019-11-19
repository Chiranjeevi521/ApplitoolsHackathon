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

    it("1. Login Page UI Elements Test", async() => {

        // Open a chrome browser.
        await eyes.open(browser, "Hackathon App", "Login Page UI Elements Test");

        // Navigate the browser to the "hello world!" web-site.
        browser.ignoreSynchronization = true

        //Version1
        await browser.get("https://demo.applitools.com/hackathon.html");

        // //Version2
        // browser.get("https://demo.applitools.com/hackathonV2.html");

        await eyes.checkWindow('Login Screen');

    });

    it("2. Data Driven Test", async() => {

        //Error to be shown upon clicking on login button without entering both user name and password
        h.loginbutton().click();
        await eyes.checkWindow('Error when user name and password not provided');

        //Error to be shown upon clicking on login button without password
        h.userName().sendKeys('Test Username');
        h.loginbutton().click();
        await eyes.checkWindow('Error when password not provided');

        //Error to be shown upon clicking on login button without entering user name
        h.userName().clear();
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        await eyes.checkWindow('Error when Username not provided');

        //Login should be successful upon entering user name and password
        h.userName().clear();
        h.password().clear();
        h.userName().sendKeys('Test Username');
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        await eyes.checkWindow('Login Successful Page');
 
     }); 

     it("3. Table Sort Test : From amount sort - Ascending", async() => {

        await eyes.checkWindow('Table Without Sort By Amount');
        h.amountColumnHeader().click();
        await eyes.checkWindow('Table Sorted By Amount');
 
     });

     it("4. Canvas Chart Test", async() => {

        h.showExpensesChart().click();
        await eyes.checkWindow('ChartUpto2018');
        h.showExpensesChartNextYear().click();
        await eyes.checkWindow('ChartUpto2019');

     });

     it("5. Dynamic Content Test", async() => {

        //Version1
        await browser.get('https://demo.applitools.com/hackathon.html?showAd=true');
        // //Version2
        // browser.get('https://demo.applitools.com/hackathonV2.html?showAd=true');

        h.userName().sendKeys('Test Username');
        h.password().sendKeys('Test Secret');
        h.loginbutton().click();
        await eyes.checkWindow('FlashScreenAds');
        
        eyes.close();
     });
});