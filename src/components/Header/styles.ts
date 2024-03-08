import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors['header-backgroud']};
  padding: 2rem 10rem;

  h2 {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
  }
`
