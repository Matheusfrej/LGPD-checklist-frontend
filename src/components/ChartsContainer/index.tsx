import { useChecklists } from '../../contexts/ChecklistsContext'
import { PieChartComponent } from '../PieChartComponent'
import { ProgressBarChartComponent } from '../ProgressBarChartComponent'
import { ProgressTableComponent } from '../ProgressTableComponent'
import * as S from './styles'

interface ChartsContainerProps {
  isMandatory?: boolean
  colors: string[]
}

export function ChartsContainer({
  isMandatory = false,
  colors,
}: ChartsContainerProps) {
  const { progressData, distributionData, progressTableData } = useChecklists()

  return (
    <S.ChartsContainer>
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
    </S.ChartsContainer>
  )
}
