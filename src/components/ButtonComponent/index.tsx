import * as S from './styles'
import { ReactElement, CSSProperties } from 'react'

interface ButtonProps {
  icon?: ReactElement
  text?: string
  type?: 'button' | 'submit' | 'reset'
  action?: () => void
  variant?: 'default' | 'outline' | 'danger'
  style?: CSSProperties
}

export function ButtonComponent({
  icon,
  text,
  action,
  type = 'button',
  variant = 'default',
  style,
}: ButtonProps) {
  return (
    <S.ButtonContainer
      onClick={action ? () => action() : undefined}
      $variant={variant}
      style={style}
      type={type}
    >
      {icon}
      {text}
    </S.ButtonContainer>
  )
}
