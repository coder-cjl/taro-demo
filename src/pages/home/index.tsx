import { Button, Popup, TextArea } from '@nutui/nutui-react-taro'
import { Input, View } from '@tarojs/components'
import useHomeLogic from './logic'
import LucaButton from '../../components/globals/button'
import LucaColumn from 'src/components/globals/column'
import LucaText from 'src/components/globals/text'
import LucaContainer from 'src/components/globals/container'
import LucaRow from 'src/components/globals/row'
import LucaTextArea from 'src/components/globals/textArea'
import { LucaPopup } from 'src/components/luca-ui'

export default function HomePage() {
  const logic = useHomeLogic()

  function bottomChildren() {
    return (
      <View style={{ padding: '20px 0px 0px 0px' }}>
        <LucaColumn>
          <LucaText size="16px" weight="bold" style={{ marginBottom: '10px' }}>
            底部弹出层内容
          </LucaText>
          <LucaText>这里是一些底部弹出层的示例内容。</LucaText>
          <LucaText>你可以在这里放置任何你想要展示的内容。</LucaText>
          <LucaButton style={{ marginTop: '15px' }} onClick={() => logic.onSetBottomVisible(false)}>
            关闭弹出层
          </LucaButton>
        </LucaColumn>
      </View>
    )
  }

  function popupBottom() {
    return (
      <LucaPopup
        position="bottom"
        visible={logic.visibleBottom}
        onOverlayClick={() => logic.onSetBottomVisible(false)}
      >
        {bottomChildren()}
      </LucaPopup>
    )
  }

  function popupCenter() {
    return (
      <LucaPopup
        position="center"
        visible={logic.visibleCenter}
        onClose={() => logic.onSetCenterVisible(false)}
      >
        <View>这是一个弹出层</View>
      </LucaPopup>
    )
  }

  function popupTop() {
    return (
      <LucaPopup
        position="top"
        visible={logic.visibleTop}
        onClose={() => logic.onSetTopVisible(false)}
      >
        <View>这是一个弹出层</View>
      </LucaPopup>
    )
  }

  return (
    <View>
      {/* <View>这是首页</View>
      <Button color="red" size="large" onClick={logic.fetchData}>
        跳转到详情页
      </Button> */}
      {/* <LucaButton>自定义按钮2</LucaButton> */}
      <LucaColumn alignItems="center" gap="10px">
        <LucaButton onClick={logic.onToMine}>跳转到 Doctor</LucaButton>
        <LucaButton onClick={logic.onShowLoading}>start loading</LucaButton>
        <LucaButton onClick={logic.onStopLoading}>stop loading</LucaButton>
        <LucaButton onClick={logic.onShowSuccess}>show success</LucaButton>
        <LucaButton onClick={logic.onShowError}>show error</LucaButton>
        <LucaButton onClick={logic.onShowToast}>show toast</LucaButton>
        <LucaButton onClick={logic.onSetUserInfo}>Set user info</LucaButton>
        <LucaButton onClick={() => logic.onSetBottomVisible(true)}>Toggle Bottom Popup</LucaButton>
        <LucaButton onClick={() => logic.onSetCenterVisible(true)}>Toggle Center Popup</LucaButton>
        <LucaButton onClick={() => logic.onSetTopVisible(true)}>Toggle Top Popup</LucaButton>
        <LucaButton onClick={() => logic.onWechatLogin()}>We Chat Login</LucaButton>
        <LucaContainer width={'100vw'}>
          <LucaRow justifyContent={'space-between'}>
            <LucaText>这是1</LucaText>
            <LucaText color="blue">这是2</LucaText>
            <LucaText weight={'lighter'}>这是3</LucaText>
          </LucaRow>
        </LucaContainer>

        {/* <LucaColumn itemMargin="10px" style={{ margin: '10px 0 0 0' }}>
          <View>列布局 子元素1</View>
          <View>列布局 子元素2</View>
          <View>列布局 子元素3</View>
        </LucaColumn>

        <LucaColumn itemMargin="10px" style={{ margin: '10px 0 0 0' }}>
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
        {/* <Input
          style={{ width: '300px', height: '200px', backgroundColor: 'red' }}
          placeholder="1232132131232"
        ></Input> */}
        {/* <LucaTextArea
          style={{ backgroundColor: '#f6f6f6', padding: '12px 16px' }}
          placeholder="这是一段输入"
        ></LucaTextArea> */}
      </LucaColumn>
      {popupBottom()}
      {popupCenter()}
      {popupTop()}
    </View>
  )
}
