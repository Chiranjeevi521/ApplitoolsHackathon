"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractorImageComparison =require('protractor-image-comparison');
const { join } = require('path');

exports.config = {
    framework: "jasmine",
    specs: ["Test_TraditionalWay.js","Test_WithApplitools.js"],
    directConnect: true,
    chromeDriver: 'C:\\BrowserServers\\chromedriver.exe',
    plugins: [
		{
			// The module name
			package: 'protractor-image-comparison',
			// Some options, see the docs for more
			options: {
				baselineFolder: join(process.cwd(), './BaseLineScreenShorts/'),
				formatImageName: `{tag}-{logName}-{1536}x{780}`,
				screenshotPath: join(process.cwd(), '.tmp/'),
				savePerInstance: true,
				autoSaveBaseline: true,
				// ... more options
			},
		},
	]
};
