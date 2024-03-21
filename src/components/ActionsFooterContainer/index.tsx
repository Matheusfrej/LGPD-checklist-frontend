import { CSSProperties, ReactNode } from 'react'
import * as S from './styles'

interface ActionsFooterContainerProps {
  style?: CSSProperties
  hasMessage?: boolean
  inverted?: boolean
  children: ReactNode
}

export function ActionsFooterContainer({
  children,
  hasMessage = false,
  inverted = false,
  style,
}: ActionsFooterContainerProps) {
  return (
    <S.FooterContainer style={style} $inverted={inverted}>
      {hasMessage && <p>Ao voltar, você não perde o seu progresso</p>}
      <S.MainFooter>{children}</S.MainFooter>
    </S.FooterContainer>
  )
}
