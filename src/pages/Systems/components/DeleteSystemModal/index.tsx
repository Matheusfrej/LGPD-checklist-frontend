import { useToast } from '../../../../contexts/ToastContext'
import api from '../../../../libs/api'
import { AppError } from '../../../../utils/AppError'
import { DeleteModalComponent } from '../../../../components/DeleteModalComponent'
import { SystemDTO } from '../../../../dtos/systemDTO'

interface DeleteSystemModalProps {
  system?: SystemDTO
  isVisible: boolean
  handleModalOpenChange: (state: boolean) => void
  triggerList: () => void
}

export function DeleteSystemModal({
  system,
  isVisible,
  handleModalOpenChange,
  triggerList,
}: DeleteSystemModalProps) {
  const { toastSuccess, toastError } = useToast()

  async function deleteSystem() {
    try {
      await api.delete(`/systems/${system?.id}`)

      toastSuccess('Sistema deletado com sucesso.')
      handleModalOpenChange(false)
      triggerList()
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível excluir o sistema. Tente novamente mais tarde.'
      toastError(title)
    }
  }

  return (
    <DeleteModalComponent
      deleteService={deleteSystem}
      handleModalOpenChange={handleModalOpenChange}
      title={`Tem certeza que deseja excluir o sistema ${system?.name}?`}
      isVisible={isVisible}
    />
  )
}
