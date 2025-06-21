import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'

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
    <FooterContainer style={style} $inverted={inverted}>
      {hasMessage && <p>Ao voltar, você não perde o seu progresso</p>}
      <MainFooter>{children}</MainFooter>
    </FooterContainer>
  )
}

interface FooterContainerProps {
  $inverted: boolean
}

const FooterContainer = styled.div<FooterContainerProps>`
  display: flex;
  flex-direction: ${({ $inverted }) =>
    $inverted ? 'column-reverse' : 'column'};
  gap: 0.5rem;
`

const MainFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
