import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../contexts/AuthContext'
import { useToast } from '../../../../contexts/ToastContext'
import { AppError } from '../../../../utils/AppError'
import { DeleteModalComponent } from '../../../../components/DeleteModalComponent'
import {
  deleteUserService,
  deleteUserServiceDefaultErrorMessage,
} from '../../../../services/user/deleteUserService'

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
        await deleteUserService(user.id)

        toastSuccess('Conta deletada com sucesso.')
        signOut()
        handleModalOpenChange(false)
        navigate('/')
      } else {
        toastError(deleteUserServiceDefaultErrorMessage)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : deleteUserServiceDefaultErrorMessage
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
