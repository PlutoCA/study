var fs = require('fs');
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

// 读取目录
let files =fs.readdirSync('./image');


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
        Body: fs.createReadStream(`./image/${item}`), // 上传文件对象
    }, function (err, data) {
        console.log(err || `第${index}个` + item + "上传成功")
    });
        // writeStream.end();
    // });
})