import { TextArea, TextAreaProps } from '@nutui/nutui-react-taro'

interface LucaTextAreaProps extends Partial<TextAreaProps> {
  style?: React.CSSProperties
}

export default function LucaTextArea(props: LucaTextAreaProps) {
  return <TextArea {...props} style={{ ...props.style }} />
}
