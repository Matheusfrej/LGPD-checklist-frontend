import styled from 'styled-components'

export const StepButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors['header-background']};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.span};
`
