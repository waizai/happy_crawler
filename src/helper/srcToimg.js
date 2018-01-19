/*
* @Author: dangxiaoli
* @Date:   2018-01-18 23:40:57
* @Last Modified by:   dangxiaoli
* @Last Modified time: 2018-01-19 17:17:10
*/
const http = require('http');
const http = require('https');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);



module.exports = (src, dir) => {
    console.log(src)
}


//url  => image
const urlToImg = promisify((url, dir, callback) => {
    const mod = /^https:/.test(url) ? https : http;
    //返回文件路径的扩展名
    const ext = path.extname(url);
    const file = path.join(dir, `${Date.now()}${ext}`);



    //res pipe写入数据流对象
    mod.get(url, res => {
        res.pipe(fs.createWriteStream(file,{
            encoding: 'utf8'
        }))
        .on('finish',() => {
            callback();
            console.log(file);
        })
    });
});










//base64 => image
const base64ToImg = async function(base64Str, dir){
    //data:image/jpeg;base64/asdasda
    const matches = base64Str.match(/^data:(.+?);base64,(.+)$/);

    try{
        const ext = matches[1].split('/')[1]
            .replace('jpeg','jpg');
        const file = path.join(dir, `${Date.now()}.${ext}`);

        await writeFile(file, content, 'base64');
        console.log(file);
    }catch(err){
        console.log(`非法 base64 字符串`);
    }
}
