import { ChecklistDTO } from '../../dtos/checklistDTO'
import api from '../../libs/api'

const createChecklistServiceDefaultErrorMessage =
  'Não foi possível salvar a checklist. Tente novamente mais tarde.'

export interface CreateChecklistServiceRequest {
  userId: number
  systemId: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checklistData: any
}

export interface CreateChecklistServiceResponse {
  checklist: ChecklistDTO
}

async function createChecklistService(
  data: CreateChecklistServiceRequest,
): Promise<CreateChecklistServiceResponse> {
  const { data: responseData } = await api.post('/checklists', {
    userId: data.userId,
    systemId: data.systemId,
    checklistData: data.checklistData,
  })

  return responseData
}

export { createChecklistServiceDefaultErrorMessage, createChecklistService }
