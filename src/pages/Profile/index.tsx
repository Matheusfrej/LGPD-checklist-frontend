import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { MainContainer } from '../../templates/MainContainer'
import { SectionContainer } from '../../templates/SectionContainer'
import styled from 'styled-components'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ButtonComponent } from '../../components/ButtonComponent'
import { Check, Pencil } from 'phosphor-react'
import { InputComponent } from '../../components/InputComponent'
import { useToast } from '../../contexts/ToastContext'
import { AppError } from '../../utils/AppError'
import { DeleteUserModal } from './components/DeleteUserModal'
import {
  editUserService,
  editUserServiceDefaultErrorMessage,
} from '../../services/user/editUserService'

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
        await editUserService({
          id: user.id,
          name: data.name,
          office: data.office,
        })

        userUpdate({ ...user, name: data.name, office: data.office })
        toastSuccess('Conta editada com sucesso!')
        setEditMode(false)
      } else {
        toastError(editUserServiceDefaultErrorMessage)
      }
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : editUserServiceDefaultErrorMessage
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
        <UserProfileContainer>
          <ProfileHeader>
            <h2>Seu Perfil</h2>
            {editMode ? (
              <ButtonComponent
                icon={<Check size={16} aria-hidden />}
                text="Salvar"
                variant="outline"
                action={handleSubmit(handleEditUserSubmit)}
              />
            ) : (
              <ButtonComponent
                icon={<Pencil size={16} aria-hidden />}
                text="Editar"
                variant="outline"
                action={() => changeToEditMode()}
              />
            )}
          </ProfileHeader>
          {!editMode && (
            <InfoContainer>
              <strong>Email</strong>
              <p>{user?.email}</p>
            </InfoContainer>
          )}
          <InfoContainer>
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
          </InfoContainer>
          <InfoContainer>
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
          </InfoContainer>
        </UserProfileContainer>
      </SectionContainer>
      <SectionContainer>
        <UserProfileContainer>
          <h3>Deletar Conta</h3>
          <p>
            Deletar sua conta irá excluir todos os seus sistemas e checklists
            salvos. Essa ação não pode ser desfeita.
          </p>
          <ButtonComponent
            text="Deletar conta"
            variant="danger"
            style={{ width: '7rem' }}
            action={() => setIsDeleteModalOpen(true)}
          />
        </UserProfileContainer>
      </SectionContainer>
      <DeleteUserModal
        isVisible={isDeleteModalOpen}
        handleModalOpenChange={setIsDeleteModalOpen}
      />
    </MainContainer>
  )
}

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ProfileHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
