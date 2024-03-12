import * as S from './styles'
import { ReactElement, CSSProperties } from 'react'

interface ButtonProps {
  icon?: ReactElement
  text: string
  action: () => void
  variant?: 'default' | 'outline'
  style?: CSSProperties
}

export function ButtonComponent({
  icon,
  text,
  action,
  variant = 'default',
  style,
}: ButtonProps) {
  return (
    <S.ButtonContainer
      onClick={() => action()}
      $variant={variant}
      style={style}
    >
      {icon}
      {text}
    </S.ButtonContainer>
  )
}
