import { CSSProperties, ReactNode } from 'react'
import * as S from './styles'

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
    <S.Main style={style} hasTable={hasTable}>
      {children}
    </S.Main>
  )
}
