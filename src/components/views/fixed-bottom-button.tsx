import LucaButton from '../globals/button'
import LucaContainer from '../globals/container'
import { getGlobalBottomMarginTop, getGlobalButtonHeight } from '../constant'

interface LucaFixedBottomButtonProps {
  height?: number | string // 按钮容器高度 (可选,默认 116px)
  children?: React.ReactNode // 按钮内容 (可选)
  onClick?: () => void // 点击事件 (可选)
}

export default function LucaFixedBottomButton(props: LucaFixedBottomButtonProps) {
  const buttonHeight = props.height || getGlobalButtonHeight()
  const marginTop = getGlobalBottomMarginTop()
  const totalHeight =
    typeof buttonHeight === 'number'
      ? buttonHeight + marginTop
      : parseFloat(buttonHeight) + marginTop

  return (
    <LucaContainer
      height={totalHeight + 'px'}
      shadow={false}
      style={{
        paddingTop: getGlobalBottomMarginTop() + 'px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <LucaButton
        type="primary"
        style={{ width: 'calc(100% - 32px)', height: buttonHeight + 'px' }}
        onClick={props.onClick}
      >
        {props.children || '底部按钮'}
      </LucaButton>
    </LucaContainer>
  )
}
