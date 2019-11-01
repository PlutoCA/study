import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Card from '../../components/card' 
import './index.scss'

// import Login from "../../components/login/index.weapp"

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '广场'
  }

  state = {
    list: []
  }

  componentWillMount () { }

  componentDidMount () { 
    const db = Taro.cloud.database()
    db.collection('list2').get().then(res => {
      console.log(res.data)
      this.setState({
        list: res.data
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { list } = this.state;
    // <Card src="https://api.uomg.com/api/rand.img1?sort=美女&format=images" />
    return (
      <View className='g-container'>
        <View className='g-queue'>
          {
            list.reverse().map((item : any) => (
              <Card key={item._id} src={item.img_small} />
            ))
          }
        </View>
        <View className='g-queue'>
          {
            list.reverse().map((item : any) => (
              <Card key={item._id} src={item.img_small} />
            ))
          }
        </View>
      </View>
    )
  }
}
