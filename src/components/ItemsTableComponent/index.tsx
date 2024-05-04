import { AnswerType, SeverityDegreeType } from '../../@types'
import { useChecklists } from '../../contexts/ChecklistsContext'
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
  const {
    updateChecklistRow,
    filteredChecklist,
    findIndexByIsMandatoryAndCode,
  } = useChecklists()

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
        {filteredChecklist(isMandatory, tag).map((row, idx) => {
          return (
            <tr key={row.code + idx + row.mandatory + tag + row.severityDegree}>
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
                        { ...row, answer: selectedValue as AnswerType },
                        findIndexByIsMandatoryAndCode(row.mandatory, row.code),
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
                      if (
                        selectedValue === '' ||
                        selectedValue === 'Escolha uma opção'
                      ) {
                        selectedValue = undefined
                      }
                      updateChecklistRow(
                        {
                          ...row,
                          severityDegree: selectedValue as SeverityDegreeType,
                        },
                        findIndexByIsMandatoryAndCode(row.mandatory, row.code),
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
                        findIndexByIsMandatoryAndCode(row.mandatory, row.code),
                      )
                    }
                  />
                )}
              </td>
              <td>{row.recomendations}</td>
            </tr>
          )
        })}
      </tbody>
    </S.Table>
  )
}
