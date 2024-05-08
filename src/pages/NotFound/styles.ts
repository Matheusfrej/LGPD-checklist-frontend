import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    text-align: center;
  }
  gap: 3rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 4rem;

    > div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      > div {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        a {
          color: ${({ theme }) => theme.colors.contrast};
          font-weight: 500;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }

  img {
    width: 25rem;

    @media (max-width: 1000px) {
      width: 100%;
    }
  }
`
