import { ButtonComponent } from '../ButtonComponent'
import { ModalContainer } from '../../templates/ModalContainer'
import styled from 'styled-components'

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
      <DeleteModalContainer>
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
      </DeleteModalContainer>
    </ModalContainer>
  )
}

const DeleteModalContainer = styled.div`
  padding: 0 1rem;

  div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 2rem;
  }
`
