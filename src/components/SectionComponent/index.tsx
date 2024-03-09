import { CSSProperties, ReactNode } from 'react'
import * as S from './styles'

interface SectionComponentProps {
  style?: CSSProperties
  children: ReactNode
  hasHeader?: boolean
}

export function SectionComponent({
  children,
  style,
  hasHeader = false,
}: SectionComponentProps) {
  return (
    <S.Section hasHeader={hasHeader} style={style}>
      {children}
    </S.Section>
  )
}
