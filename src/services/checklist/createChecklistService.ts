import { AnswerType, SeverityDegreeType } from '../../@types'
import { ChecklistDTO } from '../../dtos/checklistDTO'
import api from '../../libs/api'

const createChecklistServiceDefaultErrorMessage =
  'Não foi possível salvar a checklist. Tente novamente mais tarde.'

export interface CreateChecklistServiceRequest {
  userId: number
  systemId: number
  items: {
    id: number
    answer: AnswerType
    severityDegree: SeverityDegreeType
    userComment?: string
  }
  laws: number[]
  devices: number[]
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
    items: data.items,
    laws: data.laws,
    devices: data.devices,
  })

  return responseData
}

export { createChecklistServiceDefaultErrorMessage, createChecklistService }
