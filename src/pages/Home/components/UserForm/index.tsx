import { useUsers } from '../../../../contexts/UsersContext'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

const userFormSchema = z
  .object({
    name: z
      .string({ required_error: 'O nome é obrigatório' })
      .min(1, { message: 'O nome é obrigatório' }),
    office: z
      .string({ required_error: 'O cargo/função é obrigatório' })
      .min(1, { message: 'O cargo/função é obrigatório' }),
    systemName: z
      .string({ required_error: 'O nome do sistema é obrigatório' })
      .optional(),
    systemDesc: z
      .string({
        required_error: 'A descrição do sistema é obrigatória',
      })
      .optional(),
    system: z.coerce
      .number({
        required_error: 'Informe um sistema para avaliar',
      })
      .optional(),
  })
  .superRefine((values, ctx) => {
    if (!values.system && !values.systemDesc && !values.systemName) {
      if (!values.systemDesc) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A descrição do sistema é obrigatória',
          path: ['systemDesc'],
        })
      }
      if (!values.systemName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O nome do sistema é obrigatório',
          path: ['systemName'],
        })
      }
      if (!values.system) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Informe um sistema para avaliar',
          path: ['system'],
        })
      }
      return false
    }
    return true
  })

type UserFormInputs = z.infer<typeof userFormSchema>

interface UserFormProps {
  submitted: number
}

export function UserForm({ submitted }: UserFormProps) {
  const { isLogged, user: userLogged } = useAuth()
  const { user, onUserUpdate } = useUsers()
  const { toastError } = useToast()
  const navigate = useNavigate()
  const [systems, setSystems] = useState<SystemDTO[]>([])

  const systemsParsedToSelect = systems.map((system) => {
    return {
      value: system.id,
      label: system.name,
    }
  })

  const handleUserSubmit = (data: UserFormInputs) => {
    onUserUpdate(data)
    navigate('/checklist-families')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    getValues,
  } = useForm<UserFormInputs>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name,
      office: user.office,
      systemName: user.systemName,
      systemDesc: user.systemDesc,
    },
    resetOptions: {
      keepValues: true,
      keepDefaultValues: true,
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

  useEffect(() => {
    if (getValues('name') !== user.name) setValue('name', user.name)
    if (getValues('office') !== user.office) setValue('office', user.office)
    if (getValues('systemName') !== user.systemName)
      setValue('systemName', user.systemName)
    if (getValues('systemDesc') !== user.systemDesc)
      setValue('systemDesc', user.systemDesc)
    if (!isLogged) {
      resetField('system')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLogged])

  return (
    <FormContainer id="my-form" onSubmit={handleSubmit(handleUserSubmit)}>
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
        <SelectComponent
          defaultValueText="Escolha um sistema"
          items={systemsParsedToSelect}
          name="system"
          register={register}
          errorMessage={errors.system?.message}
        />
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
    </FormContainer>
  )
}
