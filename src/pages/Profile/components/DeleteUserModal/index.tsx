import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthContext'
import { useToast } from '../../../../contexts/ToastContext'
import api from '../../../../libs/api'
import { AppError } from '../../../../utils/AppError'
import { DeleteModalComponent } from '../../../../components/DeleteModalComponent'

interface DeleteUserModalProps {
  isVisible: boolean
  handleModalOpenChange: (state: boolean) => void
}

export function DeleteUserModal({
  isVisible,
  handleModalOpenChange,
}: DeleteUserModalProps) {
  const { user, signOut } = useAuth()
  const { toastSuccess, toastError } = useToast()

  const navigate = useNavigate()

  async function deleteUser() {
    try {
      if (user) {
        await api.delete(`/users/${user?.id}`)

        toastSuccess('Conta deletada com sucesso.')
        signOut()
        handleModalOpenChange(false)
        navigate('/')
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível excluir sua conta. Tente novamente mais tarde.'
      toastError(title)
    }
  }

  return (
    <DeleteModalComponent
      deleteService={deleteUser}
      handleModalOpenChange={handleModalOpenChange}
      title="Tem certeza que deseja deletar sua conta permanentemente?"
      isVisible={isVisible}
    />
  )
}
