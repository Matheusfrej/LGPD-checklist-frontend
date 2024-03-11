import { CSSProperties, ReactNode } from 'react'
import * as S from './styles'

interface ActionsFooterContainerProps {
  style?: CSSProperties
  hasMessage?: boolean
  children: ReactNode
}

export function ActionsFooterContainer({
  children,
  hasMessage = false,
  style,
}: ActionsFooterContainerProps) {
  return (
    <S.FooterContainer style={style}>
      {hasMessage && <p>Ao voltar, você não perde o seu progresso</p>}
      <S.MainFooter>{children}</S.MainFooter>
    </S.FooterContainer>
  )
}
