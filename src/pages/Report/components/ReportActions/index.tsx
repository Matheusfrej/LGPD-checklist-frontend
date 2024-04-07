import { useNavigate } from 'react-router-dom'
import { ActionsFooterContainer } from '../../../../templates/ActionsFooterContainer'
import { ButtonComponent } from '../../../../components/ButtonComponent'

interface ReportActionsProps {
  action: () => void
}

export function ReportActions({ action }: ReportActionsProps) {
  const navigate = useNavigate()

  return (
    <ActionsFooterContainer hasMessage inverted>
      <ButtonComponent text="Voltar" action={() => navigate(-1)} />
      <ButtonComponent text="Baixar PDF" action={() => action()} />
    </ActionsFooterContainer>
  )
}
