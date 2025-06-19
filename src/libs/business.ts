import { ChecklistItemType } from '../dtos/checklistDTO'

export function getItemValidationMessage(item: ChecklistItemType): string {
  if (item.answer === 'Não' && (!item.severityDegree || !item.userComment))
    return 'Nos itens respondidos com "Não", preencha o grau de severidade e o comentário'

  return ''
}
