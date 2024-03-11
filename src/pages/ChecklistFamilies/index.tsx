import { useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../../components/ButtonComponent'
import { MainContainer } from '../../components/MainContainer'
import { SectionContainer } from '../../components/SectionContainer'
import * as S from './styles'
import { ActionsFooterContainer } from '../../components/ActionsFooterContainer'

export function ChecklistFamilies() {
  const navigate = useNavigate()

  return (
    <MainContainer>
      <SectionContainer hasHeader>
        <S.ChecklistFamiliesContainer>
          <p>
            Selecione abaixo quais famílias de checklists você quer incluir
            nessa avaliação, além da checklist geral:
          </p>
          <form>
            <div>
              <label htmlFor="IoT">Checklist IoT</label>
              <input type="checkbox" itemID="IoT" />
            </div>
          </form>
        </S.ChecklistFamiliesContainer>
      </SectionContainer>
      <ActionsFooterContainer hasMessage>
        <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        <ButtonComponent
          text="Continuar"
          action={() => navigate('/mandatory-items')}
        />
      </ActionsFooterContainer>
    </MainContainer>
  )
}
