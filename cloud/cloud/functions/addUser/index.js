/*
 * @Date: 2019-10-17 18:32:36
 * @LastEditors: Pluto
 * @LastEditTime: 2019-10-18 16:55:45
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  try {
    const user = await db.collection("user").where({
      _openid: _.eq(OPENID)
    }).get()
    return {
      OPENID,
      user: user.data
    }
  } catch (err) {
    return {
      err,
    }
  }

  // return wxContext.OPENID
}