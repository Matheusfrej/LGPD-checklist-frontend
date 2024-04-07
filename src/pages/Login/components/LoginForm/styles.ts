import styled from 'styled-components'

export const LoginFormContainer = styled.div`
  p > span {
    color: ${({ theme }) => theme.colors.contrast};
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
  }
`
