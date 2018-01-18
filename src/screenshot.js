/*
* @Author: dangxiaoli
* @Date:   2018-01-18 15:32:42
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-01-18 16:05:39
*/
const puppeteer = require('puppeteer');


(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://github.com');
    await page.screenshot({
        path: 'screenshots/github.png'
    });


    browser.close();
})();
