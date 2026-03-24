import styled from 'styled-components'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { PieChartComponent } from '../PieChartComponent'
import { ProgressBarChartComponent } from '../ProgressBarChartComponent'
import { ProgressTableComponent } from '../ProgressTableComponent'

interface ChartsContainerProps {
  isMandatory?: boolean
  colors: string[]
}

export function ChartsContainer({
  isMandatory = false,
  colors,
}: ChartsContainerProps) {
  const { filteredChecklist } = useChecklists()

  const progressData = (isMandatory: boolean) => {
    const progress = filteredChecklist().reduce((acc, curr) => {
      if (curr.item.isMandatory === isMandatory) {
        if (curr.answer) {
          return acc + 1
        }
      }
      return acc
    }, 0)

    return [
      {
        name: '',
        value:
          (progress /
            filteredChecklist().reduce((acc, curr) => {
              if (curr.item.isMandatory === isMandatory) {
                return acc + 1
              }
              return acc
            }, 0)) *
          100,
      },
    ]
  }

  const distributionData = (isMandatory: boolean) => {
    const distribution = filteredChecklist().reduce(
      (acc, curr) => {
        if (curr.item.isMandatory === isMandatory) {
          if (curr.answer === 'Sim') {
            const index = acc.findIndex(
              (obj) => obj.name === 'Taxa de Adequação',
            )
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else if (curr.answer === 'Não') {
            const index = acc.findIndex(
              (obj) => obj.name === 'Defeito/Problema',
            )
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else if (curr.answer === 'Não se aplica') {
            const index = acc.findIndex((obj) => obj.name === 'Não se aplica')
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else {
            const index = acc.findIndex((obj) => obj.name === 'Não preenchido')
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          }
        }
        return acc
      },
      [
        { name: 'Taxa de Adequação', value: 0 },
        { name: 'Defeito/Problema', value: 0 },
        { name: 'Não se aplica', value: 0 },
        { name: 'Não preenchido', value: 0 },
      ],
    )

    return [
      {
        name: 'Taxa de Adequação',
        value:
          (distribution[
            distribution.findIndex((obj) => obj.name === 'Taxa de Adequação')
          ].value /
            distribution.reduce((acc, curr) => acc + curr.value, 0)) *
          100,
      },
      {
        name: 'Defeito/Problema',
        value:
          (distribution[
            distribution.findIndex((obj) => obj.name === 'Defeito/Problema')
          ].value /
            distribution.reduce((acc, curr) => acc + curr.value, 0)) *
          100,
      },
      {
        name: 'Não se aplica',
        value:
          (distribution[
            distribution.findIndex((obj) => obj.name === 'Não se aplica')
          ].value /
            distribution.reduce((acc, curr) => acc + curr.value, 0)) *
          100,
      },
      {
        name: 'Não preenchido',
        value:
          (distribution[
            distribution.findIndex((obj) => obj.name === 'Não preenchido')
          ].value /
            distribution.reduce((acc, curr) => acc + curr.value, 0)) *
          100,
      },
    ]
  }

  const progressTableData = (isMandatory: boolean) => {
    const columnText = isMandatory
      ? 'Itens Obrigatórios'
      : 'Itens Não Obrigatórios'

    const rowsNames = [
      `${columnText} Adequados:`,
      `${columnText} Não Adequados:`,
      `${columnText} Não Aplicado:`,
      `${columnText} Não Preenchidos:`,
      'Total:',
    ]

    return filteredChecklist().reduce(
      (acc, curr) => {
        if (curr.item.isMandatory === isMandatory) {
          if (curr.answer === 'Sim') {
            const index = acc.findIndex((obj) => obj.name === rowsNames[0])
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else if (curr.answer === 'Não') {
            const index = acc.findIndex((obj) => obj.name === rowsNames[1])
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else if (curr.answer === 'Não se aplica') {
            const index = acc.findIndex((obj) => obj.name === rowsNames[2])
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          } else {
            const index = acc.findIndex((obj) => obj.name === rowsNames[3])
            acc[index] = { ...acc[index], value: acc[index].value + 1 }
          }
          const index = acc.findIndex((obj) => obj.name === rowsNames[4])
          acc[index] = { ...acc[index], value: acc[index].value + 1 }
        }
        return acc
      },
      [
        { name: rowsNames[0], value: 0 },
        { name: rowsNames[1], value: 0 },
        { name: rowsNames[2], value: 0 },
        { name: rowsNames[3], value: 0 },
        { name: rowsNames[4], value: 0 },
      ],
    )
  }

  return (
    <ChartsWrapper>
      <ProgressBarChartComponent
        title="Progresso"
        data={progressData(isMandatory)}
      />
      <PieChartComponent
        title={isMandatory ? 'Itens Obrigatórios' : 'Itens não obrigatórios'}
        data={distributionData(isMandatory)}
        colors={colors}
      />
      <ProgressTableComponent
        isMandatory={isMandatory}
        data={progressTableData(isMandatory)}
      />
    </ChartsWrapper>
  )
}

const ChartsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`
