import {
  AnswerType,
  SeverityDegreeType,
  useChecklists,
} from '../../contexts/ChecklistsContext'
import * as S from './styles'

interface ItemsTableComponentProps {
  isMandatory: boolean
  tag: string
}

export function ItemsTableComponent({
  isMandatory,
  tag,
}: ItemsTableComponentProps) {
  const { checklist, familiesSelected, updateChecklistRow } = useChecklists()

  return (
    <S.Table>
      <thead>
        <tr>
          <th>CÓDIGO</th>
          <th>ITEM DE AVALIAÇÃO</th>
          <th>RESPOSTA</th>
          <th>GRAU DE SEVERIDADE</th>
          <th>COMENTÁRIO DO AVALIADOR</th>
          <th>RECOMENDAÇÕES</th>
        </tr>
      </thead>
      <tbody>
        {checklist.map((row, idx) => {
          if (
            row.mandatory === isMandatory &&
            row.code.startsWith(tag) &&
            familiesSelected.includes(row.type)
          ) {
            return (
              <tr key={row.code + idx}>
                <td>{row.code}</td>
                <td>{row.itemDesc}</td>
                <td>
                  <S.Select
                    value={row.answer}
                    variant={row.answer}
                    onChange={(e) =>
                      updateChecklistRow(
                        { ...row, answer: e.target.value as AnswerType },
                        idx,
                      )
                    }
                  >
                    <option value={undefined}>Escolha uma opção</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Não se aplica">Não se aplica</option>
                  </S.Select>
                </td>
                <td>
                  <S.Select
                    value={row.severityDegree}
                    onChange={(e) =>
                      updateChecklistRow(
                        {
                          ...row,
                          severityDegree: e.target.value as SeverityDegreeType,
                        },
                        idx,
                      )
                    }
                  >
                    <option value={undefined}>Escolha uma opção</option>
                    <option value="Leve">Leve</option>
                    <option value="Grave">Grave</option>
                    <option value="Catastrófico">Catastrófico</option>
                  </S.Select>
                </td>
                <td>
                  <textarea
                    value={row.userComment}
                    onChange={(e) =>
                      updateChecklistRow(
                        { ...row, userComment: e.target.value },
                        idx,
                      )
                    }
                  />
                </td>
                <td>{row.recomendations}</td>
              </tr>
            )
          }
          return <></>
        })}
      </tbody>
    </S.Table>
  )
}
