import { ModalContainer } from '../../../../templates/ModalContainer'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormContainer } from '../../../../templates/FormContainer'
import { InputComponent } from '../../../../components/InputComponent'
import { ButtonComponent } from '../../../../components/ButtonComponent'
import { useAuth } from '../../../../contexts/AuthContext'
import { AppError } from '../../../../utils/AppError'
import { useToast } from '../../../../contexts/ToastContext'
import { SystemDTO } from '../../../../dtos/systemDTO'
import { useEffect } from 'react'
import {
  createSystemService,
  createSystemServiceDefaultErrorMessage,
} from '../../../../services/system/createSystemService'
import {
  updateSystemService,
  updateSystemServiceDefaultErrorMessage,
} from '../../../../services/system/updateSystemService'

const createUpdateSystemFormSchema = z.object({
  name: z
    .string({ required_error: 'O nome do sistems é obrigatório' })
    .min(1, { message: 'O nome do sistema é obrigatório' }),
  description: z
    .string({ required_error: 'A descrição do sistema é obrigatória' })
    .min(1, { message: 'A descrição do sistema é obrigatória' }),
})

type CreateUpdateSystemFormInputs = z.infer<typeof createUpdateSystemFormSchema>

interface CreateUpdateSystemModalProps {
  isVisible: boolean
  system?: SystemDTO
  handleModalOpenChange: (state: boolean) => void
  triggerList: () => void
}

export function CreateUpdateSystemModal({
  isVisible,
  system,
  handleModalOpenChange,
  triggerList,
}: CreateUpdateSystemModalProps) {
  const { user } = useAuth()
  const { toastError, toastSuccess } = useToast()
  const isEditMode = system !== undefined

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateUpdateSystemFormInputs>({
    resolver: zodResolver(createUpdateSystemFormSchema),
    defaultValues: {
      name: system?.name,
      description: system?.description,
    },
  })

  const createSystem = async (data: CreateUpdateSystemFormInputs) => {
    try {
      if (user) {
        await createSystemService({
          userId: user.id,
          name: data.name,
          description: data.description,
        })

        toastSuccess('Sistema criado com sucesso!')
        handleModalOpenChange(false)
        triggerList()
        reset()
      } else {
        toastError(createSystemServiceDefaultErrorMessage)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : createSystemServiceDefaultErrorMessage
      toastError(title)
    }
  }

  const updateSystem = async (data: CreateUpdateSystemFormInputs) => {
    try {
      if (system) {
        await updateSystemService({
          id: system.id,
          name: data.name,
          description: data.description,
        })

        toastSuccess('Sistema editado com sucesso!')
        handleModalOpenChange(false)
        triggerList()
        reset()
      } else {
        toastError(updateSystemServiceDefaultErrorMessage)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : updateSystemServiceDefaultErrorMessage
      toastError(title)
    }
  }

  const handleSystemSubmit = (data: CreateUpdateSystemFormInputs) => {
    if (isEditMode) {
      updateSystem(data)
    } else {
      createSystem(data)
    }
  }

  useEffect(() => {
    if (system) {
      setValue('name', system.name)
      setValue('description', system.description)
    } else {
      setValue('name', '')
      setValue('description', '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [system])

  return (
    <ModalContainer
      isVisible={isVisible}
      handleModalOpenChange={handleModalOpenChange}
    >
      <FormContainer
        id="create-update-system-form"
        onSubmit={handleSubmit(handleSystemSubmit)}
      >
        <h2>{isEditMode ? 'Editar' : 'Novo'} sistema</h2>
        <InputComponent
          labelText="Nome do sistema"
          isRequired
          isNormal
          name="name"
          register={register}
          errorMessage={errors.name?.message}
        />
        <InputComponent
          labelText="Descrição do sistema"
          isRequired
          isNormal
          isTextArea
          name="description"
          register={register}
          errorMessage={errors.description?.message}
        />
        <ButtonComponent type="submit" text={isEditMode ? 'Editar' : 'Criar'} />
      </FormContainer>
    </ModalContainer>
  )
}
