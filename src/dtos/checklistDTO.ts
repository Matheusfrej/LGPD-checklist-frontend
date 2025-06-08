import { AnswerType, SeverityDegreeType } from '../@types'
import { DeviceDTO } from './deviceDTO'
import { ItemDTO } from './itemDTO'
import { LawDTO } from './lawDTO'

export type ChecklistItemType = {
  item: ItemDTO
  answer?: AnswerType
  severityDegree?: SeverityDegreeType
  userComment?: string
}

export type ChecklistDTO = {
  id: number
  userId: number
  systemId: number
  checklistItems: ChecklistItemType[]
  laws: LawDTO
  devices: DeviceDTO
  createdAt: Date
  updatedAt: Date
}

export type ParsedChecklistDTO = ChecklistDTO & {
  name: string
  createdAtParsed: string
  updatedAtParsed: string
}
