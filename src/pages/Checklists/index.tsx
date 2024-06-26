import { useState } from 'react'
import { ListTableComponent } from '../../components/ListTableComponent'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import { MainContainer } from '../../templates/MainContainer'
import { AppError } from '../../utils/AppError'
import { ParsedChecklistDTO } from '../../dtos/checklistDTO'
import { DeleteChecklistModal } from './components/DeleteChecklistModal'
import {
  listChecklistsByUserIdService,
  listChecklistsByUserIdServiceDefaultErrorMessage,
} from '../../services/checklist/listChecklistsByUserIdService'
import { useNavigate } from 'react-router-dom'
import { useChecklists } from '../../contexts/ChecklistsContext'

export function Checklists() {
  const { user } = useAuth()
  const { toastError } = useToast()
  const { resetChecklist } = useChecklists()
  const navigate = useNavigate()
  const [isDeleteChecklistModalOpen, setIsDeleteChecklistModalOpen] =
    useState(false)
  const [selectedChecklist, setSelectedChecklist] = useState<
    ParsedChecklistDTO | undefined
  >(undefined)

  const columns = [
    {
      key: 'id',
      value: 'ID',
    },
    {
      key: 'name',
      value: 'Nome',
    },
    {
      key: 'createdAtParsed',
      value: 'Criado em',
    },
    {
      key: 'updatedAtParsed',
      value: 'Atualizado em',
    },
  ]

  const listChecklists = async () => {
    try {
      if (user) {
        const { checklists } = await listChecklistsByUserIdService(user?.id)
        return checklists
      }
      return []
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : listChecklistsByUserIdServiceDefaultErrorMessage
      toastError(title)
      return []
    }
  }

  const openDeleteModal = (checklist: ParsedChecklistDTO) => {
    setIsDeleteChecklistModalOpen(true)
    setSelectedChecklist(checklist)
  }

  const handleDeleteModalChange = (val: boolean) => {
    setIsDeleteChecklistModalOpen(val)
    if (!val) {
      setSelectedChecklist(undefined)
    }
  }

  const handleEditChecklist = (checklist: ParsedChecklistDTO) => {
    navigate(`/checklist/${checklist.id}`)
  }

  const handleCreateChecklist = () => {
    resetChecklist()
    navigate('/')
  }

  const updateChecklistList = () => {}

  return (
    <MainContainer hasTable>
      <ListTableComponent
        columns={columns}
        listService={listChecklists}
        updateListTrigger={updateChecklistList}
        createService={() => handleCreateChecklist()}
        editService={handleEditChecklist}
        deleteService={openDeleteModal}
        title="Minhas checklists cadastradas"
        addButtonLabel="Nova checklist"
      />
      <DeleteChecklistModal
        isVisible={isDeleteChecklistModalOpen}
        handleModalOpenChange={handleDeleteModalChange}
        fetchItems={updateChecklistList}
        checklist={selectedChecklist}
      />
    </MainContainer>
  )
}
