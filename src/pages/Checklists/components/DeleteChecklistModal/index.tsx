import { useToast } from '../../../../contexts/ToastContext'
import { AppError } from '../../../../utils/AppError'
import { DeleteModalComponent } from '../../../../components/DeleteModalComponent'
import { ParsedChecklistDTO } from '../../../../dtos/checklistDTO'
import {
  deleteChecklistService,
  deleteChecklistServiceDefaultErrorMessage,
} from '../../../../services/checklist/deleteChecklistService'

interface DeleteChecklistModalProps {
  checklist?: ParsedChecklistDTO
  isVisible: boolean
  handleModalOpenChange: (state: boolean) => void
  fetchItems: () => void
}

export function DeleteChecklistModal({
  checklist,
  isVisible,
  handleModalOpenChange,
  fetchItems,
}: DeleteChecklistModalProps) {
  const { toastSuccess, toastError } = useToast()

  async function deleteChecklist() {
    try {
      if (checklist) {
        await deleteChecklistService(checklist?.id)
        toastSuccess('Checklist deletada com sucesso.')
        handleModalOpenChange(false)
        fetchItems()
      } else {
        toastError(deleteChecklistServiceDefaultErrorMessage)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : deleteChecklistServiceDefaultErrorMessage
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
