import { Margin, usePDF } from 'react-to-pdf'
import { MainContainer } from '../../templates/MainContainer'
import { ReportActions } from './components/ReportActions'
import { ReportContent } from './components/ReportContent'
import { ReportHeader } from './components/ReportHeader'
import styled from 'styled-components'
import {
  createChecklistService,
  createChecklistServiceDefaultErrorMessage,
} from '../../services/checklist/createChecklistService'
import { useAuth } from '../../contexts/AuthContext'
import { useUsers } from '../../contexts/UsersContext'
import { useToast } from '../../contexts/ToastContext'
import { AppError } from '../../utils/AppError'
import { useChecklists } from '../../contexts/ChecklistsContext'
import { useLoadChecklist } from '../../hooks/loadChecklist'
import {
  editChecklistService,
  editChecklistServiceDefaultErrorMessage,
} from '../../services/checklist/editChecklistService'
import { useNavigate } from 'react-router-dom'

export function Report() {
  const { user: userLogged, isLogged } = useAuth()
  const { user } = useUsers()
  const { toastSuccess, toastError } = useToast()
  const { filteredChecklist, removeDisabledItems, devices, laws } =
    useChecklists()
  const { id } = useLoadChecklist()
  const navigate = useNavigate()

  const { toPDF, targetRef } = usePDF({
    filename: 'RelatorioLGPD.pdf',
    page: { margin: Margin.MEDIUM },
  })

  const editChecklist = async () => {
    try {
      if (userLogged?.id && user.system && id) {
        await editChecklistService({
          id,
          systemId: user.system,
          items: filteredChecklist().map((item) => ({
            id: item.item.id,
            answer: item.answer || undefined,
            severityDegree: item.severityDegree || undefined,
            userComment: item.userComment || undefined,
          })),
          laws: laws.map((law) => law.id),
          devices: devices.map((device) => device.id),
        })

        removeDisabledItems()
        toastSuccess('Checklist salva com sucesso!')
      } else {
        toastError(editChecklistServiceDefaultErrorMessage)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : editChecklistServiceDefaultErrorMessage
      toastError(title)
      return false
    }
  }

  const createChecklist = async () => {
    try {
      if (userLogged?.id && user.system) {
        // Remove disabled items from memory before sending and after saving
        const data = await createChecklistService({
          userId: userLogged?.id,
          systemId: user.system,
          items: filteredChecklist().map((item) => ({
            id: item.item.id,
            answer: item.answer || undefined,
            severityDegree: item.severityDegree || undefined,
            userComment: item.userComment || undefined,
          })),
          laws: laws.map((law) => law.id),
          devices: devices.map((device) => device.id),
        })

        removeDisabledItems()
        toastSuccess('Checklist salva com sucesso!')
        navigate(`/report/${data.checklist.id}`)
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

  const saveChecklist = async () => {
    if (id) {
      editChecklist()
    } else {
      createChecklist()
    }
  }

  return (
    <MainContainer hasTable>
      <ReportActions
        downloadPDFAction={toPDF}
        saveChecklistAction={isLogged ? saveChecklist : undefined}
      />
      <ReportMainContent ref={targetRef}>
        <ReportHeader />
        <ReportContent />
      </ReportMainContent>
    </MainContainer>
  )
}

const ReportMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.colors['base-background']};
`
