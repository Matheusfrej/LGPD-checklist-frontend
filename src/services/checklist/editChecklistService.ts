import api from '../../libs/api'

const editChecklistServiceDefaultErrorMessage =
  'Não foi possível salvar a checklist. Tente novamente mais tarde.'

export interface EditChecklistServiceRequest {
  id: number
  systemId: number
  isGeneral: boolean
  isIot: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checklistData: any
}

async function editChecklistService(
  data: EditChecklistServiceRequest,
): Promise<void> {
  await api.put(`/checklists/${data.id}`, {
    systemId: data.systemId,
    checklistData: data.checklistData,
    isGeneral: data.isGeneral,
    isIot: data.isIot,
  })
}

export { editChecklistServiceDefaultErrorMessage, editChecklistService }
