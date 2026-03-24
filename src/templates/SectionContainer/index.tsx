import { CSSProperties, ReactNode } from 'react'
import styled, { css } from 'styled-components'

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
    <Section $hasHeader={hasHeader} $hasBorder={hasBorder} style={style}>
      {children}
    </Section>
  )
}

interface SectionProps {
  $hasHeader: boolean
  $hasBorder: boolean
}

const Section = styled.section<SectionProps>`
  display: flex;
  flex-direction: column;
  ${({ $hasBorder }) =>
    $hasBorder &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.span};
    `}

  border-top: 10px solid
    ${({ theme, $hasHeader }) => ($hasHeader ? theme.colors.contrast : 'none')};
  background-color: ${({ theme }) => theme.colors['header-background']};
  border-radius: 10px;
  padding: 8px 16px;
  padding-bottom: 16px;
`
