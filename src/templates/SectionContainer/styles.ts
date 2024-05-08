import styled, { css } from 'styled-components'

interface SectionProps {
  $hasHeader: boolean
  $hasBorder: boolean
}

export const Section = styled.section<SectionProps>`
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
