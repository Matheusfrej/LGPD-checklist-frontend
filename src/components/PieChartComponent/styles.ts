import styled from 'styled-components'

export const PieContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  h3 {
    font-weight: normal;
    color: ${({ theme }) => theme.colors['base-text']};
  }
`
