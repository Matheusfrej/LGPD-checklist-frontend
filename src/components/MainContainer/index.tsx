import { CSSProperties, ReactNode } from 'react'
import * as S from './styles'

interface MainContainerProps {
  style?: CSSProperties
  children: ReactNode
}

export function MainContainer({ children, style }: MainContainerProps) {
  return <S.Main style={style}>{children}</S.Main>
}
