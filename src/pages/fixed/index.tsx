import { View } from '@tarojs/components'
import LucaColumn from 'src/components/globals/column'
import { getGlobalButtonHeight } from 'src/components/constant'
import LucaFixedBottom from 'src/components/views/fixed-bottom'
import LucaFixedBottomButton from 'src/components/views/fixed-bottom-button'
import useFixedPageLogic from './logic'

export default function FixedPage() {
  const logic = useFixedPageLogic()

  function topChildren() {
    return (
      <LucaColumn style={{ paddingBottom: '20px' }}>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容2</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容3</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容4</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容5</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容6</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容7</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容8</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容9</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容10</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容11</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容12</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容13</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容14</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容15</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容16</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容17</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容18</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容19</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容20</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容21</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容22</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容23</View>
        <View style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>这是顶部内容24</View>
      </LucaColumn>
    )
  }

  return (
    <LucaFixedBottom
      bottomHeight={getGlobalButtonHeight()}
      topChildren={topChildren()}
      bottomChildren={
        <LucaFixedBottomButton onClick={logic.onBack}>底部固定按钮</LucaFixedBottomButton>
      }
    />
  )
}
