import styled from 'styled-components'

export const ListTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Table = styled.table`
  padding: 8px 16px;
  padding-bottom: 16px;
  border-collapse: collapse;
  border-radius: 10px;

  tbody {
    td {
      padding: 0.75rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.span};
      white-space: pre-line;
    }
  }

  thead {
    color: ${({ theme }) => theme.colors['base-text']};

    th {
      padding: 0.5rem;
      font-weight: bold;
      border-bottom: 1px solid ${({ theme }) => theme.colors['base-text']};
    }
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

export const TableHeader = styled.header`
  display: flex;
  justify-content: space-between;
`
