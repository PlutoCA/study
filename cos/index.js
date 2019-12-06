/*
 * @Date: 2019-12-05 18:11:59
 * @LastEditors: Pluto
 * @LastEditTime: 2019-12-06 17:08:30
 */
  
var fs = require('fs');
var path = require('path');
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
// http://www.weshineapp.com/api/v1/index/package/389?offset=0&limit=30
function getBucket() {
    cos.getBucket({
        Bucket: config.Bucket, // Bucket 格式：test-1250000000
        Region: config.Region,
        // Prefix: 'image/'
    }, (err, data) => {
        console.log(data.Contents[5])
        // data.Contents.forEach((item, index) => {     
        //     if (index >= 1 && index <= data.Contents.length /2) {
        //         cos.getObject({
        //             Bucket: config.Bucket, /* 必须 */
        //             Region: config.Region,    /* 必须 */
        //             Key: item.Key,              /* 必须 */
        //             Output: fs.createWriteStream(`${item.Key}`)
        //         }, function(e, d) {
        //             console.log(e || d);
        //         });
        //     }       
        // });
        // cos.headObject({
        //     Bucket: config.Bucket, /* 必须 */
        //     Region: config.Region,    /* 必须 */
        //     Key: data.Contents[5].Key,               /* 必须 */
        // }, function(e, d) {
        //     console.log('data', d, data.Contents[5].Key)
        // });
    });
}
// getBucket()
cos.putObject({
    Bucket: config.Bucket, // Bucket 格式：test-1250000000
    Region: config.Region,   /* 必须 */
    Key: 'picture2.jpg',              /* 必须 */
    StorageClass: 'STANDARD',
    Body: fs.createReadStream('http://dl.weshineapp.com/gif/20190929/a90ec13f32ec3803c8ceb02e4aaeebaf.jpg'), // 上传文件对象
    onProgress: function(progressData) {
        console.log(JSON.stringify(progressData));
    }
}, function(err, data) {
    console.log(err || data);
});



