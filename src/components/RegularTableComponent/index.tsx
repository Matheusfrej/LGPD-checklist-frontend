import styled from 'styled-components'
import { SectionContainer } from '../../templates/SectionContainer'

interface RegularTableComponentProps {
  header: string[]
  body: string[][]
}

export function RegularTableComponent({
  header,
  body,
}: RegularTableComponentProps) {
  return (
    <SectionContainer>
      <Table>
        <thead>
          <tr>
            {header.map((h, idx) => {
              return <th key={idx}>{h}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {body.map((row, idx) => {
            return (
              <tr key={idx}>
                {row.map((column, idx2) => {
                  return <td key={idx + idx2}>{column}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </SectionContainer>
  )
}

const Table = styled.table`
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
