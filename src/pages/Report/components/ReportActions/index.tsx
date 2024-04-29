import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../../../../templates/ActionsFooterContainer'
import { ButtonComponent } from '../../../../components/ButtonComponent'
import * as S from './styles'
import { CheckboxesAnswerComponent } from '../../../../components/CheckboxesAnswerComponent'

interface ReportActionsProps {
  action: () => void
}

export function ReportActions({ action }: ReportActionsProps) {
  const navigate = useNavigate()

  return (
    <S.ReportActionsContainer>
      <CheckboxesAnswerComponent />
      <ActionsFooterContainer hasMessage inverted>
        <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        <ButtonComponent text="Baixar PDF" action={() => action()} />
      </ActionsFooterContainer>
    </S.ReportActionsContainer>
  )
}
