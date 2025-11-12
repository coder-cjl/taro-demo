import { View } from '@tarojs/components'
import LucaColumn from 'src/components/globals/column'
import LucaText from 'src/components/globals/text'
import useMineLogic from './logic'

export default function MinePage() {
  const logic = useMineLogic()

  return (
    <View>
      <LucaColumn style={{ padding: '20px' }}>
        <LucaText size="20px" weight="bold">
          Mine 页面
        </LucaText>
        <LucaText color="#666">
          这是 mine 页面的内容
        </LucaText>
      </LucaColumn>
    </View>
  )
}
