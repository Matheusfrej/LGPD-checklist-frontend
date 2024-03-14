import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../ActionsFooterContainer'
import { ButtonComponent } from '../ButtonComponent'
import { ItemsTableComponent } from '../ItemsTableComponent'
import { MainContainer } from '../MainContainer'
import { SectionContainer } from '../SectionContainer'
import * as S from './styles'
import { PieChartComponent } from '../PieChartComponent'
import { useTheme } from 'styled-components'
import { ProgressBarChartComponent } from '../ProgressBarChartComponent'

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

  const progressData = [
    {
      name: '',
      value: 25,
    },
  ]

  const data = [
    { name: 'Taxa de Adequação', value: 400 },
    { name: 'Defeito/Problema', value: 300 },
    { name: 'Não se aplica', value: 300 },
    { name: 'Não preenchido', value: 200 },
  ]

  const colors = [
    theme.colors.green,
    theme.colors.red,
    theme.colors.wheat,
    theme.colors.contrast,
  ]

  return (
    <MainContainer hasTable>
      <SectionContainer hasHeader>
        <S.ItemsContainer>
          <S.ItemsTitle>{text}</S.ItemsTitle>
        </S.ItemsContainer>
        <S.ChartsContainer>
          <ProgressBarChartComponent title="Progresso" data={progressData} />
          <PieChartComponent
            title="Itens Obrigatórios"
            data={data}
            colors={colors}
          />
        </S.ChartsContainer>
      </SectionContainer>
      {classifications.map((item) => {
        return (
          <SectionContainer key={item.tag + isMandatory}>
            <S.ItemsContainer>
              <S.ItemsSubtitle>{item.name}</S.ItemsSubtitle>
              <ItemsTableComponent isMandatory={isMandatory} tag={item.tag} />
            </S.ItemsContainer>
          </SectionContainer>
        )
      })}
      <ActionsFooterContainer hasMessage>
        <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        <ButtonComponent text="Continuar" action={action} />
      </ActionsFooterContainer>
    </MainContainer>
  )
}
