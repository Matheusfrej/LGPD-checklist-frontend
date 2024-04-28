/* eslint-disable @typescript-eslint/no-explicit-any */
export type ChecklistDTO = {
  id: number
  userId: number
  systemId: number
  isGeneral: boolean
  isIot: boolean
  checklistData: any
  createdAt: Date
  updatedAt: Date
}

export type ParsedChecklistDTO = {
  id: number
  userId: number
  name: string
  systemId: number
  isGeneral: boolean
  isIot: boolean
  checklistData: any
  createdAt: Date
  updatedAt: Date
  createdAtParsed: string
  updatedAtParsed: string
}
