import { View } from '@tarojs/components'
import LucaColumn from 'src/components/globals/column'
import LucaText from 'src/components/globals/text'
import useLoginLogic from './logic'

export default function LoginPage() {
  const logic = useLoginLogic()

  return (
    <View>
      <LucaColumn style={{ padding: '20px' }}>
        <LucaText size="20px" weight="bold">
          Login 页面
        </LucaText>
        <LucaText color="#666">
          这是 login 页面的内容
        </LucaText>
      </LucaColumn>
    </View>
  )
}
