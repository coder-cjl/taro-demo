import { View } from '@tarojs/components'
import LucaColumn from 'src/components/globals/column'
import LucaText from 'src/components/globals/text'
import useDoctorLogic from './logic'
import { LucaButton } from 'src/components/luca-ui'

export default function DoctorPage() {
  const logic = useDoctorLogic()

  return (
    <View>
      <LucaColumn style={{ padding: '20px' }}>
        <LucaText size="20px" weight="bold">
          Doctor 页面
        </LucaText>
        <LucaText color="#666">这是 doctor 页面的内容</LucaText>
        <LucaButton onClick={logic.onEventBusClick}>Event Bus 事件</LucaButton>
      </LucaColumn>
    </View>
  )
}
