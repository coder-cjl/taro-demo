import LucaButton from '../globals/button'
import LucaContainer from '../globals/container'
import { getGlobalBottomFixedHeight } from '../constant'

interface LucaFixedBottomButtonProps {
  height?: number | string // 按钮容器高度 (可选,默认 116px)
  children?: React.ReactNode // 按钮内容 (可选)
  onClick?: () => void // 点击事件 (可选)
}

export default function LucaFixedBottomButton(props: LucaFixedBottomButtonProps) {
  return (
    <LucaContainer
      height={props.height || getGlobalBottomFixedHeight()}
      shadow={false}
      padding={'20px 0px 0px 0px'}
      style={{
        alignContent: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <LucaButton
        type="primary"
        style={{ width: 'calc(100% - 32px)', height: '50px' }}
        onClick={props.onClick}
      >
        {props.children || '底部按钮'}
      </LucaButton>
    </LucaContainer>
  )
}
