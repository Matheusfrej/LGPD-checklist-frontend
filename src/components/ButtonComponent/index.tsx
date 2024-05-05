import * as S from './styles'
import { ReactElement, CSSProperties } from 'react'

interface ButtonProps {
  icon?: ReactElement
  text?: string
  type?: 'button' | 'submit' | 'reset'
  form?: string
  action?: () => void
  variant?: 'default' | 'outline' | 'danger'
  style?: CSSProperties
}

export function ButtonComponent({
  icon,
  text,
  action,
  form,
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
      form={form}
    >
      {icon}
      {text}
    </S.ButtonContainer>
  )
}
