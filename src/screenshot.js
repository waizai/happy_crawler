/*
* @Author: dangxiaoli
* @Date:   2018-01-18 15:32:42
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-01-18 16:26:43
*/
const puppeteer = require('puppeteer');
const { screenshot } = require('./config/default.js');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.baidu.com');
    await page.screenshot({
        path: `${screenshot}/${Date.now()}.png`
    });

    await browser.close();
})();
