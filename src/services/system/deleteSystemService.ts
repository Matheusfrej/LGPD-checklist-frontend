import api from '../../libs/api'

const deleteSystemServiceDefaultErrorMessage =
  'Não foi possível excluir o sistema. Tente novamente mais tarde.'

async function deleteSystemService(id: number) {
  await api.delete(`/systems/${id}`)
}

export { deleteSystemServiceDefaultErrorMessage, deleteSystemService }
