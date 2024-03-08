import styled from 'styled-components'

export const InstructionsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors['header-background']};
  border-top: 10px solid ${({ theme }) => theme.colors.contrast};
  border-radius: 10px;
  padding: 8px 16px;
  padding-bottom: 16px;

  h2 {
    padding: 8px 0;
    font-weight: 500;
    font-size: ${({ theme }) => theme.colors.title};
  }

  p {
    padding: 12px 0;
    font-size: 0.8rem;
  }
`
