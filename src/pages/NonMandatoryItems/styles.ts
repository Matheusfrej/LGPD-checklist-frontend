import styled from 'styled-components'

export const NonMandatoryItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const NonMandatoryItemsTitle = styled.h2`
  padding: 8px 0;
  font-weight: 500;
`

export const NonMandatoryItemsSubtitle = styled.h3`
  padding: 8px 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.title};
`
