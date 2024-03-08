import * as S from './styles'

interface LabelProps {
  isRequired?: boolean
  text: string
}

export function LabelComponent({ isRequired, text }: LabelProps) {
  return (
    <S.Label>
      {text}
      {isRequired && <S.After> *</S.After>}
    </S.Label>
  )
}
