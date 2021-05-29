# applitools-protractor-demo
This project is to showcase protractor and applitool integration. 

For better understanding, created tests in both traditional ( without applitools ) and moderen ( with applitools) way.

Driver settings (For Chrome Driver) : 

1) Create a folder under C directory as mentioned below
C:\BrowserServers
2) Download chrome driver from below mentioned URL which matches your browser version and copy it to BrowserServers folder
URL : https://chromedriver.chromium.org/downloads

Steps to execute : 

1) Colne this repo
2) cmd into project folder
3) perform "npm install"


To run tests : 

Precondition : Update your applitools api key at Test_WithApplitools.js file

With Version 1 :

1) perform "npm run test" 


With Version 2 : 

1) For traditional way : Navigate to Test_TraditionalWay.js and disable lines #18, #114 and enable lines #21 and #117
2) For Applitools way :  Navigate to Test_WithApplitools.js and disable lines #37, #93 and enable lines #40 and #96
3) perform "npm run test"



