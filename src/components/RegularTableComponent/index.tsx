import { SectionContainer } from '../SectionContainer'
import * as S from './styles'

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
      <S.Table>
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
      </S.Table>
    </SectionContainer>
  )
}
