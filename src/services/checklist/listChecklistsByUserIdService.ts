import { ChecklistDTO, ParsedChecklistDTO } from '../../dtos/checklistDTO'
import api from '../../libs/api'
import { convertToBrazilDateTime } from '../../utils/format'
import { getSystemService } from '../system/getSystemService'

const listChecklistsByUserIdServiceDefaultErrorMessage =
  'Não foi possível carregar os seus checklists. Tente novamente mais tarde.'

interface ListChecklistsByUserIdServiceResponse {
  checklists: ParsedChecklistDTO[]
}

const listChecklistsByUserIdService = async (
  userId: number,
): Promise<ListChecklistsByUserIdServiceResponse> => {
  const { data } = await api.get(`/checklistsByUserId/${userId}`)

  const formattedChecklists = await adapter(data.checklists)

  return { checklists: formattedChecklists }
}

const adapter = async (checklists: ChecklistDTO[]) => {
  const checklistsParsed = await Promise.all(
    checklists.map(async (checklist) => {
      const { system } = await getSystemService(checklist.systemId)
      const systemName = system ? system.name : '"não encontrado"'
      const newChecklist: ParsedChecklistDTO = {
        ...checklist,
        name: `Checklist para o sistema ${systemName}`,
        createdAtParsed: convertToBrazilDateTime(checklist.createdAt),
        updatedAtParsed: convertToBrazilDateTime(checklist.updatedAt),
      }
      return newChecklist
    }),
  )

  return checklistsParsed
}

export {
  listChecklistsByUserIdServiceDefaultErrorMessage,
  listChecklistsByUserIdService,
}
