import { Button } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import useHomeLogic from "./logic";
import LucaButton from "../../components/globals/button";
import LucaColumn from "src/components/globals/column";
import LucaText from "src/components/globals/text";
import LucaContainer from "src/components/globals/container";
import LucaRow from "src/components/globals/row";

export default function HomePage() {

  const logic = useHomeLogic()

  return (
    <View>
      <View>这是首页</View>
      <Button color="red" size="large" onClick={logic.fetchData}>这是按钮</Button>
      <LucaButton>自定义按钮2</LucaButton>
      <LucaColumn  alignItems="left">
        <LucaColumn itemMargin="10px" style={{margin: "10px 0 0 0"}}>
          <View>列布局 子元素1</View>
          <View>列布局 子元素2</View>
          <View>列布局 子元素3</View>
        </LucaColumn>

        <LucaColumn itemMargin="10px" style={{margin: "10px 0 0 0"}}>
          <LucaText>LucaText 子元素1</LucaText>
          <LucaText color="blue">LucaText 子元素2</LucaText>
          <LucaText weight={'lighter'}>LucaText 子元素3</LucaText>
        </LucaColumn>
        <LucaContainer backgroundColor="orange" padding="20px" borderRadius={8} shadow>
          <LucaColumn>
            <LucaText size={20} color="red" weight="bold" align="center" lineHeight={30}>
              这是一个使用LucaText组件的示例文本，演示了多种样式属性的应用效果。
            </LucaText>
            <LucaRow>
              <LucaText>LucaText 子元素1</LucaText>
              <LucaText color="blue">LucaText 子元素2</LucaText>
              <LucaText weight={'lighter'}>LucaText 子元素3</LucaText>
            </LucaRow>
            <LucaText>这是一个使用LucaText组件的示例文本，演示了多种样式属性的应用效果。</LucaText>
          </LucaColumn>
        </LucaContainer>
      </LucaColumn>
    </View>
  )
}