import styled from 'styled-components'

export const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -2rem;

  @media (max-width: 1000px) {
    margin-left: 0;
  }

  h3 {
    font-weight: normal;
    color: ${({ theme }) => theme.colors['base-text']};
  }
`
