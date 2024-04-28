import { useToast } from '../../../../contexts/ToastContext'
import api from '../../../../libs/api'
import { AppError } from '../../../../utils/AppError'
import { DeleteModalComponent } from '../../../../components/DeleteModalComponent'
import { ParsedChecklistDTO } from '../../../../dtos/checklistDTO'

interface DeleteChecklistModalProps {
  checklist?: ParsedChecklistDTO
  isVisible: boolean
  handleModalOpenChange: (state: boolean) => void
  triggerList: () => void
}

export function DeleteChecklistModal({
  checklist,
  isVisible,
  handleModalOpenChange,
  triggerList,
}: DeleteChecklistModalProps) {
  const { toastSuccess, toastError } = useToast()

  async function deleteChecklist() {
    try {
      await api.delete(`/checklists/${checklist?.id}`)

      toastSuccess('Checklist deletada com sucesso.')
      handleModalOpenChange(false)
      triggerList()
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível excluir a checklist. Tente novamente mais tarde.'
      toastError(title)
    }
  }

  return (
    <DeleteModalComponent
      deleteService={deleteChecklist}
      handleModalOpenChange={handleModalOpenChange}
      title={`Tem certeza que deseja excluir a ${checklist?.name}?`}
      isVisible={isVisible}
    />
  )
}
