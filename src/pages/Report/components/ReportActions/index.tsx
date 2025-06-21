import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../../../../templates/ActionsFooterContainer'
import { ButtonComponent } from '../../../../components/ButtonComponent'
import styled from 'styled-components'
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
    <ReportActionsContainer>
      <CheckboxesAnswerComponent />
      <ActionsFooterContainer hasMessage inverted>
        <div>
          <ButtonComponent text="Voltar" action={() => navigate(-1)} />
        </div>
        <SaveButtonsContainer>
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
        </SaveButtonsContainer>
      </ActionsFooterContainer>
    </ReportActionsContainer>
  )
}

const ReportActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const SaveButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;
`
