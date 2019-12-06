/*
 * @Date: 2019-12-06 16:36:25
 * @LastEditors: Pluto
 * @LastEditTime: 2019-12-06 17:13:59
 */
var request = require("request");
var fs = require('fs');
var COS = require("cos-nodejs-sdk-v5");
var config = require('./config');

var cos = new COS({
    // 必选参数
    SecretId: config.SecretId,
    SecretKey: config.SecretKey,
    // 可选参数
    FileParallelLimit: 3,    // 控制文件上传并发数
    ChunkParallelLimit: 8,   // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
    ChunkSize: 1024 * 1024 * 8,  // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
    Proxy: '',
});

var options = {
    url:'http://www.weshineapp.com/api/v1/index/package/2242?offset=0&limit=18'
    // url:'http://www.weshineapp.com/api/v1/index/package/389?offset=0&limit=18'
    // url: 'https://api.some-server.com/',
    // agentOptions: {
    //     cert: fs.readFileSync(certFile),
    //     key: fs.readFileSync(keyFile),
    //     passphrase: 'password',
    //     securityOptions: 'SSL_OP_NO_SSLv3'
    // }
};

request.get(options, function(err, response, body){
    // console.info(JSON.parse(response.body).data);
    const imgs = JSON.parse(response.body).data
    imgs.forEach((item) => {
        const writeStream = fs.createWriteStream(`./image2/${item.id}.jpg`);
        const readStream = request(item.thumb_url)
        readStream.pipe(writeStream);
        readStream.on('end', function() {
            console.log('文件下载成功');
        });
        readStream.on('error', function() {
            console.log("错误信息:" + err)
        })
        writeStream.on("finish", function() {
            cos.putObject({
                Bucket: config.Bucket, // Bucket 格式：test-1250000000
                Region: config.Region,   /* 必须 */
                Key: `./image/${item.id}.jpg`,              /* 必须 */
                StorageClass: 'STANDARD',
                Body: fs.createReadStream(`./image2/${item.id}.jpg`), // 上传文件对象
            }, function(err, data) {
                console.log(err || "上传成功")
            });
            writeStream.end();
        });
    });
});


