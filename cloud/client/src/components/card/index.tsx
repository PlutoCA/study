import Taro, { PureComponent } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

interface Props {
    src: string,
}

export default class Card extends PureComponent<Props> {

  render () {
    const { src } = this.props;

    return (
      <View className='card_warp'>
          <Image src={src} />
      </View>
    )
  }
}
