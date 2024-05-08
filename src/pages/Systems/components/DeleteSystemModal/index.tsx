import { useToast } from '../../../../contexts/ToastContext'
import { AppError } from '../../../../utils/AppError'
import { DeleteModalComponent } from '../../../../components/DeleteModalComponent'
import { SystemDTO } from '../../../../dtos/systemDTO'
import {
  deleteSystemService,
  deleteSystemServiceDefaultErrorMessage,
} from '../../../../services/system/deleteSystemService'

interface DeleteSystemModalProps {
  system?: SystemDTO
  isVisible: boolean
  handleModalOpenChange: (state: boolean) => void
  fetchItems: () => void
}

export function DeleteSystemModal({
  system,
  isVisible,
  handleModalOpenChange,
  fetchItems,
}: DeleteSystemModalProps) {
  const { toastSuccess, toastError } = useToast()

  async function deleteSystem() {
    try {
      if (system) {
        await deleteSystemService(system.id)

        toastSuccess('Sistema deletado com sucesso.')
        handleModalOpenChange(false)
        fetchItems()
      } else {
        toastError(deleteSystemServiceDefaultErrorMessage)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : deleteSystemServiceDefaultErrorMessage
      toastError(title)
    }
  }

  return (
    <DeleteModalComponent
      deleteService={deleteSystem}
      handleModalOpenChange={handleModalOpenChange}
      title={`Tem certeza que deseja excluir o sistema ${system?.name}? Excluí-lo irá excluir também todas as checklists desse sistema.`}
      isVisible={isVisible}
    />
  )
}
