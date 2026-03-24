import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'

interface MainContainerProps {
  children: ReactNode
  hasTable?: boolean
  style?: CSSProperties
}

export function MainContainer({
  children,
  hasTable = false,
  style,
}: MainContainerProps) {
  return (
    <Main style={style} $hasTable={hasTable}>
      {children}
    </Main>
  )
}

interface MainProps {
  $hasTable: boolean
}

const Main = styled.div<MainProps>`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${(props) => (props.$hasTable ? '2rem' : '2rem 10rem')};

  @media (max-width: 1000px) {
    padding: 1rem 0;
  }
`
