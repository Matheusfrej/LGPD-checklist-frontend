import api from '../../libs/api'

const deleteChecklistServiceDefaultErrorMessage =
  'Não foi possível excluir a checklist. Tente novamente mais tarde.'

async function deleteChecklistService(id: number) {
  await api.delete(`/checklists/${id}`)
}

export { deleteChecklistServiceDefaultErrorMessage, deleteChecklistService }
