import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors['header-background']};
  padding: 1rem 10rem;

  @media (max-width: 1000px) {
    padding: 1rem;
  }

  h2 {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    cursor: pointer;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 2rem;

    @media (max-width: 1000px) {
      gap: 1rem;
    }

    p {
      text-align: center;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      > div {
        display: flex;
        justify-content: center;
        gap: 2rem;

        @media (max-width: 1000px) {
          gap: 0rem;
        }
      }
    }
  }
`
