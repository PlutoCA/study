/*
 * @Date: 2019-10-17 12:30:51
 * @LastEditors: Pluto
 * @LastEditTime: 2019-10-17 12:30:51
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    return {
      sum: event.a + event.b
    }
  }