import api from '../../libs/api'

const editUserServiceDefaultErrorMessage =
  'Não foi possível editar sua conta. Tente novamente mais tarde.'

interface EditUserServiceRequest {
  id: number
  name: string
  office: string
}

async function editUserService(data: EditUserServiceRequest) {
  await api.put(`/users/${data.id}`, {
    name: data.name,
    office: data.office,
  })
}

export { editUserServiceDefaultErrorMessage, editUserService }
