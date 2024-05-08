import { useState } from 'react'
import { ListTableComponent } from '../../components/ListTableComponent'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import { MainContainer } from '../../templates/MainContainer'
import { AppError } from '../../utils/AppError'
import { CreateUpdateSystemModal } from '../../components/CreateUpdateSystemModal'
import { SystemDTO } from '../../dtos/systemDTO'
import { DeleteSystemModal } from './components/DeleteSystemModal'
import {
  listSystemsByUserIdService,
  listSystemsByUserIdServiceDefaultErrorMessage,
} from '../../services/system/listSystemsByUserIdService'

export function Systems() {
  const { user } = useAuth()
  const { toastError } = useToast()
  const [isCreateUpdateModalOpen, setIsCreateUpdateModalOpen] = useState(false)
  const [isDeleteSystemModalOpen, setIsDeleteSystemModalOpen] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<SystemDTO | undefined>(
    undefined,
  )
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
      key: 'description',
      value: 'Descrição',
    },
  ]

  const listSystems = async () => {
    try {
      if (user) {
        const data = await listSystemsByUserIdService(user?.id)

        return data.systems
      } else {
        toastError(listSystemsByUserIdServiceDefaultErrorMessage)
        return []
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : listSystemsByUserIdServiceDefaultErrorMessage
      toastError(title)
      return []
    }
  }

  const openCreateModal = () => {
    setIsCreateUpdateModalOpen(true)
  }

  const openUpdateModal = (system: SystemDTO) => {
    setIsCreateUpdateModalOpen(true)
    setSelectedSystem(system)
  }

  const openDeleteModal = (system: SystemDTO) => {
    setIsDeleteSystemModalOpen(true)
    setSelectedSystem(system)
  }

  const handleCreateUpdateModalChange = (val: boolean) => {
    setIsCreateUpdateModalOpen(val)
    if (!val) {
      setSelectedSystem(undefined)
    }
  }

  const handleDeleteModalChange = (val: boolean) => {
    setIsDeleteSystemModalOpen(val)
    if (!val) {
      setSelectedSystem(undefined)
    }
  }

  const updateSystemList = () => {}

  return (
    <MainContainer hasTable>
      <ListTableComponent
        columns={columns}
        listService={listSystems}
        updateListTrigger={updateSystemList}
        createService={openCreateModal}
        editService={openUpdateModal}
        deleteService={openDeleteModal}
        title="Meus sistemas cadastrados"
        addButtonLabel="Novo sistema"
      />
      <CreateUpdateSystemModal
        isVisible={isCreateUpdateModalOpen}
        handleModalOpenChange={handleCreateUpdateModalChange}
        fetchItems={updateSystemList}
        system={selectedSystem}
      />
      <DeleteSystemModal
        isVisible={isDeleteSystemModalOpen}
        handleModalOpenChange={handleDeleteModalChange}
        fetchItems={updateSystemList}
        system={selectedSystem}
      />
    </MainContainer>
  )
}
