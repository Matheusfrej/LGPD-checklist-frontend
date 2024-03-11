import { useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../components/MainContainer'
import { SectionContainer } from '../../components/SectionContainer'
import * as S from './styles'
import { ActionsFooterContainer } from '../../components/ActionsFooterContainer'
import { ItemsTableComponent } from '../../components/ItemsTableComponent'

export function MandatoryItems() {
  const navigate = useNavigate()

  const mandatoryItemsClassifications = [
    {
      name: 'Sobre transparência de Dados (T)',
      tag: 'T',
    },
    {
      name: 'Sobre Consentimento do Titular (C)',
      tag: 'C',
    },
  ]

  return (
    <MainContainer hasTable>
      <SectionContainer hasHeader>
        <S.MandatoryItemsContainer>
          <S.MandatoryItemsTitle>Items obrigatórios</S.MandatoryItemsTitle>
        </S.MandatoryItemsContainer>
      </SectionContainer>
      {mandatoryItemsClassifications.map((item) => {
        return (
          <SectionContainer key={item.tag}>
            <S.MandatoryItemsContainer>
              <S.MandatoryItemsSubtitle>{item.name}</S.MandatoryItemsSubtitle>
              <ItemsTableComponent isMandatory tag={item.tag} />
            </S.MandatoryItemsContainer>
          </SectionContainer>
        )
      })}
      <ActionsFooterContainer hasMessage>
        <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        <ButtonComponent text="Continuar" action={() => navigate('/')} />
      </ActionsFooterContainer>
    </MainContainer>
  )
}
