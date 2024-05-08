import { ChecklistDTO } from '../../dtos/checklistDTO'
import api from '../../libs/api'

const getChecklistServiceDefaultErrorMessage =
  'Não foi possível carregar a checklist. Tente novamente mais tarde.'

export interface GetChecklistServiceResponse {
  checklist: ChecklistDTO
}

async function getChecklistService(
  id: number,
): Promise<GetChecklistServiceResponse> {
  const { data } = await api.get(`/checklists/${id}`)

  return data
}

export { getChecklistServiceDefaultErrorMessage, getChecklistService }
