import { useUsers } from '../../../../contexts/UsersContext'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputComponent } from '../../../../components/InputComponent'
import { FormContainer } from '../../../../templates/FormContainer'

const userFormSchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(1, { message: 'O nome é obrigatório' }),
  office: z
    .string({ required_error: 'O cargo/função é obrigatório' })
    .min(1, { message: 'O cargo/função é obrigatório' }),
  systemName: z
    .string({ required_error: 'O nome do sistema é obrigatório' })
    .min(1, { message: 'O nome do sistema é obrigatório' }),
  systemDesc: z
    .string({
      required_error: 'A descrição do sistema é obrigatória',
    })
    .min(1, { message: 'A descrição do sistema é obrigatória' }),
})

type UserFormInputs = z.infer<typeof userFormSchema>

interface UserFormProps {
  submitted: number
}

export function UserForm({ submitted }: UserFormProps) {
  const { user, onUserUpdate } = useUsers()
  const navigate = useNavigate()

  const handleUserSubmit = (data: UserFormInputs) => {
    onUserUpdate(data)
    navigate('/checklist-families')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <FormContainer id="my-form" onSubmit={handleSubmit(handleUserSubmit)}>
      <InputComponent
        labelText="Nome do avaliador"
        isRequired
        isReadOnly
        name="name"
        register={register}
        errorMessage={errors.name?.message}
      />
      <InputComponent
        labelText="Cargo ou função"
        isRequired
        isReadOnly
        name="office"
        register={register}
        errorMessage={errors.office?.message}
      />
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
    </FormContainer>
  )
}
