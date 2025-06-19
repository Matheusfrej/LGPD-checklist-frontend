import { useTheme } from 'styled-components'
import { ChartsContainer } from '../../../../components/ChartsContainer'
import { SectionContainer } from '../../../../templates/SectionContainer'
import { SectionTitleComponent } from '../../../../components/SectionTitleComponent'
import { SectionWithItemsTableComponent } from '../../../../components/SectionWithItemsTableComponent'
import { useChecklists } from '../../../../contexts/ChecklistsContext'

export function ReportContent() {
  const { uniqueSections } = useChecklists()
  const theme = useTheme()

  const colors = [
    theme.colors.green,
    theme.colors.red,
    theme.colors.wheat,
    theme.colors.contrast,
  ]

  const mandatorySections = uniqueSections(true)
  const nonMandatorySections = uniqueSections(false)
  const hasMandatory = mandatorySections.length > 0
  const hasNonMandatory = nonMandatorySections.length > 0

  return (
    <>
      <SectionContainer>
        <SectionTitleComponent text="Gráficos" isSecondary />
        {hasMandatory && (
          <SectionContainer style={{ marginBottom: 20 }}>
            <SectionTitleComponent
              text="Gráficos Itens Obrigatórios"
              isSecondary
            />
            <ChartsContainer isMandatory={true} colors={colors} />
          </SectionContainer>
        )}
        {hasNonMandatory && (
          <SectionContainer>
            <SectionTitleComponent
              text="Gráficos Itens Não Obrigatórios"
              isSecondary
            />
            <ChartsContainer isMandatory={false} colors={colors} />
          </SectionContainer>
        )}
        {!hasMandatory && !hasNonMandatory && (
          <SectionTitleComponent text="Nenhum item disponível para exibir gráficos." isSecondary />
        )}
      </SectionContainer>
      <SectionContainer>
        <SectionTitleComponent text="Tabelas de Itens Obrigatórios" isSecondary />
        {!hasMandatory && (
          <SectionTitleComponent text="Nenhum item obrigatório disponível." isSecondary />
        )}
        <SectionWithItemsTableComponent
          sections={mandatorySections}
          isMandatory
          isReport
        />
      </SectionContainer>
      <SectionContainer>
        <SectionTitleComponent text="Tabelas de Itens Não Obrigatórios" isSecondary />
        {!hasNonMandatory && (
          <SectionTitleComponent text="Nenhum item não obrigatório disponível." isSecondary />
        )}
        <SectionWithItemsTableComponent
          sections={nonMandatorySections}
          isMandatory={false}
          isReport
        />
      </SectionContainer>
    </>
  )
}
