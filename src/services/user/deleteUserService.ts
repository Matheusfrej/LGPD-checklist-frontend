import api from '../../libs/api'

const deleteUserServiceDefaultErrorMessage =
  'Não foi possível excluir sua conta. Tente novamente mais tarde.'

async function deleteUserService(id: number) {
  await api.delete(`/users/${id}`)
}

export { deleteUserServiceDefaultErrorMessage, deleteUserService }
