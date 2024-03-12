import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../ActionsFooterContainer'
import { ButtonComponent } from '../ButtonComponent'
import { ItemsTableComponent } from '../ItemsTableComponent'
import { MainContainer } from '../MainContainer'
import { SectionContainer } from '../SectionContainer'
import * as S from './styles'

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

  return (
    <MainContainer hasTable>
      <SectionContainer hasHeader>
        <S.ItemsContainer>
          <S.ItemsTitle>{text}</S.ItemsTitle>
        </S.ItemsContainer>
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
