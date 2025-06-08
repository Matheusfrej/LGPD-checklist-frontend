import { AnswerType, SeverityDegreeType } from '../../@types'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { useTheme } from 'styled-components'
import * as S from './styles'

interface ItemsTableComponentProps {
  isMandatory: boolean
  sectionId: number
  isReport?: boolean
}

export function ItemsTableComponent({
  isMandatory,
  sectionId,
  isReport = false,
}: ItemsTableComponentProps) {
  const {
    updateChecklistRow,
    filteredChecklist,
    findIndexByIsMandatoryAndCode,
  } = useChecklists()
  const theme = useTheme()

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
          <th>LEIS</th>
          <th>DISPOSITIVOS</th>
        </tr>
      </thead>
      <tbody>
        {filteredChecklist(isMandatory, sectionId).map((row, idx) => {
          const isInvalid =
            row.answer === 'Não' && (!row.severityDegree || !row.userComment)
          const borderColor = theme.colors.red
          const cellStyle = isInvalid
            ? { border: `2px solid ${borderColor}` }
            : {}
          return (
            <tr
              key={
                row.item.code +
                idx +
                row.item.isMandatory +
                sectionId +
                row.severityDegree
              }
            >
              <td style={cellStyle}>{row.item.code}</td>
              <td style={cellStyle}>{row.item.itemDesc}</td>
              <td style={cellStyle}>
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
                        findIndexByIsMandatoryAndCode(
                          row.item.isMandatory,
                          row.item.code,
                        ),
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
              <td style={cellStyle}>
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
                        findIndexByIsMandatoryAndCode(
                          row.item.isMandatory,
                          row.item.code,
                        ),
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
              <td style={cellStyle}>
                {isReport ? (
                  <p>{row.userComment}</p>
                ) : (
                  <textarea
                    value={row.userComment}
                    onChange={(e) =>
                      updateChecklistRow(
                        { ...row, userComment: e.target.value },
                        findIndexByIsMandatoryAndCode(
                          row.item.isMandatory,
                          row.item.code,
                        ),
                      )
                    }
                  />
                )}
              </td>
              <td style={cellStyle}>{row.item.recommendations}</td>
              <td style={cellStyle}>
                {row.item.laws?.map((law) => law.name).join(', ')}
              </td>
              <td style={cellStyle}>
                {row.item.devices?.map((device) => device.name).join(', ')}
              </td>
            </tr>
          )
        })}
      </tbody>
    </S.Table>
  )
}
