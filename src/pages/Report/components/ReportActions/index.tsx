import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../../../../templates/ActionsFooterContainer'
import { ButtonComponent } from '../../../../components/ButtonComponent'
import * as S from './styles'
import { CheckboxesAnswerComponent } from '../../../../components/CheckboxesAnswerComponent'

interface ReportActionsProps {
  downloadPDFAction: () => void
  saveChecklistAction?: () => void
}

export function ReportActions({
  downloadPDFAction,
  saveChecklistAction,
}: ReportActionsProps) {
  const navigate = useNavigate()

  return (
    <S.ReportActionsContainer>
      <CheckboxesAnswerComponent />
      <ActionsFooterContainer hasMessage inverted>
        <div>
          <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        </div>
        <S.SaveButtonsContainer>
          {saveChecklistAction && (
            <ButtonComponent
              text="Salvar"
              action={() => saveChecklistAction()}
            />
          )}
          <ButtonComponent
            text="Baixar PDF"
            action={() => downloadPDFAction()}
          />
        </S.SaveButtonsContainer>
      </ActionsFooterContainer>
    </S.ReportActionsContainer>
  )
}
