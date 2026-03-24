import { AnswerType, SeverityDegreeType } from '../../@types'
import { useChecklists } from '../../contexts/ChecklistsContext'
import styled, { useTheme } from 'styled-components'
import { getItemValidationMessage } from '../../libs/business'

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
    <Table>
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
          const isInvalid = getItemValidationMessage(row)
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
                  <AnswerInReport $variant={row.answer}>
                    {row.answer}
                  </AnswerInReport>
                ) : (
                  <Select
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
                  </Select>
                )}
              </td>
              <td style={cellStyle}>
                {isReport ? (
                  <AnswerInReport>{row.severityDegree}</AnswerInReport>
                ) : (
                  <Select
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
                  </Select>
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
    </Table>
  )
}

const Table = styled.table`
  border-collapse: collapse;
  tbody {
    td {
      padding: 0.5rem;
      border: 1px solid ${({ theme }) => theme.colors['base-text']};
      height: 1rem;

      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        padding: 0.1rem;
        background: ${(props) => props.theme.colors['header-background']};
      }

      p {
        white-space: pre-line;
      }
    }

    td:first-child {
      text-align: center;
      padding: 0;
    }

    td:nth-child(2) {
      width: 15%;
    }

    td:last-child {
      width: 25%;
    }
  }

  thead {
    background: ${({ theme }) => theme.colors.contrast};
    color: ${({ theme }) => theme.colors['header-background']};
    border: 1px solid ${({ theme }) => theme.colors.contrast};

    th {
      padding: 4px;
      font-size: 1rem;
      font-weight: bold;
      border: 1px solid ${({ theme }) => theme.colors['base-text']};
    }
  }
`

interface SelectProps {
  $variant?: 'Sim' | 'Não' | 'Não se aplica'
}

const Select = styled.select<SelectProps>`
  height: 10rem;
  text-align: center;
  min-width: 10rem;
  width: 100%;
  background: ${({ theme, $variant }) =>
    $variant === 'Sim'
      ? theme.colors.green
      : $variant === 'Não'
        ? theme.colors.red
        : $variant === 'Não se aplica'
          ? theme.colors.wheat
          : theme.colors['header-background']};
  color: ${({ theme, $variant }) =>
    !$variant
      ? theme.colors['base-text']
      : $variant === 'Não se aplica'
        ? theme.colors.black
        : theme.colors.white};

  &:disabled {
    cursor: no-drop;
  }
`

const AnswerInReport = styled.div<SelectProps>`
  width: 100%;
  height: 100%;
  padding: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme, $variant }) =>
    $variant === 'Sim'
      ? theme.colors.green
      : $variant === 'Não'
        ? theme.colors.red
        : $variant === 'Não se aplica'
          ? theme.colors.wheat
          : theme.colors['header-background']};
  color: ${({ theme, $variant }) =>
    !$variant
      ? theme.colors['base-text']
      : $variant === 'Não se aplica'
        ? theme.colors.black
        : theme.colors.white};
`
