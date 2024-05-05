import { Margin, usePDF } from 'react-to-pdf'
import { MainContainer } from '../../templates/MainContainer'
import { ReportActions } from './components/ReportActions'
import { ReportContent } from './components/ReportContent'
import { ReportHeader } from './components/ReportHeader'
import * as S from './styles'
import {
  createChecklistService,
  createChecklistServiceDefaultErrorMessage,
} from '../../services/checklist/createChecklistService'
import { useAuth } from '../../contexts/AuthContext'
import { useUsers } from '../../contexts/UsersContext'
import { useToast } from '../../contexts/ToastContext'
import { AppError } from '../../utils/AppError'
import { useChecklists } from '../../contexts/ChecklistsContext'

export function Report() {
  const { user: userLogged, isLogged } = useAuth()
  const { user } = useUsers()
  const { toastSuccess, toastError } = useToast()
  const { checklist } = useChecklists()

  const { toPDF, targetRef } = usePDF({
    filename: 'RelatorioLGPD.pdf',
    page: { margin: Margin.MEDIUM },
  })

  const saveChecklist = async () => {
    try {
      if (userLogged?.id && user.system) {
        const data = await createChecklistService({
          userId: userLogged?.id,
          systemId: user.system,
          checklistData: checklist,
        })

        toastSuccess('Checklist salva com sucesso!')
        console.log(data)
      } else {
        toastError(createChecklistServiceDefaultErrorMessage)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : createChecklistServiceDefaultErrorMessage
      toastError(title)
      return false
    }
  }

  return (
    <MainContainer hasTable>
      <ReportActions
        downloadPDFAction={toPDF}
        saveChecklistAction={isLogged ? saveChecklist : undefined}
      />
      <S.ReportMainContent ref={targetRef}>
        <ReportHeader />
        <ReportContent />
      </S.ReportMainContent>
    </MainContainer>
  )
}
