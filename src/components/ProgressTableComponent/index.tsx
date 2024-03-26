import * as S from './styles'

interface ProgressTableProps {
  isMandatory?: boolean
  data: { name: string; value: number }[]
}

export function ProgressTableComponent({ data }: ProgressTableProps) {
  return (
    <S.ProgressTableContainer>
      <table>
        <thead>
          <tr>
            <th>Índice de adequação</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            return (
              <tr key={row.name + idx}>
                <td>{row.name}</td>
                {idx === data.length - 1 ? (
                  <td>{row.value} ITENS</td>
                ) : (
                  <td>{row.value}</td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </S.ProgressTableContainer>
  )
}
