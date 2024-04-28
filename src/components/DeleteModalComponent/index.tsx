import { ButtonComponent } from '../ButtonComponent'
import { ModalContainer } from '../../templates/ModalContainer'
import * as S from './styles'

interface DeleteModalComponentProps {
  title: string
  isVisible: boolean
  handleModalOpenChange: (state: boolean) => void
  deleteService: () => void
}

export function DeleteModalComponent({
  title,
  isVisible,
  handleModalOpenChange,
  deleteService,
}: DeleteModalComponentProps) {
  const handleDelete = () => {
    deleteService()
  }

  return (
    <ModalContainer
      isVisible={isVisible}
      handleModalOpenChange={handleModalOpenChange}
    >
      <S.DeleteModalContainer>
        <h3>{title}</h3>
        <div>
          <ButtonComponent
            text="Deletar"
            variant="danger"
            action={() => handleDelete()}
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
