import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import * as S from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ButtonComponent } from '../../components/ButtonComponent'
import { Check, Pencil } from 'phosphor-react'
import { InputComponent } from '../../components/InputComponent'
import api from '../../libs/api'
import { useToast } from '../../contexts/ToastContext'
import { AppError } from '../../utils/AppError'

const editUserFormSchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(1, { message: 'O nome é obrigatório' }),
  office: z
    .string({ required_error: 'O cargo/função é obrigatório' })
    .min(1, { message: 'O cargo/função é obrigatório' }),
})

type EditUserFormInputs = z.infer<typeof editUserFormSchema>

export function Profile() {
  const { user, userUpdate } = useAuth()
  const { toastSuccess, toastError } = useToast()
  const [editMode, setEditMode] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditUserFormInputs>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      name: user?.name,
      office: user?.office,
    },
    resetOptions: {
      keepValues: true,
      keepDefaultValues: true,
    },
  })

  async function editUser(data: EditUserFormInputs) {
    try {
      if (user) {
        await api.put(`/users/${user?.id}`, {
          name: data.name,
          office: data.office,
        })

        userUpdate({ ...user, name: data.name, office: data.office })
        toastSuccess('Conta editada com sucesso!')
        setEditMode(false)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível editar sua conta. Tente novamente mais tarde.'
      toastError(title)
    }
  }

  const handleEditUserSubmit = async (data: EditUserFormInputs) => {
    editUser(data)
  }

  const changeToEditMode = () => {
    if (user) {
      setValue('name', user?.name)
      setValue('office', user?.office)
    }
    setEditMode(true)
  }

  return (
    <MainContainer>
      <SectionContainer hasHeader>
        <S.UserProfileContainer>
          <S.ProfileHeader>
            <h2>Seu Perfil</h2>
            {editMode ? (
              <ButtonComponent
                icon={<Check size={16} />}
                text="Salvar"
                variant="outline"
                action={handleSubmit(handleEditUserSubmit)}
              />
            ) : (
              <ButtonComponent
                icon={<Pencil size={16} />}
                text="Editar"
                variant="outline"
                action={() => changeToEditMode()}
              />
            )}
          </S.ProfileHeader>
          <S.InfoContainer>
            {editMode ? (
              <InputComponent
                isRequired
                labelText="Nome"
                name="name"
                register={register}
                errorMessage={errors.name?.message}
              />
            ) : (
              <>
                <strong>Nome</strong>
                <p>{user?.name}</p>
              </>
            )}
          </S.InfoContainer>
          <S.InfoContainer>
            {editMode ? (
              <InputComponent
                isRequired
                labelText="Cargo/Função"
                name="office"
                register={register}
                errorMessage={errors.office?.message}
              />
            ) : (
              <>
                <strong>Cargo/Função</strong>
                <p>{user?.office}</p>
              </>
            )}
          </S.InfoContainer>
        </S.UserProfileContainer>
      </SectionContainer>
      <SectionContainer>
        <S.UserProfileContainer>
          <h3>Deletar Conta</h3>
          <p>
            Deletar sua conta irá deletar todos os seus sistemas e checklists
            salvos. Essa ação não pode ser desfeita.
          </p>
        </S.UserProfileContainer>
      </SectionContainer>
    </MainContainer>
  )
}
