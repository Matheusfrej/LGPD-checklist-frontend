import styled from 'styled-components'

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ItemsTitle = styled.h2`
  padding: 8px 0;
  font-weight: 500;
`

export const ItemsSubtitle = styled.h3`
  padding: 8px 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.title};
`

export const ChartsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
