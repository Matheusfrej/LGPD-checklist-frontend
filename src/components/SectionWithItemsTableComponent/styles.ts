import styled from 'styled-components'

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    overflow: scroll;
  }
`

interface SectionWithItemsTableProps {
  $isReport: boolean
}

export const SectionWithItemsTable = styled.div<SectionWithItemsTableProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ $isReport }) => ($isReport ? '2rem' : '0')};
`
