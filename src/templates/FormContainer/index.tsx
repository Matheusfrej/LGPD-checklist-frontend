import { ReactNode } from 'react'
import * as S from './styles'
import { CSSProperties } from 'styled-components'

interface FormContainerProps {
  title?: string
  children: ReactNode
  id?: string
  style?: CSSProperties
  onSubmit: () => void
}

export function FormContainer({
  children,
  title,
  id = 'my-form',
  onSubmit,
  style,
}: FormContainerProps) {
  return (
    <S.FormContainer id={id} onSubmit={onSubmit} style={style}>
      {title && <h3>{title}</h3>}
      {children}
    </S.FormContainer>
  )
}
