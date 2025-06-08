import { DeviceDTO } from './deviceDTO'
import { LawDTO } from './lawDTO'

export type ItemDTO = {
  id: number
  code: string
  itemDesc: string
  recommendations: string
  isMandatory: boolean
  sectionId: number
  sectionName?: string
  laws?: LawDTO[]
  devices?: DeviceDTO[]
}
