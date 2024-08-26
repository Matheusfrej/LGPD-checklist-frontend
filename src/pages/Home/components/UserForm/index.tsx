import { useUsers } from '../../../../contexts/UsersContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InputComponent } from '../../../../components/InputComponent'
import { FormContainer } from '../../../../templates/FormContainer'
import { useAuth } from '../../../../contexts/AuthContext'
import { SelectComponent } from '../../../../components/SelectComponent'
import { SystemDTO } from '../../../../dtos/systemDTO'
import {
  listSystemsByUserIdService,
  listSystemsByUserIdServiceDefaultErrorMessage,
} from '../../../../services/system/listSystemsByUserIdService'
import { AppError } from '../../../../utils/AppError'
import { useToast } from '../../../../contexts/ToastContext'
import { UserFormInputs, userFormSchema } from './schema'
import { ButtonComponent } from '../../../../components/ButtonComponent'
import { SectionContainer } from '../../../../templates/SectionContainer'
import { CreateUpdateSystemModal } from '../../../../components/CreateUpdateSystemModal'

interface UserFormProps {
  submitted: number
}

export function UserForm({ submitted }: UserFormProps) {
  const { isLogged, user: userLogged } = useAuth()
  const { user, onUserUpdate } = useUsers()
  const { toastError } = useToast()
  const navigate = useNavigate()
  const { id } = useParams()

  const [systems, setSystems] = useState<SystemDTO[]>([])
  const [isCreateUpdateSystemModalOpen, setIsCreateUpdateSystemModalOpen] =
    useState(false)

  const systemsParsedToSelect = systems.map((system) => {
    return {
      value: system.id,
      label: system.name,
    }
  })

  const handleUserSubmit = (data: UserFormInputs) => {
    if (!isCreateUpdateSystemModalOpen) {
      onUserUpdate(data)

      if (id) {
        navigate(`/checklist-families/${id}`)
      } else {
        navigate('/checklist-families')
      }
    }
  }

  const handleCreateUpdateSystemModalChange = (val: boolean) => {
    setIsCreateUpdateSystemModalOpen(val)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UserFormInputs>({
    resolver: zodResolver(userFormSchema),
    values: {
      name: user.name,
      office: user.office,
      systemName: user.systemName,
      systemDesc: user.systemDesc,
      system: user.system,
    },
  })

  const fetchSystems = async () => {
    try {
      if (userLogged) {
        const data = await listSystemsByUserIdService(userLogged.id)

        setSystems(data.systems)
      } else {
        toastError(listSystemsByUserIdServiceDefaultErrorMessage)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : listSystemsByUserIdServiceDefaultErrorMessage
      toastError(title)
      return false
    }
  }

  useEffect(() => {
    if (userLogged) fetchSystems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogged])

  useEffect(() => {
    if (submitted > 0) {
      handleSubmit(handleUserSubmit)()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted])

  return (
    <FormContainer id="user-form" onSubmit={handleSubmit(handleUserSubmit)}>
      <InputComponent
        labelText="Nome do avaliador"
        isRequired
        isReadOnly={isLogged}
        name="name"
        register={register}
        errorMessage={errors.name?.message}
      />
      <InputComponent
        labelText="Cargo ou função"
        isRequired
        isReadOnly={isLogged}
        name="office"
        register={register}
        errorMessage={errors.office?.message}
      />
      {isLogged ? (
        <SectionContainer>
          <SelectComponent
            exampleOptionText="Escolha um sistema"
            items={systemsParsedToSelect}
            name="system"
            selected={getValues('system')}
            register={register}
            errorMessage={errors.system?.message}
            style={{ border: 0, paddingLeft: 0 }}
          />
          <ButtonComponent
            text="Novo sistema"
            action={() => handleCreateUpdateSystemModalChange(true)}
            style={{ width: 'fit-content' }}
          />
        </SectionContainer>
      ) : (
        <>
          <InputComponent
            labelText="Nome do sistema"
            isRequired
            name="systemName"
            register={register}
            errorMessage={errors.systemName?.message}
          />
          <InputComponent
            labelText="Descrição do sistema"
            name="systemDesc"
            isRequired
            isTextArea
            register={register}
            errorMessage={errors.systemDesc?.message}
          />
        </>
      )}
      <CreateUpdateSystemModal
        isVisible={isCreateUpdateSystemModalOpen}
        handleModalOpenChange={handleCreateUpdateSystemModalChange}
        fetchItems={fetchSystems}
      />
    </FormContainer>
  )
}
