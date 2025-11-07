import { Button } from "@nutui/nutui-react-taro"
import { ButtonProps } from "@nutui/nutui-react-taro"

interface LucaButtonProps extends Partial<ButtonProps> {}

export default function LucaButton(props: LucaButtonProps) {
  return (
    <Button color="orange" {...props}>
      {props.children} 
    </Button>
  )
}