import styled from 'styled-components'

export const Table = styled.table`
  padding: 8px 16px;
  padding-bottom: 16px;
  border-collapse: collapse;
  border-radius: 10px;

  tbody {
    td {
      padding: 4px;
      border: 1px solid ${({ theme }) => theme.colors['base-text']};
    }
  }

  thead {
    background: ${({ theme }) => theme.colors.contrast};
    color: ${({ theme }) => theme.colors['header-background']};
    border: 1px solid ${({ theme }) => theme.colors.contrast};

    th {
      padding: 4px;
      font-weight: bold;
      border: 1px solid ${({ theme }) => theme.colors['base-text']};
    }
  }
`
