/*
* @Author: dangxiaoli
* @Date:   2018-01-18 15:32:42
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-01-19 00:09:01
*/

//任务
//在百度搜索图片，爬取
//分析
//页面是懒加载，异步加载，用cheerio拿到的html几乎是空的；所以要用Headless Chorme模拟用户真实的访问;

const puppeteer = require('puppeteer');
const { mn } = require('./config/default.js');
const srcToImg = require('../helper/srcToimg.js');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://image.baidu.com');
    console.log('go to https://image.baidu.com');
    /*
    *   如何拿到懒加载网页的内容
    *   1. 不断滚动浏览器，不断触发懒加载
    *   2. 给浏览器的窗口改的非常大，一次性加载完所有
    */

    await page.evaluate({
        width: 1920,
        height: 1080
    });
    console.log('reset viewPort');

    /*
     *  页面焦点到输入框
     */
    await page.focus('#kw');
    await page.keyboard.sendCharacter('狗');

    /*
     *  触发按钮的点击
     */
    await page.click('.s_btn');
    console.log('go to a search list');

    /*
     *  等待加载完成
     */
     page.on('load', () => {
        console.log('page loading done, start fetch...');
        //获取图片列表
        const result = await page.evaluate(() => {
            const images = document.querySelectorAll('img.main_img');
            return Array.prototype.map.call(images, img => {
                img.src
            })
        });
        console.log(`get ${result.length} images, start download`);

        // result.forEach(src => {
        //     srcToImg(src, mn);
        // });

        result.forEach(src => {
            await srcToImg(src, mn);
        });
        await browser.close();
     });


})();

















