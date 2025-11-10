import LucaColumn from './column'
import LucaContainer from './container'
import LucaImage from './image'
import LucaText from './text'

interface LucaEmptyProps {
  image: string
  description?: string
  onClick?: () => void
}

export default function LucaEmpty(props: LucaEmptyProps) {
  return (
    <LucaContainer>
      <LucaColumn>
        <LucaImage src={props.image}></LucaImage>
        <LucaText>{props.description}</LucaText>
      </LucaColumn>
    </LucaContainer>
  )
}
