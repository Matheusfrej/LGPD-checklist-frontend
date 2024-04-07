import { CSSProperties, ReactNode } from 'react'
import * as S from './styles'

interface SectionContainerProps {
  style?: CSSProperties
  children: ReactNode
  hasHeader?: boolean
  hasBorder?: boolean
}

export function SectionContainer({
  children,
  style,
  hasHeader = false,
  hasBorder = true,
}: SectionContainerProps) {
  return (
    <S.Section $hasHeader={hasHeader} $hasBorder={hasBorder} style={style}>
      {children}
    </S.Section>
  )
}
