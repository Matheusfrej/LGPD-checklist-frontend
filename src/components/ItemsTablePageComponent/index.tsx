import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../../templates/ActionsFooterContainer'
import { ButtonComponent } from '../ButtonComponent'
import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import { useTheme } from 'styled-components'
import { ChartsContainer } from '../ChartsContainer'
import { SectionTitleComponent } from '../SectionTitleComponent'
import { SectionWithItemsTableComponent } from '../SectionWithItemsTableComponent'

interface ItemsTablePageComponentProps {
  text: string
  isMandatory: boolean
  classifications: {
    name: string
    tag: string
  }[]
  action: () => void
}

export function ItemsTablePageComponent({
  text,
  isMandatory,
  classifications,
  action,
}: ItemsTablePageComponentProps) {
  const navigate = useNavigate()
  const theme = useTheme()

  const colors = [
    theme.colors.green,
    theme.colors.red,
    theme.colors.wheat,
    theme.colors.contrast,
  ]

  return (
    <MainContainer hasTable>
      <SectionContainer hasHeader>
        <SectionTitleComponent text={text} />
        <ChartsContainer isMandatory={isMandatory} colors={colors} />
      </SectionContainer>
      <SectionWithItemsTableComponent
        isMandatory={isMandatory}
        classifications={classifications}
      />
      <ActionsFooterContainer hasMessage>
        <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        <ButtonComponent text="Continuar" action={action} />
      </ActionsFooterContainer>
    </MainContainer>
  )
}
