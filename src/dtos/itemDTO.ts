import { DeviceDTO } from './deviceDTO'
import { LawDTO } from './lawDTO'
import { SectionDTO } from './sectionDTO'

export type ItemDTO = {
  id: number
  code: string
  itemDesc: string
  recommendations: string
  isMandatory: boolean
  section: SectionDTO
  laws?: LawDTO[]
  devices?: DeviceDTO[]
}
