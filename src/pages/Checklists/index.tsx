import { useState } from 'react'
import { ListTableComponent } from '../../components/ListTableComponent'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import api from '../../libs/api'
import { MainContainer } from '../../templates/MainContainer'
import { AppError } from '../../utils/AppError'
import { SystemDTO } from '../../dtos/systemDTO'
import { ChecklistDTO, ParsedChecklistDTO } from '../../dtos/checklistDTO'
import { DeleteChecklistModal } from './components/DeleteChecklistModal'
import { convertToBrazilDateTime } from '../../utils/format'

export function Checklists() {
  const { user } = useAuth()
  const { toastError } = useToast()
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
      const { data } = await api.get(`/checklistsByUserId/${user?.id}`)

      const formattedChecklists = await checklistsListAdapter(data.checklists)

      return formattedChecklists
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os seus checklists. Tente novamente mais tarde.'
      toastError(title)
      return []
    }
  }

  const getSystem = async (id: number): Promise<SystemDTO | null> => {
    try {
      const { data } = await api.get(`/systems/${id}`)
      return data.system
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os seus sistemas. Tente novamente mais tarde.'
      toastError(title)
      return null
    }
  }

  const checklistsListAdapter = async (checklists: ChecklistDTO[]) => {
    const checklistsParsed = await Promise.all(
      checklists.map(async (checklist) => {
        const system = await getSystem(checklist.systemId)
        const systemName = system ? system.name : '"não encontrado"'
        const newChecklist: ParsedChecklistDTO = {
          ...checklist,
          name: `Checklist para o sistema ${systemName}`,
          createdAtParsed: convertToBrazilDateTime(checklist.createdAt),
          updatedAtParsed: convertToBrazilDateTime(checklist.updatedAt),
        }
        return newChecklist
      }),
    )

    return checklistsParsed
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

  const updateSystemList = () => {}

  return (
    <MainContainer hasTable>
      <ListTableComponent
        columns={columns}
        listService={listChecklists}
        updateListTrigger={updateSystemList}
        createService={() => console.log('criou')}
        editService={() => console.log('editou')}
        deleteService={openDeleteModal}
        title="Minhas checklists cadastradas"
        addButtonLabel="Nova checklist"
      />
      <DeleteChecklistModal
        isVisible={isDeleteChecklistModalOpen}
        handleModalOpenChange={handleDeleteModalChange}
        triggerList={updateSystemList}
        checklist={selectedChecklist}
      />
    </MainContainer>
  )
}
