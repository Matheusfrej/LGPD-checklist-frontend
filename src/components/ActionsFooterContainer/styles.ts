import styled from 'styled-components'

interface FooterContainerProps {
  $inverted: boolean
}

export const FooterContainer = styled.div<FooterContainerProps>`
  display: flex;
  flex-direction: ${({ $inverted }) =>
    $inverted ? 'column-reverse' : 'column'};
  gap: 0.5rem;
`

export const MainFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
