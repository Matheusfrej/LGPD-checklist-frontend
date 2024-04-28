import { useState } from 'react'
import { ListTableComponent } from '../../components/ListTableComponent'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import api from '../../libs/api'
import { MainContainer } from '../../templates/MainContainer'
import { AppError } from '../../utils/AppError'
import { CreateUpdateSystemModal } from './components/CreateUpdateSystemModal'
import { SystemDTO } from '../../dtos/systemDTO'
import { DeleteSystemModal } from './components/DeleteSystemModal'

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
      const { data } = await api.get(`/systemsByUserId/${user?.id}`)

      return data.systems
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os seus sistemas. Tente novamente mais tarde.'
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
        triggerList={updateSystemList}
        system={selectedSystem}
      />
      <DeleteSystemModal
        isVisible={isDeleteSystemModalOpen}
        handleModalOpenChange={handleDeleteModalChange}
        triggerList={updateSystemList}
        system={selectedSystem}
      />
    </MainContainer>
  )
}
