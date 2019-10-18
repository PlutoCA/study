import Taro, { Component } from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"

export default class Login extends Component {
  state = {
    context: {}
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getLogin = () => {
    const db = Taro.cloud.database()
    db.collection('todo').add({
      data: {
        desc: 'aaa',
        date: 2018,
      },
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }

  getData = () => {
    const db = Taro.cloud.database()
    const _ = db.command;
    db.collection('user').get().then(res => {
      console.log(res.data)
    })
  }

  upload = () => {
    Taro.chooseImage({
      count: 1,
      success: (res) => {
        console.log(res.tempFilePaths[0])
        Taro.cloud.uploadFile({
          cloudPath: 'test/test.png',
          filePath: res.tempFilePaths[0],
          success: (r) => {
            console.log(r)
            Taro.cloud.getTempFileURL({
              fileList: [r.fileID],
              success: (e) => {
                console.log(e);
              },
              fail: (er) => console.log(er)
            })
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
    })
  }

  login = (e) => {
    console.log({
      ...e.detail.userInfo,
      timestamp: (new Date()).valueOf()
    })
    const db = Taro.cloud.database()
    db.collection('user').add({
      data: {
        ...e.detail.userInfo,
        timestamp: (new Date()).valueOf()
      },
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }

  addUser = () => {
    Taro.cloud.callFunction({
      name: "addUser",
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <View className='index'>
        <Button onClick={this.getLogin}>获取登录云函数</Button>
        <Button onClick={this.getData}>获取</Button>
        <Button onClick={this.upload}>上传</Button>
        <Button onGetUserInfo={this.login} openType="getUserInfo" >登录</Button>
        <Button onClick={this.addUser}>测试</Button>
      </View>
    )
  }
}
