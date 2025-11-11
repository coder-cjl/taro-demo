import { Popup, PopupProps } from '@nutui/nutui-react-taro'

interface LucaPopupProps extends Partial<PopupProps> {}

export default function LucaPopup(props: LucaPopupProps) {
  return <Popup {...props}></Popup>
}
