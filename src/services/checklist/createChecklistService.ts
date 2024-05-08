import { ChecklistDTO } from '../../dtos/checklistDTO'
import api from '../../libs/api'

const createChecklistServiceDefaultErrorMessage =
  'Não foi possível salvar a checklist. Tente novamente mais tarde.'

export interface CreateChecklistServiceRequest {
  userId: number
  systemId: number
  isGeneral: boolean
  isIoT: boolean
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
    isGeneral: data.isGeneral,
    isIoT: data.isIoT,
    checklistData: data.checklistData,
  })

  return responseData
}

export { createChecklistServiceDefaultErrorMessage, createChecklistService }
