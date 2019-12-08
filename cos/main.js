var rp = require('request-promise');
const download = require('download');
var fs = require('fs');
var cheerio = require('cheerio'); // Basically jQuery for node.js
var COS = require("cos-nodejs-sdk-v5");
var config = require('./config');

var cos = new COS({
    // 必选参数
    SecretId: config.SecretId,
    SecretKey: config.SecretKey,
    // 可选参数
    FileParallelLimit: 3, // 控制文件上传并发数
    ChunkParallelLimit: 8, // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
    ChunkSize: 1024 * 1024 * 8, // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
    Proxy: '',
});

var options = {
    method: 'GET',
    headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',
        "Referer": 'https://www.zhihu.com/question/305114445/answer/672200918'

    },
    uri: 'https://www.zhihu.com/question/305114445/answer/672200918',
    transform: function (body) {
        return cheerio.load(body);
    }
};

// rp(options)
//     .then(($) => {
//         const title = $('h1').text()
//         $('figure > img').each((index, item) => {
//             // console.log(index, item.attribs['data-original'])
//             if (item.name === "img") {
//                 const url = item.attribs['data-original']
//                 download(url, `./wallpaper/305114445/672200918`, (err) => {
//                     console.log('下载', err)
//                 })
//             }
//         })

//     })
//     .catch(function (err) {
//         console.log('请求错误', err)
//         // Crawling failed or Cheerio choked...
//     });


    let files =fs.readdirSync('./wallpaper/305114445/672200918');
    files.forEach((item, index) => {
        // const writeStream = fs.createWriteStream(item);
        // writeStream.on("finish", function () {
        cos.putObject({
            Bucket: config.Bucket, // Bucket 格式：test-1250000000
            Region: config.Region,
            /* 必须 */
            Key: `./wallpaper/${item}`,
            /* 必须 */
            StorageClass: 'STANDARD',
            Body: fs.createReadStream(`./wallpaper/305114445/672200918/${item}`), // 上传文件对象
        }, function (err, data) {
            console.log(err || `第${index}个` + item + "上传成功")
        });
            // writeStream.end();
        // });
    })