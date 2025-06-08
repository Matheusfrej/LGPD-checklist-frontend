import { AnswerType, SeverityDegreeType } from '../../@types'
import api from '../../libs/api'

const editChecklistServiceDefaultErrorMessage =
  'Não foi possível salvar a checklist. Tente novamente mais tarde.'

export interface EditChecklistServiceRequest {
  id: number
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

async function editChecklistService(
  data: EditChecklistServiceRequest,
): Promise<void> {
  await api.put(`/checklists/${data.id}`, {
    systemId: data.systemId,
    items: data.items,
    laws: data.laws,
    devices: data.devices,
  })
}

export { editChecklistServiceDefaultErrorMessage, editChecklistService }
