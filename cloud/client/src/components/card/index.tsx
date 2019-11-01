import Taro, { PureComponent } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

interface Props {
  src: string,
}

interface State {
  style: any
}

export default class Card extends PureComponent<Props, State> {

  state = {
    style: {}
  }

  componentWillMount = () => {
    // 375
    // Taro.getSystemInfo().then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err)
    // })
  }

  componentDidMount = () => {
    // const { src } = this.props;
    // Taro.getImageInfo({
    //   src,
    // }).then(res => {
    //   let ratio = 375 / res.width
    //   let height = ratio * res.height
    //   this.setState({
    //     style: {
    //       height: height + 'rpx',
    //       width: '375rpx'
    //     }
    //   })
    // }).catch(err => {
    //   console.log(err)
    // })
  }

  render () {
    const { src } = this.props;

    return (
      <View className='card_warp'>
        <Image lazyLoad={true} className="image" mode="widthFix" src={src} />
      </View>
    )
  }
}
