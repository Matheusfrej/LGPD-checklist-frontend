import {
  AnswerType,
  SeverityDegreeType,
  useChecklists,
} from '../../contexts/ChecklistsContext'
import * as S from './styles'

interface ItemsTableComponentProps {
  isMandatory: boolean
  tag: string
  isReport?: boolean
}

export function ItemsTableComponent({
  isMandatory,
  tag,
  isReport = false,
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
            familiesSelected[row.type]
          ) {
            return (
              <tr key={row.code + idx + row.mandatory}>
                {row.type !== 'general' ? (
                  <td>
                    {row.code} <br /> {row.type}
                  </td>
                ) : (
                  <td>{row.code}</td>
                )}
                <td>{row.itemDesc}</td>
                <td>
                  {isReport ? (
                    <S.AnswerInReport $variant={row.answer}>
                      {row.answer}
                    </S.AnswerInReport>
                  ) : (
                    <S.Select
                      value={row.answer}
                      $variant={row.answer}
                      onChange={(e) => {
                        let selectedValue: string | undefined = e.target.value
                        if (selectedValue === '') {
                          selectedValue = undefined
                        }
                        updateChecklistRow(
                          { ...row, answer: e.target.value as AnswerType },
                          idx,
                        )
                      }}
                    >
                      <option value={''}>Escolha uma opção</option>
                      <option value="Sim">Sim</option>
                      <option value="Não">Não</option>
                      <option value="Não se aplica">Não se aplica</option>
                    </S.Select>
                  )}
                </td>
                <td>
                  {isReport ? (
                    <S.AnswerInReport>{row.severityDegree}</S.AnswerInReport>
                  ) : (
                    <S.Select
                      value={row.severityDegree}
                      onChange={(e) => {
                        let selectedValue: string | undefined = e.target.value
                        if (selectedValue === '') {
                          selectedValue = undefined
                        }
                        updateChecklistRow(
                          {
                            ...row,
                            severityDegree: e.target
                              .value as SeverityDegreeType,
                          },
                          idx,
                        )
                      }}
                      disabled={row.answer !== 'Não'}
                    >
                      <option value={undefined}>Escolha uma opção</option>
                      <option value="Leve">Leve</option>
                      <option value="Grave">Grave</option>
                      <option value="Catastrófico">Catastrófico</option>
                    </S.Select>
                  )}
                </td>
                <td>
                  {isReport ? (
                    <p>{row.userComment}</p>
                  ) : (
                    <textarea
                      value={row.userComment}
                      onChange={(e) =>
                        updateChecklistRow(
                          { ...row, userComment: e.target.value },
                          idx,
                        )
                      }
                    />
                  )}
                </td>
                <td>{row.recomendations}</td>
              </tr>
            )
          }
          return <tr key={idx}></tr>
        })}
      </tbody>
    </S.Table>
  )
}
