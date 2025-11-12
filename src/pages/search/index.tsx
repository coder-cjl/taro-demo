import { View } from '@tarojs/components'
import LucaColumn from 'src/components/globals/column'
import LucaText from 'src/components/globals/text'
import useSearchLogic from './logic'

export default function SearchPage() {
  const logic = useSearchLogic()

  return (
    <View>
      <LucaColumn style={{ padding: '20px' }}>
        <LucaText size="20px" weight="bold">
          Search 页面
        </LucaText>
        <LucaText color="#666">
          这是 search 页面的内容
        </LucaText>
      </LucaColumn>
    </View>
  )
}
