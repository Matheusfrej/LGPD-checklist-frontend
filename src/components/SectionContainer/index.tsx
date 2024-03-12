import { CSSProperties, ReactNode } from 'react'
import * as S from './styles'

interface SectionContainerProps {
  style?: CSSProperties
  children: ReactNode
  hasHeader?: boolean
}

export function SectionContainer({
  children,
  style,
  hasHeader = false,
}: SectionContainerProps) {
  return (
    <S.Section $hasHeader={hasHeader} style={style}>
      {children}
    </S.Section>
  )
}
