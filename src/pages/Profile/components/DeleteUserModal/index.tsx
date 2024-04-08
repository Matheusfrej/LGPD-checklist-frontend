import { useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../../../../components/ButtonComponent'
import { useAuth } from '../../../../contexts/AuthContext'
import { useToast } from '../../../../contexts/ToastContext'
import api from '../../../../libs/api'
import { ModalContainer } from '../../../../templates/ModalContainer'
import { AppError } from '../../../../utils/AppError'
import * as S from './styles'

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
        signOut(false)
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

  const handleDeleteUser = () => {
    deleteUser()
  }

  return (
    <ModalContainer
      isVisible={isVisible}
      handleModalOpenChange={handleModalOpenChange}
    >
      <S.DeleteModalContainer>
        <h3>Tem certeza que deseja deletar sua conta permanentemente?</h3>
        <div>
          <ButtonComponent
            text="Deletar"
            variant="danger"
            action={() => handleDeleteUser()}
          />
          <ButtonComponent
            text="Cancelar"
            variant="outline"
            action={() => handleModalOpenChange(false)}
          />
        </div>
      </S.DeleteModalContainer>
    </ModalContainer>
  )
}
