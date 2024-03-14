import styled from 'styled-components'

export const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-weight: normal;
    color: ${({ theme }) => theme.colors['base-text']};
  }
`
